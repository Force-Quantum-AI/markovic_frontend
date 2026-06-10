"use client"

import { CaseCard } from "@/components/shared/CaseCard";
import { LawCard } from "@/components/shared/LawCard";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import { lawsDataset } from "@/components/user/dashboard/LawsAndBylaws";
import { hearingsDataset } from "@/components/user/dashboard/UpcomingHearings";
import { useState } from "react";

export default function Page() {
    const [activeBtn, setActiveBtn] = useState("cases")
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
                    <button className="w-full md:w-auto border border-black/50 hover:bg-red-500 hover:text-white hover:border-red-500 px-3 py-2 rounded-full hover:cursor-pointer transition-all duration-300">
                        Clear all
                    </button>
                </div>
                <div>
                    {activeBtn === "cases" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-6">
                            {hearingsDataset.map((card, index) => (
                                <CaseCard key={index} {...card} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                            {lawsDataset.map((law, index) => (
                                <LawCard
                                    key={index}
                                    title={law.title}
                                    category={law.category}
                                    officialGazette={law.officialGazette}
                                    lastUpdate={law.lastUpdate}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}