import React from "react";

export default function ArchiveCaseDetailsSkeleton() {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {/* Top Section Card Skeleton */}
      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          
          {/* Left Column: Overview Skeleton */}
          <div className="col-span-1 xl:col-span-3 space-y-6 pt-12 relative">
            {/* Back Button Skeleton */}
            <div className="absolute top-1 left-0 w-20 h-8 bg-gray-200 rounded-2xl" />
            
            {/* Header Title */}
            <div className="space-y-2">
              <div className="h-7 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>

            {/* Info Grid Rows */}
            <div className="space-y-6 pt-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex flex-col md:flex-row justify-start md:justify-between gap-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-40 bg-gray-200 rounded" />
                </div>
              ))}
              {/* Status Row */}
              <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-28 bg-gray-200 rounded-full" />
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Right Column: Case Health & Assigned Lawyers Skeletons */}
          <div className="col-span-1 xl:col-span-2 space-y-6">
            
            {/* Case Health Skeleton Card */}
            <div className="w-full bg-gray-50/50 rounded-2xl border border-gray-100/80 overflow-hidden shadow-sm">
              {/* Header Banner */}
              <div className="bg-gray-200 p-6 space-y-3">
                <div className="h-3 w-20 bg-gray-300 rounded" />
                <div className="h-6 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
              </div>
              {/* Body stats */}
              <div className="p-6 space-y-5">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-200 rounded-full animate-none" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-8 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Lawyers Skeleton Card */}
            <div className="w-full bg-gray-50/50 rounded-2xl border border-gray-100/80 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="h-5 w-36 bg-gray-200 rounded" />
              </div>
              <div className="p-6 space-y-5">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full" />
                      <div className="space-y-2">
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                      </div>
                    </div>
                    {idx === 0 && <div className="h-5 w-12 bg-gray-200 rounded-full" />}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tables Side-by-Side Skeletons */}
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        {/* Hearings Table Skeleton */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-3.5 w-40 bg-gray-200 rounded" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-8 w-full bg-gray-100 rounded" />
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Deadlines Table Skeleton */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-3.5 w-40 bg-gray-200 rounded" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-8 w-full bg-gray-100 rounded" />
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Full-Width Skeleton */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-5 w-36 bg-gray-200 rounded" />
          <div className="h-3.5 w-44 bg-gray-200 rounded" />
        </div>
        <div className="space-y-3 pt-4">
          <div className="h-8 w-full bg-gray-100 rounded" />
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded shrink-0" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
