"use client";

import { LawCard } from "@/components/shared/LawCard";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import LawCardSkeleton from "@/components/skeletons/LawCardSkeleton";
import { useState } from "react";
import { NoContent } from "@/components/shared/NoContent";
import { useTranslation } from "react-i18next";

export default function LawsAndBylaws({ data, isLoading }: { data?: any[]; isLoading?: boolean }) {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(4);
  const router = useRouter();
  const {t} = useTranslation("common")

  const prevPage = ()=>{
    setMin(min - 4)
    setMax(max - 4)
  }
  const nextPage = ()=>{
    setMin(min + 4)
    setMax(max + 4)
  }
  return (
    <section className="mx-auto w-full max-w-7xl space-y-3 rounded-2xl bg-white p-3 md:p-5 md:space-y-6">
      {/* Top Header Controls Block */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
          {t("laws_and_bylaws")}
        </h3>
        <button onClick={() => router.push("/law-and-bylaw")} className="text-sm font-semibold transition-all hover:underline" style={{ color: "#135576" }}>
          {t("view_all")}
        </button>
      </div>

      {/* Grid Container Matrix - responsive columns */}
      {isLoading ? (
        <LawCardSkeleton />
      ) : data?.length===0 ? (
        <NoContent message="No Laws & Bylaws yet" icon={<Scale className="text-gray-500" />} />
      ): (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {data?.slice(min, max).map((law, index) => (
            <LawCard
              key={index}
              id={String(law.id)}
              title={law.title}
              category={law.category_name || law.category}
              officialGazette={law.official_gazette || law.officialGazette}
              lastUpdate={law.last_updated || law.lastUpdate}
              bookmark={law.bookmark}
            />
          ))
          }
        </div>
      )}

      {/* Pagination control buttons positioned at the bottom right */}
      <div className={`${data?.length && data?.length<=4 ? "hidden": ""} flex items-center justify-end gap-3 pt-2`}>
        <button
          onClick={prevPage}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2]" />
        </button>
        <button
          onClick={nextPage}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
        >
          <ArrowRight className="h-4 w-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}