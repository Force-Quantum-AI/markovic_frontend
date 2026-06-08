"use client";

import { useState } from "react";
import { Scale, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LawCardProps {
  title: string;
  category: string;
  officialGazette: string;
  lastUpdate: string;
}

export function LawCard({
  title,
  category,
  officialGazette,
  lastUpdate,
}: LawCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

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
          onClick={() => setIsFavorite(!isFavorite)}
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
          "
        >
          <Star
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-500"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="mt-5 flex flex-1 flex-col">
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