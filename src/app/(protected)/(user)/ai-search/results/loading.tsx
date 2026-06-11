// app/ai-search/results/loading.tsx
// Next.js automatically shows this while the page is loading (Suspense boundary)

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 animate-pulse">
      <div className="col-span-2 lg:col-span-3 space-y-4">
        {/* Banner skeleton */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 space-y-4">
          <div className="h-4 bg-gray-100 rounded w-40" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-7 bg-gray-100 rounded w-16" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer skeleton */}
        <div className="h-10 bg-gray-100 rounded-xl" />

        {/* Card skeletons */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-48" />
                <div className="h-3 bg-gray-100 rounded w-36" />
              </div>
              <div className="w-14 h-14 bg-gray-100 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-100 rounded w-24" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
            <div className="h-16 bg-blue-50 rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-28 bg-green-50 rounded-xl" />
              <div className="h-28 bg-orange-50 rounded-xl" />
            </div>
            <div className="h-12 bg-gray-50 rounded-lg border-l-4 border-gray-200" />
            <div className="flex gap-3">
              <div className="h-8 bg-gray-100 rounded-lg w-32" />
              <div className="h-8 bg-gray-100 rounded-lg w-36" />
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-2 lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
          <div className="h-4 bg-gray-100 rounded w-28" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 bg-gray-100 rounded w-20" />
              <div className="h-9 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}