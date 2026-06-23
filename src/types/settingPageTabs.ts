import { ReactNode } from "react";

export interface Tab{
    value: string;
    label: string;
    icon: ReactNode;
}

export interface ActiveSession {
  id: number;
  device_info: string;
  ip_address: string;
  created_at: string;
  last_active: string;
}

export interface NotificationSettings{
  notif_hearing_reminders: boolean;
  notif_case_deadlines: boolean;
  notif_law_updates: boolean;
  notif_system_announcements: boolean;
}

export interface CaseNote {
  id: number;
  title: string;
  content: string;
  created_by: string;
  created_by_name: string;
  created_by_email: string;
  created_by_role: string;
  created_at: string;
  updated_at: string;
}
    