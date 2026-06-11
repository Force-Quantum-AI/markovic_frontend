"use client";

import React from "react";
import { Eye } from "lucide-react";

// ─── DUMMY DATASET ─────────────────────────────────────────────────────────

const hearingsData = [
  { id: 1, date: "Jul 14, 2025", type: "Status Conference", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 2, date: "Jul 22, 2025", type: "Motion Hearing", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 3, date: "Sep 8, 2025", type: "Trial (Day 1)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 4, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 5, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 6, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 7, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 8, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 9, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 10, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
  { id: 11, date: "Sep 9, 2025", type: "Trial (Day 2)", room: "Dept. 54", judge: "Hon. P. Rivera", status: "Confirmed" },
];

export default function AllHearingsTable() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">All Hearings</h2>
        <p className="text-sm text-gray-500">{hearingsData.length} scheduled hearings</p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {["HEARING DATE", "TYPE", "COURT ROOM", "JUDGE", "STATUS", "ACTION"].map((header) => (
                <th key={header} className="px-6 py-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {hearingsData.map((hearing) => (
              <tr key={hearing.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{hearing.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{hearing.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{hearing.room}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{hearing.judge}</td>
                
                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                    {hearing.status}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}