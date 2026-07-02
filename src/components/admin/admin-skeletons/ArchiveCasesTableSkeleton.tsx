export function ArchiveCasesTableSkeleton({ isDashboard = false }: { isDashboard?: boolean }) {
  const rowCount = isDashboard ? 4 : 8;
  return (
    <div className="w-full bg-white rounded-3xl border border-[#BEC4D2]/40 overflow-hidden shadow-xs animate-pulse">
      {isDashboard && (
        <div className="flex items-center justify-between p-6 border-b border-gray-150">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-10 w-24 bg-gray-200 rounded-full" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-[#F5F6F7]">
              {["Case Info", "Gazette", "Status", "Responsible lawyer", "Category", "Last update"].map((header, idx) => (
                <th key={idx} className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: rowCount }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {/* Case Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-[32px] h-[32px] bg-gray-200 rounded-full shrink-0" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                </td>
                {/* Gazette */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                </td>
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-5 w-16 bg-gray-200 rounded-full" />
                </td>
                {/* Responsible lawyer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </td>
                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-5 w-20 bg-gray-200 rounded-full" />
                </td>
                {/* Last update */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
