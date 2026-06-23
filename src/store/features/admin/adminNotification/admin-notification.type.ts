// get notification type data 
export type NotificationType =
  | "case_created"
  | "case_closed"
  | "hearing_created"
  | "hearing_updated"
  | "deadline_created"
  | "lawyer_assigned"
  | "admin_broadcast";

export type NotificationData = {
  case_id?: string;
  case_number?: string;
  hearing_id?: string;
  deadline_id?: string;
  date?: string;
  type?: string;
};

export type Notification = {
  id: number;
  notification_type: NotificationType;
  title: string;
  body: string;
  image: string | null;
  data: NotificationData;
  is_read: boolean;
  sender_image: string | null;
  sender_name?: string | null;
  created_at: string;
};

export type AdminNotificationsResponse = Notification[];