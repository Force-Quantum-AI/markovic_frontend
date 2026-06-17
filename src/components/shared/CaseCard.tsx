"use client"
import Image from "next/image";
import { Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToggleBookmarkedCasesMutation } from "@/store/features/case/case.api";
import { toast } from "sonner";

export interface CaseCardProps {
  id?: string;
  // New backend response keys:
  case_number?: string;
  case_name?: string;
  client_name?: string;
  client_image?: string | null;
  category_name?: string;
  sub_category_name?: string;
  status_name?: string;
  court_name?: string;
  responsible_lawyers?: Array<{
    id: string;
    full_name: string;
    email: string;
    professional_role: string;
    profile_image: string | null;
  }>;
  hearings?: Array<{
    id: number;
    reason?: string | null;
    status: string;
    time_from: string;
    time_to: string;
    am_pm: string;
    day: number;
    month: number;
    year: number;
    days_remaining: number;
  }>;
  deadlines?: Array<{
    id: number;
    reason?: string | null;
    status: string;
    time_from: string;
    time_to: string;
    am_pm: string;
    day: number;
    month: number;
    year: number;
    days_remaining: number;
  }>;
  bookmark?: boolean;
  created_at?: string;

  // Old dummy keys (for backward compatibility):
  category?: string;
  clientName?: string;
  clientImage?: string;
  caseDescription?: string;
  status?: string;
  court?: string;
  caseNumber?: string;
  assignedLawyers?: string[];
  hearingDate?: string;
  deadline?: string;
}

const resolveImageUrl = (imgUrl: string | null | undefined): string => {
  if (!imgUrl) return "/dummy-user.jpg";
  if (imgUrl.includes("http")) {
    const match = imgUrl.match(/https?:\/\/[^\s]+/);
    if (match) return match[0];
  }
  return imgUrl;
};

const getHearingDateStr = (hearings?: any[]) => {
  if (!hearings || hearings.length === 0) return "Not Assign";
  const h = hearings[0];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthStr = months[h.month - 1] || h.month;
  return `${h.day} ${monthStr} ${h.year}`;
};

const getDeadlineStr = (deadlines?: any[]) => {
  if (!deadlines || deadlines.length === 0) return "Not Assign";
  const d = deadlines[0];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthStr = months[d.month - 1] || d.month;
  return `${d.day} ${monthStr} ${d.year}`;
};

