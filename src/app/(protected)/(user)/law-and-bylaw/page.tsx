"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import MainButton from "@/components/shared/MainButton";
import { CaseCard } from "@/components/shared/CaseCard";
import { hearingsDataset } from "@/components/user/dashboard/UpcomingHearings";
import { lawsDataset } from "@/components/user/dashboard/LawsAndBylaws";
import { LawCard } from "@/components/shared/LawCard";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";

type CaseCategory = "All" | "Civil" | "Criminal" | "Commercial" | "Probate";

const statusOptions = ["All", "Active", "On appeal", "On revision", "In enforcement", "Finished", "Archived", "Before Const. Court", "Before Euro. Court of H.Rights"];
const categoryOptions = ["All", "Civil", "Criminal", "Family", "Property", "Insurance", "Labour", "Tax"];

export default function LawAndByLawPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
    const [selectedCategory, setSelectedCategory] = useState<CaseCategory>("All");
    const [hearingDate, setHearingDate] = useState({ day: "", month: "", year: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = 4;


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Status badge color mapping
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-700";
            case "On appeal":
                return "bg-yellow-100 text-yellow-700";
            case "On revision":
                return "bg-orange-100 text-orange-700";
            case "Closed":
                return "bg-gray-100 text-gray-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Category badge color
    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Civil":
                return "bg-blue-100 text-[#135576]";
            case "Criminal":
                return "bg-red-100 text-red-700";
            case "Commercial":
                return "bg-purple-100 text-purple-700";
            case "Probate":
                return "bg-emerald-100 text-emerald-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="mx-auto w-full p-2 md:p-3 bg-white rounded-2xl">
            <PageHeadingTitle
                title="Laws & By-laws"
                subtitle="Explore all laws & bylaws here"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4">
                <div className="col-span-1 md:col-span-3">
                    <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                        Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search cases, clients, laws, documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-gray-100  py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        />
                    </div>
                </div>
                {/* Case Status Filter */}
                <div className="">
                    <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                        Filters
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-700 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                    >
                        {categoryOptions.map((status) => (
                            <option key={status} value={status}>
                                {status === "All" ? "Choose status..." : status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <section className="w-full mx-auto space-y-3  rounded-2xl">
                {/* Top Header Controls Block */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl  text-gray-900 tracking-tight">
                        All Laws
                    </h3>
                </div>

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


                {/* Pagination */}
                <div className="flex items-center justify-center md:justify-between gap-3 flex-wrap">
                    <p className="text-[#427791] text-xs md:text-base">Showing {1} to {Math.min(currentPage, hearingsDataset.length)} of {hearingsDataset.length} cases</p>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex h-9 w-fit px-2 items-center gap-2 justify-center rounded-full transition-all ${currentPage === 1
                                    ? "cursor-not-allowed border-gray-200 text-gray-300"
                                    : "border-gray-300 text-[#427791] hover:border-[#135576] hover:bg-[#135576]/5 hover:text-[#135576]"
                                    }`}
                            >
                                <ChevronLeft className="h-4 w-4" /> Prev
                            </button>

                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? "bg-[#135576] text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex h-9 w-fit px-2 items-center gap-2 justify-center rounded-full transition-all ${currentPage === totalPages
                                    ? "cursor-not-allowed border-gray-200 text-gray-300"
                                    : "border-gray-300 text-[#427791] hover:border-[#135576] hover:bg-[#135576]/5 hover:text-[#135576]"
                                    }`}
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}