"use client"
import Image from "next/image";
import { HearingCardProps } from "../user/dashboard/UpcomingHearings";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CaseCard({
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
}: HearingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Color configuration mapping for status pill badges
  const statusStyles = {
    Active: "bg-[#eefbf2] text-[#22c55e] border-[#bbf7d0]",
    "On appeal": "bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]",
    "On revision": "bg-[#fff7ed] text-[#f97316] border-[#fed7aa]",
  };

  const router = useRouter()

  const handleAddToFavorite = () => {
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="relative">
      <div onClick={handleAddToFavorite} className="absolute top-5 right-5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
        <Star className={`w-4 h-4 ${isFavorite ? "text-[#eab308] fill-[#eab308]" : "text-gray-300"}`} />
      </div>
      <div className="bg-[#f8f9fa] rounded-3xl p-3 2xl:p-6 border border-gray-100/80 shadow-sm flex flex-col justify-between transition-all hover:shadow-md w-full cursor-pointer" onClick={() => router.push(`/my-cases/${caseNumber}`)}>
        <div>
          {/* Top Header: Tag & Star Asset */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-[#d1d5db]/50 text-gray-700 text-xs font-medium px-3 py-1 rounded-md">
              {category}
            </span>
            {/* <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Star className="w-4 h-4 text-[#eab308] fill-[#eab308]" />
            </div> */}
            {/* <div className="flex items-center gap-5 relative">
            <button className="text-xs text-nowrap text-white bg-[#135576] rounded-lg px-4 py-2">View details</button>
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Star className="w-4 h-4 text-[#eab308] fill-[#eab308]" />
            </div>
          </div> */}
          </div>

          {/* Client Profile Header Row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              <Image
                src={clientImage}
                alt={clientName}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-base md:text-lg font-bold text-gray-900 tracking-tight">
              {clientName}
            </h4>
          </div>

          {/* Case Description Info Box */}
          <div className="space-y-1 mb-5">
            <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Case name
            </span>
            <p className="text-xs md:text-sm font-semibold text-gray-700 leading-snug line-clamp-2">
              {caseDescription}
            </p>
          </div>

          {/* Inner Metadata Matrix Grid layout */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-white rounded-2xl p-4 border border-gray-50">
            {/* Status block */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Case status</span>
              <span
                className={`inline-block text-[10px] xl:text-xs font-semibold px-2.5 py-0.5 rounded-md border ${statusStyles[status]}`}
              >
                {status}
              </span>
            </div>

            {/* Court location block */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Court</span>
              <span className="block text-xs md:text-sm font-medium text-gray-800 truncate">
                {court}
              </span>
            </div>

            {/* Identification instance block */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Case number</span>
              <span className="block text-xs font-medium text-gray-700">
                {caseNumber}
              </span>
            </div>

            {/* Assigned legal representation stack layout */}
            <div className="space-y-1">
              <span className="block text-[11px] text-gray-400">Assign Lawyer</span>
              <div className="flex items-center -space-x-1.5 overflow-hidden">
                {assignedLawyers.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="relative w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-amber-800 bg-amber-100"
                  >
                    {avatar.startsWith("http") ? (
                      <Image
                        src={avatar}
                        alt="Lawyer profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span>{avatar}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Date info blocks */}
            <div className="space-y-0.5">
              <span className="block text-[11px] text-gray-400">Hearing date</span>
              <span className="block text-xs font-semibold text-gray-700">
                {hearingDate}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="block text-[11px] text-gray-400">Deadline</span>
              <span className="block text-xs font-medium text-gray-500">
                {deadline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}