import React from "react";

export function SystemHealthSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="w-5 h-5 bg-gray-200 rounded-full" />
      </div>

      <div className="space-y-4 pt-1">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-8 bg-gray-200 rounded" />
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full w-full" />
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="h-10 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
}
