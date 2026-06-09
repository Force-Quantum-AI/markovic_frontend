"use client";

import { useState } from "react";
import { toast } from "sonner";
import CalendarToolbar from "@/components/user/calendar/CalendarToolbar";
import MonthView from "@/components/user/calendar/MonthView";
import WeekView from "@/components/user/calendar/WeekView";
import DayView from "@/components/user/calendar/DayView";
import TaskDialog from "@/components/user/calendar/TaskDialog";
import { Task, CalendarView } from "@/components/user/calendar/types";
import { initialTasks } from "@/components/user/calendar/initialTasks";

export default function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeView, setActiveView] = useState<CalendarView>("day");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [dialogInitialDate, setDialogInitialDate] = useState<string>("");

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

  const handleCreateTaskOnDate = (date: Date) => {
    setTaskToEdit(null);
    setDialogInitialDate(date.toISOString().split("T")[0]);
    setIsDialogOpen(true);
  };

  const handleCreateTaskOnDateTime = (date: Date, hour: number) => {
    const startHourStr = hour.toString().padStart(2, "0");
    const endHourStr = (hour + 1).toString().padStart(2, "0");
    
    const taskDraft: Task = {
      id: "",
      title: "",
      type: "hearing",
      date: date.toISOString().split("T")[0],
      startTime: `${startHourStr}:00`,
      endTime: `${endHourStr}:00`,
      allDay: false,
    };
    setTaskToEdit(taskDraft);
    setDialogInitialDate(date.toISOString().split("T")[0]);
    setIsDialogOpen(true);
  };

  const handleSelectTask = (task: Task) => {
    if (!task.id) {
      setTaskToEdit(null);
      setDialogInitialDate(task.date);
    } else {
      setTaskToEdit(task);
    }
    setIsDialogOpen(true);
  };

  const handleSaveTask = (savedTask: Task) => {
    const isEditing = tasks.some((t) => t.id === savedTask.id);
    
    if (isEditing) {
      setTasks(tasks.map((t) => (t.id === savedTask.id ? savedTask : t)));
      toast.success("Task updated successfully!");
    } else {
      setTasks([...tasks, savedTask]);
      toast.success("New task created successfully!");
    }
    setIsDialogOpen(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    toast.success("Task deleted successfully.");
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
            tasks={tasks}
            onSelectDay={handleSelectDate}
            onSelectTask={handleSelectTask}
            onCreateTaskOnDate={handleCreateTaskOnDate}
          />
        )}
        {activeView === "week" && (
          <WeekView
            currentDate={currentDate}
            tasks={tasks}
            onSelectTask={handleSelectTask}
            onCreateTaskOnDateTime={handleCreateTaskOnDateTime}
          />
        )}
        {activeView === "day" && (
          <DayView
            currentDate={currentDate}
            tasks={tasks}
            onSelectTask={handleSelectTask}
            onSelectDate={handleSelectDate}
            onCreateTaskOnHour={(hour) => handleCreateTaskOnDateTime(currentDate, hour)}
          />
        )}
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        taskToEdit={taskToEdit}
        initialDate={dialogInitialDate}
      />
    </div>
  );
}

