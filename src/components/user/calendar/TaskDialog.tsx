"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Task } from "./types";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  taskToEdit?: Task | null;
  initialDate?: string;
}

export default function TaskDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  taskToEdit,
  initialDate,
}: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"hearing" | "deadline">("hearing");
  const [date, setDate] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");

  // Track the previous isOpen and task ID to reset state during rendering
  const [prevIsOpen, setPrevIsOpen] = useState(false);
  const [prevTaskId, setPrevTaskId] = useState<string | undefined>(undefined);

  const currentTaskId = taskToEdit?.id;

  if (isOpen !== prevIsOpen || currentTaskId !== prevTaskId) {
    setPrevIsOpen(isOpen);
    setPrevTaskId(currentTaskId);

    if (isOpen) {
      if (taskToEdit && taskToEdit.id) {
        setTitle(taskToEdit.title);
        setType(taskToEdit.type);
        setDate(taskToEdit.date);
        setAllDay(taskToEdit.allDay);
        setStartTime(taskToEdit.startTime || "09:00");
        setEndTime(taskToEdit.endTime || "10:00");
        setDescription(taskToEdit.description || "");
      } else {
        setTitle("");
        setType("hearing");
        setDate(initialDate || new Date().toISOString().split("T")[0]);
        setAllDay(taskToEdit?.allDay || false);
        setStartTime(taskToEdit?.startTime || "09:00");
        setEndTime(taskToEdit?.endTime || "10:00");
        setDescription("");
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData: Task = {
      id: taskToEdit && taskToEdit.id ? taskToEdit.id : Math.random().toString(36).substring(2, 9),
      title: title.trim(),
      type,
      date,
      allDay,
      description: description.trim(),
    };

    if (!allDay) {
      taskData.startTime = startTime;
      taskData.endTime = endTime;
    }

    onSave(taskData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-gray-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {taskToEdit && taskToEdit.id ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="task-title" className="text-gray-700 text-xs">Title</Label>
            <Input
              id="task-title"
              placeholder="e.g. Prepare Report or Campaign Review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm py-2 h-10 border-gray-200 focus:border-[#135576]"
              required
              autoFocus
            />
          </div>

          <div className="space-y-1">
            <Label className="text-gray-700 text-xs">Task Category</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("hearing")}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all cursor-pointer ${
                  type === "hearing"
                    ? "border-[#1E7E34] bg-green-50/50 text-[#1E7E34] font-medium"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#1E7E34]" />
                Hearing
              </button>
              <button
                type="button"
                onClick={() => setType("deadline")}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all cursor-pointer ${
                  type === "deadline"
                    ? "border-[#A87200] bg-yellow-50/30 text-[#A87200] font-medium"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#B27A01]" />
                Deadline
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="task-date" className="text-gray-700 text-xs">Date</Label>
            <input
              id="task-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm p-2 h-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#135576] transition-colors"
              required
            />
          </div>

          <div className="flex items-center space-x-2 py-1">
            <Checkbox
              id="task-allday"
              checked={allDay}
              onCheckedChange={(checked) => setAllDay(!!checked)}
            />
            <Label
              htmlFor="task-allday"
              className="text-sm text-gray-700 font-medium cursor-pointer"
            >
              All day task
            </Label>
          </div>

          {!allDay && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="task-starttime" className="text-gray-700 text-xs">Start Time</Label>
                <input
                  id="task-starttime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full text-sm p-2 h-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#135576] transition-colors"
                  required={!allDay}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="task-endtime" className="text-gray-700 text-xs">End Time</Label>
                <input
                  id="task-endtime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full text-sm p-2 h-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#135576] transition-colors"
                  required={!allDay}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="task-description" className="text-gray-700 text-xs">Description (Optional)</Label>
            <textarea
              id="task-description"
              placeholder="Add details, links, or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm p-2.5 min-h-[80px] rounded-lg border border-gray-200 focus:outline-none focus:border-[#135576] transition-colors resize-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 -mx-4 px-4 -mb-2">
            {taskToEdit && taskToEdit.id && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(taskToEdit.id);
                  onClose();
                }}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-full text-xs h-9 cursor-pointer border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full text-xs h-9 bg-[#135576] hover:bg-[#0a3850] text-white px-5 cursor-pointer"
              >
                Save Task
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
