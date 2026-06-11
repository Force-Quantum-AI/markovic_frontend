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
  caseDetail: CaseDetail;
}

export default function CaseOverview({ caseDetail }: CaseOverviewProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [addLawyerOpen, setAddLawyerOpen] = useState(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>(caseDetail.assignedLawyers);

  // local editable state
  const [form, setForm] = useState({
    client: caseDetail.client,
    opposingParty: caseDetail.opposingParty,
    court: caseDetail.court,
    category: caseDetail.category,
    subcategory: caseDetail.subcategory,
    nextHearing: caseDetail.nextHearing,
    nextDeadline: caseDetail.nextDeadline,
    scn: caseDetail.scn,
  });

  const [saved, setSaved] = useState(form);

  const handleSave = () => {
    setSaved(form);
    setEditOpen(false);
  };

  const handleRemove = (lawyerId: string) => {
    setLawyers(lawyers.filter((l) => l.id !== lawyerId));
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
          <OverviewRow label="Client" value={saved.client} />
          <OverviewRow label="Opposing Party" value={saved.opposingParty} />
          <OverviewRow label="Court" value={saved.court} />
          <OverviewRow label="Case Number" value={caseDetail.caseNumber} />
          <OverviewRow label="Category" value={saved.category} />
          <OverviewRow label="Subcategory" value={saved.subcategory} />
          <OverviewRow label="Status">
            <StatusBadge status={caseDetail.status} />
          </OverviewRow>
          <OverviewRow label="Next Hearing" value={saved.nextHearing} />
          <OverviewRow label="Next Deadline" value={saved.nextDeadline} />
          <OverviewRow label="SCN" value={saved.scn} />
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
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={lawyer.image} />
                  <AvatarFallback>{lawyer.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{lawyer.name}</span>
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
      // data={caseDetail}
      />

      <AddLawyerModal
        open={addLawyerOpen}
        setOpen={() => setAddLawyerOpen(false)}
        data={{ caseId: caseDetail.id, caseName: caseDetail.client }}
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
