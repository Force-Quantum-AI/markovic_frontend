export type PlatformSettingsResponse = {
  platform: {
    platform_name: string;
    support_email: string;
    timezone: string;
    updated_at: string;
  };
  notification_preferences: {
    email_notifications: boolean;
    system_alerts: boolean;
    updated_at: string;
  };
};