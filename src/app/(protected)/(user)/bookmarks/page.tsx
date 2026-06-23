"use client"

import { CaseCard } from "@/components/shared/CaseCard";
import { LawCard } from "@/components/shared/LawCard";
import { NoContent } from "@/components/shared/NoContent";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import CaseCardSkeleton from "@/components/skeletons/CaseCardSkeleton";
import LawCardSkeleton from "@/components/skeletons/LawCardSkeleton";
import { useGetAllBookmarkedCasesQuery } from "@/store/features/case/case.api";
import { useGetAllBookmarkedLawsQuery } from "@/store/features/lawAndBylaw/lawAndBylaw.api";
import { useState } from "react";

export default function Page() {
    const { data: bookmarkedCases, isLoading: isBookmarkedCasesLoading } = useGetAllBookmarkedCasesQuery();
    const { data: bookmarkedLaws, isLoading: isBookmarkedLawsLoading } = useGetAllBookmarkedLawsQuery();
    const [activeBtn, setActiveBtn] = useState("cases");

    return (
        <div>
            <PageHeadingTitle title="Bookmarks" subtitle="View your Bookmarks cases and law/ByLaw" />
            <div className="bg-white rounded-2xl p-3 xl:p-5 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3">
                    <div className="w-full md:w-auto flex flex-col md:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => setActiveBtn("cases")}
                            className={`${activeBtn === "cases" ? "bg-[#135576] text-white" : "bg-[#135576]/10 text-[#135576]"} w-full md:w-auto  px-5 py-2 rounded-full hover:cursor-pointer transition-all duration-300`}>Cases</button>
                        <button
                            onClick={() => setActiveBtn("law")}
                            className={`${activeBtn === "law" ? "bg-[#135576] text-white" : "bg-[#135576]/10 text-[#135576]"} w-full md:w-auto  px-5 py-2 rounded-full hover:cursor-pointer transition-all duration-300`}>Law & ByLaw</button>
                    </div>
                    {/* <button onClick={()=> navigate.push("/")}
                    className="w-full md:w-auto border border-black/50 hover:bg-red-500 hover:text-white hover:border-red-500 px-3 py-2 rounded-full hover:cursor-pointer transition-all duration-300">
                        Clear all
                    </button> */}
                </div>

                <div>
                    {activeBtn === "cases" ? (
                        isBookmarkedCasesLoading ? (
                            <CaseCardSkeleton />
                        ) : bookmarkedCases?.length === 0 ? (
                            <NoContent />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-6">
                                {bookmarkedCases?.map((card: { id: string;[key: string]: unknown }, index: number) => (
                                    <CaseCard key={index} {...card} />
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                            {isBookmarkedLawsLoading ? (
                                <LawCardSkeleton />
                            ) : bookmarkedLaws?.length === 0 ? (
                                <NoContent />
                            ) : bookmarkedLaws?.map((law: { title: string; category_name: string; official_gazette: string; last_updated: string; bookmark: boolean }, index: number) => (
                                <LawCard
                                    key={index}
                                    title={law.title}
                                    category={law.category_name}
                                    officialGazette={law.official_gazette}
                                    lastUpdate={law.last_updated}
                                    bookmark={law.bookmark}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}