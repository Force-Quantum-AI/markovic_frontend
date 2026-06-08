"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Scale } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventType = "hearing" | "deadline";

interface CalendarEvent {
  id: string;
  type: EventType;
  title: string;         // person name
  date: string;          // "YYYY-MM-DD"
  startTime: string;     // "HH:MM"
  endTime: string;       // "HH:MM"
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    type: "hearing",
    title: "Esther Howard",
    date: "2026-05-19",
    startTime: "09:00",
    endTime: "09:30",
  },
  {
    id: "2",
    type: "deadline",
    title: "John William",
    date: "2026-05-20",
    startTime: "10:30",
    endTime: "11:30",
  },
  {
    id: "3",
    type: "hearing",
    title: "Amelia Carter",
    date: "2026-05-24",
    startTime: "11:00",
    endTime: "11:45",
  },
  {
    id: "4",
    type: "deadline",
    title: "Marcus Webb",
    date: "2026-05-24",
    startTime: "14:00",
    endTime: "15:00",
  },
  {
    id: "5",
    type: "hearing",
    title: "Priya Nair",
    date: "2026-05-27",
    startTime: "09:30",
    endTime: "10:00",
  },
  {
    id: "6",
    type: "deadline",
    title: "Daniel Moss",
    date: "2026-05-28",
    startTime: "13:00",
    endTime: "14:00",
  },
  {
    id: "7",
    type: "hearing",
    title: "Sophia Lee",
    date: "2026-06-03",
    startTime: "10:00",
    endTime: "10:30",
  },
  {
    id: "8",
    type: "deadline",
    title: "Kevin Brooks",
    date: "2026-06-05",
    startTime: "15:30",
    endTime: "16:30",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** 0 = Sunday … 6 = Saturday → remap to Mon-start: Mon=0 … Sun=6 */
function getFirstDayOfWeek(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function formatTime12(time: string): string {
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

/** Convert "HH:MM" to fractional hours for timeline positioning */
function timeToHours(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

// ─── Timeline Config ──────────────────────────────────────────────────────────

const TIMELINE_START = 8;   // 08:00
const TIMELINE_END   = 18;  // 18:00
const SLOT_HEIGHT    = 60;  // px per hour

function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = TIMELINE_START; h <= TIMELINE_END; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < TIMELINE_END) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const TIME_SLOTS = buildTimeSlots();

// ─── Sub-components ───────────────────────────────────────────────────────────

const EVENT_COLORS: Record<EventType, { bg: string; border: string; text: string; dot: string; iconBg: string }> = {
  hearing: {
    bg: "bg-[#e8f7ee]",
    border: "border-[#2ecc71]",
    text: "text-[#219a54]",
    dot: "bg-[#2ecc71]",
    iconBg: "bg-[#219a54]",
  },
  deadline: {
    bg: "bg-[#fef8e8]",
    border: "border-[#f0a500]",
    text: "text-[#c47f00]",
    dot: "bg-[#f0a500]",
    iconBg: "bg-[#c47f00]",
  },
};

function EventCard({ event }: { event: CalendarEvent }) {
  const c = EVENT_COLORS[event.type];
  const Icon = event.type === "hearing" ? Users : Scale;
  const topFraction =
    (timeToHours(event.startTime) - TIMELINE_START) / (TIMELINE_END - TIMELINE_START);
  const heightFraction =
    (timeToHours(event.endTime) - timeToHours(event.startTime)) /
    (TIMELINE_END - TIMELINE_START);
  const totalPx = (TIMELINE_END - TIMELINE_START) * SLOT_HEIGHT;

  return (
    <div
      className={`absolute left-16 right-2 ${c.bg} ${c.border} border rounded-xl flex items-center gap-3 px-3 py-2 shadow-sm`}
      style={{
        top: `${topFraction * totalPx}px`,
        height: `${Math.max(heightFraction * totalPx, 56)}px`,
        zIndex: 10,
      }}
    >
      {/* horizontal accent line – left */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-14 -ml-14 ${c.dot}`}
      />
      {/* horizontal accent line – right */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-2 -mr-2 ${c.dot}`}
      />

      {/* icon bubble */}
      <div className={`shrink-0 w-9 h-9 rounded-full ${c.iconBg} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>

      <div className="min-w-0">
        <p className={`text-xs font-semibold ${c.text} capitalize`}>{event.type}</p>
        <p className="text-sm font-bold text-gray-800 truncate">{event.title}</p>
        <p className="text-xs text-gray-500">
          {formatTime12(event.startTime)} - {formatTime12(event.endTime)}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LegalCalendar() {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // Build a Set of event date-keys for fast lookup
  const eventMap = new Map<string, CalendarEvent[]>();
  DUMMY_EVENTS.forEach((ev) => {
    if (!eventMap.has(ev.date)) eventMap.set(ev.date, []);
    eventMap.get(ev.date)!.push(ev);
  });

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = getFirstDayOfWeek(viewYear, viewMonth);

  // Calendar grid cells (null = empty prefix cell)
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const selectedEvents = selectedDate ? (eventMap.get(selectedDate) ?? []) : [];

  // Determine header day name from selected date
  const selDateObj = selectedDate ? new Date(selectedDate + "T00:00:00") : null;
  const selDayName = selDateObj ? DAY_NAMES[selDateObj.getDay()] : "";
  const selDay     = selDateObj ? selDateObj.getDate() : "";
  const selMonthName = selDateObj ? MONTH_NAMES[selDateObj.getMonth()] : "";

  const totalTimelinePx = (TIMELINE_END - TIMELINE_START) * SLOT_HEIGHT;

  return (
    <div className="flex flex-col h-fit bg-white rounded-xl overflow-hidden select-none">
      {/* ── Month Header ── */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">
            {MONTH_NAMES[viewMonth]},{" "}
            <span className="font-normal text-gray-600">{selDay} {selDayName}</span>
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
            <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} />;

            const key = toDateKey(viewYear, viewMonth, day);
            const eventsOnDay = eventMap.get(key) ?? [];
            const hasHearing  = eventsOnDay.some(e => e.type === "hearing");
            const hasDeadline = eventsOnDay.some(e => e.type === "deadline");
            const isToday     = key === todayKey;
            const isSelected  = key === selectedDate;
            const hasEvent    = eventsOnDay.length > 0;

            // Dot color priority: both → deadline color for dot; else whichever exists
            const dotColor = hasDeadline ? "bg-[#f0a500]" : "bg-[#2ecc71]";

            // Circle fill
            let circleClass = "";
            if (isSelected && hasHearing)  circleClass = "bg-[#2ecc71] text-white";
            else if (isSelected && hasDeadline) circleClass = "bg-[#f0a500] text-white";
            else if (isSelected) circleClass = "bg-[#135576] text-white";
            else if (isToday && !hasEvent)  circleClass = "border-2 border-[#135576] text-[#135576]";

            return (
              <div
                key={key}
                onClick={() => setSelectedDate(key)}
                className="flex flex-col items-center py-[3px] cursor-pointer group"
              >
                <div
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                    transition-all duration-150
                    ${circleClass || "text-gray-700 group-hover:bg-gray-100"}
                  `}
                >
                  {day}
                </div>
                {/* event dot */}
                {hasEvent && !isSelected && (
                  <div className={`w-1 h-1 rounded-full mt-[2px] ${dotColor}`} />
                )}
                {!hasEvent && <div className="w-1 h-1 mt-[2px]" />}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 mb-1 px-1 py-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#2ecc71]" />
            <span className="text-xs text-gray-600">Hearing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#f0a500]" />
            <span className="text-xs text-gray-600">Deadline</span>
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {selectedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">No events on</p>
            <p className="text-xs text-gray-400">{selMonthName} {selDay}</p>
          </div>
        ) : (
          <div
            className="relative ml-2"
            style={{ height: `${totalTimelinePx}px` }}
          >
            {/* Time labels + grid lines */}
            {TIME_SLOTS.map((slot, i) => {
              const isHour = slot.endsWith(":00");
              const topPx  = ((timeToHours(slot) - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * totalTimelinePx;
              return (
                <div
                  key={slot}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ top: `${topPx}px` }}
                >
                  <span
                    className={`text-[10px] w-12 text-right pr-2 shrink-0 ${
                      isHour ? "text-gray-500 font-medium" : "text-gray-300"
                    }`}
                  >
                    {isHour ? slot : ""}
                  </span>
                  <div
                    className={`flex-1 border-t ${
                      isHour ? "border-gray-200" : "border-gray-100 border-dashed"
                    }`}
                  />
                </div>
              );
            })}

            {/* Event cards */}
            {selectedEvents.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}