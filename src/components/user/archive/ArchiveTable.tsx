"use client";

import React, { useState } from "react";
import { MoreHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, ArchiveRestore, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import MainButton from "@/components/shared/MainButton";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectNewDropdown";
import { useGetAllArchivedCasesQuery, useDeleteArchiveCaseMutation, IArchiveParams } from "@/store/features/archive/archive.api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function ArchiveTable() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [year, setYear] = useState<string>("");
    const [court, setCourt] = useState("");
    const [responsible, setResponsible] = useState("");
    const [filterName, setFilterName] = useState("");
    const [filterYear, setFilterYear] = useState<string>("");
    const [filterCourt, setFilterCourt] = useState("");

    const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | undefined>();

    const [filterCategory, setFilterCategory] = useState<number | undefined>();
    const [filterSubCategory, setFilterSubCategory] = useState<number | undefined>();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const queryParams: IArchiveParams = {
        page: currentPage,
        page_size: itemsPerPage,
    };

    if (filterName) {
        queryParams.search = filterName;
        queryParams.case_name = filterName;
    }

    if (filterYear) {
        queryParams.year = Number(filterYear);
    }

    if (filterCourt) {
        queryParams.court = filterCourt;
    }

    if (responsible) {
        queryParams.responsible = responsible;
    }

    if (filterCategory !== undefined) {
        queryParams.category = filterCategory.toString();
    }

    if (filterSubCategory !== undefined) {
        queryParams.sub_category = filterSubCategory.toString();
    }

    const { data, isLoading } = useGetAllArchivedCasesQuery(queryParams);

    const [deleteArchiveCase] = useDeleteArchiveCaseMutation();

    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalCount);
    const currentItems = data?.results || [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleApplyFilter = () => {
        setFilterName(name);
        setFilterYear(year);
        setFilterCourt(court);

        setFilterCategory(selectedCategory);
        setFilterSubCategory(selectedSubCategory);

        setCurrentPage(1);
    };

    const handleResetFilter = () => {
        setName("");
        setYear("");
        setCourt("");
        setResponsible("");

        setFilterName("");
        setFilterYear("");
        setFilterCourt("");
        setCurrentPage(1);
        setSelectedCategory(undefined);
        setSelectedSubCategory(undefined);

        setFilterCategory(undefined);
        setFilterSubCategory(undefined);
    };

    // Get visible page numbers for pagination
    const getVisiblePages = () => {
        const maxVisible = 5;
        const pages = [];

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push(-1); // ellipsis indicator
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push(-1);
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push(-1);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push(-1);
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const handleSetYear = (value: string) => {
        setYear(value);
    };

    // Action Handlers
    const handleView = (id: string) => {
        router.push(`/archive-cases/${id}`);
    };

    const handleRestore = (id: string, caseName: string) => {
        toast.info(`Restoring case "${caseName}" is not implemented yet.`);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to permanently delete this archived case?")) {
            try {
                await deleteArchiveCase({ id }).unwrap();
                toast.success("Archived case deleted successfully");
            } catch (error) {
                console.error("error is", error);
                toast.error("Failed to delete archived case");
            }
        }
    };

    // Category badge styling
    const getCategoryStyles = (categoryName: string) => {
        const lower = categoryName?.toLowerCase() || "";
        if (lower.includes("civil")) {
            return "bg-[#eef2ff] text-[#4f46e5] border-[#c7d2fe]";
        }
        if (lower.includes("criminal")) {
            return "bg-[#fef3c7] text-[#d97706] border-[#fde68a]";
        }
        return "bg-[#e0f2fe] text-[#0284c7] border-[#bae6fd]";
    };

    return (
        <div className="space-y-4">
            <PageHeadingTitle title="All Archive" subtitle="Manage all archived cases and records from this section" />
            <div className="w-full mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl border border-gray-100/80 shadow-sm">
                <div className="mb-6 flex flex-col gap-5">
                    <div className="grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                        <InputField
                            label="Client name"
                            placeholder="Search by client name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputField
                            label="Year"
                            inputType="number"
                            placeholder="Search by year..."
                            value={year}
                            onChange={(e) => handleSetYear(e.target.value)}
                        />
                        <InputField
                            label="Court name"
                            placeholder="Search by court name..."
                            value={court}
                            onChange={(e) => setCourt(e.target.value)}
                        />
                        <InputField
                            label="Responsible lawyer or legal trainee"
                            placeholder="Search by responsible lawyer or legal trainee..."
                            value={responsible}
                            onChange={(e) => setResponsible(e.target.value)}
                        />
                    </div>
                    <div className="grow grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* <SelectField
                            label="Status"
                            options={statusOptions}
                            value={selectedStatus}
                            onChange={(e: any) => setSelectedStatus(e.target.value)}
                        /> */}
                        <SelectField
                            label="Category"
                            type="category"
                            value={selectedCategory?.toString() || ""}
                            onChange={(value) => {
                                setSelectedCategory(
                                    value ? Number(value) : undefined
                                );

                                setSelectedSubCategory(undefined);
                            }}
                            classes={"w-full h-fit rounded-full border border-gray-200 bg-gray-100 py-2.5 pl-4 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"}
                        />
                        <SelectField
                            label="Sub-category"
                            type="subCategory"
                            categoryId={selectedCategory}
                            value={selectedSubCategory?.toString() || ""}
                            onChange={(value) => {
                                setSelectedSubCategory(
                                    value ? Number(value) : undefined
                                );
                            }}
                            classes={"w-full h-fit rounded-full border border-gray-200 bg-gray-100 py-2.5 pl-4 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <MainButton label="Apply Filter" onClick={handleApplyFilter} />
                        <MainButton variant="secondary" label="Reset Filter" onClick={handleResetFilter} />
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl border border-gray-100/80 shadow-sm">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                            All Archive
                        </h2>
                        <p className="text-sm text-[#427791] mt-0.5">
                            {totalCount} archived {totalCount === 1 ? "case" : "cases"}
                        </p>
                    </div>
                </div>

                {/* Loading state skeleton */}
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full rounded-2xl bg-gray-200" />
                        <Skeleton className="h-12 w-full rounded-2xl bg-gray-200" />
                        <Skeleton className="h-12 w-full rounded-2xl bg-gray-200" />
                        <Skeleton className="h-12 w-full rounded-2xl bg-gray-200" />
                    </div>
                ) : (
                    <>
                        {/* --- DESKTOP TABLE VIEW (Visible lg and up) --- */}
                        <div className="hidden lg:block w-full overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#e9eff2] text-gray-600 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                                        <th className="py-3.5 px-5">Case Name</th>
                                        <th className="py-3.5 px-4">Category</th>
                                        <th className="py-3.5 px-4">Case Number</th>
                                        <th className="py-3.5 px-4">Court Name</th>
                                        <th className="py-3.5 px-4">Date</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                    {currentItems.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors"

                                        >
                                            <td className="py-4 px-5">
                                                <span className="block font-medium text-gray-900">{item.case_name}</span>
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryStyles(item.category_name)}`}>
                                                    {item.category_name}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 text-gray-500 font-mono text-xs">{item.case_number}</td>

                                            <td className="py-4 px-4 text-gray-600">{item.court_name}</td>

                                            <td className="py-4 px-4 font-medium text-gray-600">
                                                {item.date || (item.closed_at ? new Date(item.closed_at).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                }) : "")}
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                    {item.status_name || "Archived"}
                                                </span>
                                            </td>

                                            <td className="py-4 px-5 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all focus:outline-none">
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                                                        <DropdownMenuItem onClick={() => handleView(item.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                                            <Eye className="w-4 h-4 text-gray-400" />
                                                            <span>View</span>
                                                        </DropdownMenuItem>
                                                        {/* <DropdownMenuItem onClick={() => handleRestore(item.id, item.case_name)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#135576] rounded-lg hover:bg-[#135576]/5 cursor-pointer transition-colors">
                                                            <ArchiveRestore className="w-4 h-4 text-[#135576]" />
                                                            <span>Restore</span>
                                                        </DropdownMenuItem> */}
                                                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                            <span>Delete</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* --- MOBILE RESPONSIVE CARD CONTAINER --- */}
                        <div className="block lg:hidden space-y-4">
                            {currentItems.map((item: any) => (
                                <div key={item.id} className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.case_name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryStyles(item.category_name)}`}>
                                                    {item.category_name}
                                                </span>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1.5 rounded-full border border-gray-100 bg-gray-50 text-gray-400 focus:outline-none shrink-0">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-md border p-1">
                                                <DropdownMenuItem onClick={() => handleView(item.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
                                                    <Eye className="w-4 h-4 text-gray-400" />
                                                    <span>View</span>
                                                </DropdownMenuItem>
                                                {/* <DropdownMenuItem onClick={() => handleRestore(item.id, item.case_name)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#135576] rounded-lg hover:bg-[#135576]/5">
                                                    <ArchiveRestore className="w-4 h-4 text-[#135576]" />
                                                    <span>Restore</span>
                                                </DropdownMenuItem> */}
                                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                                        <div>
                                            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Case Number</span>
                                            <span className="font-mono text-gray-600 text-xs">{item.case_number}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Court Name</span>
                                            <span className="font-medium text-gray-700">{item.court_name}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                                        <div>
                                            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Date</span>
                                            <span className="font-medium text-gray-600 text-xs">
                                                {item.date || (item.closed_at ? new Date(item.closed_at).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                }) : "")}
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                            {item.status_name || "Archived"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination - Matching the image style */}
                        {totalCount > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                <p className="text-[#427791] text-sm">
                                    Showing {startIndex + 1} to {endIndex} of {totalCount} results
                                </p>

                                {totalPages > 1 && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${currentPage === 1
                                                ? "cursor-not-allowed text-gray-300"
                                                : "text-[#427791] hover:bg-[#135576]/5 hover:text-[#135576]"
                                                }`}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>

                                        <div className="flex gap-1">
                                            {getVisiblePages().map((page, index) => (
                                                page === -1 ? (
                                                    <span key={`ellipsis-${index}`} className="flex h-8 w-8 items-center justify-center text-gray-400 text-sm">
                                                        ...
                                                    </span>
                                                ) : (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page
                                                            ? "bg-[#135-[#135576] text-white"
                                                            : "text-gray-600 hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${currentPage === totalPages
                                                ? "cursor-not-allowed text-gray-300"
                                                : "text-[#427791] hover:bg-[#135576]/5 hover:text-[#135576]"
                                                }`}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Empty state */}
                        {totalCount === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No archived cases found matching the criteria.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}