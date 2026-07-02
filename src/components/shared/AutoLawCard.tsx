"use client";

import { useState } from "react";
import { Loader, Scale, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useToggleBookmarkedLawsMutation } from "@/store/features/lawAndBylaw/lawAndBylaw.api";

export interface LawCardProps {
  id: number;
  title: string;
  summary: string;
  source_url: string;
  category: string;
  published_at: string;
  updated_at: string;
}

export function AutoLawCard({
  id,
  title,
  summary,
  source_url,
  category,
  published_at,
  updated_at,
}: LawCardProps) {
//   const [isFavorite, setIsFavorite] = useState(bookmark || false);
//   const [toggleBookmarkedLaws, { isLoading }] = useToggleBookmarkedLawsMutation();
  const navigate = useRouter();

  // Helper: Strips HTML formatting safely for the text snippet
  const stripHtml = (htmlString: string) => {
    if (!htmlString) return "";
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "").replace(/\[&#8230;\]/g, "...");
  };

  // Helper: Formatting ISO timestamp to readable format
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("sr-RS", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

//   const handleAddToFavorite = async (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent card navigation trigger
//     try {
//       await toggleBookmarkedLaws({ id }).unwrap();
//       toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
//       setIsFavorite(!isFavorite);
//     } catch (error) {
//       console.error("Error toggling bookmark status:", error);
//       toast.error("Failed to update favorite status");
//     }
//   };

  return (
    <div
      className="
        group
        relative
        flex
        min-h-[280px]
        max-h-fit
        flex-col
        rounded-3xl
        bg-[#F5F5F5]
        p-5
        transition-all
        duration-300
        hover:shadow-md
        hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Law/Finance Brand Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#135576] text-white shadow-sm">
          <Scale className="h-5 w-5" />
        </div>

        {/* Favorite Bookmark Button */}
        {/* <button
          onClick={handleAddToFavorite}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#ECEFF1]
            transition-all
            hover:bg-[#dfe6ea]
            z-10
          "
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin text-gray-500" />
          ) : (
            <Star
              className={cn(
                "h-5 w-5 transition-all",
                isFavorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-500"
              )}
            />
          )}
        </button> */}
      </div>

      {/* Main Body Contents */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-[18px] font-bold leading-7 text-[#2D3139] group-hover:text-[#135576] transition-colors">
          {title}
        </h3>

        {/* New Summary Field (Strips paragraph/link styling tags) */}
        <p className="mt-2 text-sm text-[#667085] line-clamp-3 leading-relaxed">
          {stripHtml(summary)}
        </p>

        {/* Meta Timestamps */}
        <div className="mt-4 pt-3 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-xs text-[#4B5563]">
          <div>
            <span className="font-semibold block text-gray-400 uppercase tracking-wider text-[10px]">Objavljeno:</span>
            <span className="font-medium">{formatDate(published_at)}</span>
          </div>
          <div>
            <span className="font-semibold block text-gray-400 uppercase tracking-wider text-[10px]">Ažurirano:</span>
            <span className="font-medium">{formatDate(updated_at)}</span>
          </div>
        </div>

        {/* Footer Actions / Badges */}
        <div className="mt-5 pt-2 flex items-center justify-between">
          <a
            href={source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Stop modal push trigger
            className="rounded-full
              bg-[#E5E7EB]
              px-3
              py-1 border border-amber-200 inline-flex items-center gap-1.5 text-xs font-semibold text-[#135576] hover:underline"
          >
            Izvor <ExternalLink className="w-3 h-3" />
          </a>

          <span
            className="
              
              text-xs
              font-semibold
              text-[#374151]
            "
          >
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}