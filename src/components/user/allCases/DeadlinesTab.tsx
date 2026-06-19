"use client";

import React, { useState } from "react";
import { Plus, Edit2, Calendar, TimerOff } from "lucide-react";
import AddEditHearingModal from "@/components/modals/AddEditHearingModal";

// 1. TypeScript Interface for type safety
interface Deadline {
  id: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: "Upcoming" | "Held" | "Postponed";
  daysRemaining?: number;
}

// 2. Dummy Dataset mimicking future API response
const DUMMY_DeadlineS: Deadline[] = [
  {
    id: "1",
    date: "22 May 2026",
    time: "09:00",
    location: "Basic Court Podgorica",
    type: "New Deadline",
    status: "Upcoming",
    daysRemaining: 3,
  },
  {
    id: "2",
    date: "10 April 2026",
    time: "11:30",
    location: "Basic Court Podgorica",
    type: "Regular Deadline",
    status: "Held",
  },
  {
    id: "3",
    date: "15 March 2026",
    time: "09:00",
    location: "Basic Court Podgorica",
    type: "Review Deadline",
    status: "Postponed",
  },
];

export default function DeadlinesTab({ caseId, deadlines = [], nextDeadline = [] }: { caseId: string, deadlines?: any[], nextDeadline?: any[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDeadline, setSelectedDeadline] =
    useState<any | null>(null);

  const [mode, setMode] =
    useState<"add" | "edit">("add");

  const displayDeadlines = deadlines.length > 0 ? deadlines : [];
  const upcoming = nextDeadline?.[0] || displayDeadlines.find((h: any) => h.status === "upcoming");

  const handleAddDeadline = () => {
    setMode("add");
    setSelectedDeadline(null);
    setOpenModal(true);
  };

  const handleEditDeadline = (id: string) => {
    const hearing = displayDeadlines.find(
      (item: any) => item.id === id
    );

    if (!hearing) return;

    setSelectedDeadline(hearing);
    setMode("edit");
    setOpenModal(true);
  };

  // Helper function for styling status badges dynamically
  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
      case "extended":
        return "text-blue-600 font-semibold";
      case "held":
        return "text-green-600 font-semibold";
      case "postponed":
        return "text-amber-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* LEFT COLUMN: Upcoming Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="text-gray-800 font-bold text-lg mb-4">Upcoming:</h2>
          <hr className="border-gray-100 mb-5" />

          {upcoming ? (
            <div className="bg-[#FFF4D4] border border-[#FFDD8F] rounded-xl p-5 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[#C28203] text-sm font-medium block mb-3">
                    Next Deadline:
                  </span>
                  <div className="text-gray-900 font-bold text-xl tracking-tight">
                    {upcoming.day}-{upcoming.month}-{upcoming.year}
                  </div>
                  <div className="text-gray-900 font-bold text-xl tracking-tight mb-4">
                    {upcoming.time_from} - {upcoming.time_to} {upcoming.am_pm}
                  </div>
                  <span className="text-gray-700 text-sm bg-[#fbe297] px-2.5 py-1 rounded-md">
                    {upcoming.reason}
                  </span>
                </div>

                <div className="flex flex-col items-end justify-between h-full space-y-8">
                  <button
                    onClick={() => handleEditDeadline(upcoming.id)}
                    className="p-2 text-[#C28203] hover:bg-[#fbe297] rounded-lg transition-colors"
                    aria-label="Edit Deadline"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  {upcoming.days_remaining !== null && upcoming.days_remaining !== undefined && (
                    <span className="text-gray-500 text-xs font-medium">
                      {upcoming.days_remaining} Days Remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <TimerOff className="w-16 h-16 text-gray-400" />
              <div className="text-center  text-gray-400 ">
                No Upcoming Deadlines scheduled.
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleAddDeadline}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-[#0c5174] hover:bg-[#0a4360] text-white font-medium py-3 px-5 rounded-full shadow-sm transition-colors w-fit text-sm"
        >
          <Plus className="w-4 h-4" /> Add new Deadline
        </button>
      </div>

      {/* RIGHT COLUMN: Deadline History Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-[#62728d] font-semibold text-base mb-4">
          Deadline History:
        </h2>
        <hr className="border-gray-100 mb-4" />

        {displayDeadlines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <TimerOff className="w-16 h-16 text-gray-400" />
            <div className="text-center text-gray-400 ">
              No deadlines scheduled.
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {displayDeadlines.map((hearing: any) => (
              <div
                key={hearing.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 hover:border-gray-300 transition-all bg-white"
              >
                {/* Date & Time block */}
                <div className="w-1/3 min-w-[110px]">
                  <div className="text-gray-900 font-medium text-[15px]">
                    {hearing.day}-{hearing.month}-{hearing.year}
                  </div>
                  <div className="text-gray-500 text-sm mt-0.5">
                    {hearing.time_from} - {hearing.time_to} {hearing.am_pm}
                  </div>
                </div>

                {/* Court Location block */}
                <div className="w-1/2 border-l text-nowrap md:text-wrap border-gray-100 pl-4 text-gray-600 text-sm font-normal">
                  {hearing.reason}
                </div>

                {/* Status Badge block */}
                <div className="w-1/6 text-right border-l border-gray-100 pl-2 text-sm capitalize">
                  <span className={getStatusStyles(hearing.status)}>
                    {hearing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddEditHearingModal
        forModal="deadline"
        open={openModal}
        setOpen={setOpenModal}
        mode={mode}
        hearing={selectedDeadline}
      />
    </div>
  );
}