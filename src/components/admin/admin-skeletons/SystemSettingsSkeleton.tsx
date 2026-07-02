import React from "react";

export function SystemSettingsSkeleton() {
  return (
    <div className="w-full max-w-[894px] mx-auto space-y-6 pb-12 animate-pulse px-4">
      {/* Title */}
      <div className="h-8 w-48 bg-gray-200 rounded mx-auto pt-2" />

      {/* 1. General Settings Card */}
      <div className="flex flex-col items-start p-8 rounded-[24px] border border-gray-200 bg-white w-full gap-6">
        <div className="h-6 w-36 bg-gray-200 rounded" />

        {/* Platform Name */}
        <div className="w-full space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="w-full h-[46px] rounded-[14px] bg-gray-100" />
        </div>

        {/* Support Email */}
        <div className="w-full space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="w-full h-[46px] rounded-[14px] bg-gray-100" />
        </div>

        {/* Time Zone */}
        <div className="w-full space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="w-full h-[46px] rounded-[14px] bg-gray-100" />
        </div>
      </div>

      {/* 2. Notification Preferences Card */}
      <div className="flex flex-col items-start p-8 rounded-[24px] border border-gray-200 bg-white w-full gap-6">
        <div className="h-6 w-52 bg-gray-200 rounded" />

        {/* Email Notifications */}
        <div className="w-full flex items-center justify-between p-5 rounded-[16px] bg-[#F9FAFB] border border-gray-100">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-11 bg-gray-200 rounded-full" />
        </div>

        {/* System Alerts */}
        <div className="w-full flex items-center justify-between p-5 rounded-[16px] bg-[#F9FAFB] border border-gray-100">
          <div className="space-y-2">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-11 bg-gray-200 rounded-full" />
        </div>

        {/* Actions Button Group */}
        <div className="flex items-center gap-3 mt-2">
          <div className="h-[46px] w-32 bg-gray-200 rounded-[12px]" />
          <div className="h-[46px] w-24 bg-gray-200 rounded-[12px]" />
        </div>
      </div>
    </div>
  );
}
