import React from "react";

export function PlatformOverviewSkeleton() {
  return (
    <div className="w-full h-[520px] bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded-full" />
      </div>
      <div className="w-full h-[380px] flex items-end justify-between px-4 pt-10 pb-6 border-b border-gray-100">
        {[140, 220, 180, 280, 120, 260].map((h, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 w-12">
            <div className="bg-gray-200 rounded-t-lg w-7" style={{ height: `${h}px` }} />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
