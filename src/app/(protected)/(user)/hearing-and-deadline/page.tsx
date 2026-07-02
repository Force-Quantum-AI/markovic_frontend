"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CaseCard } from "@/components/shared/CaseCard";
import { hearingsDataset } from "@/components/user/dashboard/UpcomingHearings";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectNewDropdown";
import { useGetHearingAndDeadlinePageDataQuery } from "@/store/features/case/case.api";
import { HearingAndDeadlinePageDataParamsType } from "@/types/case.types";
import CaseCardSkeleton from "@/components/skeletons/CaseCardSkeleton";
import { NoContent } from "@/components/shared/NoContent";
import { useTranslation } from "react-i18next";

export default function HearingAndDeadlinePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<number>();
    const { t } = useTranslation("common");
    const [hearingDate, setHearingDate] = useState<{ day: number | null; month: number | null; year: number | null }>({ day: null, month: null, year: null });
    const [deadlineDate, setDeadlineDate] = useState<{ day: number | null; month: number | null; year: number | null }>({ day: null, month: null, year: null });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = 4;

    const queryParams = useMemo(() => {
        const params: HearingAndDeadlinePageDataParamsType = {
            page: currentPage,
            page_size: itemsPerPage,
        };

        if (searchQuery.trim()) {
            params.search = searchQuery.trim();
        }

        if (selectedCategory) {
            params.category = selectedCategory;
        }

        if (selectedSubCategory) {
            params.sub_category = selectedSubCategory;
        }

        if (hearingDate.day) params.hearing_day = Number(hearingDate.day);
        if (hearingDate.month) params.hearing_month = Number(hearingDate.month);
        if (hearingDate.year) params.hearing_year = Number(hearingDate.year);

        if (deadlineDate.day) params.deadline_day = Number(deadlineDate.day);
        if (deadlineDate.month) params.deadline_month = Number(deadlineDate.month);
        if (deadlineDate.year) params.deadline_year = Number(deadlineDate.year);

        return params;
    }, [
        searchQuery,
        selectedCategory,
        selectedSubCategory,
        hearingDate,
        deadlineDate,
        currentPage,
    ]);

    const { data, isLoading } =
        useGetHearingAndDeadlinePageDataQuery(queryParams);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="mx-auto w-full p-2 md:p-3 bg-white rounded-2xl">
            <PageHeadingTitle
                title={t("hearing_and_deadline")}
                subtitle={t("schedule_and_details_for_all_court_proceedings")}
            />
            <div className="col-span-1 md:col-span-2 mb-3">
                    <InputField
                        label={t("search")}
                        placeholder={t("search_cases_clients_laws_documents")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-end gap-3 mb-6">
                
                <SelectField
                    label="Category"
                    type="category"
                    value={selectedCategory?.toString() || ""}
                    onChange={(value) => {
                        setSelectedCategory(Number(value));
                        setSelectedSubCategory(undefined);
                    }}
                    classes={"rounded-full w-full h-fit border border-gray-200 bg-gray-100 px-2 py-3 text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"}
                />
                <SelectField
                    label="Sub-category"
                    type="subCategory"
                    categoryId={selectedCategory}
                    value={selectedSubCategory?.toString() || ""}
                    onChange={(value) =>
                        setSelectedSubCategory(
                            value ? Number(value) : undefined
                        )
                    }
                    classes={"rounded-full w-full h-fit border border-gray-200 bg-gray-100 px-2 py-3  text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"}
                />
                {/* Hearing Date Filter */}
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                        {t("hearing_date")}
                    </label>

                    <div className="grid grid-cols-3 gap-1 xl:gap-2">
                        <input
                            type="text"
                            placeholder="DD"
                            value={hearingDate.day ?? ""}
                            onChange={(e) =>
                                setHearingDate({
                                    ...hearingDate,
                                    day: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />

                        <input
                            type="text"
                            placeholder="MM"
                            value={hearingDate.month ?? ""}
                            onChange={(e) =>
                                setHearingDate({
                                    ...hearingDate,
                                    month: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />

                        <input
                            type="text"
                            placeholder="YYYY"
                            value={hearingDate.year ?? ""}
                            onChange={(e) =>
                                setHearingDate({
                                    ...hearingDate,
                                    year: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={4}
                        />
                    </div>
                </div>

                {/* Deadline Filter */}
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                        {t("deadline")}
                    </label>

                    <div className="grid grid-cols-3 gap-1 xl:gap-2">
                        <input
                            type="text"
                            placeholder="DD"
                            value={deadlineDate.day ?? ""}
                            onChange={(e) =>
                                setDeadlineDate({
                                    ...deadlineDate,
                                    day: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />

                        <input
                            type="text"
                            placeholder="MM"
                            value={deadlineDate.month ?? ""}
                            onChange={(e) =>
                                setDeadlineDate({
                                    ...deadlineDate,
                                    month: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={2}
                        />

                        <input
                            type="text"
                            placeholder="YYYY"
                            value={deadlineDate.year ?? ""}
                            onChange={(e) =>
                                setDeadlineDate({
                                    ...deadlineDate,
                                    year: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="rounded-full border border-gray-200 bg-gray-100 px-2 py-2 text-center text-sm focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                            maxLength={4}
                        />
                    </div>
                </div>
            </div>

            


            <section className="w-full mx-auto space-y-3 md:space-y-6 rounded-2xl">
                {/* Top Header Controls Block */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                        {t("all")}
                    </h3>
                </div>

                {/* Grid Container Matrix mapping responsive column breakdowns */}
                {isLoading ? (
                    <CaseCardSkeleton cardNumber={3} />
                ) : data?.cases?.results.length === 0 ? (
                    <NoContent message="No hearing and deadline yet" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-6">
                        {data?.cases?.results.map((card: { id: string; [key: string]: unknown }, index: number) => (
                            <CaseCard key={index} {...card} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center md:justify-between gap-3 flex-wrap hidden">
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