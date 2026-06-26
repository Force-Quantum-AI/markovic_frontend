"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import CalendarToolbar from "@/components/user/calendar/CalendarToolbar";
import MonthView from "@/components/user/calendar/MonthView";
import WeekView from "@/components/user/calendar/WeekView";
import DayView from "@/components/user/calendar/DayView";
import { Task, CalendarView } from "@/components/user/calendar/types";
import { useGetCaseCalenderEventsQuery } from "@/store/features/calendar/calendar.api";
import CaseDetailsDialog from "@/components/user/calendar/CaseDetailsDialog";

export default function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<CalendarView>("day");
  
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isCaseDetailsOpen, setIsCaseDetailsOpen] = useState(false);

  const { data: apiEvents } = useGetCaseCalenderEventsQuery();

  const convertBackendDate = (dateStr: string): string => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  };

  const convert12hTo24h = (time12h: string): string => {
    const cleanTime = time12h.trim().toUpperCase();
    const isPM = cleanTime.endsWith("PM");
    const isAM = cleanTime.endsWith("AM");
    const timeOnly = cleanTime.replace(/(AM|PM)/g, "").trim();
    const [hoursStr, minutesStr] = timeOnly.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr ? minutesStr.padStart(2, "0") : "00";
    
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (isAM && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const parseBackendTimeRange = (timeRangeStr: string): { startTime?: string; endTime?: string } => {
    const parts = timeRangeStr.split("-");
    if (parts.length === 2) {
      return {
        startTime: convert12hTo24h(parts[0]),
        endTime: convert12hTo24h(parts[1]),
      };
    }
    return {};
  };

  const apiTasks = useMemo(() => {
    if (!apiEvents) return [];

    const mappedHearings = (apiEvents.hearings || []).map((h: any, idx: number) => {
      const dateFormatted = convertBackendDate(h.date);
      const times = parseBackendTimeRange(h.time);
      const caseId = h.id || h.case_id || null;
      return {
        id: caseId || `hearing-${idx}`,
        title: h.name,
        type: "hearing" as const,
        date: dateFormatted,
        startTime: times.startTime,
        endTime: times.endTime,
        allDay: !times.startTime,
        isApiEvent: true,
        caseId: caseId,
      };
    });

    const mappedDeadlines = (apiEvents.deadlines || []).map((d: any, idx: number) => {
      const dateFormatted = convertBackendDate(d.date);
      const times = parseBackendTimeRange(d.time);
      const caseId = d.id || d.case_id || null;
      return {
        id: caseId || `deadline-${idx}`,
        title: d.name,
        type: "deadline" as const,
        date: dateFormatted,
        startTime: times.startTime,
        endTime: times.endTime,
        allDay: !times.startTime,
        isApiEvent: true,
        caseId: caseId,
      };
    });

    return [...mappedHearings, ...mappedDeadlines];
  }, [apiEvents]);

  const handleNavigate = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setCurrentDate(new Date());
      toast.info("Navigated to Today");
      return;
    }

    const nextDate = new Date(currentDate);
    if (activeView === "day") {
      nextDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (activeView === "week") {
      nextDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else if (activeView === "month") {
      nextDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(nextDate);
  };

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectTask = (task: Task) => {
    setSelectedCaseId(task.caseId || task.id);
    setIsCaseDetailsOpen(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 md:p-6">
        <div className="space-y-0.5">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-900 tracking-tight">
            Manage Tasks
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Create and control everyday life tasks
          </p>
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="px-4 md:px-6 pb-4">
        <CalendarToolbar
          currentDate={currentDate}
          onNavigate={handleNavigate}
          onSelectDate={handleSelectDate}
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>

      {/* Calendar View */}
      <div className="w-full px-4 md:px-6 pb-4">
        {activeView === "month" && (
          <MonthView
            currentDate={currentDate}
            tasks={apiTasks}
            onSelectDay={handleSelectDate}
            onSelectTask={handleSelectTask}
            onCreateTaskOnDate={() => {}}
          />
        )}
        {activeView === "week" && (
          <WeekView
            currentDate={currentDate}
            tasks={apiTasks}
            onSelectTask={handleSelectTask}
            onSelectDate={handleSelectDate}
            onCreateTaskOnDateTime={() => {}}
          />
        )}
        {activeView === "day" && (
          <DayView
            currentDate={currentDate}
            tasks={apiTasks}
            onSelectTask={handleSelectTask}
            onSelectDate={handleSelectDate}
            onCreateTaskOnHour={() => {}}
          />
        )}
      </div>

      <CaseDetailsDialog
        isOpen={isCaseDetailsOpen}
        onClose={() => {
          setIsCaseDetailsOpen(false);
          setSelectedCaseId(null);
        }}
        caseId={selectedCaseId}
      />
    </div>
  );
}

