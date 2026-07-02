

export function MyUsersTableSkeleton() {
  return (
    <div className="w-full bg-white rounded-3xl border border-[#BEC4D2]/40 overflow-hidden shadow-xs animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-[#F5F6F7]">
              {["User", "Email", "Phone", "Status", "Actions"].map((header, idx) => (
                <th key={idx} className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: 10 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full shrink-0" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-28 bg-gray-200 rounded" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-5 w-16 bg-gray-200 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
