

export function GraphReportSkeleton() {
  return (
    <div className="w-full h-[520px] bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between animate-pulse">
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
      <div className="relative w-full h-[270px] flex items-center justify-center my-4">
        <div className="absolute flex flex-col items-center justify-center">
          <div className="h-6 w-10 bg-gray-200 rounded" />
        </div>
        <div className="w-[170px] h-[170px] rounded-full border-[20px] border-gray-200" />
      </div>
      <div className="space-y-2.5 pt-2 border-t border-gray-50">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
