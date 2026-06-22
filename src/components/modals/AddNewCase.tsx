"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, X, Camera, Info, Loader2 } from "lucide-react";
import { useAddCaseDeadlineMutation, useAddCaseHearingMutation, useCreateCaseMutation } from "@/store/features/case/case.api";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/getImageUrl";
import { SelectField } from "@/components/shared/SelectNewDropdown";

// ─── TYPES & INTERFACES (ALIGNED WITH ALL 3 FIGMA STEPS) ─────────────────────

export interface BasicInfoData {
  avatarUrl: string;
  avatarFile: File | null;
  clientName: string;
  emailAddress: string;
  phoneNumber: string;
  personalIdNumber: string;
  address: string;
  note: string;
}

export interface LegalDetailsData {
  caseName: string;
  category: string;
  subCategory: string;
  status: string;
  responsibleLawyers: string[];
  court: string;
  caseNumber: string;
  opposingParties: string[];
}

export interface DateCardData {
  reason: string;
  status: string;
  timeRange: string;
  period: string;
  date: string;
  month: string;
  year: string;
}

export interface ScheduleData {
  hearing: DateCardData;
  deadline: DateCardData;
}

export interface AddNewCaseFormData {
  basicInfo: BasicInfoData;
  legalDetails: LegalDetailsData;
  schedule: ScheduleData;
}

interface AddNewCaseProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: AddNewCaseFormData) => void;
  clientName?: string;
  clientId?: string;
  clientAddress?: string;
  clientEmail?: string;
  clientPhoneNumber?: string;
  clientAvatar?: string;
  clientNote?: string;
}

// ─── STEPPER ICONS ───────────────────────────────────────────────────────────

