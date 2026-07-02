

export function LawDatabaseSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full animate-pulse">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          style={{
            borderRadius: "16px",
            border: "1px solid #EFF1F4",
            background: "#F9F8F6",
            padding: "16px",
            height: "220px",
          }}
          className="flex flex-col justify-between w-full shadow-xs"
        >
          <div className="flex justify-between items-start w-full">
            <div className="w-9 h-9 bg-gray-200 rounded-[6px]" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>

          <div className="space-y-2 mt-3 flex-1 flex flex-col justify-center">
            <div className="h-6 w-full bg-gray-200 rounded" />
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="flex items-center gap-2 mt-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-100 w-full">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded-[20px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
