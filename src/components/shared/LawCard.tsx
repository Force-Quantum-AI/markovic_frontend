"use client";

import { useState } from "react";
import { Loader, Scale, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useToggleBookmarkedLawsMutation } from "@/store/features/lawAndBylaw/lawAndBylaw.api";

export interface LawCardProps {
  id?: string;
  title: string;
  category: string;
  officialGazette: string;
  lastUpdate: string;
  bookmark?: boolean;
}

export function LawCard({
  id = "1",
  title,
  category,
  officialGazette,
  lastUpdate,
  bookmark,
}: LawCardProps) {
  const [isFavorite, setIsFavorite] = useState(bookmark || false);
  const [toggleBookmarkedLaws, { isLoading }] = useToggleBookmarkedLawsMutation();

  const navigate = useRouter()

  const handleAddToFavorite = async (e: React.MouseEvent) => {
    try {
      await toggleBookmarkedLaws({ id }).unwrap()
      toast.success(isFavorite ? "Law removed from favorite" : "Law added to favorite")
    } catch (error) {
      console.log("error is", error);
      toast.error("Failed to add case to favorite")
    }
  };

  return (
    <div
      className="
        group
        relative
        flex
        min-h-[250px]
        max-h-fit
        flex-col
        rounded-3xl
        bg-[#F5F5F5]
        p-4
        transition-all
        duration-300
        hover:shadow-md
        hover:-translate-y-1
        
      "
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Law Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#135576] text-white">
          <Scale className="h-5 w-5" />
        </div>

        {/* Favorite */}
        <button
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
            z-999
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
        </button>
      </div>

      {/* Content */}
      <div className="mt-5 flex flex-1 flex-col cursor-pointer" onClick={() => navigate.push(`/law-and-bylaw/${id}`)}>
        <h3 className="line-clamp-2 text-[18px] font-bold leading-7 text-[#2D3139]">
          {title}
        </h3>

        <div className="mt-2 text-sm">
          <span className="font-semibold text-[#2D3139]">
            Official Gazette:
          </span>

          <span className="ml-2 text-[#667085]">
            {officialGazette}
          </span>
        </div>

        <div className="mt-4 text-sm">
          <span className="font-semibold text-[#2D3139]">
            Last Update:
          </span>

          <span className="ml-2 text-[#4B5563]">
            {lastUpdate}
          </span>
        </div>

        {/* Bottom Badge */}
        <div className="mt-auto flex justify-end">
          <span
            className="
              rounded-full
              bg-[#E5E7EB]
              px-3
              py-1
              text-xs
              font-medium
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