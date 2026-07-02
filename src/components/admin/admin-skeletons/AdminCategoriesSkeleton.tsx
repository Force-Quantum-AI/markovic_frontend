

export function AdminCategoriesSkeleton() {
  return (
    <div className="divide-y divide-[#E5E7EB] animate-pulse">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 px-5 py-4 w-full"
        >
          <div className="w-5 h-5 bg-gray-200 rounded shrink-0" />
          <div className="w-3 h-3 rounded-full bg-gray-200 shrink-0" />
          <div className="w-8 h-8 rounded-[14px] bg-gray-100 shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-5 w-14 bg-gray-200 rounded-full" />
            </div>
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-6 ml-auto pl-4 shrink-0">
            <div className="space-y-1">
              <div className="h-4 w-6 bg-gray-200 rounded ml-auto" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-4 w-6 bg-gray-200 rounded ml-auto" />
              <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
