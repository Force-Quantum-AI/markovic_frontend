"use client";

import { LawCard } from "@/components/shared/LawCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const lawsDataset = [
  {
    id: 1,
    title: "Law on Obligations",
    category: "Civil Law",
    officialGazette: "47/08, 04/10, 22/17",
    lastUpdate: "17 Oct, 2020",
  },
  {
    id: 2,
    title: "Civil Procedure Law",
    category: "Procedural Law",
    officialGazette: "22/10, 49/13, 44/21",
    lastUpdate: "17 Oct, 2020",
  },
  {
    id: 3,
    title: "Law on Courts",
    category: "Civil Law",
    officialGazette: "13/18, 01/23",
    lastUpdate: "21 Sep, 2020",
  },
  {
    id: 4,
    title: "Law on Enforcement and Security",
    category: "Procedural Law",
    officialGazette: "36/11, 58/14, 11/17",
    lastUpdate: "24 May, 2020",
  },
];
export default function LawsAndBylaws({ data, isLoading }: { data?: any[]; isLoading?: boolean }) {
  const router = useRouter();
  return (
    <section className="mx-auto w-full max-w-7xl space-y-3 rounded-2xl bg-white p-3 md:p-5 md:space-y-6">
      {/* Top Header Controls Block */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
          Laws &amp; Bylaws
        </h3>
        <button onClick={() => router.push("/law-and-bylaw")} className="text-sm font-semibold transition-all hover:underline" style={{ color: "#135576" }}>
          View All
        </button>
      </div>

      {/* Grid Container Matrix - responsive columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex min-h-[250px] flex-col rounded-3xl bg-gray-50 border border-gray-100/80 p-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="h-10 w-10 rounded-full bg-gray-200" />
              </div>
              <div className="mt-5 flex-1 flex flex-col space-y-3 justify-between">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="flex justify-end">
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))
        ) : (
          data?.slice(0, 4).map((law, index) => (
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
        )}
      </div>

      {/* Pagination control buttons positioned at the bottom right */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2]" />
        </button>
        <button
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
        >
          <ArrowRight className="h-4 w-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}