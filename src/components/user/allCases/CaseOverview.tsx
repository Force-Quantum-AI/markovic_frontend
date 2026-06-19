"use client";

import { useState } from "react";
import { MoreVertical, Trash2, SquarePen } from "lucide-react";
import { CaseDetail, Lawyer } from "@/types/case.types";
import UpdateCaseOverviewModal from "@/components/modals/UpdateCaseOverviewModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddLawyerModal from "@/components/modals/AddLawyerModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// ─── Avatar helpers ───────────────────────────────────────────────────────────

function LawyerAvatar({ lawyer, size = "w-9 h-9" }: { lawyer: Lawyer; size?: string }) {
  if (lawyer.avatar) {
    return (
      <img
        src={lawyer.avatar}
        alt={lawyer.name}
        className={`${size} rounded-full object-cover border-2 border-white`}
      />
    );
  }
  return (
    <div
      className={`${size} rounded-full ${lawyer.color} flex items-center justify-center border-2 border-white text-white text-xs font-bold`}
    >
      {lawyer.initials}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-200",
    "On Appeal": "bg-blue-100 text-blue-700 border-blue-200",
    Finished: "bg-gray-100 text-gray-600 border-gray-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${map[status] ?? "bg-gray-100 text-gray-600 border-gray-200"
        }`}
    >
      {status}
    </span>
  );
}

// ─── Overview row ─────────────────────────────────────────────────────────────

function OverviewRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-400 w-40 shrink-0">{label}:</span>
      {children ?? <span className="text-sm text-gray-800 text-right">{value}</span>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface CaseOverviewProps {
  activeData: any;
}

export default function CaseOverview({ activeData }: CaseOverviewProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [addLawyerOpen, setAddLawyerOpen] = useState(false);
  const lawyers = activeData?.responsible_lawyers || [];

  const handleSave = () => {
    // Implement save logic via RTK
    setEditOpen(false);
  };

  const handleRemove = (lawyerId: string) => {
    // Implement lawyer removal logic
    console.log("Remove lawyer", lawyerId);
  };

  const getNextDateStr = (arr: any) => {
    if (!arr || !arr.length) return "Not set";
    return `${arr[0].day}-${arr[0].month}-${arr[0].year}`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* ── Left: Overview fields ── */}
      <div className="flex-1 min-w-0 border-r pr-5">
        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800">Overview</h3>
          <button
            onClick={() => setEditOpen(true)}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div>
          <OverviewRow label="Client" value={activeData?.client_name} />
          <div className="flex flex-col gap-2 py-3 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-400 ">Opposing Party:</span>
            <div className="flex flex-col items-end">
              {activeData?.opposing_parties.map((party: string, key: number) => (
                <span className="text-sm text-gray-800 " key={key}>{key + 1}. {party}</span>
              ))}
            </div>
          </div>
          <OverviewRow label="Court" value={activeData?.court_name} />
          <OverviewRow label="Case Number" value={activeData?.case_number} />
          <OverviewRow label="Category" value={activeData?.category_name} />
          <OverviewRow label="Subcategory" value={activeData?.sub_category_name} />
          <OverviewRow label="Status">
            <StatusBadge status={activeData?.status_name} />
          </OverviewRow>
          <OverviewRow label="Next Hearing" value={getNextDateStr(activeData?.next_hearing)} />
          <OverviewRow label="Next Deadline" value={getNextDateStr(activeData?.next_deadline)} />
          <OverviewRow label="SCN" value={"N/A"} />
        </div>
      </div>

      {/* ── Right: Responsible Lawyers ── */}
      <div className="w-full lg:w-72 shrink-0">
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
          <h3 className="text-sm font-semibold text-gray-700">Responsible Lawyer:</h3>
          <button
            onClick={() => setAddLawyerOpen(true)}
            className="px-5 py-2 rounded-2xl bg-[#135576] hover:bg-[#0d3f59] text-white text-xs font-medium transition-colors"
          >
            Add New
          </button>
        </div>

        <div className="space-y-2">
          {lawyers.map((lawyer: any) => (
            <div
              key={lawyer.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 bg-gray-200">
                  <AvatarImage src={lawyer.profile_image?.startsWith("http") ? lawyer.profile_image : `https://res.cloudinary.com/dnu0axtez/${lawyer.profile_image}`} />
                  <AvatarFallback>{lawyer.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{lawyer.full_name}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                  <DropdownMenuItem onClick={() => handleRemove(lawyer.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none">
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span>Remove</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          ))}
        </div>
      </div>

      {/* ── Edit Overview Modal ── */}
      <UpdateCaseOverviewModal
        open={editOpen}
        setOpen={setEditOpen}
        data={activeData}
        caseId={activeData?.id}
      />

      <AddLawyerModal
        open={addLawyerOpen}
        setOpen={() => setAddLawyerOpen(false)}
        data={{ caseId: activeData?.id, responsible_lawyers: activeData?.responsible_lawyers }}
      />
    </div>
  );
}

// ─── Add Lawyer Form ──────────────────────────────────────────────────────────

const AVAILABLE_LAWYERS: Lawyer[] = [
  { id: "l4", name: "Sarah Connor", initials: "SC", color: "bg-purple-400" },
  { id: "l5", name: "James Martin", initials: "JM", color: "bg-blue-400" },
  { id: "l6", name: "Olivia Turner", initials: "OT", color: "bg-teal-400" },
  { id: "l7", name: "Robert Fox", initials: "RF", color: "bg-red-400" },
];
