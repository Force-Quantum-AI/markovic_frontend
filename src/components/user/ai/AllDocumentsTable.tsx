"use client";

import React from "react";
import { Eye, FileText, File } from "lucide-react";

// ─── DUMMY DATASET ─────────────────────────────────────────────────────────

const documentsData = [
  { id: 1, name: "Exhibit A — Bank Statements 2021-2022", category: "Evidence", uploadedBy: "Emily Torres", date: "Jun 6, 2025", type: "pdf" },
  { id: 2, name: "Opposition to Summary Judgment Motion", category: "Pleadings", uploadedBy: "Sarah Mitchell", date: "Jun 4, 2025", type: "doc" },
  { id: 3, name: "Expert Witness Report — Dr. Alan Park", category: "Expert Reports", uploadedBy: "James Chen", date: "May 29, 2025", type: "pdf" },
  { id: 4, name: "Defendant's Interrogatory Responses", category: "Discovery", uploadedBy: "Emily Torres", date: "May 22, 2025", type: "pdf" },
  { id: 5, name: "Client Meeting Notes — May 2025", category: "Internal Notes", uploadedBy: "Sarah Mitchell", date: "May 18, 2025", type: "doc" },
];

// Helper to get dynamic category colors
const getCategoryStyles = (category: string) => {
  switch (category) {
    case "Evidence": return "bg-purple-50 text-purple-600";
    case "Pleadings": return "bg-sky-50 text-sky-600";
    case "Expert Reports": return "bg-emerald-50 text-emerald-600";
    case "Discovery": return "bg-amber-50 text-amber-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

export default function AllDocumentsTable() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">All Documents</h2>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {["DOCUMENT NAME", "CATEGORY", "UPLOADED BY", "DATE", "ACTIONS"].map((header) => (
                <th key={header} className="px-6 py-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {documentsData.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {doc.type === "pdf" ? (
                      <FileText className="w-5 h-5 text-rose-400" />
                    ) : (
                      <File className="w-5 h-5 text-sky-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">{doc.name}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${getCategoryStyles(doc.category)}`}>
                    {doc.category}
                  </span>
                </td>
                
                <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                
                <td className="px-6 py-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview
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