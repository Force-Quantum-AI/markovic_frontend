export type NotificationType =
  | "admin_broadcast"
  | "case_created"
  | "case_updated"
  | "hearing_reminder"
  | "deadline_reminder"
  | string; // open for future types

export interface NotificationItem {
  id: number;
  notification_type: NotificationType;
  title: string;
  body: string;
  image: string | null;
  data: Record<string, string>;
  is_read: boolean;
  sender_name?: string;
  sender_image: string | null;
  created_at: string;
}

export interface NotificationsResponse {
  unread_count: number;
  results: NotificationItem[];
}