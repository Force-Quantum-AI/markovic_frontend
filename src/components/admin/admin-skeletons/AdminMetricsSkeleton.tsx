export function AdminMetricsSkeleton({ cardCount = 4 }: { cardCount?: number }) {
  const isThree = cardCount === 3;
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${isThree ? '3' : '2'} xl:grid-cols-${isThree ? '3' : '4'} gap-[24px] w-full`}>
      {Array.from({ length: cardCount }).map((_, idx) => (
        <div
          key={idx}
          style={{ height: isThree ? "142px" : "120px" }}
          className={`flex flex-col justify-between w-full p-[20px] bg-gray-50 border border-gray-200 animate-pulse ${
            isThree ? 'rounded-[24px]' : 'rounded-[16px]'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] bg-gray-200 rounded-full" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2 mt-4">
            <div className="w-16 h-8 bg-gray-200 rounded" />
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
