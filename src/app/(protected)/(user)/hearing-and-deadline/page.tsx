"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import MainButton from "@/components/shared/MainButton";
import { CaseCard } from "@/components/shared/CaseCard";
import { hearingsDataset } from "@/components/user/dashboard/UpcomingHearings";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";

type CaseCategory = "All" | "Civil" | "Criminal" | "Commercial" | "Probate";

export const statusOptions = ["All", "Active", "On appeal", "On revision", "In enforcement", "Finished", "Archived", "Before Const. Court", "Before Euro. Court of H.Rights"];
export const categoryOptions = ["All", "Civil", "Criminal", "Family", "Property", "Insurance", "Labour", "Tax"];

export default function HearingAndDeadlinePage() {
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
                title="Hearings & Deadlines"
                subtitle="Schedule and details for all court proceedings"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="col-span-1 md:col-span-2">
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
                            className="w-full rounded-full border border-gray-200 bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        />
                    </div>
                </div>
                {/* Case Status Filter */}
                <div className="">
                    <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                        Category
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                    >
                        {categoryOptions.map((status) => (
                            <option key={status} value={status}>
                                {status === "All" ? "Choose status..." : status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Case Category Filter */}
                <div className="">
                    <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                        Sub-category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as CaseCategory)}
                        className="w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                    >
                        {categoryOptions.map((category) => (
                            <option key={category} value={category}>
                                {category === "All" ? "Choose category..." : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Filters Row */}
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Hearing Date Filter */}
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                        Hearing date
                    </label>
                    <div className="grid grid-cols-3 gap-1 xl:gap-2">
                        <input
                            type="text"
                            placeholder="DD"
                            value={hearingDate.day}
                            onChange={(e) =>
                                setHearingDate({ ...hearingDate, day: e.target.value })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />
                        <input
                            type="text"
                            placeholder="MM"
                            value={hearingDate.month}
                            onChange={(e) =>
                                setHearingDate({ ...hearingDate, month: e.target.value })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />
                        <input
                            type="text"
                            placeholder="YY"
                            value={hearingDate.year}
                            onChange={(e) =>
                                setHearingDate({ ...hearingDate, year: e.target.value })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />
                    </div>
                </div>
                {/* Deadline Filter */}
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                        Deadline
                    </label>
                    <div className="grid grid-cols-3 gap-1 xl:gap-2">
                        <input
                            type="text"
                            placeholder="DD"
                            value={hearingDate.day}
                            onChange={(e) =>
                                setHearingDate({ ...hearingDate, day: e.target.value })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />
                        <input
                            type="text"
                            placeholder="MM"
                            value={hearingDate.month}
                            onChange={(e) =>
                                setHearingDate({ ...hearingDate, month: e.target.value })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />
                        <input
                            type="text"
                            placeholder="YY"
                            value={hearingDate.year}
                            onChange={(e) =>
                                setHearingDate({ ...hearingDate, year: e.target.value })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />
                    </div>
                </div>

            </div>


            <section className="w-full mx-auto space-y-3 md:space-y-6 rounded-2xl">
                {/* Top Header Controls Block */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                        All
                    </h3>
                </div>

                {/* Grid Container Matrix mapping responsive column breakdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-6">
                    {hearingsDataset.map((card, index) => (
                        <CaseCard key={index} {...card} />
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