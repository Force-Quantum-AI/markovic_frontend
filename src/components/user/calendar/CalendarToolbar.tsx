"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarView } from "./types";

interface CalendarToolbarProps {
  currentDate: Date;
  onNavigate: (direction: "prev" | "next" | "today") => void;
  onSelectDate: (date: Date) => void;
  activeView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CalendarToolbar({
  currentDate,
  onNavigate,
  onSelectDate,
  activeView,
  onViewChange,
}: CalendarToolbarProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateLong = (date: Date) => {
    const dayName = DAYS_OF_WEEK[date.getDay()];
    const dayNum = date.getDate();
    const monthName = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${dayNum} ${monthName} ${year}`;
  };

  const getMiniCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    const paddingCount = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    for (let i = paddingCount - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        monthOffset: -1,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        monthOffset: 0,
        date: new Date(year, month, i),
      });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        day: i,
        monthOffset: 1,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const handleMiniDayClick = (date: Date) => {
    onSelectDate(date);
    setShowDatePicker(false);
  };

  const miniDays = getMiniCalendarDays();
  const miniWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
      
      {/* Left section: Date text + navigation */}
      <div className="flex items-center flex-wrap gap-2.5">
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer select-none"
          >
            <span>{formatDateLong(currentDate)}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showDatePicker && (
            <div className="absolute left-0 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-3.5 w-68 animate-in fade-in-50 slide-in-from-top-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-800">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <div className="flex gap-0.5">
                  <button
                    onClick={() => onNavigate("prev")}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onNavigate("next")}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {miniWeekdays.map((wd) => (
                  <span key={wd} className="text-[10px] font-semibold text-gray-400 uppercase">
                    {wd}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {miniDays.map((item, idx) => {
                  const isToday = item.date.toDateString() === new Date().toDateString();
                  const isSelected = item.date.toDateString() === currentDate.toDateString();
                  const isCurrentMonth = item.monthOffset === 0;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleMiniDayClick(item.date)}
                      className={`h-7 w-7 text-xs rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#135576] text-white font-bold"
                          : isToday
                          ? "border border-[#135576] text-[#135576] font-semibold"
                          : isCurrentMonth
                          ? "text-gray-800 hover:bg-gray-100"
                          : "text-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex justify-between">
                <button
                  onClick={() => handleMiniDayClick(new Date())}
                  className="text-xs text-[#135576] font-semibold hover:underline cursor-pointer"
                >
                  Jump to Today
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 bg-gray-100/80 p-0.5 rounded-lg border border-gray-200/50">
          <button
            onClick={() => onNavigate("prev")}
            className="p-1.5 hover:bg-white rounded-md text-gray-600 hover:text-gray-900 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate("today")}
            className="px-3 py-1 hover:bg-white rounded-md text-xs font-semibold text-gray-700 hover:text-gray-900 transition-all cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="p-1.5 hover:bg-white rounded-md text-gray-600 hover:text-gray-900 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle section: Legend */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200/50">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#268808]" />
          <span>Hearing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#BA8800]" />
          <span>Deadline</span>
        </div>
      </div>

      {/* Right section: Switcher controls */}
      <div className="flex items-center self-end md:self-auto bg-[#EFF1F4] p-1 rounded-lg border border-gray-200/30">
        {(["day", "week", "month"] as CalendarView[]).map((v) => {
          const isActive = activeView === v;
          return (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/30"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>

    </div>
  );
}
