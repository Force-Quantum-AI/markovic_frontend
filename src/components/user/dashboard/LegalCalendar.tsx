"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Users, Scale, Loader2 } from "lucide-react";
import { useGetAllCasesQuery, useGetCaseHearingAndDeadlineAllDateForCalendarQuery } from "@/store/features/case/case.api";
import { useTranslation } from "react-i18next";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventType = "hearing" | "deadline";

interface CalendarEventItem {
  name: string;
  time: string; // e.g. "09:00 AM - 10:00 AM"
  date: string;
  status: string;
  type: EventType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

// Extended to 22:00 so PM events (e.g. 5:00 PM, 10:00 PM) render correctly
const TIMELINE_START = 8;
const TIMELINE_END   = 22;
const SLOT_HEIGHT    = 60; // px per hour

// ─── Color Maps ───────────────────────────────────────────────────────────────

const EVENT_COLORS = {
  hearing: {
    bg:     "bg-[#e8f7ee]",
    border: "border-[#2ecc71]",
    text:   "text-[#219a54]",
    line:   "bg-[#2ecc71]",
    iconBg: "bg-[#219a54]",
  },
  deadline: {
    bg:     "bg-[#fef8e8]",
    border: "border-[#f0a500]",
    text:   "text-[#c47f00]",
    line:   "bg-[#f0a500]",
    iconBg: "bg-[#c47f00]",
  },
} as const;

// Calendar dot/circle colours by event combination
const DOT_COLORS = {
  hearing:  "bg-[#2ecc71]",
  deadline: "bg-[#f0a500]",
  both:     "bg-[#8b5cf6]", // purple when a date has both
} as const;

const CIRCLE_SELECTED = {
  hearing:  "bg-[#2ecc71] text-white",
  deadline: "bg-[#f0a500] text-white",
  both:     "bg-[#8b5cf6] text-white",
  default:  "bg-[#135576] text-white",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Internal calendar key — month is 0-indexed (JS Date style)
 * Outputs: "YYYY-MM-DD"
 */
function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * API response key — month is 1-indexed
 * Outputs: "YYYY-MM-DD"
 */
function apiToDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * API query param format: "YYYY-MM-DD" → "DD-MM-YYYY"
 * Matches the `current_date` format in the calendar API response.
 */
function toApiDateParam(dateKey: string): string {
  const [y, m, d] = dateKey.split("-");
  return `${d}-${m}-${y}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** JS getDay() is 0=Sun; remap to Mon-start grid (Mon=0 … Sun=6). */
function getFirstDayOfWeek(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function timeToHours(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

/**
 * Parse "09:00 AM - 10:00 AM" → { startTime: "09:00", endTime: "10:00" } in 24-hour format.
 * Gracefully handles malformed / reversed times (bad test data).
 */
function parseTimeRange(timeStr: string): { startTime: string; endTime: string } {
  const to24 = (t: string): string => {
    const trimmed  = t.trim();
    const spaceIdx = trimmed.lastIndexOf(" ");
    if (spaceIdx === -1) return "08:00";
    const period = trimmed.slice(spaceIdx + 1).toUpperCase();
    const [hStr, mStr = "00"] = trimmed.slice(0, spaceIdx).split(":");
    let h = parseInt(hStr, 10);
    if (isNaN(h)) return "08:00";
    const m = mStr.padStart(2, "0");
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m}`;
  };

  const parts = timeStr.split(" - ");
  if (parts.length !== 2) return { startTime: "08:00", endTime: "09:00" };
  return { startTime: to24(parts[0]), endTime: to24(parts[1]) };
}

function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = TIMELINE_START; h <= TIMELINE_END; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < TIMELINE_END) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const TIME_SLOTS = buildTimeSlots();

// ─── EventCard ────────────────────────────────────────────────────────────────

