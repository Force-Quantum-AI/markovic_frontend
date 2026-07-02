"use client";

import { useRef, useEffect } from "react";
import { Task } from "./types";

interface DayViewProps {
  currentDate: Date;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onSelectDate: (date: Date) => void;
  onCreateTaskOnHour: (hour: number) => void;
}

const DAYS_OF_WEEK_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOUR_HEIGHT = 72; // px per hour

export default function DayView({
  currentDate,
  tasks,
  onSelectTask,
  onSelectDate,
  onCreateTaskOnHour,
}: DayViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, []);

  const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const monday = getMonday(currentDate);
  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    weekDays.push(day);
  }

  const dateStr = currentDate.toISOString().split("T")[0];
  const dayTasks = tasks.filter((t) => t.date === dateStr);
  const timedTasks = dayTasks.filter((t) => {
    if (t.allDay || !t.startTime) return false;
    const [startH] = t.startTime.split(":").map(Number);
    return startH >= 8 && startH <= 20;
  });
  const allDayTasks = dayTasks.filter((t) => t.allDay);

  const formatTime12h = (time24?: string) => {
    if (!time24) return "";
    const [hoursStr, minutesStr] = time24.split(":");
    const hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutesStr} ${ampm}`;
  };

  const getTaskPosition = (task: Task) => {
    if (!task.startTime) return { top: 0, height: HOUR_HEIGHT };
    const [startH, startM] = task.startTime.split(":").map(Number);
    const [endH, endM] = (task.endTime || "10:00").split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const duration = Math.max(30, endMinutes - startMinutes);

    // Shift start minutes relative to 8:00 AM (480 minutes)
    const relativeStartMinutes = Math.max(0, startMinutes - 8 * 60);
    const top = (relativeStartMinutes / 60) * HOUR_HEIGHT;
    const height = (duration / 60) * HOUR_HEIGHT;

    return { top, height };
  };

  // 8:00 AM to 8:00 PM (13 slots inclusive)
  const hours = Array.from({ length: 13 }, (_, i) => i + 8);

  const containerHeight = hours.length * HOUR_HEIGHT;
  const gridLines = hours;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-[750px]">
      {/* Week Navigation Selector Bar */}
      <div className="flex items-center border-b border-gray-100 shrink-0">
        {/* Spacer matching time column width */}
        <div className="w-20 md:w-24 shrink-0 border-r border-[#F3F4F6]" />
        {/* Day names aligned with event grid */}
        <div className="flex-grow flex justify-center items-center py-3 px-4 md:px-8">
          {weekDays.map((day, idx) => {
            const isActive = day.toDateString() === currentDate.toDateString();
            if (!isActive) return null;
            const dayName = DAYS_OF_WEEK_SHORT[idx];

            return (
              <button
                key={idx}
                onClick={() => onSelectDate(day)}
                style={{
                  borderRadius: "96px",
                  background: "#515A6B",
                }}
                className="text-xs md:text-sm font-bold tracking-wide transition-all cursor-pointer text-white px-8 py-2 shadow-xs scale-105"
              >
                {dayName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Timeline Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto no-scrollbar relative flex border-b border-gray-200"
      >
        <div
          className="relative w-full"
          style={{ height: `${containerHeight}px` }}
        >
          {/* Horizontal Grid lines going all the way from left to right */}
          <div className="absolute inset-0 pointer-events-none flex flex-col">
            {gridLines.map((hour) => (
              <div
                key={hour}
                style={{
                  height: HOUR_HEIGHT,
                  borderBottom: "1px solid #F3F4F6",
                }}
                className="w-full shrink-0"
              />
            ))}
          </div>

          {/* Grid columns layer */}
          <div className="flex h-full w-full relative">
            {/* Time Column (overlayed on top of grid lines) */}
            <div className="w-14 sm:w-20 md:w-24 shrink-0 select-none z-10 border-r border-[#F3F4F6]">
              {hours.map((hour) => {
                const displayHour = hour % 12 || 12;
                const ampm = hour >= 12 ? "PM" : "AM";
                return (
                  <div
                    key={hour}
                    style={{
                      height: HOUR_HEIGHT,
                      color: "#6A7282",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <span>{displayHour}:00</span>
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase leading-none mt-0.5">
                      {ampm}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Event Grid Column (overlayed on top of grid lines) */}
            <div
              className="flex-grow relative h-full z-10"
            >
              {timedTasks.map((task) => {
                const { top, height } = getTaskPosition(task);
                const isHearing = task.type === "hearing";

                const cardTop = top;
                const cardHeight = height;

                return (
                  <div
                    key={task.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTask(task);
                    }}
                    style={{
                      position: "absolute",
                      top: `${cardTop}px`,
                      height: `${cardHeight}px`,
                      minHeight: "44px",
                      left: "4px",
                      right: "4px",
                      borderRadius: "8px",
                      background: isHearing ? "#268808" : "#BA8800",
                    }}
                    className="text-left text-white font-semibold flex flex-col justify-start gap-1 overflow-hidden shadow-sm border-none hover:shadow-md hover:brightness-105 transition-all duration-300 ease-in-out cursor-pointer p-1.5 md:p-3"
                  >
                    <div className="flex flex-col gap-0.5 w-full">
                      <span className="text-xs md:text-sm font-bold truncate leading-none">
                        {task.title}
                      </span>
                      <span className="text-[10px] md:text-xs opacity-90 font-medium leading-none mt-1">
                        {formatTime12h(task.startTime)} -{" "}
                        {formatTime12h(task.endTime)}
                      </span>
                    </div>
                    {task.description && (
                      <span className="text-[10px] md:text-xs truncate opacity-80 font-normal mt-1 w-full">
                        {task.description}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* All Day Tasks Bottom Bar */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">
          All Day Tasks
        </h3>
        <div className="flex flex-wrap gap-2 px-1 min-h-[40px]">
          {allDayTasks.length > 0 ? (
            allDayTasks.map((task) => {
              const isSpecificGrayTask =
                task.title === "Organize and Facilitate Meetings" ||
                task.title === "Conduct Legal Research";

              const isHearing = task.type === "hearing";

              const bg = isSpecificGrayTask
                ? "#EFF1F4"
                : isHearing
                  ? "#268808"
                  : "#BA8800";

              const textColor = isSpecificGrayTask ? "#475569" : "#FFFFFF";

              return (
                <button
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  style={{
                    borderRadius: "8px",
                    background: bg,
                    color: textColor,
                  }}
                  className={`px-4 py-1.5 text-xs font-semibold shadow-xs hover:shadow-md hover:brightness-105 transition-all duration-300 ease-in-out cursor-pointer border ${
                    isSpecificGrayTask ? "border-gray-200 hover:bg-gray-100" : "border-none"
                  }`}
                >
                  {task.title}
                </button>
              );
            })
          ) : (
            <span className="text-xs text-gray-400 italic py-1">
              No all-day tasks scheduled
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
