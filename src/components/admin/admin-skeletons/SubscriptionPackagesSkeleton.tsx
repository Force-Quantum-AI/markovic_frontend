import React from "react";

export function SubscriptionPackagesSkeleton() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center gap-5 w-full animate-pulse">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-[#BEC4D2]/40 p-6 flex flex-col w-[300px] xl:w-[320px] shadow-sm min-h-[500px]"
        >
          <div className="flex justify-between items-center mb-1 w-full">
            <div className="flex items-center gap-2">
              <div className="h-5 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded-full" />
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
          
          <div className="flex items-baseline mb-3">
            <div className="h-9 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-8 bg-gray-200 rounded ml-1" />
          </div>
          
          <div className="space-y-2 mb-5 h-10 w-full">
            <div className="h-3.5 w-full bg-gray-200 rounded" />
            <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
          </div>

          <div className="border-t border-[#BEC4D2]/40 pt-4 flex-1">
            <div className="h-3.5 w-32 bg-gray-200 rounded mb-3" />
            <div className="space-y-2 mb-6">
              {Array.from({ length: 4 }).map((_, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2">
                  <div className="w-[14px] h-[14px] bg-gray-200 rounded-full shrink-0 mt-[2px]" />
                  <div className="h-3.5 w-40 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full mt-auto">
            <div className="w-full h-12 bg-gray-200 rounded-full" />
            <div className="w-full h-12 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
