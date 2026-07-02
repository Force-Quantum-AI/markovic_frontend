

export function MyUsersFiltersSkeleton() {
  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-[#BEC4D2]/40 shadow-xs space-y-6 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-200 rounded shrink-0" />
        <div className="h-6 w-32 bg-gray-200 rounded" />
      </div>

      <div className="space-y-4">
        {/* Full Width Search Field */}
        <div className="w-full h-[52px] bg-gray-100 rounded-[32px]" />

        {/* Grid Fields: subscription + day + month + year */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Left half: Subscription */}
          <div className="w-full lg:w-1/2 space-y-1.5">
            <div className="h-4 w-24 bg-gray-200 rounded ml-2" />
            <div className="w-full h-[50px] bg-gray-100 rounded-[32px]" />
          </div>

          {/* Right half: Day, Month, Year */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="h-4 w-16 bg-gray-200 rounded ml-2" />
                <div className="w-full h-[50px] bg-gray-100 rounded-[32px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <div className="h-11 w-full sm:w-28 bg-gray-200 rounded-[32px]" />
          <div className="h-11 w-full sm:w-28 bg-gray-200 rounded-[32px]" />
        </div>
      </div>
    </div>
  );
}
