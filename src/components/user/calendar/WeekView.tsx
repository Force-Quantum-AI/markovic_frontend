"use client";

import React, { useRef, useEffect } from "react";
import { Task } from "./types";

interface WeekViewProps {
  currentDate: Date;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onCreateTaskOnDateTime: (date: Date, hour: number) => void;
}

const DAYS_OF_WEEK_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOUR_HEIGHT = 72; // px per hour

export default function WeekView({
  currentDate,
  tasks,
  onSelectTask,
  onCreateTaskOnDateTime,
}: WeekViewProps) {
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

  const getTasksForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return tasks.filter((task) => {
      if (task.date !== dateStr) return false;
      if (task.allDay) return true;
      if (!task.startTime) return false;
      const [startH] = task.startTime.split(":").map(Number);
      return startH >= 8 && startH <= 20;
    });
  };

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
      
      {/* Week Header Row */}
      <div className="flex border-b border-gray-100 bg-gray-50/50 pr-4">
        <div className="w-20 md:w-24 shrink-0 border-r border-gray-100" />
        <div className="grid grid-cols-7 flex-grow divide-x divide-gray-100">
          {weekDays.map((day, idx) => {
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div
                key={idx}
                className="py-3 text-center flex flex-col items-center justify-center"
              >
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {DAYS_OF_WEEK_SHORT[idx]}
                </span>
                <span
                  className={`mt-1 text-sm md:text-base font-bold flex items-center justify-center h-8 w-8 rounded-full ${
                    isToday
                      ? "bg-[#135576] text-white"
                      : "text-gray-800"
                  }`}
                >
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* All-Day Tasks Panel */}
      <div className="flex border-b border-gray-200 bg-gray-50/30">
        <div className="w-20 md:w-24 shrink-0 border-r border-gray-100 flex items-center justify-center">
          <span className="text-[9px] font-bold text-gray-400 uppercase">All Day</span>
        </div>
        <div className="grid grid-cols-7 flex-grow divide-x divide-gray-100 p-1 min-h-[44px]">
          {weekDays.map((day, idx) => {
            const allDayTasks = getTasksForDay(day).filter((t) => t.allDay);
            return (
              <div key={idx} className="flex flex-col gap-1.5 px-1 py-1">
                {allDayTasks.map((task) => {
                  const isHearing = task.type === "hearing";
                  return (
                    <button
                      key={task.id}
                      onClick={() => onSelectTask(task)}
                      style={{
                        borderRadius: "8px",
                        background: isHearing ? "#268808" : "#BA8800",
                      }}
                      className="text-left text-[10px] font-semibold p-1 text-white truncate cursor-pointer block border-none"
                    >
                      {task.title}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable Hours Grid */}
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto no-scrollbar relative flex"
      >
        <div className="relative w-full" style={{ height: `${containerHeight}px` }}>
          
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
            <div className="w-20 md:w-24 shrink-0 select-none z-10 border-r border-[#F3F4F6]">
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
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase leading-none mt-0.5">{ampm}</span>
                  </div>
                );
              })}
            </div>

            {/* Event Columns Grid (overlayed on top of grid lines) */}
            <div className="grid grid-cols-7 flex-grow divide-x divide-gray-100 relative z-10 h-full">
              {weekDays.map((day, dayIdx) => {
                const dayTasks = getTasksForDay(day).filter((t) => !t.allDay);

                return (
                  <div
                    key={dayIdx}
                    className="relative h-full hover:bg-gray-50/10 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickY = e.clientY - rect.top;
                      const clickedHour = Math.floor(clickY / HOUR_HEIGHT) + 8; // Offset by start hour (8)
                      onCreateTaskOnDateTime(day, clickedHour);
                    }}
                  >
                    {dayTasks.map((task) => {
                      const { top, height } = getTaskPosition(task);
                      const isHearing = task.type === "hearing";
                      
                      const cardTop = top + 6;
                      const cardHeight = height - 12;

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
                            left: "2px",
                            right: "2px",
                            borderRadius: "8px",
                            background: isHearing ? "#268808" : "#BA8800",
                          }}
                          className="text-left text-white text-[10px] md:text-xs font-semibold flex flex-col justify-start gap-1 overflow-hidden shadow-xs hover:brightness-95 hover:scale-[1.01] transition-all cursor-pointer border-none p-3"
                        >
                          <span className="font-bold truncate leading-none w-full">
                            {task.title}
                          </span>
                          <span className="text-[9px] opacity-90 truncate leading-none mt-1 w-full">
                            {formatTime12h(task.startTime)} - {formatTime12h(task.endTime)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
