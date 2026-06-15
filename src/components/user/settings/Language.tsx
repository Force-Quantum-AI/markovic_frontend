"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useGetLanguageAndTimeSettingQuery, useUpdateLanguageAndTimeSettingMutation } from "@/store/features/setting/setting.api";

export default function Language() {
  const { data: languageAndTimeSettingData, isLoading: isLanguageAndTimeSettingLoading } = useGetLanguageAndTimeSettingQuery({});
  const [updatelanguageAndTimeSetting] = useUpdateLanguageAndTimeSettingMutation();

  const [language, setLanguage] = useState("");
  const [dateFormat, setDateFormat] = useState("");
  const [timeFormat, setTimeFormat] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    if (languageAndTimeSettingData) {
      setLanguage(languageAndTimeSettingData.language);
      setDateFormat(languageAndTimeSettingData.date_format);
      setTimeFormat(languageAndTimeSettingData.time_format);
      setTimezone(languageAndTimeSettingData.timezone);
    }
  }, [languageAndTimeSettingData]);

  const handleSave = async () => {
    try {
      await updatelanguageAndTimeSetting({
        language,
        date_format: dateFormat,
        time_format: timeFormat,
        timezone,
      }).unwrap();
      toast.success("Language and time setting updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update language and time setting");
    }
  };

  if (isLanguageAndTimeSettingLoading) {
    return (
      <div className="w-full flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#135576]"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl flex flex-col gap-6 w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-7">Language & Region Settings</h2>
        
        <div className="flex flex-col gap-6 w-full mt-2">
          {/* Language Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#364153] text-sm font-medium">Language</label>
            <div className="relative h-[49px] w-full">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576] appearance-none cursor-pointer"
              >
                <option value="montenegrin">Montenegrin</option>
                <option value="english">English</option>
                <option value="serbian">Serbian</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Date Format Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#364153] text-sm font-medium">Date Format</label>
            <div className="relative h-[49px] w-full">
              <select 
                value={dateFormat} 
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576] appearance-none cursor-pointer"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Time Format Radio Group */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[#364153] text-sm font-medium">Time Format</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="timeFormat" 
                  value="12"
                  checked={timeFormat === "12"}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="w-4 h-4 text-[#135576] focus:ring-[#135576] border-gray-300"
                />
                <span className="text-[#364153] text-base font-medium">12-hour</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="timeFormat" 
                  value="24"
                  checked={timeFormat === "24"}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="w-4 h-4 text-[#135576] focus:ring-[#135576] border-gray-300"
                />
                <span className="text-[#364153] text-base font-medium">24-hour</span>
              </label>
            </div>
          </div>

          {/* Timezone Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#364153] text-sm font-medium">Timezone</label>
            <div className="relative h-[49px] w-full">
              <select 
                value={timezone} 
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576] appearance-none cursor-pointer"
              >
                <option value="Europe/Podgorica">Europe/Podgorica (GMT+1)</option>
                <option value="Europe/London">Europe/London (GMT+0)</option>
                <option value="America/New_York">America/New_York (GMT-5)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="border-t border-[#e5e7eb] mt-2 pt-6 flex justify-end w-full">
          <button 
            onClick={handleSave}
            className="bg-[#135576] hover:bg-[#0f435c] text-white text-base font-medium py-3 px-6 rounded-full transition-colors"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
