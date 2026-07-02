"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import MainButton from "@/components/shared/MainButton";
import { CaseCard, CaseCardProps } from "@/components/shared/CaseCard";
import { hearingsDataset } from "../dashboard/UpcomingHearings";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import { useGetAllCasesQuery, useGetCategoryDropdownOptionsQuery } from "@/store/features/case/case.api";
import CaseCardSkeleton from "@/components/skeletons/CaseCardSkeleton";
import { SelectField } from "@/components/shared/SelectNewDropdown";
import { NoContent } from "@/components/shared/NoContent";
import { useTranslation } from "react-i18next";


export default function AllCasesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const {t} = useTranslation("common")
    const [hearingDate, setHearingDate] = useState<{ day: number | null, month: number | null, year: number | null }>({ day: null, month: null, year: null });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = 4;

    const { data: categoryOptions } = useGetCategoryDropdownOptionsQuery();

    const allCasesQueryParams: Record<string, unknown> = {
        search: searchQuery,
    };

    if (hearingDate.day !== null) {
        allCasesQueryParams.hearing_day = hearingDate.day;
    }
    if (hearingDate.month !== null) {
        allCasesQueryParams.hearing_month = hearingDate.month;
    }
    if (hearingDate.year !== null) {
        allCasesQueryParams.hearing_year = hearingDate.year;
    }

    if (selectedStatus !== undefined) {
        allCasesQueryParams.status = selectedStatus;
    }

    if (selectedCategory !== undefined) {
        allCasesQueryParams.category = selectedCategory;
    }

    const { data: allCases, isLoading: isAllCasesLoading } = useGetAllCasesQuery(allCasesQueryParams);


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
        <div className="mx-auto w-full max-w-7xl p-2 md:p-3">
            <PageHeadingTitle
                title={t("all_cases")}
                subtitle={t("all_your_cases_in_one_place")}
            />
            {/* Search Bar */}
            <div className="mb-6 flex items-center gap-5">
                <div className="relative grow">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t("search_cases_clients_laws_documents")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-10 pr-4 shadow-sm text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                    />
                </div>
            </div>

            {/* Filters Row */}
            <div className="mb-6 grid grid-cols-2 gap-3">
                <SelectField
                    label={t("case_status")}
                    type="status"
                    value={selectedStatus?.toString() || ""}
                    onChange={(value) =>
                        setSelectedStatus(value ? Number(value) : undefined)
                    }
                />

                <SelectField
                    label={t("case_category")}
                    type="category"
                    value={selectedCategory ? String(selectedCategory) : ""}
                    onChange={(value) =>
                        setSelectedCategory(
                            value ? Number(value) : undefined
                        )
                    }
                />
            </div>
            {/* Hearing Date Filter */}
            <div className="mb-6">
                <label className="mb-1 block text-xs font-medium text-gray-500">
                    {t("hearing_date")}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                        type="text"
                        placeholder="DD"
                        onChange={(e) =>
                            setHearingDate({
                                ...hearingDate,
                                day: e.target.value ? Number(e.target.value) : null,
                            })
                        }
                        className="w-full  shadow-sm rounded-full border border-gray-200 bg-white px-2 py-3.5 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        maxLength={2}
                    />
                    <input
                        type="text"
                        placeholder="MM"
                        onChange={(e) =>
                            setHearingDate({
                                ...hearingDate,
                                month: e.target.value ? Number(e.target.value) : null,
                            })
                        }
                        className="w-full shadow-sm  rounded-full border border-gray-200 bg-white px-2 py-3.5 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        maxLength={2}
                    />
                    <input
                        type="text"
                        placeholder="YY"
                        onChange={(e) =>
                            setHearingDate({
                                ...hearingDate,
                                year: e.target.value ? Number(e.target.value) : null,
                            })
                        }
                        className="w-full shadow-sm  rounded-full border border-gray-200 bg-white px-2 py-3.5 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        maxLength={2}
                    />
                </div>
            </div>


            <section className="w-full max-w-7xl mx-auto p-3 md:p-5 space-y-3 md:space-y-6 bg-white rounded-2xl">
                {/* Top Header Controls Block */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                        {t("all_cases")}
                    </h3>
                </div>

                {/* Grid Container Matrix mapping responsive column breakdowns */}
                {isAllCasesLoading ? (
                    <CaseCardSkeleton cardNumber={3} />
                ) : allCases.results.length===0 ? (
                    <NoContent message="No cases yet"/>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 md:gap-6">
                        {allCases?.results ? allCases?.results.map((card: CaseCardProps, index: number) => (
                            <CaseCard key={index} {...card} />
                        )) : allCases.map((card: CaseCardProps, index: number) => (
                            <CaseCard key={index} {...card} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {/* <div className="flex items-center justify-center md:justify-between gap-3 flex-wrap">
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
                </div> */}
            </section>
        </div>
    );
}