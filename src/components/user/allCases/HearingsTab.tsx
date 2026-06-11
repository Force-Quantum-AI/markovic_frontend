"use client";

import React, { useState } from "react";
import { Plus, Edit2, Calendar } from "lucide-react";

// 1. TypeScript Interface for type safety
interface Hearing {
  id: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: "Upcoming" | "Held" | "Postponed";
  daysRemaining?: number;
}

// 2. Dummy Dataset mimicking future API response
const DUMMY_HEARINGS: Hearing[] = [
  {
    id: "1",
    date: "22 May 2026",
    time: "09:00",
    location: "Basic Court Podgorica",
    type: "New hearing",
    status: "Upcoming",
    daysRemaining: 3,
  },
  {
    id: "2",
    date: "10 April 2026",
    time: "11:30",
    location: "Basic Court Podgorica",
    type: "Regular hearing",
    status: "Held",
  },
  {
    id: "3",
    date: "15 March 2026",
    time: "09:00",
    location: "Basic Court Podgorica",
    type: "Review hearing",
    status: "Postponed",
  },
];

export default function HearingsTab() {
  // Local state to handle dynamic additions/interactions in frontend
  const [hearings, setHearings] = useState<Hearing[]>(DUMMY_HEARINGS);

  // Find the next upcoming hearing dynamically
  const nextHearing = hearings.find((h) => h.status === "Upcoming");

  // Mock handler for adding a new hearing dynamically
  const handleAddHearing = () => {
    const newMockHearing: Hearing = {
      id: Date.now().toString(),
      date: "15 June 2026",
      time: "10:00",
      location: "Basic Court Podgorica",
      type: "Follow-up hearing",
      status: "Upcoming",
      daysRemaining: 4,
    };
    // If we want a strict flow where only one is "Upcoming", you can modify logic here
    setHearings([newMockHearing, ...hearings]);
    alert("Dummy hearing added successfully! (Local state updated)");
  };

  // Mock handler for editing a hearing
  const handleEditHearing = (id: string) => {
    alert(`Edit mode triggered for hearing ID: ${id}`);
  };

  // Helper function for styling status badges dynamically
  const getStatusStyles = (status: Hearing["status"]) => {
    switch (status) {
      case "Upcoming":
        return "text-blue-600 font-semibold";
      case "Held":
        return "text-green-600 font-semibold";
      case "Postponed":
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

          {nextHearing ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-emerald-600 text-sm font-medium block mb-3">
                    Next Hearing:
                  </span>
                  <div className="text-gray-900 font-bold text-xl tracking-tight">
                    {nextHearing.date}
                  </div>
                  <div className="text-gray-900 font-bold text-xl tracking-tight mb-4">
                    {nextHearing.time}
                  </div>
                  <span className="text-gray-700 text-sm bg-emerald-100/50 px-2.5 py-1 rounded-md">
                    {nextHearing.type}
                  </span>
                </div>

                <div className="flex flex-col items-end justify-between h-full space-y-8">
                  <button
                    onClick={() => handleEditHearing(nextHearing.id)}
                    className="p-2 text-teal-600 hover:bg-emerald-100 rounded-lg transition-colors"
                    aria-label="Edit hearing"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  {nextHearing.daysRemaining !== undefined && (
                    <span className="text-gray-500 text-xs font-medium">
                      {nextHearing.daysRemaining} Days Remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 border border-dashed rounded-xl">
              No upcoming hearings scheduled.
            </div>
          )}
        </div>

        <button
          onClick={handleAddHearing}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-[#0c5174] hover:bg-[#0a4360] text-white font-medium py-3 px-5 rounded-full shadow-sm transition-colors w-fit text-sm"
        >
          <Plus className="w-4 h-4" /> Add new Hearing
        </button>
      </div>

      {/* RIGHT COLUMN: Hearing History Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-[#62728d] font-semibold text-base mb-4">
          Hearing History:
        </h2>
        <hr className="border-gray-100 mb-4" />

        <div className="space-y-3">
          {hearings.map((hearing) => (
            <div
              key={hearing.id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 hover:border-gray-300 transition-all bg-white"
            >
              {/* Date & Time block */}
              <div className="w-1/3 min-w-[110px]">
                <div className="text-gray-900 font-medium text-[15px]">
                  {hearing.date}
                </div>
                <div className="text-gray-500 text-sm mt-0.5">
                  {hearing.time}
                </div>
              </div>

              {/* Court Location block */}
              <div className="w-1/2 border-l text-nowrap md:text-wrap border-gray-100 pl-4 text-gray-600 text-sm font-normal">
                {hearing.location}
              </div>

              {/* Status Badge block */}
              <div className="w-1/6 text-right border-l border-gray-100 pl-2 text-sm">
                <span className={getStatusStyles(hearing.status)}>
                  {hearing.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}