"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import AdminButton from "@/components/shared/AdminButton";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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

export default function SystemSettingsPage() {
  // General Settings State
  const [platformName, setPlatformName] = useState("LexFile Super Admin");
  const [supportEmail, setSupportEmail] = useState("support@lexfile.me");
  const [timeZone, setTimeZone] = useState("GMT+6 (Bangladesh Standard Time)");

  // Security Settings State
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);

  const handleSave = () => {
    toast.success("System settings updated successfully!");
  };

  const handleCancel = () => {
    // Reset to defaults or show info toast
    setPlatformName("LexFile Super Admin");
    setSupportEmail("support@lexfile.me");
    setTimeZone("GMT+6 (Bangladesh Standard Time)");
    setTwoFactor(true);
    setSessionTimeout(true);
    setEmailNotifications(true);
    setSystemAlerts(true);
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
            placeholder="Platform Name"
            className="w-full max-w-[830px] h-[46px] px-4 rounded-[14px] border border-[#E5E7EB] text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]/50 transition-all bg-white"
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
            placeholder="Support Email"
            className="w-full max-w-[830px] h-[46px] px-4 rounded-[14px] border border-[#E5E7EB] text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]/50 transition-all bg-white"
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
            placeholder="Select time zone"
            className="w-full max-w-[830px] h-[46px] px-4 rounded-[14px] border border-[#E5E7EB] text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]/50 transition-all bg-white"
          />
        </div>
      </div>

      {/* 2. Security Settings Card */}
      <div className="flex flex-col items-start p-8 rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),_0_1px_2px_-1px_rgba(0,0,0,0.1)] w-full gap-6">
        <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[28px]">
          Security Settings
        </h2>

        {/* Two-Factor Authentication */}
        <div className="w-full max-w-[830px] flex items-center justify-between p-5 rounded-[16px] bg-[#F9FAFB] border border-gray-100 hover:bg-[#F9FAFB]/80 transition-colors">
          <div className="flex flex-col">
            <span className="text-[#101828] font-roboto text-[14px] font-semibold leading-[20px]">
              Two-Factor Authentication
            </span>
            <span className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5">
              Add an extra layer of security
            </span>
          </div>
          <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
        </div>

        {/* Session Timeout */}
        <div className="w-full max-w-[830px] flex items-center justify-between p-5 rounded-[16px] bg-[#F9FAFB] border border-gray-100 hover:bg-[#F9FAFB]/80 transition-colors">
          <div className="flex flex-col">
            <span className="text-[#101828] font-roboto text-[14px] font-semibold leading-[20px]">
              Session Timeout
            </span>
            <span className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5">
              Auto logout after inactivity
            </span>
          </div>
          <ToggleSwitch checked={sessionTimeout} onChange={setSessionTimeout} />
        </div>
      </div>

      {/* 3. Notification Preferences Card */}
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
          <ToggleSwitch checked={emailNotifications} onChange={setEmailNotifications} />
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
          <ToggleSwitch checked={systemAlerts} onChange={setSystemAlerts} />
        </div>

        {/* Actions Button Group */}
        <div className="flex items-center gap-3 mt-2 shrink-0">
          <AdminButton
            label="Save Changes"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSave}
            className="!rounded-[12px] h-[46px] px-6 font-medium font-roboto text-[14px] shadow-none cursor-pointer"
          />
          <AdminButton
            label="Cancel"
            variant="secondary"
            onClick={handleCancel}
            className="!rounded-[12px] h-[46px] px-6 font-medium font-roboto text-[14px] shadow-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
