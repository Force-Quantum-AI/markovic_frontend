"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  IdCard,
  Pencil,
  Plus,
  Briefcase,
  ChevronDown,
  Calendar,
  Flag,
} from "lucide-react";

// import Hearings from "@/components/user/cases/tabs/Hearings";
// import Deadlines from "@/components/user/cases/tabs/Deadlines";
// import Documents from "@/components/user/cases/tabs/Documents";
// import CaseNotes from "@/components/user/cases/tabs/CaseNotes";
import {
  DUMMY_CASE,
  DUMMY_HEARINGS,
  DUMMY_DEADLINES,
  DUMMY_DOCUMENTS,
  DUMMY_NOTES,
  DUMMY_CLIENT,
} from "@/data/caseData";
import { CaseStatus, ClientCase } from "@/types/case.types";
import CaseOverview from "./CaseOverview";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditPersonalModal from "@/components/modals/EditPersonalModal";
import AddLawyerModal from "@/components/modals/AddLawyerModal";
import EditNoteModal from "@/components/modals/EditNoteModal";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: CaseStatus }) {
  const map: Record<CaseStatus, string> = {
    Active: "bg-green-100 text-green-700",
    "On Appeal": "bg-blue-100 text-blue-700",
    Finished: "bg-gray-100 text-gray-500",
    Pending: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

// function Avatar({ name, size = "w-24 h-24" }: { name: string; size?: string }) {
//   // Using a real placeholder image service
//   return (
//     <div
//       className={`${size} rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white font-bold text-2xl overflow-hidden`}
//     >
//       {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
//     </div>
//   );
// }

// ─── Tab definition ───────────────────────────────────────────────────────────

type TabKey = "overview" | "hearings" | "deadlines" | "documents" | "notes";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Case Overview" },
  { key: "hearings", label: "Hearings" },
  { key: "deadlines", label: "Deadlines" },
  { key: "documents", label: "Documents" },
  { key: "notes", label: "Notes" },
];

// ─── Lawyer avatars strip ─────────────────────────────────────────────────────

function LawyerAvatarStrip() {
  return (
    <div className="flex items-center gap-1">
      {DUMMY_CASE.assignedLawyers.map((l, i) => (
        <div
          key={l.id}
          title={l.name}
          className={`w-8 h-8 relative rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${l.color}`}
          style={{ marginLeft: i > 0 ? "-12px" : 0, zIndex: DUMMY_CASE.assignedLawyers.length - i }}
        >
          <Image src={`/dummy-user.jpg`} alt={l.name} fill className="h-full w-full object-cover rounded-full" />
        </div>
      ))}
      {/* <button className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-[#135576] hover:bg-[#135576]/5 transition-colors ml-0.5">
        <Plus className="w-3.5 h-3.5 text-gray-400" />
      </button> */}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CaseDetailsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [editPersonalOpen, setEditPersonalOpen] = useState(false);
  const [addCaseOpen, setAddCaseOpen] = useState(false);
  const [editNotesOpen, setEditNotesOpen] = useState(false);
  const [caseFilter, setCaseFilter] = useState<"All" | CaseStatus>("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Local editable client state
  const [client, setClient] = useState(DUMMY_CLIENT);
  const [personalForm, setPersonalForm] = useState({
    phone: client.phone,
    email: client.email,
    address: client.address,
    personalId: client.personalId,
  });
  const [notesForm, setNotesForm] = useState(client.notes);

  // New case form
  const [newCaseForm, setNewCaseForm] = useState({ title: "", status: "Active" as CaseStatus });

  const filteredCases =
    caseFilter === "All"
      ? client.cases
      : client.cases.filter((c) => c.status === caseFilter);

  const handleSavePersonal = () => {
    setClient((p) => ({ ...p, ...personalForm }));
    setEditPersonalOpen(false);
  };

  const handleSaveNotes = () => {
    setClient((p) => ({ ...p, notes: notesForm }));
    setEditNotesOpen(false);
  };

  const handleAddCase = () => {
    if (!newCaseForm.title) return;
    const nc: ClientCase = {
      id: `case-${Date.now()}`,
      title: newCaseForm.title,
      status: newCaseForm.status,
    };
    setClient((p) => ({ ...p, cases: [...p.cases, nc] }));
    setNewCaseForm({ title: "", status: "Active" });
    setAddCaseOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 min-h-screen">
      {/* ════════════════════════════════════════════════════════════════
          LEFT PANEL — Client Info
      ════════════════════════════════════════════════════════════════ */}
      <aside className="w-full lg:w-72 xl:w-100 shrink-0 space-y-6 bg-white rounded-2xl p-5 ">
        {/* Profile card */}
        <div className=" flex flex-col items-center text-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/dummy-user.jpg" />
            <AvatarFallback>{client.name}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold text-gray-800 mt-3">{client.name}</h2>
          <p className="text-sm text-gray-400">{client.company}</p>
        </div>

        {/* Personal details */}
        <div className="">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
            <h3 className="text-sm font-semibold text-gray-700">Personal Details:</h3>
            <button
              onClick={() => setEditPersonalOpen(true)}
              className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { Icon: Phone, label: "Number:", value: client.phone },
              { Icon: Mail, label: "Email:", value: client.email },
              { Icon: MapPin, label: "Address:", value: client.address },
              { Icon: IdCard, label: "Personal ID number:", value: client.personalId },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex flex-col min-w-0 w-full">
                  <span className="text-[10px] text-gray-400">{label}</span>
                  <span className="text-xs text-gray-700 break-all">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cases list */}
        <div className="">
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
            <h3 className="text-sm font-semibold text-gray-700">Cases:</h3>
            {/* Filter dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen((p) => !p)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
              >
                {caseFilter}
                <ChevronDown className="w-3 h-3" />
              </button>
              {filterOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 min-w-[110px]">
                  {(["All", "Active", "On Appeal", "Finished", "Pending"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setCaseFilter(s); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors ${caseFilter === s ? "text-[#135576] font-medium" : "text-gray-600"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-0.5">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className={`flex items-start gap-2 p-2.5 rounded-xl cursor-pointer transition-colors ${c.id === "case-1"
                  ? "bg-[#135576]/5 border border-[#135576]/15"
                  : "hover:bg-gray-50 border border-transparent"
                  }`}
              >
                <Briefcase className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 leading-snug line-clamp-2">{c.title}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>

          <button
            onClick={() => setAddCaseOpen(true)}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#135576] text-xs font-medium text-[#135576] hover:border-[#135576] hover:text-[#135576] hover:bg-[#135576]/5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New
          </button>
        </div>

        {/* Notes */}
        <div className="h-fit">
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
            <h3 className="text-sm font-semibold text-gray-700">Notes</h3>
            <button
              onClick={() => { setNotesForm(client.notes); setEditNotesOpen(true); }}
              className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-xl p-2 ">{client.notes}</p>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════════
          RIGHT PANEL — Case Info
      ════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
        {/* Case header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Case number</p>
              <p className="text-sm font-semibold text-[#135576]">{DUMMY_CASE.caseNumber}</p>
            </div>
            <p className="text-xs text-gray-400 shrink-0">Created on: {DUMMY_CASE.createdAt}</p>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug mb-4">
            {DUMMY_CASE.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Assign lawyers */}
            <div className="">
              <span className="text-xs text-gray-400">Assigned Lawyer</span>
              <LawyerAvatarStrip />
            </div>

            {/* Hearing & Deadline dates */}
            <div className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                  <Calendar className="w-3 h-3" />
                  Hearing:
                </div>
                <p className="text-sm font-semibold text-[#135576]">{DUMMY_CASE.hearingDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                  <Flag className="w-3 h-3" />
                  Deadline
                </div>
                <p className="text-sm font-semibold text-[#135576]">{DUMMY_CASE.deadlineDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-100">
          <div className="flex overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                  ? "border-[#135576] text-[#135576]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === "overview" && <CaseOverview caseDetail={DUMMY_CASE} />}
          {/* {activeTab === "hearings" && <Hearings hearings={DUMMY_HEARINGS} />}
          {activeTab === "deadlines" && <Deadlines deadlines={DUMMY_DEADLINES} />}
          {activeTab === "documents" && <Documents documents={DUMMY_DOCUMENTS} />}
          {activeTab === "notes" && <CaseNotes notes={DUMMY_NOTES} />} */}
        </div>
      </main>
      <EditPersonalModal
        open={editPersonalOpen}
        setOpen={setEditPersonalOpen}
        data={client}
      />
      <EditNoteModal
        open={editNotesOpen}
        setOpen={() => { setEditNotesOpen(false); }}
        data={{ note: client.notes || "" }}
      />
      {/* <AddLawyerModal
        open={addLawyerOpen}
        setOpen={() => setAddLawyerOpen(false)}
        data={{ caseId: caseDetail.id, caseName: caseDetail.client }}
      /> */}
    </div>
  );
}