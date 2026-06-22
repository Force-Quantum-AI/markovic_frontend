"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Scale } from "lucide-react";
import { LawCard } from "@/components/shared/LawCard";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import { useGetAllLawAndBylawQuery } from "@/store/features/lawAndBylaw/lawAndBylaw.api";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectField } from "@/components/shared/SelectNewDropdown";



export default function LawAndByLawPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const queryParams = {
        page: currentPage,
        ...(debouncedSearch.trim() && {
            search: debouncedSearch.trim(),
        }),
        ...(selectedCategory && {
            category: selectedCategory,
        }),
    };

    const { data, isLoading, error } =
        useGetAllLawAndBylawQuery(queryParams);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCategoryChange = (category?: number) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const totalPages = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 1;
    const startItem = data?.results?.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
    const endItem = data?.results?.length ? startItem + data.results.length - 1 : 0;

    return (
        <div className="mx-auto w-full p-2 md:p-3 bg-white rounded-2xl">
            <PageHeadingTitle
                title="Laws & By-laws"
                subtitle="Explore all laws & bylaws here"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 items-end gap-3 my-4">
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
                            className="w-full rounded-full border border-gray-200 bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        />
                    </div>
                </div>
                <SelectField
                    label="Category"
                    type="category"
                    value={selectedCategory?.toString() || ""}
                    onChange={(value) => {
                        setSelectedCategory(
                            value ? Number(value) : undefined
                        );
                        setCurrentPage(1);
                    }}
                    classes={"w-full h-fit rounded-full border border-gray-200 bg-gray-100 py-2.5  px-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"}
                />
            </div>

            <section className="w-full mx-auto space-y-3 rounded-2xl">
                {/* Top Header Controls Block */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl text-gray-900 tracking-tight">
                        All Laws
                    </h3>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="flex min-h-[250px] flex-col rounded-3xl bg-[#F5F5F5] p-4 space-y-4">
                                <Skeleton className="h-10 w-10 rounded-lg bg-gray-300" />
                                <Skeleton className="h-6 w-3/4 rounded bg-gray-300" />
                                <Skeleton className="h-4 w-1/2 rounded bg-gray-300" />
                                <Skeleton className="h-4 w-2/3 rounded bg-gray-300" />
                                <div className="mt-auto flex justify-end">
                                    <Skeleton className="h-6 w-16 rounded-full bg-gray-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 text-red-500 font-roboto">
                        <p className="text-lg font-medium">Failed to load laws & bylaws</p>
                        <p className="text-sm">Please try again later.</p>
                    </div>
                ) : !data?.results || data.results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400 font-roboto">
                        <Scale className="w-12 h-12 mb-3 opacity-60 text-slate-400" />
                        <p className="text-lg font-medium">No laws found matching your search</p>
                        <p className="text-sm">Try typing different keywords or resetting filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                        {data.results.map((law: any, index: number) => (
                            <LawCard
                                key={law.id || index}
                                id={law.id?.toString()}
                                title={law.title}
                                category={law.category_name}
                                officialGazette={law.official_gazette}
                                lastUpdate={law.last_updated}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && !error && data?.results?.length > 0 && (
                    <div className="flex items-center justify-center md:justify-between gap-3 flex-wrap pt-4">
                        <p className="text-[#427791] text-xs md:text-base">
                            Showing {startItem} to {endItem} of {data.count || 0} laws
                        </p>

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

                    </div>
                )}
            </section>
        </div>
    );
}