function BasicInfoIcon({ active }: { active: boolean }) {
  const color = active ? "#135576" : "#BEC4D2";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

function LegalIcon({ active }: { active: boolean }) {
  const color = active ? "#135576" : "#BEC4D2";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CalendarIcon({ active }: { active: boolean }) {
  const color = active ? "#135576" : "#BEC4D2";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ─── STEPPER MODULE ───────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Basic information" },
  { id: 2, label: "Legal details" },
  { id: 3, label: "Schedule" },
];

function Stepper({ current }: { current: number }) {
  return (
    <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto px-4 md:px-12">
      <div className="absolute top-5 left-[12%] right-[12%] h-[2px] bg-gray-200 -z-10">
        <div
          className="h-full bg-[#135576] transition-all duration-300"
          style={{ width: current === 1 ? "0%" : current === 2 ? "50%" : "100%" }}
        />
      </div>

      {STEPS.map((step) => {
        const isDone = step.id < current;
        const isActive = step.id === current;
        const isCompletedOrActive = isDone || isActive;

        return (
          <div key={step.id} className="flex flex-col items-center gap-2.5 relative z-10">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white shadow-sm ${isCompletedOrActive ? "border-[#135576] text-[#135576]" : "border-gray-200 text-gray-400"
                }`}
            >
              {step.id === 1 && <BasicInfoIcon active={isCompletedOrActive} />}
              {step.id === 2 && <LegalIcon active={isCompletedOrActive} />}
              {step.id === 3 && <CalendarIcon active={isCompletedOrActive} />}
            </div>
            <span className={`text-xs md:text-sm font-medium ${isCompletedOrActive ? "text-[#135576]" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm font-semibold text-gray-500 select-none px-0.5 block mb-1.5">
      {children}
    </label>
  );
}

// ─── STEP 1 CONTENT: BASIC INFORMATION ───────────────────────────────────────

function BasicInformationStep({ data, onChange }: { data: BasicInfoData; onChange: (d: BasicInfoData) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setField = (key: keyof BasicInfoData) => (v: string) => onChange({ ...data, [key]: v });

  return (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">Basic information</h3>
      <div className="flex items-center gap-4 pt-1">
        <div className="relative w-24 h-24 rounded-full bg-[#d9d9d9] flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-100 shadow-inner">
          {data.avatarUrl ? (
            <Image src={data.avatarUrl} alt="Preview avatar" fill className="object-cover" />
          ) : (
            <div className="w-7 h-7 bg-[#135576] rounded-full flex items-center justify-center text-white shadow-sm">
              <Camera className="w-4 h-4" />
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onChange({ ...data, avatarUrl: URL.createObjectURL(file), avatarFile: file });
          }
        }} accept="image/*" className="hidden" />
        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-all shadow-sm">
          Add Photo
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5 w-full">
          <FieldLabel>Client name <span className="text-red-500">*</span></FieldLabel>
          <input type="text" value={data.clientName} onChange={(e) => setField("clientName")(e.target.value)} placeholder="Markovic Aleksa" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
          <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium px-1 pt-0.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>You have to add a name to create a case.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <input type="email" value={data.emailAddress} onChange={(e) => setField("emailAddress")(e.target.value)} placeholder="markovicaleksa@email.com" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
          </div>
          <div>
            <FieldLabel>Phone Number</FieldLabel>
            <input type="tel" value={data.phoneNumber} onChange={(e) => setField("phoneNumber")(e.target.value)} placeholder="+386 54683248" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
          </div>
        </div>

        <div>
          <FieldLabel>Personal ID Number</FieldLabel>
          <input type="text" value={data.personalIdNumber} onChange={(e) => setField("personalIdNumber")(e.target.value)} placeholder="#555-0128" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
        </div>

        <div>
          <FieldLabel>Address</FieldLabel>
          <input type="text" value={data.address} onChange={(e) => setField("address")(e.target.value)} placeholder="Ulica Nedeljka Merdovića 42, 84000 Bijelo Polje" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
        </div>

        <div>
          <FieldLabel>Note</FieldLabel>
          <textarea value={data.note} onChange={(e) => setField("note")(e.target.value)} placeholder="Type here..." rows={4} className="w-full px-5 py-4 border border-gray-200 rounded-3xl text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all resize-none shadow-sm text-gray-800" />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2 CONTENT: LEGAL DETAILS ───────────────────────────────────────────

function LegalDetailsStep({ data, onChange }: { data: LegalDetailsData; onChange: (d: LegalDetailsData) => void }) {
  const [lawyerInput, setLawyerInput] = useState("");
  const [opposingInput, setOpposingInput] = useState("");
  const setField = (key: keyof LegalDetailsData) => (v: any) => onChange({ ...data, [key]: v });

  return (
    <div className="w-full space-y-5">
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">Legal details</h3>
      <div className="space-y-1.5">
        <FieldLabel>Case name:</FieldLabel>
        <input type="text" value={data.caseName} onChange={(e) => setField("caseName")(e.target.value)} placeholder="Markovic/Lovence Insurance - damages claim - PI" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>Category:</FieldLabel>
          <div className="relative w-full">
            <SelectField
              label="Category"
              type="category"
              value={data.category}
              onChange={setField("category")}
            />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-1.5">
          <FieldLabel>Sub-Category:</FieldLabel>
          <div className="relative w-full">
            <SelectField
              label="Sub Category"
              type="subCategory"
              categoryId={data.category ? Number(data.category) : undefined}
              value={data.subCategory}
              onChange={setField("subCategory")}
            />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel>Status:</FieldLabel>
        <div className="relative w-full">
          <SelectField
            label="Status"
            type="status"
            value={data.status}
            onChange={setField("status")}
          />
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel>Responsible lawyer or legal trainee:</FieldLabel>
        <input type="text" value={lawyerInput} onChange={(e) => setLawyerInput(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter" && lawyerInput.trim()) {
            e.preventDefault();
            if (!data.responsibleLawyers.includes(lawyerInput.trim())) setField("responsibleLawyers")([...data.responsibleLawyers, lawyerInput.trim()]);
            setLawyerInput("");
          }
        }} placeholder="Type email here..." className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
        <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium px-1 pt-0.5"><Info className="w-3.5 h-3.5" /><span>Type email to add your co-worker to this case.</span></div>
        <div className="flex flex-wrap gap-2 pt-1">
          {data.responsibleLawyers.map((lawyer, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#e9eff2] text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-100">
              <span>{lawyer}</span><button type="button" onClick={() => setField("responsibleLawyers")(data.responsibleLawyers.filter((_, idx) => idx !== i))}><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>Court:</FieldLabel>
          <div className="relative w-full">
            <select value={data.court} onChange={(e) => setField("court")(e.target.value)} className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-10">
              <option value="Montenegro suprime Court">Montenegro suprime Court</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-1.5">
          <FieldLabel>Case number:</FieldLabel>
          <input type="text" value={data.caseNumber} onChange={(e) => setField("caseNumber")(e.target.value)} placeholder="MKL-87587345-TA" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]" />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel>Opposing party:</FieldLabel>
        <input type="text" value={opposingInput} onChange={(e) => setOpposingInput(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter" && opposingInput.trim()) {
            e.preventDefault();
            if (!data.opposingParties.includes(opposingInput.trim())) setField("opposingParties")([...data.opposingParties, opposingInput.trim()]);
            setOpposingInput("");
          }
        }} placeholder="Lovcen insurance Company" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]" />
        <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium px-1 pt-0.5"><Info className="w-3.5 h-3.5" /><span>Type name and press enter to add opposing parties.</span></div>
        <div className="flex flex-wrap gap-2 pt-1">
          {data.opposingParties.map((party, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#f8fafc] text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200">
              <span>{party}</span><button type="button" onClick={() => setField("opposingParties")(data.opposingParties.filter((_, idx) => idx !== i))}><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STEP 3 CONTENT: SCHEDULE (SAME TO SAME AS FIGMA IMAGE) ───────────────────

function ScheduleCard({
  title,
  data,
  onChange,
}: {
  title: string;
  data: DateCardData;
  onChange: (d: DateCardData) => void;
}) {
  const updateField = (key: keyof DateCardData) => (value: string) => {
    onChange({ ...data, [key]: value });
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2024", "2025", "2026", "2027", "2028"];

  return (
    <div className="w-full border border-gray-200 rounded-[24px] p-5 md:p-6 bg-white space-y-4 shadow-sm">
      <h4 className="text-base font-bold text-gray-900 tracking-tight">{title}</h4>

      {/* Reason + Status Double Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>Reason:</FieldLabel>
          <input
            type="text"
            value={data.reason}
            onChange={(e) => updateField("reason")(e.target.value)}
            placeholder="New hearing"
            className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel>Status:</FieldLabel>
          <div className="relative w-full">
            <select
              value={data.status}
              onChange={(e) => updateField("status")(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-10 shadow-sm"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Time Frame Layout Input Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>Time:</FieldLabel>
          <input
            type="text"
            value={data.timeRange}
            onChange={(e) => updateField("timeRange")(e.target.value)}
            placeholder="9:30 - 10:00"
            className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5 flex flex-col justify-end">
          <div className="relative w-full">
            <select
              value={data.period}
              onChange={(e) => updateField("period")(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-10 shadow-sm"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Date, Month, and Year Selector Stack Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <FieldLabel>Date:</FieldLabel>
          <div className="relative w-full">
            <select
              value={data.date}
              onChange={(e) => updateField("date")(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-8 shadow-sm text-center"
            >
              {days.map((d) => (<option key={d} value={d}>{d}</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <FieldLabel>Month:</FieldLabel>
          <div className="relative w-full">
            <select
              value={data.month}
              onChange={(e) => updateField("month")(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-8 shadow-sm text-center"
            >
              {months.map((m) => (<option key={m} value={m}>{m}</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Labeled 'Client name:' exactly mirroring Figma labels error */}
        <div className="space-y-1.5">
          <FieldLabel>Year :</FieldLabel>
          <div className="relative w-full">
            <select
              value={data.year}
              onChange={(e) => updateField("year")(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-8 shadow-sm text-center"
            >
              {years.map((y) => (<option key={y} value={y}>{y}</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleStep({
  data,
  onChange,
}: {
  data: ScheduleData;
  onChange: (d: ScheduleData) => void;
}) {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 tracking-tight">Schedule</h3>

      {/* Add Hearing Date Segment Card */}
      <ScheduleCard
        title="Add Hearing Date"
        data={data.hearing}
        onChange={(hearing) => onChange({ ...data, hearing })}
      />

      {/* Add Deadline Date Segment Card */}
      <ScheduleCard
        title="Add Deadline Date"
        data={data.deadline}
        onChange={(deadline) => onChange({ ...data, deadline })}
      />
    </div>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ─── HELPER: Build ISO date string from schedule card data ───────────────────

function buildDateString(card: DateCardData): string | undefined {
  const monthIndex = MONTHS.indexOf(card.month);
  if (monthIndex === -1 || !card.date || !card.year) return undefined;
  const day = card.date.padStart(2, "0");
  const month = String(monthIndex + 1).padStart(2, "0");
  return `${card.year}-${month}-${day}`;
}

// ─── MAIN MODAL COMPONENT ───────────────────────────────────────────────────

export default function AddNewCase({ isOpen, onClose, onSubmit,clientName,clientId, clientAddress, clientEmail, clientPhoneNumber, clientAvatar, clientNote }: AddNewCaseProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // ─── INITIAL SYSTEM FORM DICTIONARY ──────────────────────────────────────────

  const defaultFormData: AddNewCaseFormData = {
    basicInfo: {
      avatarUrl: clientAvatar ? getImageUrl(clientAvatar) : "",
      avatarFile: null,
      clientName: clientName || "",
      emailAddress: clientEmail || "",
      phoneNumber: clientPhoneNumber || "",
      personalIdNumber: clientId || "",
      address: clientAddress || "",
      note: clientNote || "",
    },
    legalDetails: {
      caseName: "",
      category: "",
      subCategory: "",
      status: "",
      responsibleLawyers: [],
      court: "Montenegro suprime Court",
      caseNumber: "",
      opposingParties: [],
    },
    schedule: {
      hearing: {
        reason: "",
        status: "Upcoming",
        timeRange: "",
        period: "AM",
        date: "1",
        month: "January",
        year: "2026",
      },
      deadline: {
        reason: "",
        status: "Upcoming",
        timeRange: "",
        period: "AM",
        date: "1",
        month: "January",
        year: "2026",
      },
    },
  };
  const [formData, setFormData] = useState<AddNewCaseFormData>(defaultFormData);

  const [createCase, { isLoading }] = useCreateCaseMutation();
  const [addCaseHearing] = useAddCaseHearingMutation();
  const [addCaseDeadline] = useAddCaseDeadlineMutation();

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setFormData(defaultFormData);
    }, 300);
  };

  const handleSave = async () => {
    // Validate required field
    if (!formData.basicInfo.clientName.trim()) {
      toast.error("Client name is required to create a case.");
      setCurrentStep(1);
      return;
    }
    if (!formData.legalDetails.caseName.trim()) {
      toast.error("Case name is required to create a case.");
      setCurrentStep(2);
      return;
    }

    // Build API payload
    const apiData: Record<string, any> = {
      client_name: formData.basicInfo.clientName.trim(),
    };

    // Optional basic info fields
    if (formData.basicInfo.emailAddress.trim()) {
      apiData.client_email = formData.basicInfo.emailAddress.trim();
    }
    if (formData.basicInfo.phoneNumber.trim()) {
      apiData.client_phone = formData.basicInfo.phoneNumber.trim();
    }
    if (formData.basicInfo.address.trim()) {
      apiData.client_address = formData.basicInfo.address.trim();
    }
    if (formData.basicInfo.note.trim()) {
      apiData.note = formData.basicInfo.note.trim();
    }

    // Optional legal details
    if (formData.legalDetails.caseName.trim()) {
      apiData.case_name = formData.legalDetails.caseName.trim();
    }
    if (formData.legalDetails.category) {
      apiData.category = Number(formData.legalDetails.category);
    }
    if (formData.legalDetails.subCategory) {
      apiData.sub_category = Number(formData.legalDetails.subCategory);
    }
    if (formData.legalDetails.status) {
      apiData.status = Number(formData.legalDetails.status);
    }
    if (formData.legalDetails.responsibleLawyers.length > 0) {
      apiData.responsible_lawyer_ids = formData.legalDetails.responsibleLawyers;
    }
    if (formData.legalDetails.opposingParties.length > 0) {
      apiData.opposing_parties = formData.legalDetails.opposingParties;
    }

    // Schedule: hearing date
    const hearingDate = buildDateString(formData.schedule.hearing);
    if (hearingDate) {
      apiData.hearing_date = hearingDate;
    }

    // Schedule: deadline date
    const deadlineDate = buildDateString(formData.schedule.deadline);
    if (deadlineDate) {
      apiData.deadline_date = deadlineDate;
    }

    try {
      const res = await createCase({
        client_image: formData.basicInfo.avatarFile || undefined,
        data: apiData as any,
      }).unwrap();

      toast.success("Case created successfully!");
      if (res?.id) {
        await createHearingAndDeadline(res.id);
      }
      onSubmit?.(formData);
      handleClose();
    } catch (error: any) {
      console.log("error iss:", error);

      const message = error?.data?.message || error?.data?.detail || "Failed to create case. Please try again.";
      toast.error(message);
    }
  };

  const createHearingAndDeadline = async (caseId: string) => {
    try {
      const hearingTimeFrom = formData.schedule.hearing.timeRange.split("-")[0].trim();
      const hearingTimeTo = formData.schedule.hearing.timeRange.split("-")[1].trim();
      await addCaseHearing({
        caseId: caseId,
        data: {
          reason: formData.schedule.hearing.reason,
          status: formData.schedule.hearing.status.toLowerCase(),
          time_from: hearingTimeFrom,
          time_to: hearingTimeTo,
          am_pm: formData.schedule.hearing.period.toUpperCase(),
          day: Number(formData.schedule.hearing.date),
          month: MONTHS.indexOf(formData.schedule.hearing.month) + 1,
          year: Number(formData.schedule.hearing.year),
        },
      }).unwrap();

      const deadlineTimeFrom = formData.schedule.deadline.timeRange.split("-")[0].trim();
      const deadlineTimeTo = formData.schedule.deadline.timeRange.split("-")[1].trim();
      await addCaseDeadline({
        caseId: caseId,
        data: {
          reason: formData.schedule.deadline.reason,
          status: formData.schedule.deadline.status.toLowerCase(),
          time_from: deadlineTimeFrom,
          time_to: deadlineTimeTo,
          am_pm: formData.schedule.deadline.period.toUpperCase(),
          day: Number(formData.schedule.deadline.date),
          month: MONTHS.indexOf(formData.schedule.deadline.month) + 1,
          year: Number(formData.schedule.deadline.year),
        },
      }).unwrap();
      setTimeout(() => {
        toast.success("Hearing and deadline added successfully!");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        toast.error("Please enter hearing and deadline from case details page for this case.");
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogTitle />
      <DialogContent className="max-w-7xl! w-[95vw] bg-white rounded-[32px] p-6 md:p-8 overflow-hidden border-none shadow-2xl flex flex-col focus:outline-none max-h-[95vh]">

        {/* Global Component Heading Block */}
        <div className="w-full text-center pb-2 pt-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Add New Case</h2>
        </div>

        {/* Component Core Scrollable Viewport Content Layer */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6 my-2 scrollbar-thin">
          <Stepper current={currentStep} />

          <div className="w-full h-[1px] bg-gray-100" />

          {/* Steps Conditional Controller Container */}
          <div className="px-1 md:px-4">
            {currentStep === 1 && (
              <BasicInformationStep
                data={formData.basicInfo}
                onChange={(basicInfo) => setFormData((f) => ({ ...f, basicInfo }))}
              />
            )}
            {currentStep === 2 && (
              <LegalDetailsStep
                data={formData.legalDetails}
                onChange={(legalDetails) => setFormData((f) => ({ ...f, legalDetails }))}
              />
            )}
            {currentStep === 3 && (
              <ScheduleStep
                data={formData.schedule}
                onChange={(schedule) => setFormData((f) => ({ ...f, schedule }))}
              />
            )}
          </div>
        </div>

        {/* Action Options Control Navigation Bar Footer */}
        <div className="flex items-center justify-between w-full pt-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleClose}
            className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-gray-500 bg-[#e9eff2] hover:bg-gray-200 transition-all focus:outline-none"
          >
            Save as draft
          </button>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((p) => p - 1)}
                className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none"
              >
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((p) => p + 1)}
                className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-white bg-[#135576] hover:bg-[#0f445f] transition-all focus:outline-none active:scale-95 shadow-md shadow-blue-900/10"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSave}
                className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-white bg-[#135576] hover:bg-[#0f445f] transition-all focus:outline-none active:scale-95 shadow-md shadow-blue-900/10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}