export function CaseCard({
  id,
  case_number,
  case_name,
  client_name,
  client_image,
  category_name,
  sub_category_name,
  status_name,
  court_name,
  responsible_lawyers,
  hearings,
  deadlines,
  bookmark,
  created_at,

  category,
  clientName,
  clientImage,
  caseDescription,
  status,
  court,
  caseNumber,
  assignedLawyers,
  hearingDate,
  deadline,
}: CaseCardProps) {
  const [toggleBookmarkedCases, {isLoading}] = useToggleBookmarkedCasesMutation();
  const [isFavorite, setIsFavorite] = useState(bookmark || false);

  // Color configuration mapping for status pill badges
  const statusStyles: Record<string, string> = {
    Active: "bg-[#eefbf2] text-[#22c55e] border-[#bbf7d0]",
    "On appeal": "bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]",
    "On revision": "bg-[#fff7ed] text-[#f97316] border-[#fed7aa]",
  };

  const getStatusStyle = (st: string) => {
    return statusStyles[st] || "bg-[#f3f4f6] text-gray-600 border-gray-200";
  };

  const router = useRouter();

  const handleAddToFavorite = async(e: React.MouseEvent) => {
    try {
      await toggleBookmarkedCases({ caseId: id }).unwrap()
      toast.success(isFavorite ? "Case removed from favorite" : "Case added to favorite")
    } catch (error) {
      console.log("error is",error);
      toast.error("Failed to add case to favorite")
    }
  };

  // Resolve fields (fallback hierarchy)
  const displayCategory = category_name || category || "Civil";
  const displayClientName = client_name || clientName || "Client";
  const displayClientImage = resolveImageUrl(client_image) || clientImage || "/dummy-user.jpg";
  const displayCaseName = case_name || caseDescription || "";
  const displayStatus = status_name || status || "Active";
  const displayCourt = court_name || court || "Montenegro Law Court";
  const displayCaseNumber = case_number || caseNumber || "";
  const displayHearingDate = hearings ? getHearingDateStr(hearings) : (hearingDate || "Not Assign");
  const displayDeadline = deadlines ? getDeadlineStr(deadlines) : (deadline || "Not Assign");

  let displayLawyers: string[] = [];
  if (responsible_lawyers && responsible_lawyers.length > 0) {
    displayLawyers = responsible_lawyers.map(
      (lawyer) => lawyer.profile_image || lawyer.full_name || "L"
    );
  } else if (assignedLawyers) {
    displayLawyers = assignedLawyers;
  }

  return (
    <div className="relative">
      <button
        disabled={isLoading}
        onClick={handleAddToFavorite}
        className="absolute top-5 right-5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm z-10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        ) : (
          <Star className={`w-4 h-4 ${isFavorite ? "text-[#eab308] fill-[#eab308]" : "text-gray-300"}`} />
        )}
      </button>
      <div
        className="bg-[#f8f9fa] rounded-3xl p-3 2xl:p-6 border border-gray-100/80 shadow-sm flex flex-col justify-between transition-all hover:shadow-md w-full cursor-pointer"
        onClick={() => router.push(`/my-cases/${displayCaseNumber}`)}
      >
        <div>
          {/* Top Header: Tag & Star Asset */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-[#d1d5db]/50 text-gray-700 text-xs font-medium px-3 py-1 rounded-md">
              {displayCategory}
            </span>
          </div>

          {/* Client Profile Header Row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              <Image
                src="/dummy-user.jpg"
                alt={displayClientName}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-base md:text-lg font-bold text-gray-900 tracking-tight">
              {displayClientName}
            </h4>
          </div>

          {/* Case Description Info Box */}
          <div className="space-y-1 mb-5">
            <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Case name
            </span>
            <p className="text-xs md:text-sm font-semibold text-gray-700 leading-snug line-clamp-2">
              {displayCaseName}
            </p>
          </div>

          {/* Inner Metadata Matrix Grid layout */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-white rounded-2xl p-4 border border-gray-50">
            {/* Status block */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Case status</span>
              <span
                className={`inline-block text-[10px] xl:text-xs font-semibold px-2.5 py-0.5 rounded-md border ${getStatusStyle(displayStatus)}`}
              >
                {displayStatus}
              </span>
            </div>

            {/* Court location block */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Court</span>
              <span className="block text-xs md:text-sm font-medium text-gray-800 truncate">
                {displayCourt}
              </span>
            </div>

            {/* Identification instance block */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Case number</span>
              <span className="block text-xs font-medium text-gray-700">
                {displayCaseNumber}
              </span>
            </div>

            {/* Assigned legal representation stack layout */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Assign Lawyer</span>
              <div className="flex items-center -space-x-1.5 overflow-hidden">
                {displayLawyers.map((avatar, idx) => {
                  const resolvedAvatar = resolveImageUrl(avatar);
                  const isInitials = !avatar.startsWith("http") && !avatar.startsWith("/") && !avatar.includes(".");
                  const initials = isInitials
                    ? (avatar.length > 2 ? avatar.split("-").map(p => p[0]).join("").slice(0, 2).toUpperCase() : avatar)
                    : "";
                  return (
                    <div
                      key={idx}
                      className="relative w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-amber-800 bg-amber-100"
                    >
                      {!isInitials ? (
                        <Image
                          src="/dummy-user.jpg"
                          alt="Lawyer profile"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date info blocks */}
            <div className="space-y-0.5">
              <span className="block text-[11px] text-gray-400">Hearing date</span>
              <span className="block text-xs font-semibold text-gray-700">
                {displayHearingDate}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="block text-[11px] text-gray-400">Deadline</span>
              <span className="block text-xs font-medium text-gray-500">
                {displayDeadline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}