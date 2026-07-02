"use client";

import { Eye } from "lucide-react";

interface Deadline {
  id: number;
  date: string;
  reason?: string;
  status?: string;
}

interface AdminAllDeadlinesTableProps {
  deadlines?: Deadline[];
}

export default function AdminAllDeadlinesTable({ deadlines = [] }: AdminAllDeadlinesTableProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">All Deadlines</h2>
        <p className="text-sm text-gray-500">{deadlines?.length || 0} scheduled deadlines</p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {["DEADLINE DATE", "REASON", "STATUS", "ACTION"].map((header) => (
                <th key={header} className="px-6 py-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {deadlines && deadlines.length > 0 ? deadlines.map((deadline) => (
              <tr key={deadline.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{deadline.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{deadline.reason || "N/A"}</td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600">
                    {deadline.status || "N/A"}
                  </span>
                </td>

                {/* Action Column */}
                <td className="px-6 py-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No deadlines available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
