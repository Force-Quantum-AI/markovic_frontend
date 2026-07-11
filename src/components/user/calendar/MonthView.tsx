"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Task } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MonthViewProps {
  currentDate: Date;
  tasks: Task[];
  onSelectDay: (date: Date) => void;
  onSelectTask: (task: Task) => void;
  onCreateTaskOnDate: (date: Date) => void;
}

const DAYS_OF_WEEK_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MonthView({
  currentDate,
  tasks,
  onSelectTask,
  onCreateTaskOnDate,
}: MonthViewProps) {
  const { t } = useTranslation("userCalendar");
  const [selectedDayTasks, setSelectedDayTasks] = useState<{
    date: Date;
    tasks: Task[];
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  const paddingDaysCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const days = [];

  const prevMonthLimit = new Date(year, month, 0).getDate();
  for (let i = paddingDaysCount - 1; i >= 0; i--) {
    const d = prevMonthLimit - i;
    days.push({
      dayNumber: d,
      date: new Date(year, month - 1, d),
      isCurrentMonth: false,
    });
  }

  const currentMonthLimit = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthLimit; i++) {
    days.push({
      dayNumber: i,
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const totalNeeded = paddingDaysCount + currentMonthLimit;
  const cellsCount = totalNeeded <= 35 ? 35 : 42;
  const remainingCells = cellsCount - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      dayNumber: i,
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const getTasksForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return tasks
      .filter((task) => task.date === dateStr)
      .sort((a, b) => {
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        return 0;
      });
  };

  const formatTime12h = (time24?: string) => {
    if (!time24) return "";
    const [hoursStr] = time24.split(":");
    const hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    return `${displayHours}${ampm}`;
  };

  return (
    <div className="bg-transparent border-none shadow-none">
      <div className="grid grid-cols-7 gap-1 sm:gap-3 bg-transparent mb-2">
        {DAYS_OF_WEEK_SHORT.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-[10px] sm:text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-3">
        {days.map((item, index) => {
          const isSelectedMonth = item.isCurrentMonth;
          const dayTasks = isSelectedMonth ? getTasksForDay(item.date) : [];
          const isToday =
            item.date.toDateString() === new Date().toDateString();
          const displayTasks = dayTasks.slice(0, 1);
          const remainingCount = dayTasks.length > 1 ? dayTasks.length - 1 : 0;

          return (
            <div
              key={index}
              className={`min-h-[70px] sm:min-h-[110px] md:min-h-[135px] flex flex-col p-1 sm:p-2.5 transition-all relative ${
                !isSelectedMonth
                  ? "bg-transparent border border-transparent text-gray-300"
                  : "bg-white border border-gray-100 rounded-2xl shadow-[0_1.5px_4px_rgba(0,0,0,0.02)] text-gray-700 hover:shadow-xs hover:border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1 px-0.5">
                <span
                  className={`text-[10px] sm:text-xs md:text-sm font-semibold flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full transition-all ${
                    isToday
                      ? "bg-[#135576] text-white"
                      : isSelectedMonth
                        ? "text-gray-800"
                        : "text-gray-400"
                  }`}
                >
                  {item.dayNumber}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto no-scrollbar py-0.5">
                {displayTasks.map((task) => {
                  const isHearing = task.type === "hearing";
                  return (
                    <button
                      key={task.id}
                      onClick={() => onSelectTask(task)}
                      style={{
                        borderRadius: "8px",
                        background: isHearing ? "#268808" : "#BA8800",
                      }}
                      className="task-pill w-full text-left text-[8px] sm:text-[10px] md:text-xs font-semibold px-1 py-0.5 sm:px-2.5 sm:py-1 text-white truncate hover:shadow-md hover:brightness-105 transition-all duration-300 ease-in-out cursor-pointer block border-none"
                    >
                      {task.allDay
                        ? task.title
                        : `${formatTime12h(task.startTime)} - ${task.title}`}
                    </button>
                  );
                })}

                {remainingCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDayTasks({ date: item.date, tasks: dayTasks });
                    }}
                    className="more-link text-left text-[8px] sm:text-[10px] md:text-xs font-bold text-black hover:text-gray-700 px-1 py-0.5 mt-0.5 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    {t("more", { count: remainingCount })}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDayTasks && (
        <Dialog
          open={!!selectedDayTasks}
          onOpenChange={(open) => !open && setSelectedDayTasks(null)}
        >
          <DialogContent className="sm:max-w-sm border-gray-100 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold text-gray-800">
                {t("tasks_for", { date: selectedDayTasks.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }) })}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2 py-3">
              {selectedDayTasks.tasks.map((task) => {
                const isHearing = task.type === "hearing";
                return (
                  <button
                    key={task.id}
                    onClick={() => {
                      onSelectTask(task);
                      setSelectedDayTasks(null);
                    }}
                    style={{
                      borderRadius: "8px",
                      background: isHearing ? "#268808" : "#BA8800",
                    }}
                    className="text-left p-2.5 text-white font-semibold hover:shadow-md hover:brightness-105 transition-all duration-300 ease-in-out cursor-pointer flex justify-between items-center border-none"
                  >
                    <span className="truncate text-xs md:text-sm">
                      {task.title}
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md font-medium shrink-0">
                      {task.allDay
                        ? t("all_day")
                        : `${formatTime12h(task.startTime)} - ${formatTime12h(task.endTime)}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <Button
                onClick={() => {
                  onCreateTaskOnDate(selectedDayTasks.date);
                  setSelectedDayTasks(null);
                }}
                className="w-full text-xs h-9 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full gap-1 flex items-center justify-center cursor-pointer border border-gray-200"
              >
                <Plus className="w-4 h-4" /> {t("add_task")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
