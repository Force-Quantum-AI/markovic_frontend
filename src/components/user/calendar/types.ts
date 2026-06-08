export interface Task {
  id: string;
  title: string;
  type: "hearing" | "deadline";
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:MM
  endTime?: string; // HH:MM
  allDay: boolean;
  description?: string;
}

export type CalendarView = "day" | "week" | "month";
