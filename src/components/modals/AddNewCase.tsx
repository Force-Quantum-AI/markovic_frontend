"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, X, Camera, Info, Loader2, Loader, Cross } from "lucide-react";
import { useAddCaseDeadlineMutation, useAddCaseHearingMutation, useCreateCaseMutation } from "@/store/features/case/case.api";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/getImageUrl";
import { SelectField } from "@/components/shared/SelectNewDropdown";
import { SelectFieldForStatus } from "@/components/shared/SelectFieldForStatus";
import { useGetAllUsersQuery } from "@/store/features/admin/my-users/my-users.api";
import { useGetAllClientsQuery, useLazyGetAllClientsQuery, useLazyGetAllLawyersQuery } from "@/store/features/profile/profile.api";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  responsibleLawyers: {
    id: string;
    full_name: string;
    email: string;
    profile_image?: string;
  }[];
  court: string;
  caseNumber: string;
  opposingParties: string[];
}

export interface DateCardData {
  reason: string;
  status: number;
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

const STEPS_KEYS = [
  { id: 1, key: "basic_information" },
  { id: 2, key: "legal_details" },
  { id: 3, key: "schedule" },
];

function Stepper({ current }: { current: number }) {
  const { t } = useTranslation("common");
  return (
    <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto px-4 md:px-12">
      <div className="absolute top-5 left-[12%] right-[12%] h-[2px] bg-gray-200 -z-10">
        <div
          className="h-full bg-[#135576] transition-all duration-300"
          style={{ width: current === 1 ? "0%" : current === 2 ? "50%" : "100%" }}
        />
      </div>

      {STEPS_KEYS.map((step) => {
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
              {t(step.key)}
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
  const { t } = useTranslation("common");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setField = (key: keyof BasicInfoData) => (v: string) => onChange({ ...data, [key]: v });

  const [clientSearch, setClientSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [
    triggerGetClients,
    { data: clientData, isLoading: isClientLoading }
  ] = useLazyGetAllClientsQuery();

  const clients = clientData?.clients?.results || [];

  const handleClientSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setClientSearch(value);
    setField("clientName")(value);
    if (value.trim().length >= 2) {
      setShowDropdown(true);

      try {
        await triggerGetClients({
          search: value,
          page: 1,
          page_size: 5,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectClient = (client: any) => {
    onChange({
      ...data,
      clientName: client.client_name,
      emailAddress: client.email,
      phoneNumber: client.phone_number,
      avatarUrl: client.client_image || "",
    });
    setClientSearch(client.client_name);
    setShowDropdown(false);
  };

  return (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t("basic_information")}</h3>
      <div className="flex items-center gap-4 pt-1">
        <div className="relative w-24 h-24 rounded-full bg-[#d9d9d9] shrink-0 overflow-hidden flex items-center justify-center border border-gray-100 shadow-inner">
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
          {t("add_photo")}
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5 relative">

          <FieldLabel>
            {t("client_name")} <span className="text-red-500">*</span>
          </FieldLabel>

          <input
            type="text"
            value={data.clientName}
            onChange={handleClientSearch}
            placeholder="Markovic Aleksa"
            className="w-full px-5 py-3.5 border border-gray-200 rounded-full"
          />

          {
            showDropdown && (

              <div className="absolute z-50 top-full left-0 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-60 overflow-y-auto">

                {
                  isClientLoading ? (
                    <div className="px-4 py-4 flex items-center gap-3 text-gray-500">
                      <Loader className="w-4 h-4 animate-spin" />
                      {t("loading")}
                    </div>
                  ) : clients.length > 0 ? (
                    clients.map((client: any) => (
                      <div className="relative" key={client.email}>
                      <button
                        type="button"
                        onClick={() => handleSelectClient(client)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                      >
                        <div className="h-8 w-8 relative rounded-full overflow-hidden">
                          <Image
                            src={client.client_image || "/dummy-user.jpg"}
                            alt={client.client_name}
                            fill
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="">
                          <p className="font-semibold">
                            {client.client_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {client.email}
                          </p>
                        </div>
                      </button>
                      <X className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 hover:cursor-pointer hover:bg-gray-200 rounded-md p-1" onClick={() => setShowDropdown(false)} />
                      </div>
                    ))

                  ) : (
                    <div onClick={() => setShowDropdown(false)} className="px-4 py-4 text-sm text-gray-500 flex items-center justify-between">
                      {t("no_client_found_create")} <X className="w-5 h-5 hover:cursor-pointer hover:bg-gray-200 rounded-md p-1" onClick={() => setShowDropdown(false)} />
                    </div>
                  )
                }
              </div>
            )
          }

          <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium px-1 pt-0.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{t("client_name_required_info")}</span>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel>{t("email_address_label")}</FieldLabel>
            <input type="email" value={data.emailAddress} onChange={(e) => setField("emailAddress")(e.target.value)} placeholder="markovicaleksa@email.com" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
          </div>
          <div>
            <FieldLabel>{t("phone_number_label")}</FieldLabel>
            <input type="tel" value={data.phoneNumber} onChange={(e) => setField("phoneNumber")(e.target.value)} placeholder="+386 54683248" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
          </div>
        </div>

        {/* <div>
          <FieldLabel>{t("personal_id_number_label")}</FieldLabel>
          <input type="text" value={data.personalIdNumber} onChange={(e) => setField("personalIdNumber")(e.target.value)} placeholder="#555-0128" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
        </div> */}

        <div>
          <FieldLabel>{t("address_label")}</FieldLabel>
          <input type="text" value={data.address} onChange={(e) => setField("address")(e.target.value)} placeholder="Ulica Nedeljka Merdovića 42, 84000 Bijelo Polje" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
        </div>

        <div>
          <FieldLabel>{t("note_label")}</FieldLabel>
          <textarea value={data.note} onChange={(e) => setField("note")(e.target.value)} placeholder={t("type_here")} rows={4} className="w-full px-5 py-4 border border-gray-200 rounded-3xl text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all resize-none shadow-sm text-gray-800" />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2 CONTENT: LEGAL DETAILS ───────────────────────────────────────────

function LegalDetailsStep({ data, onChange }: { data: LegalDetailsData; onChange: (d: LegalDetailsData) => void }) {
  const { t } = useTranslation("common");
  const [lawyerInput, setLawyerInput] = useState("");
  const [opposingInput, setOpposingInput] = useState("");
  const setField = (key: keyof LegalDetailsData) => (v: any) => onChange({ ...data, [key]: v });

  const [triggerSearch, { data: searchResults = [], isFetching }] = useLazyGetAllLawyersQuery();

  useEffect(() => {
    if (lawyerInput.trim().length >= 3) {
      triggerSearch(lawyerInput);
    }
  }, [lawyerInput, triggerSearch]);


  return (
    <div className="w-full space-y-5">
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t("legal_details")}</h3>
      <div className="space-y-1.5">
        <FieldLabel>{t("case_name_colon")}</FieldLabel>
        <input type="text" value={data.caseName} onChange={(e) => setField("caseName")(e.target.value)} placeholder="Markovic/Lovence Insurance - damages claim - PI" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>{t("category_colon")}</FieldLabel>
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
          <FieldLabel>{t("sub_category_colon")}</FieldLabel>
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
        <FieldLabel>{t("status_colon")}</FieldLabel>
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

      <div className="space-y-1.5 relative">
        <FieldLabel>{t("responsible_lawyer_trainee_colon")}</FieldLabel>
        <input
          type="text"
          value={lawyerInput}
          onChange={(e) => setLawyerInput(e.target.value)}
          placeholder="Type email/name here..."
          className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm"
        />

        {/* Search Results Dropdown */}
        {lawyerInput.trim().length >= 3 && (
          <div className="absolute z-50 top-full left-0 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-60 overflow-y-auto">
            {isFetching ? (
              <div className="px-4 py-4 flex items-center gap-3 text-gray-500">
                <Loader className="w-4 h-4 animate-spin" />
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults
                .filter((lawyer: any) => !data.responsibleLawyers.some((l) => l.id === lawyer.id))
                .map((lawyer: any) => (
                  <button
                    key={lawyer.id}
                    type="button"
                    onClick={() => {
                      setField("responsibleLawyers")([
                        ...data.responsibleLawyers,
                        {
                          id: lawyer.id,
                          full_name: lawyer.full_name,
                          email: lawyer.email,
                          profile_image: lawyer.profile_image,
                        },
                      ]);
                      setLawyerInput("");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 flex items-center gap-3"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={lawyer.profile_image} />
                      <AvatarFallback>{lawyer.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{lawyer.full_name}</p>
                      <p className="text-xs text-gray-500">{lawyer.email}</p>
                    </div>
                  </button>
                ))
            ) : (
              <div className="px-4 py-4 text-sm text-gray-500">
                No lawyer found
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium px-1 pt-0.5">
          <Info className="w-3.5 h-3.5" />
          <span>Type email/name to search and select responsible lawyer</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {data.responsibleLawyers.map((lawyer) => (
            <div key={lawyer.id} className="flex items-center gap-2 bg-[#e9eff2] text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-100">
              <Avatar className="w-5 h-5 shrink-0">
                <AvatarImage src={lawyer.profile_image} />
                <AvatarFallback>{lawyer.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{lawyer.full_name} ({lawyer.email})</span>
              <button
                type="button"
                onClick={() => setField("responsibleLawyers")(data.responsibleLawyers.filter((l) => l.id !== lawyer.id))}
              >
                <X className="w-3.5 h-3.5 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div className="space-y-1.5">
          <FieldLabel>{t("court_colon")}</FieldLabel>
          <div className="relative w-full">
            <select value={data.court} onChange={(e) => setField("court")(e.target.value)} className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-10">
              <option value="Montenegro suprime Court">Montenegro suprime Court</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div> */}
        <div className="space-y-1.5">
          <FieldLabel>{t("court_colon")}</FieldLabel>
          <input type="text" placeholder={t("court_name")} onChange={(e) => setField("court")(e.target.value)} className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]" />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>{t("case_number_colon")}</FieldLabel>
          <input type="text" value={data.caseNumber} onChange={(e) => setField("caseNumber")(e.target.value)} placeholder="MKL-87587345-TA" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]" />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel>{t("opposing_party_colon")}</FieldLabel>
        <input type="text" value={opposingInput} onChange={(e) => setOpposingInput(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter" && opposingInput.trim()) {
            e.preventDefault();
            if (!data.opposingParties.includes(opposingInput.trim())) setField("opposingParties")([...data.opposingParties, opposingInput.trim()]);
            setOpposingInput("");
          }
        }} placeholder="Lovcen insurance Company" className="w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]" />
        <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium px-1 pt-0.5"><Info className="w-3.5 h-3.5" /><span>{t("type_name_press_enter_opposing")}</span></div>
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
  const { t } = useTranslation("common");
  const updateField = <K extends keyof DateCardData>(key: K) => (value: DateCardData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    { value: "January", label: t("january") },
    { value: "February", label: t("february") },
    { value: "March", label: t("march") },
    { value: "April", label: t("april") },
    { value: "May", label: t("may") },
    { value: "June", label: t("june") },
    { value: "July", label: t("july") },
    { value: "August", label: t("august") },
    { value: "September", label: t("september") },
    { value: "October", label: t("october") },
    { value: "November", label: t("november") },
    { value: "December", label: t("december") },
  ];
  const years = ["2024", "2025", "2026", "2027", "2028"];


  return (
    <div className="w-full border border-gray-200 rounded-[24px] p-5 md:p-6 bg-white space-y-4 shadow-sm">
      <h4 className="text-base font-bold text-gray-900 tracking-tight">{title}</h4>

      {/* Reason + Status Double Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>{t("reason_colon")}</FieldLabel>
          <input
            type="text"
            value={data.reason}
            onChange={(e) => updateField("reason")(e.target.value)}
            placeholder="New hearing"
            className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel>{t("status_colon")}</FieldLabel>
          <div className="relative w-full">
            <SelectFieldForStatus
              label="Status"
              value={data.status ? String(data.status) : ""}
              onChange={(value) => updateField("status")(Number(value))}
              classes="w-full px-5 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-10 shadow-sm"
            />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Time Frame Layout Input Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel>{t("time_colon")}</FieldLabel>
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
          <FieldLabel>{t("date_colon")}</FieldLabel>
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
          <FieldLabel>{t("month_colon")}</FieldLabel>
          <div className="relative w-full">
            <select
              value={data.month}
              onChange={(e) => updateField("month")(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer pr-8 shadow-sm text-center"
            >
              {months.map((m) => (<option key={m.value} value={m.value}>{m.label}</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Labeled 'Client name:' exactly mirroring Figma labels error */}
        <div className="space-y-1.5">
          <FieldLabel>{t("year_colon")}</FieldLabel>
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
  const { t } = useTranslation("common");
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 tracking-tight">{t("schedule")}</h3>

      {/* Add Hearing Date Segment Card */}
      <ScheduleCard
        title={t("add_hearing_date")}
        data={data.hearing}
        onChange={(hearing) => onChange({ ...data, hearing })}
      />

      {/* Add Deadline Date Segment Card */}
      <ScheduleCard
        title={t("add_deadline_date")}
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

export default function AddNewCase({ isOpen, onClose, onSubmit, clientName, clientId, clientAddress, clientEmail, clientPhoneNumber, clientAvatar, clientNote }: AddNewCaseProps) {
  const { t } = useTranslation("common");
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
      court: "",
      caseNumber: "",
      opposingParties: [],
    },
    schedule: {
      hearing: {
        reason: "",
        status: 1,
        timeRange: "",
        period: "AM",
        date: "1",
        month: "January",
        year: "2026",
      },
      deadline: {
        reason: "",
        status: 1,
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
      toast.error(t("toast_client_name_required"));
      setCurrentStep(1);
      return;
    }
    if (!formData.legalDetails.caseName.trim()) {
      toast.error(t("toast_case_name_required"));
      setCurrentStep(2);
      return;
    }

    // Build API payload
    const apiData = {
      client_name: formData.basicInfo.clientName.trim(),
      case_name: formData.legalDetails.caseName.trim(),
    } as {
      client_name: string;
      client_email?: string;
      client_phone?: string;
      client_address?: string;
      note?: string;
      case_name: string;
      category?: number;
      sub_category?: number;
      status?: number;
      court?: number;
      responsible_lawyer_ids?: string[];
      opposing_parties?: string[];
      hearing_date?: string;
      deadline_date?: string;
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
      apiData.responsible_lawyer_ids = formData.legalDetails.responsibleLawyers.map((l) => l.id);
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
        data: apiData,
      }).unwrap();

      toast.success(t("toast_case_created_success"));
      if (res?.id) {
        await createHearingAndDeadline(res.id);
      }
      onSubmit?.(formData);
      handleClose();
    } catch (err: unknown) {
      console.log("error iss:", err);
      const e = err as { data?: { message?: string; detail?: string } };
      const message = e?.data?.message || e?.data?.detail || t("toast_case_created_failed");
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
          status: formData.schedule.hearing.status,
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
          status: formData.schedule.deadline.status,
          time_from: deadlineTimeFrom,
          time_to: deadlineTimeTo,
          am_pm: formData.schedule.deadline.period.toUpperCase(),
          day: Number(formData.schedule.deadline.date),
          month: MONTHS.indexOf(formData.schedule.deadline.month) + 1,
          year: Number(formData.schedule.deadline.year),
        },
      }).unwrap();
      setTimeout(() => {
        toast.success(t("toast_hearing_deadline_success"));
      }, 1000);
    } catch {
      setTimeout(() => {
        toast.error(t("toast_hearing_deadline_failed"));
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogTitle />
      <DialogContent className="max-w-7xl! w-[95vw] bg-white rounded-[32px] p-6 md:p-8 overflow-hidden border-none shadow-2xl flex flex-col focus:outline-none max-h-[95vh]">

        {/* Global Component Heading Block */}
        <div className="w-full text-center pb-2 pt-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{t("add_new_case")}</h2>
        </div>

        {/* Component Core Scrollable Viewport Content Layer */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6 my-2 scrollbar-thin">
          <Stepper current={currentStep} />

          <div className="w-full h-px bg-gray-100" />

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
            {t("save_as_draft")}
          </button>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((p) => p - 1)}
                className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none"
              >
                {t("previous")}
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((p) => p + 1)}
                className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-white bg-[#135576] hover:bg-[#0f445f] transition-all focus:outline-none active:scale-95 shadow-md shadow-blue-900/10"
              >
                {t("next")}
              </button>
            ) : (
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSave}
                className="px-3 md:px-6 py-1 md:py-3 rounded-full text-xs md:text-sm font-semibold text-white bg-[#135576] hover:bg-[#0f445f] transition-all focus:outline-none active:scale-95 shadow-md shadow-blue-900/10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? t("saving_dots") : t("save")}
              </button>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}