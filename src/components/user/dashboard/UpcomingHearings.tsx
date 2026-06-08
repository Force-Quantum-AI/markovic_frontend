"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseCard } from "@/components/shared/CaseCard";

// --- TYPES FOR REUSABLE CARD ---
export interface HearingCardProps {
  category: "Civil" | "Criminal";
  clientName: string;
  clientImage: string;
  caseDescription: string;
  status: "Active" | "On appeal" | "On revision";
  court: string;
  caseNumber: string;
  assignedLawyers: string[];
  hearingDate: string;
  deadline: string;
}


// --- MAIN GRID MODULE WRAPPER ---
export default function UpcomingHearings() {
  // Dummy dataset replicating image contents precisely
  const hearingsDataset: HearingCardProps[] = [
    {
      category: "Civil",
      clientName: "Vazquez Maria Liisana",
      clientImage: "/dummy-user.jpg",
      caseDescription: "Vazquez/Lovcen Insurance - damages claim - P 104/24 - basic Vourt Podgorica",
      status: "Active",
      court: "Montenegro Law Court",
      caseNumber: "CS-126097-AGVT",
      assignedLawyers: [
        "/dummy-user.jpg",
        "/dummy-user.jpg",
        "TD",
      ],
      hearingDate: "20 May 2026",
      deadline: "Not Assign",
    },
    {
      category: "Civil",
      clientName: "Esther Howard",
      clientImage: "/dummy-user.jpg",
      caseDescription: "Vazquez/Lovcen Insurance - damages claim - P 104/24 - basic Vourt Podgorica",
      status: "On appeal",
      court: "Montenegro Law Court",
      caseNumber: "CS-126097-AGVT",
      assignedLawyers: [
        "/dummy-user.jpg",
        "/dummy-user.jpg",
        "TD",
      ],
      hearingDate: "20 May 2026",
      deadline: "Not Assign",
    },
    {
      category: "Criminal",
      clientName: "Darlene Robertson",
      clientImage: "/dummy-user.jpg",
      caseDescription: "Vazquez/Lovcen Insurance - damages claim - P 104/24 - basic Vourt Podgorica",
      status: "On revision",
      court: "Montenegro Law Court",
      caseNumber: "CS-126097-AGVT",
      assignedLawyers: [
        "/dummy-user.jpg",
        "/dummy-user.jpg",
        "TD",
      ],
      hearingDate: "20 May 2026",
      deadline: "Not Assign",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto p-3 md:p-5 space-y-3 md:space-y-6 bg-white rounded-2xl">
      {/* Top Header Controls Block */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Upcoming Hearings
        </h3>
        <button className="text-sm font-semibold text-[#135576] hover:underline transition-all">
          View All
        </button>
      </div>

      {/* Grid Container Matrix mapping responsive column breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-6">
        {hearingsDataset.map((card, index) => (
          <CaseCard key={index} {...card} />
        ))}
      </div>

      {/* Pagination control buttons positioned at the bottom right */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button 
          aria-label="Previous page"
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <button 
          aria-label="Next page"
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
        >
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}