/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCasesDetailsQuery } from "@/store/features/calendar/calendar.api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  Scale,
  Loader2,
  FileText,
  ShieldAlert,
} from "lucide-react";

interface CaseDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string | null;
  eventType?: "hearing" | "deadline" | null;
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
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        map[status] ?? "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
          {label}
        </p>
        <div className="text-sm font-medium text-gray-800 break-words">
          {value || "N/A"}
        </div>
      </div>
    </div>
  );
}

export default function CaseDetailsDialog({
  isOpen,
  onClose,
  caseId,
  eventType,
}: CaseDetailsDialogProps) {
  const {
    data: caseData,
    isLoading,
    isError,
  } = useGetCasesDetailsQuery({ case_id: caseId || "" }, { skip: !caseId });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Not set";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getClientImageUrl = (url?: string) => {
    if (!url) return undefined;
    return url.startsWith("http")
      ? url
      : `https://res.cloudinary.com/dnu0axtez/${url}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl border-gray-100 max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl bg-white shadow-xl">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#135576] uppercase tracking-wider">
                Case details
              </span>
              <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                {isLoading
                  ? "Loading Case Details..."
                  : caseData?.case_name || "Case Details"}
              </DialogTitle>
            </div>
            {!isLoading && caseData && (
              <div className="flex items-center gap-2">
                <StatusBadge status={caseData.status_name} />
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-10 h-10 text-[#135576] animate-spin" />
              <p className="text-sm font-medium text-gray-500">
                Fetching case information...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShieldAlert className="w-12 h-12 text-red-500 mb-3" />
              <p className="text-sm font-semibold text-gray-800">
                Failed to load case details
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Please check if the case exists or try again.
              </p>
            </div>
          ) : !caseData ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              No case data available.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Client Profile Highlight Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Avatar className="w-16 h-16 bg-gray-200 border-2 border-white shadow-sm shrink-0">
                  <AvatarImage
                    src={getClientImageUrl(caseData.client_image)}
                    alt={caseData.client_name}
                  />
                  <AvatarFallback className="bg-[#135576] text-white text-lg font-bold">
                    {caseData.client_name?.charAt(0).toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
                  <div>
                    <h4 className="text-base font-bold text-gray-800">
                      {caseData.client_name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Personal ID:{" "}
                      <span className="font-semibold text-gray-700">
                        {caseData.personal_id}
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 min-w-0">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">
                        {caseData.client_email || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{caseData.client_phone || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 md:col-span-2 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">
                        {caseData.client_address || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Particulars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <DetailRow
                    icon={Scale}
                    label="Case Number"
                    value={caseData.case_number}
                  />
                  <DetailRow
                    icon={Building2}
                    label="Court"
                    value={caseData.court_name}
                  />
                  <DetailRow
                    icon={Briefcase}
                    label="Category"
                    value={caseData.category_name}
                  />
                  <DetailRow
                    icon={Briefcase}
                    label="Sub-Category"
                    value={caseData.sub_category_name}
                  />
                </div>
                <div className="space-y-4">
                  <DetailRow
                    icon={Calendar}
                    label="Hearing Date"
                    value={formatDate(caseData.hearing_date)}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Deadline Date"
                    value={formatDate(caseData.deadline_date)}
                  />
                  <DetailRow
                    icon={User}
                    label="Created By"
                    value={caseData.created_by_name}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Created At"
                    value={formatDate(caseData.created_at)}
                  />
                </div>
              </div>

              {/* Opposing Parties */}
              {caseData.opposing_parties &&
                caseData.opposing_parties.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Opposing Parties
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {caseData.opposing_parties.map((party, index) => {
                        const partyStr =
                          typeof party === "object" && party !== null
                            ? (party as any).name ||
                              (party as any).test ||
                              (party as any).TEST ||
                              Object.values(party)[0] ||
                              ""
                            : party;
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-lg text-xs font-medium"
                          >
                            {partyStr}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Responsible Lawyers */}
              {caseData.responsible_lawyers &&
                caseData.responsible_lawyers.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Responsible Lawyers
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {caseData.responsible_lawyers.map((lawyer) => (
                        <div
                          key={lawyer.id}
                          className="flex items-center gap-3 p-2 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors"
                        >
                          <Avatar className="w-8 h-8 bg-gray-200 shrink-0">
                            <AvatarImage
                              src={getClientImageUrl(
                                lawyer.profile_image || undefined,
                              )}
                              alt={lawyer.full_name}
                            />
                            <AvatarFallback className="bg-gray-400 text-white text-xs font-bold">
                              {lawyer.full_name?.charAt(0).toUpperCase() || "L"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                              {lawyer.full_name}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {lawyer.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Client Notes */}
              {caseData.note && (
                <div className="border-t border-gray-100 pt-4">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Client Notes
                  </h5>
                  <div
                    className={`p-3.5 rounded-2xl flex gap-2 border text-black ${
                      eventType === "hearing"
                        ? "bg-green-50/40 border-green-100"
                        : eventType === "deadline"
                        ? "bg-amber-50/30 border-amber-100"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <FileText
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        eventType === "hearing"
                          ? "text-green-600"
                          : eventType === "deadline"
                          ? "text-amber-600"
                          : "text-gray-400"
                      }`}
                    />
                    <p className="text-xs text-black leading-relaxed italic">
                      &ldquo;{caseData.note}&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!isLoading && caseData && (
          <div className="p-4 bg-gray-50/50 border-t border-gray-100 shrink-0 text-center text-[11px] text-gray-400 rounded-b-2xl font-medium tracking-wide">
            <p>
              Note: This card displays case details. To edit files, hearings, or
              deadlines, please visit the Cases management view.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