function EventCard({ event }: { event: CalendarEventItem }) {
  const c    = EVENT_COLORS[event.type];
  const Icon = event.type === "hearing" ? Users : Scale;

  const { startTime, endTime } = parseTimeRange(event.time);
  const startH = timeToHours(startTime);
  let   endH   = timeToHours(endTime);

  // Guard: if API returns reversed times (bad data), treat as a 1-hour block
  if (endH <= startH) endH = startH + 1;

  const clampedStart   = Math.max(TIMELINE_START, Math.min(startH, TIMELINE_END - 0.5));
  const clampedEnd     = Math.max(clampedStart + 0.5, Math.min(endH, TIMELINE_END));
  const totalPx        = (TIMELINE_END - TIMELINE_START) * SLOT_HEIGHT;
  const topFraction    = (clampedStart - TIMELINE_START) / (TIMELINE_END - TIMELINE_START);
  const heightFraction = (clampedEnd - clampedStart)     / (TIMELINE_END - TIMELINE_START);

  return (
    <div
      className={`absolute left-16 right-2 h-fit ${c.bg} ${c.border} border rounded-xl flex items-center gap-3 px-3 py-2 shadow-sm`}
      style={{
        top:    `${topFraction * totalPx}px`,
        zIndex: 10,
      }}
    >
      {/* Horizontal accent lines that connect the card to the grid */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-4 -ml-4 ${c.line}`} />
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-2 -mr-2 ${c.line}`} />

      {/* Icon bubble */}
      <div className={`shrink-0 w-9 h-9 rounded-full ${c.iconBg} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>

      <div className="min-w-0">
        <p className={`text-xs font-semibold ${c.text} capitalize`}>{event.type}</p>
        <p className="text-sm font-bold text-gray-800 truncate">{event.name}</p>
        <p className="text-xs text-gray-500">{event.time}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LegalCalendar() {
  const today = new Date();
  const {t} = useTranslation("common");

  const [viewYear,     setViewYear]     = useState(today.getFullYear());
  const [viewMonth,    setViewMonth]    = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // ── API calls ──────────────────────────────────────────────────────────────

  /**
   * getAllCases — used to mark which calendar dates have events.
   * NOTE: This uses `results` from the first page. If your backend paginates
   * and has more pages, you'll want a "fetch all" or a dedicated
   * /calendar/events/?year=...&month=... endpoint instead.
   */
  const { data: casesData, isLoading: isCasesLoading } = useGetAllCasesQuery({});

  /**
   * getCaseHearingAndDeadlineAllDateForCalendar — fetches event details for
   * the currently selected date. Re-fires automatically when selectedDate changes.
   */
  const { data: calendarData, isFetching: isCalendarFetching } =
    useGetCaseHearingAndDeadlineAllDateForCalendarQuery(
      toApiDateParam(selectedDate)
    );

  // ── Build date → event-type map from cases list ────────────────────────────

  const eventMap = useMemo(() => {
    const map = new Map<string, { hasHearing: boolean; hasDeadline: boolean }>();

    casesData?.results?.forEach((c: any) => {
      c.hearings?.forEach((h: any) => {
        const key  = apiToDateKey(h.year, h.month, h.day);
        const prev = map.get(key) ?? { hasHearing: false, hasDeadline: false };
        map.set(key, { ...prev, hasHearing: true });
      });

      c.deadlines?.forEach((d: any) => {
        const key  = apiToDateKey(d.year, d.month, d.day);
        const prev = map.get(key) ?? { hasHearing: false, hasDeadline: false };
        map.set(key, { ...prev, hasDeadline: true });
      });
    });

    return map;
  }, [casesData]);

  // ── Merge & sort selected-date events from calendar API ───────────────────

  const selectedEvents = useMemo((): CalendarEventItem[] => {
    if (!calendarData) return [];

    const hearings: CalendarEventItem[] = (calendarData.hearings ?? []).map(
      (h: any) => ({ ...h, type: "hearing" as EventType })
    );
    const deadlines: CalendarEventItem[] = (calendarData.deadlines ?? []).map(
      (d: any) => ({ ...d, type: "deadline" as EventType })
    );

    // Sort by start time so events appear in chronological order on the timeline
    return [...hearings, ...deadlines].sort((a, b) => {
      const ta = timeToHours(parseTimeRange(a.time).startTime);
      const tb = timeToHours(parseTimeRange(b.time).startTime);
      return ta - tb;
    });
  }, [calendarData]);

  // ── Calendar grid state ────────────────────────────────────────────────────

  const daysInMonth    = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = getFirstDayOfWeek(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const selDateObj   = new Date(selectedDate + "T00:00:00");
  const selDayName   = DAY_NAMES[selDateObj.getDay()];
  const selDay       = selDateObj.getDate();
  const selMonthName = MONTH_NAMES[selDateObj.getMonth()];

  const totalTimelinePx = (TIMELINE_END - TIMELINE_START) * SLOT_HEIGHT;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-fit bg-white rounded-xl overflow-hidden select-none">
      <h2 className="px-4 pt-4 pb-2 text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
        {t("upcoming")}
      </h2>

      {/* ── Month Header ── */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">
            {MONTH_NAMES[viewMonth]},{" "}
            <span className="font-normal text-gray-600">
              {selDay} {selDayName}
            </span>
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={nextMonth}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Day-of-week labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS_SHORT.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-semibold text-gray-400 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {isCasesLoading
            // Skeleton while the cases list is loading for the first time
            ? Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center py-[3px]">
                  <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse" />
                  <div className="w-1 h-1 mt-[2px]" />
                </div>
              ))
            : cells.map((day, idx) => {
                if (day === null) return <div key={`empty-${idx}`} />;

                const key     = toDateKey(viewYear, viewMonth, day);
                const info    = eventMap.get(key);
                const hasH    = info?.hasHearing  ?? false;
                const hasD    = info?.hasDeadline ?? false;
                const hasBoth = hasH && hasD;
                const hasAny  = hasH || hasD;
                const isToday = key === todayKey;
                const isSel   = key === selectedDate;

                // ── Dot colour below the number ──
                const dotClass = hasBoth
                  ? DOT_COLORS.both
                  : hasD
                  ? DOT_COLORS.deadline
                  : DOT_COLORS.hearing;

                // ── Circle fill when selected ──
                let circleClass = "";
                if      (isSel && hasBoth) circleClass = CIRCLE_SELECTED.both;
                else if (isSel && hasH)    circleClass = CIRCLE_SELECTED.hearing;
                else if (isSel && hasD)    circleClass = CIRCLE_SELECTED.deadline;
                else if (isSel)            circleClass = CIRCLE_SELECTED.default;
                else if (isToday && !hasAny) circleClass = "border-2 border-[#135576] text-[#135576]";

                return (
                  <div
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    className="flex flex-col items-center py-[3px] cursor-pointer group"
                  >
                    <div
                      className={`
                        w-7 h-7 rounded-full flex items-center justify-center
                        text-xs font-medium transition-all duration-150
                        ${circleClass || "text-gray-700 group-hover:bg-gray-100"}
                      `}
                    >
                      {day}
                    </div>
                    {/* Show coloured dot only when not selected (selected circle already encodes the type) */}
                    {hasAny && !isSel
                      ? <div className={`w-1 h-1 rounded-full mt-[2px] ${dotClass}`} />
                      : <div className="w-1 h-1 mt-[2px]" />
                    }
                  </div>
                );
              })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 mb-1 px-1 py-2 bg-gray-50 rounded-lg flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#2ecc71]" />
            <span className="text-xs text-gray-600">{t("hearing")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#f0a500]" />
            <span className="text-xs text-gray-600">{t("deadline")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#8b5cf6]" />
            <span className="text-xs text-gray-600">{t("both")}</span>
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {isCalendarFetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-[#135576] animate-spin" />
          </div>
        ) : selectedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">{t("no_result")}</p>
            <p className="text-xs text-gray-400">
              {selMonthName} {selDay}
            </p>
          </div>
        ) : (
          <div
            className="relative ml-2"
            style={{ height: `${totalTimelinePx}px` }}
          >
            {/* Time labels + grid lines */}
            {TIME_SLOTS.map((slot) => {
              const isHour = slot.endsWith(":00");
              const topPx  =
                ((timeToHours(slot) - TIMELINE_START) /
                  (TIMELINE_END - TIMELINE_START)) *
                totalTimelinePx;
              return (
                <div
                  key={slot}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ top: `${topPx}px` }}
                >
                  <span
                    className={`text-[10px] w-12 text-right pr-2 shrink-0 ${
                      isHour
                        ? "text-gray-500 font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {isHour ? slot : ""}
                  </span>
                  <div
                    className={`flex-1 border-t ${
                      isHour
                        ? "border-gray-200"
                        : "border-gray-100 border-dashed"
                    }`}
                  />
                </div>
              );
            })}

            {/* Event cards */}
            {selectedEvents.map((ev, idx) => (
              <EventCard
                key={`${ev.type}-${idx}-${ev.time}`}
                event={ev}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}