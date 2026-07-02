import React from "react";

export function QuickActionsSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 space-y-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="w-full h-[48px] bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
