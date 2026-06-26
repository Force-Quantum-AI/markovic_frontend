"use client";

import { ArrowLeft, ArrowRight, ClockAlert } from "lucide-react";
import { CaseCard, CaseCardProps } from "@/components/shared/CaseCard";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import CaseCardSkeleton from "@/components/skeletons/CaseCardSkeleton";
import { useState } from "react";
import { NoContent } from "@/components/shared/NoContent";

// --- TYPES FOR REUSABLE CARD ---
export interface HearingCardProps {
  id?: string;
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

// Dummy dataset replicating image contents precisely
export const hearingsDataset: HearingCardProps[] = [
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


// --- MAIN GRID MODULE WRAPPER ---
export default function UpcomingHearings({ data, isLoading }: { data?: any[]; isLoading?: boolean }) {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(3);
  const router = useRouter();
  const { t } = useTranslation("common");

  const prevPage = ()=>{
    setMin(min - 3)
    setMax(max - 3)
  }
  const nextPage = ()=>{
    setMin(min + 3)
    setMax(max + 3)
  }
  return (
    <section className="w-full max-w-7xl mx-auto p-3 md:p-5 space-y-3 md:space-y-6 bg-white rounded-2xl">
      {/* Top Header Controls Block */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          {t("Search")}
        </h3>
        <button onClick={() => router.push("/hearing-and-deadline")} className="text-sm font-semibold text-[#135576] hover:underline transition-all">
          View All
        </button>
      </div>

      {/* Grid Container Matrix mapping responsive column breakdowns */}
      {isLoading ? (
          <CaseCardSkeleton/>
        ) : data?.length===0 ? (
          <NoContent message="No upcoming hearings" icon={<ClockAlert className="text-gray-500" />} />
        ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-6">
        {data?.slice(min, max).map((card: CaseCardProps, index: number) => (
          <CaseCard key={index} {...card} />
        ))}
      </div>
      )}

      {/* Pagination control buttons positioned at the bottom right */}
      {data?.length!==0 && (
      <div className={`${data?.length && data?.length<=3 ? "hidden": ""} flex items-center justify-end gap-3 pt-2`}>
        <button
          aria-label="Previous page"
          onClick={prevPage}
          disabled={min === 0}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <button
          aria-label="Next page"
          onClick={nextPage}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
        >
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
      )} 
    </section>
  );
}