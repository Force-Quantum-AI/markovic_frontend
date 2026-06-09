"use client";

import React, { useState, useMemo } from "react";
import { MoreHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, ArchiveRestore, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import MainButton from "@/components/shared/MainButton";
import { categoryOptions, statusOptions } from "@/app/(protected)/(user)/hearing-and-deadline/page";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";

// --- TYPES & INTERFACES ---
interface ArchiveItem {
    id: string;
    caseName: string;
    category: "Case" | "Law Record" | "AI Search";
    caseNumber: string;
    courtName: string;
    date: string;
    status: "Archived";
}

interface ArchiveTableProps {
    search?: string;
    category?: string;
    year?: string;
}

// Mock dataset - 247 cases total (showing first 6 as in image, but with pagination)
const generateMockData = (): ArchiveItem[] => {
    const baseData: ArchiveItem[] = [
        {
            id: "1",
            caseName: "markovic/Property Dispute-P 104/24-Case",
            category: "Case",
            caseNumber: "C-2024-019",
            courtName: "High Court",
            date: "12 Mar 2026",
            status: "Archived",
        },
        {
            id: "2",
            caseName: "diesel/Contract-P 104/24-Violation Record",
            category: "Law Record",
            caseNumber: "L-2023-88",
            courtName: "Civil Court",
            date: "04 Jan 2026",
            status: "Archived",
        },
        {
            id: "3",
            caseName: "doren/Employment-P 104/24-Dispute AI Search",
            category: "AI Search",
            caseNumber: "S-2024-07",
            courtName: "District Court",
            date: "22 Feb 2026",
            status: "Archived",
        },
        {
            id: "4",
            caseName: "poul/Family-P 104/24-Inheritance Case",
            category: "Case",
            caseNumber: "C-2023-156",
            courtName: "Family Court",
            date: "18 Nov 2025",
            status: "Archived",
        },
        {
            id: "5",
            caseName: "john/Commercial-P 104/24-Litigation Record",
            category: "Law Record",
            caseNumber: "L-2024-42",
            courtName: "Commercial Court",
            date: "09 Apr 2025",
            status: "Archived",
        },
        {
            id: "6",
            caseName: "emily/Criminal-P 104/24-Defense AI Search",
            category: "AI Search",
            caseNumber: "S-2024-13",
            courtName: "Criminal Court",
            date: "15 May 2025",
            status: "Archived",
        },
    ];

    // Generate additional mock data to reach 247 items for realistic pagination
    const additionalItems: ArchiveItem[] = [];
    const categories: ("Case" | "Law Record" | "AI Search")[] = ["Case", "Law Record", "AI Search"];
    const courtNames = ["High Court", "Civil Court", "District Court", "Family Court", "Commercial Court", "Criminal Court", "Supreme Court", "Magistrate Court"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 7; i <= 247; i++) {
        const year = 2023 + Math.floor(Math.random() * 4);
        const month = months[Math.floor(Math.random() * months.length)];
        const day = Math.floor(Math.random() * 28) + 1;
        additionalItems.push({
            id: i.toString(),
            caseName: `case${i}/Sample-P ${100 + i}/24-${Math.random() > 0.5 ? "Dispute" : "Record"} ${Math.random() > 0.5 ? "Case" : "File"}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            caseNumber: `${categories[Math.floor(Math.random() * categories.length)] === "Case" ? "C" : categories[Math.floor(Math.random() * categories.length)] === "Law Record" ? "L" : "S"}-${2020 + Math.floor(Math.random() * 5)}-${String(i).padStart(3, "0")}`,
            courtName: courtNames[Math.floor(Math.random() * courtNames.length)],
            date: `${day} ${month} ${year}`,
            status: "Archived",
        });
    }

    return [...baseData, ...additionalItems];
};

// Helper function to filter archive items
const filterArchiveItems = (items: ArchiveItem[], search?: string, category?: string, year?: string): ArchiveItem[] => {
    let filtered = [...items];

    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(item =>
            item.caseName.toLowerCase().includes(searchLower) ||
            item.caseNumber.toLowerCase().includes(searchLower) ||
            item.courtName.toLowerCase().includes(searchLower)
        );
    }

    if (category && category !== "all") {
        filtered = filtered.filter(item => item.category === category);
    }

    if (year) {
        filtered = filtered.filter(item => item.date.includes(year));
    }

    return filtered;
};

export default function ArchiveTable() {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [court, setCourt] = useState("");
    const [responsible, setResponsible] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubCategory, setSelectedSubCategory] = useState("All");

    const [allArchiveItems] = useState<ArchiveItem[]>(generateMockData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Pagination calculations
    const totalPages = Math.ceil(allArchiveItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = allArchiveItems.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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

    // Action Handlers
    const handleView = (id: string, caseName: string) => {
        alert(`Viewing archived case: ${caseName} (ID: ${id})`);
    };

    const handleRestore = (id: string, caseName: string) => {
        alert(`Restore case: ${caseName} from archive? (ID: ${id})`);
    };

    const handleDelete = (id: string) => {
        alert(`Permanently delete archived case with ID: ${id}`);
    };

    // Category badge styling
    const getCategoryStyles = (category: string) => {
        switch (category) {
            case "Case":
                return "bg-[#eef2ff] text-[#4f46e5] border-[#c7d2fe]";
            case "Law Record":
                return "bg-[#fef3c7] text-[#d97706] border-[#fde68a]";
            case "AI Search":
                return "bg-[#e0f2fe] text-[#0284c7] border-[#bae6fd]";
            default:
                return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    return (
        <div className="space-y-4">
            <PageHeadingTitle title="All Archive" subtitle="Manage all archived cases and records from this section" />
            <div className="w-full mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl">
                <div className="mb-6 flex flex-col gap-5">
                    <div className="grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                        <InputField 
                        icon={<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />} 
                        label="Client name"
                        placeholder="Search by client name..." 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        />
                        <InputField 
                        icon={<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />} 
                        label="Year"
                        placeholder="Search by year..." 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                        />
                        <InputField 
                        icon={<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />} 
                        label="Court name"
                        placeholder="Search by court name..." 
                        value={court} 
                        onChange={(e) => setCourt(e.target.value)} 
                        />
                        <InputField 
                        icon={<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />} 
                        label="Responsible lawer or legal trainee"
                        placeholder="Search by responsible lawer or legal trainee..." 
                        value={responsible} 
                        onChange={(e) => setResponsible(e.target.value)} 
                        />
                    </div>
                    <div className="grow grid grid-cols-1 md:grid-cols-3 gap-3">
                        <SelectField
                        label="Status"
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        />
                        <SelectField
                        label="Category"
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        />
                        <SelectField
                        label="Sub-category"
                        options={statusOptions}
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        />

                    </div>
                    <div className="flex items-center gap-3">
                        <MainButton label="Apply Filter" onClick={() => setCurrentPage(1)} />
                        <MainButton variant="secondary" label="Reset Filter" onClick={() => setCurrentPage(1)} />
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                            All Archive
                        </h2>
                        <p className="text-sm text-[#427791] mt-0.5">
                            {allArchiveItems.length} archived {allArchiveItems.length === 1 ? "case" : "cases"}
                        </p>
                    </div>
                </div>

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
                            {currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                                    <td className="py-4 px-5">
                                        <span className="block font-medium text-gray-900">{item.caseName}</span>
                                    </td>

                                    <td className="py-4 px-4">
                                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryStyles(item.category)}`}>
                                            {item.category}
                                        </span>
                                    </td>

                                    <td className="py-4 px-4 text-gray-500 font-mono text-xs">{item.caseNumber}</td>

                                    <td className="py-4 px-4 text-gray-600">{item.courtName}</td>

                                    <td className="py-4 px-4 font-medium text-gray-600">{item.date}</td>

                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                            Archived
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
                                                <DropdownMenuItem onClick={() => handleView(item.id, item.caseName)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                                    <Eye className="w-4 h-4 text-gray-400" />
                                                    <span>View</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRestore(item.id, item.caseName)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#135576] rounded-lg hover:bg-[#135576]/5 cursor-pointer transition-colors">
                                                    <ArchiveRestore className="w-4 h-4 text-[#135576]" />
                                                    <span>Restore</span>
                                                </DropdownMenuItem>
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
                    {currentItems.map((item) => (
                        <div key={item.id} className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
                            {/* Row 1: Case Name and Actions */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.caseName}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryStyles(item.category)}`}>
                                            {item.category}
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
                                        <DropdownMenuItem onClick={() => handleView(item.id, item.caseName)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
                                            <Eye className="w-4 h-4 text-gray-400" />
                                            <span>View</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleRestore(item.id, item.caseName)} className="flex items-center gap-2 px-3 py-2 text-sm text-[#135576] rounded-lg hover:bg-[#135576]/5">
                                            <ArchiveRestore className="w-4 h-4" />
                                            <span>Restore</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                                            <Trash2 className="w-4 h-4 text-red-400" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Row 2: Case Number & Court */}
                            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Case Number</span>
                                    <span className="font-mono text-gray-600 text-xs">{item.caseNumber}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Court Name</span>
                                    <span className="font-medium text-gray-700">{item.courtName}</span>
                                </div>
                            </div>

                            {/* Row 3: Date & Status */}
                            <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Date</span>
                                    <span className="font-medium text-gray-600 text-xs">{item.date}</span>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                    Archived
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination - Matching the image style */}
                {allArchiveItems.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <p className="text-[#427791] text-sm">
                            Showing {startIndex + 1} to {Math.min(endIndex, allArchiveItems.length)} of {allArchiveItems.length} results
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
                                                        ? "bg-[#135576] text-white"
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
                {allArchiveItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No archived cases found matching the criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}