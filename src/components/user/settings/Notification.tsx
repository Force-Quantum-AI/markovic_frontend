"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/store/features/notification/notification.api";

export default function Notification() {
  const { data} = useGetNotificationSettingsQuery();
  const [ updateNotificationSettings ] = useUpdateNotificationSettingsMutation();

  const [upcomingHearing, setUpcomingHearing] = useState(false);
  const [caseDeadline, setCaseDeadline] = useState(false);
  const [lawDatabase, setLawDatabase] = useState(false);
  const [systemAnnouncements, setSystemAnnouncements] = useState(false);
  const [reminderTiming, setReminderTiming] = useState("24 Hour before");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUpcomingHearing(data?.notif_hearing_reminders ?? false);
    setCaseDeadline(data?.notif_case_deadlines ?? false);
    setLawDatabase(data?.notif_law_updates ?? false);
    setSystemAnnouncements(data?.notif_system_announcements ?? false);
  }, [data]);

  const handleSave = async () => {
    try {
      const payload = {
        notif_hearing_reminders: upcomingHearing,
        notif_case_deadlines: caseDeadline,
        notif_law_updates: lawDatabase,
        notif_system_announcements: systemAnnouncements,
      };
      console.log("Payload is :", payload);

      await updateNotificationSettings(payload).unwrap();
      toast.success("Notification preferences saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Notification preferences not saved");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl flex flex-col w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-[28px] mb-6">
          Notification Preferences
        </h2>

        {/* Email Notifications */}
        <div className="flex flex-col mb-8 border-b border-[#e5e7eb] pb-8">
          <h3 className="text-[#101828] text-lg font-semibold leading-[27px] mb-4">
            Email Notifications
          </h3>

          <div className="flex flex-col gap-5 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[#364153] text-base font-normal">
                Upcoming Hearing Reminders
              </span>
              <Switch
                checked={upcomingHearing}
                onCheckedChange={() => {
                  setUpcomingHearing(!upcomingHearing);
                }}
                className="data-[state=checked]:bg-[#135576]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#364153] text-base font-normal">
                Case Deadline Alerts
              </span>
              <Switch
                checked={caseDeadline}
                onCheckedChange={() => {
                  setCaseDeadline(!caseDeadline);
                }}
                className="data-[state=checked]:bg-[#135576]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#364153] text-base font-normal">
                Law Database Updates
              </span>
              <Switch
                checked={lawDatabase}
                onCheckedChange={() => {
                  setLawDatabase(!lawDatabase);
                }}
                className="data-[state=checked]:bg-[#135576]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#364153] text-base font-normal">
                System Announcements
              </span>
              <Switch
                checked={systemAnnouncements}
                onCheckedChange={() => {
                  setSystemAnnouncements(!systemAnnouncements);
                }}
                className="data-[state=checked]:bg-[#135576]"
              />
            </div>
          </div>
        </div>

        {/* Reminder Timing */}
        <div className="flex flex-col mb-6 mt-1">
          <label className="text-[#364153] text-sm font-medium mb-2">
            Reminder Timing
          </label>
          <div className="relative w-full md:w-[320px] h-[49px]">
            <select
              value={reminderTiming}
              onChange={(e) => setReminderTiming(e.target.value)}
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576] appearance-none cursor-pointer"
            >
              <option value="24 Hour before">24 Hour before</option>
              <option value="48 Hour before">48 Hour before</option>
              <option value="1 Week before">1 Week before</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end w-full border-t border-[#e5e7eb] pt-6">
          <button
            onClick={handleSave}
            className="bg-[#135576] hover:bg-[#0f435c] text-white text-base font-medium py-3 px-5 rounded-[32px] min-w-[180px] transition-colors"
          >
            Save Preference
          </button>
        </div>
      </div>
    </div>
  );
}
