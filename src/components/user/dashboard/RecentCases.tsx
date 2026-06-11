"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// --- TYPES & INTERFACES ---
interface CaseItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAvatar: string;
  caseName: string;
  caseNumber: string;
  hearingDate: string;
  status: "Active" | "In enforcement" | "Archived" | "On revision";
}

export default function RecentCases() {
  const router = useRouter();

  // Dummy dataset exactly mimicking the UI image specifications
  const [cases, setCases] = useState<CaseItem[]>([
    {
      id: "1",
      clientName: "Kristin Watson",
      clientEmail: "kristinwatson@gmail.com",
      clientAvatar: "/dummy-user.jpg",
      caseName: "kristin/Lovcen Insurance - damages claim - PI .",
      caseNumber: "CS-126097-AGVT",
      hearingDate: "12 Jun 2026",
      status: "Active",
    },
    {
      id: "2",
      clientName: "Esther Howard",
      clientEmail: "kenzi.lawson@gmail.com",
      clientAvatar: "/dummy-user.jpg",
      caseName: "mike/Delta Airlines - customer service complaint - PI.",
      caseNumber: "CS-126097-AGVT",
      hearingDate: "15 Jul 2026",
      status: "In enforcement",
    },
    {
      id: "3",
      clientName: "Savannah Nguyen",
      clientEmail: "jackson.graham@gmail.com",
      clientAvatar: "/dummy-user.jpg",
      caseName: "sarah/HealthPlus - medical malpractice - PI.",
      caseNumber: "CS-126097-AGVT",
      hearingDate: "22 Aug 2026",
      status: "Archived",
    },
    {
      id: "4",
      clientName: "John Kollings",
      clientEmail: "sara.cruz@example.com",
      clientAvatar: "/dummy-user.jpg",
      caseName: "anna/Foodies Inc - product liability case - PI.",
      caseNumber: "CS-126097-AGVT",
      hearingDate: "05 Mar 2027",
      status: "On revision",
    },
  ]);

  // Status Styling Dictionary
  const statusStyles = {
    Active: "bg-[#eefbf2] text-[#22c55e] border-[#bbf7d0]",
    "In enforcement": "bg-[#f7fee7] text-[#84cc16] border-[#e2f8b0]",
    Archived: "bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]",
    "On revision": "bg-[#fff7ed] text-[#f97316] border-[#fed7aa]",
  };

  // Click Actions Handlers
  const handleView = (id: string, name: string) => {
    alert(`Viewing detail matrix for Case ID: ${id} (${name})`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this case mapping?")) {
      setCases(cases.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl">
      {/* Table Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Recent Cases
        </h2>
        <button onClick={() => router.push("/my-cases")} className="text-sm font-semibold text-[#135576] hover:underline">
          View All
        </button>
      </div>

      {/* --- DESKTOP TABLE VIEW (Visible md and up) --- */}
      <div className="hidden lg:block w-full overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#e9eff2] text-gray-600 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
              <th className="py-3.5 px-5">Client</th>
              <th className="py-3.5 px-4">Case Name</th>
              <th className="py-3.5 px-4">Case Number</th>
              <th className="py-3.5 px-4">Hearing</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {cases.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                {/* Client column */}
                <td className="py-4 px-5 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={row.clientAvatar} alt={row.clientName} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900">{row.clientName}</span>
                    <span className="block text-xs text-gray-400 font-light">{row.clientEmail}</span>
                  </div>
                </td>
                
                {/* Case details columns */}
                <td className="py-4 px-4 max-w-xs truncate font-medium text-gray-700">{row.caseName}</td>
                <td className="py-4 px-4 text-gray-500 font-mono text-xs">{row.caseNumber}</td>
                <td className="py-4 px-4 font-medium text-gray-600">{row.hearingDate}</td>
                
                {/* Status pill element */}
                <td className="py-4 px-4">
                  <span className={`inline-block text-xs font-semibold px-3 py-0.5 rounded-full border ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>

                {/* Actions interactive trigger */}
                <td className="py-4 px-5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all focus:outline-none">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                      <DropdownMenuItem onClick={() => handleView(row.id, row.clientName)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(row.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none">
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE RESPONSIVE CARD CONTAINER --- */}
      <div className="block lg:hidden space-y-4">
        {cases.map((row) => (
          <div key={row.id} className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
            {/* Row 1: Profile and Actions */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100">
                  <Image src={row.clientAvatar} alt={row.clientName} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{row.clientName}</h4>
                  <span className="text-xs text-gray-400 block break-all">{row.clientEmail}</span>
                </div>
              </div>

              {/* Shadcn Dropdown for Mobile Card */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 rounded-full border border-gray-100 bg-gray-50 text-gray-400 focus:outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32 bg-white rounded-xl shadow-md border p-1">
                  <DropdownMenuItem onClick={() => handleView(row.id, row.clientName)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(row.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Row 2: Case Meta Details */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Case description</span>
              <p className="text-xs font-semibold text-gray-700 leading-normal line-clamp-2">{row.caseName}</p>
            </div>

            {/* Row 3: Grid Footer Info */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Case Number</span>
                <span className="font-mono text-gray-600">{row.caseNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Hearing Date</span>
                <span className="font-medium text-gray-700">{row.hearingDate}</span>
              </div>
            </div>

            {/* Row 4: Status Indicator Badge placement */}
            <div className="pt-1 flex justify-between items-center">
              <span className="text-[10px] text-gray-400">Current Status</span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[row.status]}`}>
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}