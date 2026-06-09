import { Task } from "./types";

// Helper to generate dates relative to today
const getDateStr = (dayOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split("T")[0];
};

// Get the Monday of the current week (offset from today)
const getMondayOffset = (): number => {
  const today = new Date();
  const day = today.getDay();
  // day: 0=Sun, 1=Mon, ..., 6=Sat
  // We want Monday as start: if today is Mon(1), offset=0; Tue(2), offset=-1; Sun(0), offset=-6
  return day === 0 ? -6 : 1 - day;
};

const mondayOffset = getMondayOffset();

export const initialTasks: Task[] = [


  // ========== THIS WEEK'S TASKS (relative to Monday) ==========
  // Monday
  {
    id: "task-m4-1",
    title: "Campaign Creation Review",
    type: "hearing",
    date: getDateStr(mondayOffset), // Monday
    allDay: true,
  },
  {
    id: "task-m4-2",
    title: "Meeting - Project Kickoff",
    type: "deadline",
    date: getDateStr(mondayOffset), // Monday
    startTime: "14:00",
    endTime: "15:00",
    allDay: false,
  },

  // Tuesday
  {
    id: "task-m6-1",
    title: "Meeting - Client Sync",
    type: "deadline",
    date: getDateStr(mondayOffset + 1), // Tuesday
    startTime: "15:00",
    endTime: "16:00",
    allDay: false,
  },
  {
    id: "task-m6-2",
    title: "Meeting - Final Review",
    type: "deadline",
    date: getDateStr(mondayOffset + 1), // Tuesday
    startTime: "18:30",
    endTime: "19:30",
    allDay: false,
  },

  // Wednesday
  {
    id: "task-m8-1",
    title: "Submit Legal Brief",
    type: "hearing",
    date: getDateStr(mondayOffset + 2), // Wednesday
    allDay: true,
  },
  {
    id: "task-m8-2",
    title: "Client Presentation",
    type: "deadline",
    date: getDateStr(mondayOffset + 2), // Wednesday
    startTime: "10:00",
    endTime: "11:30",
    allDay: false,
  },

  // Thursday
  {
    id: "task-m10-1",
    title: "Team Standup",
    type: "hearing",
    date: getDateStr(mondayOffset + 3), // Thursday
    startTime: "09:00",
    endTime: "09:30",
    allDay: false,
  },
  {
    id: "task-m10-2",
    title: "Contract Review",
    type: "deadline",
    date: getDateStr(mondayOffset + 3), // Thursday
    startTime: "14:00",
    endTime: "16:00",
    allDay: false,
  },

  // Friday
  {
    id: "task-m12-1",
    title: "Weekly Report Submission",
    type: "deadline",
    date: getDateStr(mondayOffset + 4), // Friday
    startTime: "16:00",
    endTime: "17:00",
    allDay: false,
  },
  {
    id: "task-m12-2",
    title: "Sprint Retrospective",
    type: "hearing",
    date: getDateStr(mondayOffset + 4), // Friday
    startTime: "11:00",
    endTime: "12:00",
    allDay: false,
  },

  // Saturday
  {
    id: "task-m14-1",
    title: "Personal Development",
    type: "hearing",
    date: getDateStr(mondayOffset + 5), // Saturday
    startTime: "10:00",
    endTime: "11:00",
    allDay: false,
  },

  // Sunday
  {
    id: "task-m16-1",
    title: "Weekly Planning",
    type: "deadline",
    date: getDateStr(mondayOffset + 6), // Sunday
    startTime: "18:00",
    endTime: "19:00",
    allDay: false,
  },

  // ========== NEXT WEEK TASKS ==========
  {
    id: "task-nw-1",
    title: "Quarterly Review Prep",
    type: "deadline",
    date: getDateStr(mondayOffset + 7), // Next Monday
    startTime: "10:00",
    endTime: "12:00",
    allDay: false,
  },
  {
    id: "task-nw-2",
    title: "Strategy Meeting",
    type: "hearing",
    date: getDateStr(mondayOffset + 8), // Next Tuesday
    startTime: "14:00",
    endTime: "15:30",
    allDay: false,
  },
  {
    id: "task-nw-3",
    title: "Budget Review",
    type: "deadline",
    date: getDateStr(mondayOffset + 9), // Next Wednesday
    allDay: true,
  },

  // ========== LAST WEEK TASKS ==========
  {
    id: "task-lw-1",
    title: "Design Review",
    type: "hearing",
    date: getDateStr(mondayOffset - 2), // Last Saturday
    startTime: "09:00",
    endTime: "10:00",
    allDay: false,
  },
  {
    id: "task-lw-2",
    title: "Code Freeze",
    type: "deadline",
    date: getDateStr(mondayOffset - 3), // Last Friday
    allDay: true,
  },
  {
    id: "task-lw-3",
    title: "Sprint Planning",
    type: "hearing",
    date: getDateStr(mondayOffset - 5), // Last Wednesday
    startTime: "10:00",
    endTime: "11:30",
    allDay: false,
  },

];
