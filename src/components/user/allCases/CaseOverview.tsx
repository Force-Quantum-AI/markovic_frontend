"use client";

import { useState } from "react";
import { MoreVertical, Plus, Pencil } from "lucide-react";
import { CaseDetail, Lawyer } from "@/types/case.types";
import UpdateCaseOverviewModal from "@/components/modals/UpdateCaseOverviewModal";

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
            <Pencil className="w-4 h-4 text-gray-400" />
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
            className="px-3 py-1.5 rounded-lg bg-[#135576] hover:bg-[#0d3f59] text-white text-xs font-medium transition-colors"
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
                <LawyerAvatar lawyer={lawyer} />
                <span className="text-sm font-medium text-gray-700">{lawyer.name}</span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
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

      {/* ── Add Lawyer Modal ── */}
      {/* <Modal isOpen={addLawyerOpen} onClose={() => setAddLawyerOpen(false)} title="Add Responsible Lawyer">
        <AddLawyerForm
          existing={lawyers}
          onAdd={(l) => { setLawyers((p) => [...p, l]); setAddLawyerOpen(false); }}
          onClose={() => setAddLawyerOpen(false)}
        />
      </Modal> */}
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

function AddLawyerForm({
  existing,
  onAdd,
  onClose,
}: {
  existing: Lawyer[];
  onAdd: (l: Lawyer) => void;
  onClose: () => void;
}) {
  const existingIds = new Set(existing.map((l) => l.id));
  const available = AVAILABLE_LAWYERS.filter((l) => !existingIds.has(l.id));
  const [selected, setSelected] = useState<string>("");

  const handleAdd = () => {
    const lawyer = available.find((l) => l.id === selected);
    if (lawyer) onAdd(lawyer);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Select a lawyer to assign to this case.</p>
      <div className="space-y-2">
        {available.map((l) => (
          <label
            key={l.id}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selected === l.id
                ? "border-[#135576] bg-[#135576]/5"
                : "border-gray-100 hover:border-gray-200"
              }`}
          >
            <input
              type="radio"
              name="lawyer"
              value={l.id}
              checked={selected === l.id}
              onChange={() => setSelected(l.id)}
              className="accent-[#135576]"
            />
            <div
              className={`w-8 h-8 rounded-full ${l.color} flex items-center justify-center text-white text-xs font-bold`}
            >
              {l.initials}
            </div>
            <span className="text-sm font-medium text-gray-700">{l.name}</span>
          </label>
        ))}
        {available.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">All available lawyers are already assigned.</p>
        )}
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onClose}
          className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          disabled={!selected}
          className="flex-1 py-2 rounded-lg bg-[#135576] text-white text-sm font-medium hover:bg-[#0d3f59] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add Lawyer
        </button>
      </div>
    </div>
  );
}