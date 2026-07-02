"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AdminButton from "@/components/shared/AdminButton";
import {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} from "@/store/features/admin/system-settings/system-settings.api";
import { PlatformSettingsResponse } from "@/store/features/admin/system-settings/system-settings.type";
import { SystemSettingsSkeleton } from "@/components/admin/admin-skeletons";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = ({ checked, onChange, disabled }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
        checked ? "bg-[#135576]" : "bg-[#E5E7EB]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-[20px]" : "translate-x-0"
        }`}
      />
    </button>
  );
};

function SystemSettingsForm({ settingsData }: { settingsData: PlatformSettingsResponse }) {
  const [updateSystemSettings, { isLoading: isUpdatingSettings }] =
    useUpdateSystemSettingsMutation();

  const [platformName, setPlatformName] = useState(settingsData.platform?.platform_name || "");
  const [supportEmail, setSupportEmail] = useState(settingsData.platform?.support_email || "");
  const [timeZone, setTimeZone] = useState(settingsData.platform?.timezone || "");

  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState(
    !!settingsData.notification_preferences?.email_notifications
  );
  const [systemAlerts, setSystemAlerts] = useState(
    !!settingsData.notification_preferences?.system_alerts
  );

  const handleSave = async () => {
    try {
      await updateSystemSettings({
        platform: {
          platform_name: platformName,
          support_email: supportEmail,
          timezone: timeZone,
          updated_at: settingsData.platform?.updated_at || new Date().toISOString(),
        },
        notification_preferences: {
          email_notifications: emailNotifications,
          system_alerts: systemAlerts,
          updated_at:
            settingsData.notification_preferences?.updated_at ||
            new Date().toISOString(),
        },
      }).unwrap();
      toast.success("System settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update system settings.");
    }
  };

  const handleCancel = () => {
    setPlatformName(settingsData.platform?.platform_name || "");
    setSupportEmail(settingsData.platform?.support_email || "");
    setTimeZone(settingsData.platform?.timezone || "");
    setEmailNotifications(
      !!settingsData.notification_preferences?.email_notifications
    );
    setSystemAlerts(
      !!settingsData.notification_preferences?.system_alerts
    );
    toast.info("Changes discarded.");
  };

  return (
    <div className="w-full max-w-[894px] mx-auto space-y-6 pb-12 font-roboto px-4">
      {/* Title */}
      <h1 className="text-[#101828] font-roboto text-[24px] font-semibold leading-[32px] text-center pt-2">
        System Settings
      </h1>

      {/* 1. General Settings Card */}
      <div className="flex flex-col items-start align-stretch p-8 rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),_0_1px_2px_-1px_rgba(0,0,0,0.1)] w-full gap-6">
        <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[28px]">
          General Settings
        </h2>

        {/* Platform Name */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[#101828] font-roboto text-[14px] font-medium leading-[20px]">
            Platform Name
          </label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            disabled={isUpdatingSettings}
            placeholder="Platform Name"
            className="w-full max-w-[830px] h-[46px] px-4 rounded-[14px] border border-[#E5E7EB] text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]/50 transition-all bg-white disabled:opacity-50"
          />
        </div>

        {/* Support Email */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[#101828] font-roboto text-[14px] font-medium leading-[20px]">
            Support Email
          </label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            disabled={isUpdatingSettings}
            placeholder="Support Email"
            className="w-full max-w-[830px] h-[46px] px-4 rounded-[14px] border border-[#E5E7EB] text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]/50 transition-all bg-white disabled:opacity-50"
          />
        </div>

        {/* Time Zone */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[#101828] font-roboto text-[14px] font-medium leading-[20px]">
            Time Zone
          </label>
          <input
            type="text"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            disabled={isUpdatingSettings}
            placeholder="Select time zone"
            className="w-full max-w-[830px] h-[46px] px-4 rounded-[14px] border border-[#E5E7EB] text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]/50 transition-all bg-white disabled:opacity-50"
          />
        </div>
      </div>

      {/* 2. Notification Preferences Card */}
      <div className="flex flex-col items-start p-8 rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),_0_1px_2px_-1px_rgba(0,0,0,0.1)] w-full gap-6">
        <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[28px]">
          Notification Preferences
        </h2>

        {/* Email Notifications */}
        <div className="w-full max-w-[830px] flex items-center justify-between p-5 rounded-[16px] bg-[#F9FAFB] border border-gray-100 hover:bg-[#F9FAFB]/80 transition-colors">
          <div className="flex flex-col">
            <span className="text-[#101828] font-roboto text-[14px] font-semibold leading-[20px]">
              Email Notifications
            </span>
            <span className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5">
              Receive updates via email
            </span>
          </div>
          <ToggleSwitch
            checked={emailNotifications}
            onChange={setEmailNotifications}
            disabled={isUpdatingSettings}
          />
        </div>

        {/* System Alerts */}
        <div className="w-full max-w-[830px] flex items-center justify-between p-5 rounded-[16px] bg-[#F9FAFB] border border-gray-100 hover:bg-[#F9FAFB]/80 transition-colors">
          <div className="flex flex-col">
            <span className="text-[#101828] font-roboto text-[14px] font-semibold leading-[20px]">
              System Alerts
            </span>
            <span className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5">
              Important platform notifications
            </span>
          </div>
          <ToggleSwitch
            checked={systemAlerts}
            onChange={setSystemAlerts}
            disabled={isUpdatingSettings}
          />
        </div>

        {/* Actions Button Group */}
        <div className="flex items-center gap-3 mt-2 shrink-0">
          <AdminButton
            label={isUpdatingSettings ? "Saving..." : "Save Changes"}
            icon={
              isUpdatingSettings ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )
            }
            onClick={handleSave}
            disabled={isUpdatingSettings}
            className="!rounded-[12px] h-[46px] px-6 font-medium font-roboto text-[14px] shadow-none cursor-pointer"
          />
          <AdminButton
            label="Cancel"
            variant="secondary"
            onClick={handleCancel}
            disabled={isUpdatingSettings}
            className="!rounded-[12px] h-[46px] px-6 font-medium font-roboto text-[14px] shadow-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default function SystemSettingsPage() {
  const {
    data: settingsData,
    isLoading: isSettingsLoading,
    isError: isSettingsError,
  } = useGetSystemSettingsQuery();

  if (isSettingsLoading) {
    return <SystemSettingsSkeleton />;
  }

  if (isSettingsError || !settingsData) {
    return (
      <div className="w-full max-w-[894px] mx-auto min-h-[400px] flex flex-col items-center justify-center font-roboto">
        <p className="text-red-500 text-[16px] font-medium">Failed to load system settings.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#135576] text-white rounded-[12px] font-medium text-[14px]"
        >
          Retry
        </button>
      </div>
    );
  }

  const key = `${settingsData.platform?.updated_at || ""}-${
    settingsData.notification_preferences?.updated_at || ""
  }`;

  return <SystemSettingsForm key={key} settingsData={settingsData} />;
}


