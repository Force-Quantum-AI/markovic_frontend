"use client";

import { useState } from "react";
import { Eye, Trash2, FileText, Database, Search, Clock, Landmark } from "lucide-react";

interface CaseRow {
  id: string;
  name: string;
  category: "Case" | "Law Record" | "AI Search";
  caseNumber: string;
  court: string;
  date: string;
  status: "Archived";
}

const casesData: CaseRow[] = [
  {
    id: "1",
    name: "markovic/Property Dispute-\nP 104/24-Case",
    category: "Case",
    caseNumber: "C-2024-019",
    court: "High Court",
    date: "12 Mar 2026",
    status: "Archived",
  },
  {
    id: "2",
    name: "diesel/Contract- P 104/24-\nViolation Record",
    category: "Law Record",
    caseNumber: "L-2023-88",
    court: "Civil Court",
    date: "04 Jan 2026",
    status: "Archived",
  },
  {
    id: "3",
    name: "doren/Employment- P 104/24-\nDispute AI Search",
    category: "AI Search",
    caseNumber: "S-2024-07",
    court: "District Court",
    date: "22 Feb 2026",
    status: "Archived",
  },
  {
    id: "4",
    name: "poul/Family- P 104/24-\nInheritance Case",
    category: "Case",
    caseNumber: "C-2023-156",
    court: "Family Court",
    date: "18 Nov 2025",
    status: "Archived",
  },
  {
    id: "5",
    name: "john/Commercial- P 104/24-\nLitigation Record",
    category: "Law Record",
    caseNumber: "L-2024-42",
    court: "Commercial Court",
    date: "09 Apr 2025",
    status: "Archived",
  },
  {
    id: "6",
    name: "emily/Criminal- P 104/24-\nDefense AI Search",
    category: "AI Search",
    caseNumber: "S-2024-13",
    court: "Criminal Court",
    date: "15 May 2025",
    status: "Archived",
  },
];

export default function ArchiveCasesTable() {
  const [cases, setCases] = useState<CaseRow[]>(casesData);

  const handleDelete = (id: string) => {
      if (confirm("Are you sure you want to delete this archived case record?")) {
      setCases(cases.filter((item) => item.id !== id));
    }
  };

  const getCategoryIcon = (category: CaseRow["category"]) => {
    switch (category) {
      case "Case":
        return <FileText className="w-4 h-4 text-[#808CA5]" />;
      case "Law Record":
        return <Database className="w-4 h-4 text-[#808CA5]" />;
      case "AI Search":
        return <Search className="w-4 h-4 text-[#808CA5]" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl pt-6 border border-[#E5E7EB] overflow-hidden">
      {/* Tab/Header Navigation */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6">
        <div className="relative pb-3">
          <div className="flex items-center gap-2">
          <h2 className="text-[#135576] font-roboto text-[16px] font-semibold leading-[24px]">
              Archive Cases
          </h2>
            <span className="text-[#427791] font-roboto text-[12px] font-medium leading-[140%]">
              (247 Cases)
          </span>
        </div>
          {/* Tab Underline */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#135576]" />
        </div>
          <button className="text-sm font-semibold text-[#135576] hover:underline font-inter pb-3">
            View All
          </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block w-full overflow-x-auto bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#475467] text-[14px] font-medium font-roboto">
              <th className="p-4 font-medium">Case Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Case Number</th>
              <th className="p-4 font-medium">Court Name</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-sm text-gray-700">
            {cases.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                {/* Case Name */}
                <td className="py-4 px-4 first:pl-6 last:pr-6 font-bold text-[#1D2939] font-roboto text-[14px] whitespace-pre-line leading-relaxed max-w-[280px]">
                  {row.name}
                </td>
                
                {/* Category */}
                <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(row.category)}
                    <span>{row.category}</span>
                  </div>
                </td>

                {/* Case Number */}
                <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                  {row.caseNumber}
                </td>

                {/* Court Name */}
                <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                    <span>{row.court}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                    <span>{row.date}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4 first:pl-6 last:pr-6">
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full border border-[#D0D5DD] bg-[#F2F4F7] text-[#344054] font-roboto">
                    {row.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 first:pl-6 last:pr-6">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => alert(`Viewing Case Detail: ${row.name}`)}
                      className="p-1 hover:bg-gray-100 rounded text-[#135576] transition-colors cursor-pointer"
                      title="View Case"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-1 hover:bg-red-50 rounded text-[#D92D20] transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden space-y-4 px-6 pb-6">
        {cases.map((row) => (
          <div key={row.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-[#1D2939] text-sm font-roboto line-clamp-2 max-w-[80%]">
                {row.name}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D0D5DD] bg-[#F2F4F7] text-[#344054]">
                {row.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
              <div>
                <span className="text-[#808CA5] block text-[10px]">Category</span>
                <span className="font-medium text-[#344054]">{row.category}</span>
              </div>
              <div>
                <span className="text-[#808CA5] block text-[10px]">Case Number</span>
                <span className="text-[#344054]">{row.caseNumber}</span>
              </div>
              <div>
                <span className="text-[#808CA5] block text-[10px]">Court Name</span>
                <span className="font-medium text-[#344054]">{row.court}</span>
              </div>
              <div>
                <span className="text-[#808CA5] block text-[10px]">Date</span>
                <span className="font-medium text-[#344054]">{row.date}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50 flex justify-end gap-3">
              <button
                onClick={() => alert(`Viewing Case Detail: ${row.name}`)}
                className="p-1.5 border border-sky-100 hover:bg-sky-50 text-[#135576] rounded-lg cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="p-1.5 border border-red-100 hover:bg-red-50 text-[#D92D20] rounded-lg cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination component */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 pb-6 px-6 border-t border-[#E5E7EB] text-sm font-roboto text-[#475467] gap-4">
        <span>Showing 1-6 of 247 results</span>
          <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-[#475467] hover:text-[#135576] text-sm font-medium font-roboto cursor-pointer">
              Prev.
            </button>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F4F7] text-[#344054] text-sm font-medium font-roboto cursor-pointer">
            1
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-[#475467] hover:text-[#135576] text-sm font-medium font-roboto cursor-pointer">
            2
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-[#475467] hover:text-[#135576] text-sm font-medium font-roboto cursor-pointer">
            3
          </button>
          
          <span className="px-2 text-[#475467] font-roboto">...</span>
          
          <button className="px-3 py-1.5 text-[#135576] hover:text-[#135576]/85 text-sm font-bold font-roboto cursor-pointer">
              Next
            </button>
          </div>
        </div>
    </div>
  );
}
