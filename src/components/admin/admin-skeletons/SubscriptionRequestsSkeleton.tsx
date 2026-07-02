import React from "react";

export function SubscriptionRequestsSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-[#BEC4D2]/40 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-24 w-full bg-gray-100 rounded-[20px]" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-50">
              <div className="h-11 w-24 bg-gray-200 rounded-full" />
              <div className="h-11 w-24 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
