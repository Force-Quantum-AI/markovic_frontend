"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MoreHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- TYPES & INTERFACES ---
interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    createdDate: string;
    totalCases: number;
}

interface UsersTableProps {
    name?: string;
    year?: string;
    email?: string;
}

// Helper function to filter users based on props
const filterUsers = (users: User[], name?: string, year?: string, email?: string): User[] => {
    let filtered = [...users];

    if (name) {
        filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (email) {
        filtered = filtered.filter(user =>
            user.email.toLowerCase().includes(email.toLowerCase())
        );
    }

    if (year) {
        filtered = filtered.filter(user =>
            user.createdDate.includes(year)
        );
    }

    return filtered;
};

export default function UsersTable({ name, year, email }: UsersTableProps) {
    // Full dataset from the image
    const [users] = useState<User[]>([
        {
            id: "1",
            name: "Kristin Watson",
            phoneNumber: "+382 67 234 567",
            email: "kristinwatson@gmail.com",
            createdDate: "12 Jun 2025",
            totalCases: 3,
        },
        {
            id: "2",
            name: "Esther Howard",
            phoneNumber: "+382 67 345 678",
            email: "esther.howard@gmail.com",
            createdDate: "15 Jul 2025",
            totalCases: 5,
        },
        {
            id: "3",
            name: "Savannah Nguyen",
            phoneNumber: "+382 67 456 789",
            email: "jackson.graham@gmail.com",
            createdDate: "22 Aug 2024",
            totalCases: 2,
        },
        {
            id: "4",
            name: "John Kollings",
            phoneNumber: "+382 67 567 890",
            email: "anna.maz@example.com",
            createdDate: "05 Mar 2024",
            totalCases: 7,
        },
        {
            id: "5",
            name: "Wade Warren",
            phoneNumber: "+382 67 678 901",
            email: "wade.warren@email.com",
            createdDate: "18 Jan 2024",
            totalCases: 4,
        },
        {
            id: "6",
            name: "Brooklyn Simmons",
            phoneNumber: "+382 67 789 012",
            email: "brooklyn.simmons@gmail.com",
            createdDate: "29 Feb 2024",
            totalCases: 6,
        },
        {
            id: "7",
            name: "Eleanor Pena",
            phoneNumber: "+382 67 890 123",
            email: "eleanor.pena@example.com",
            createdDate: "14 Apr 2024",
            totalCases: 1,
        },
        {
            id: "8",
            name: "Cameron Williamson",
            phoneNumber: "+382 67 901 234",
            email: "cameron.w@gmail.com",
            createdDate: "07 May 2024",
            totalCases: 8,
        },
    ]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Apply filters
    const filteredUsers = useMemo(() => {
        return filterUsers(users, name, year, email);
    }, [users, name, year, email]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [name, year, email]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Click Actions Handlers
    const handleView = (id: string, name: string) => {
        alert(`Viewing user details for: ${name} (ID: ${id})`);
    };

    const handleDelete = (id: string) => {
        // Note: This is a mock delete since we're not actually modifying the original dataset
        alert(`Delete user with ID: ${id}`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl">
            {/* Table Header Section */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                    Clients
                </h2>
                <button className="text-sm font-semibold text-[#135576] hover:underline">
                    View All
                </button>
            </div>

            {/* --- DESKTOP TABLE VIEW (Visible lg and up) --- */}
            <div className="hidden lg:block w-full overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#e9eff2] text-gray-600 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                            <th className="py-3.5 px-5">Name</th>
                            <th className="py-3.5 px-4">Phone Number</th>
                            <th className="py-3.5 px-4">Email</th>
                            <th className="py-3.5 px-4">Created Date</th>
                            <th className="py-3.5 px-4">Total Cases</th>
                            <th className="py-3.5 px-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                                {/* Name column */}
                                <td className="py-4 px-5 flex items-center gap-2">
                                    <div className="h-8 w-8 relative rounded-full overflow-hidden">
                                        <Image
                                            src="/dummy-user.jpg"
                                            alt="U"
                                            fill
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <span className="block font-bold text-gray-900">{user.name}</span>
                                </td>

                                {/* Phone Number */}
                                <td className="py-4 px-4 text-gray-600">{user.phoneNumber}</td>

                                {/* Email */}
                                <td className="py-4 px-4 text-gray-500">{user.email}</td>

                                {/* Created Date */}
                                <td className="py-4 px-4 font-medium text-gray-600">{user.createdDate}</td>

                                {/* Total Cases */}
                                <td className="py-4 px-4 flex items-center gap-1">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="inline-flex items-center justify-center w-7 h-7  text-sm font-semibold">
                                        {user.totalCases}
                                    </span>
                                </td>

                                {/* Actions dropdown */}
                                <td className="py-4 px-5 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all focus:outline-none">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                                            <DropdownMenuItem onClick={() => handleView(user.id, user.name)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none">
                                                <Eye className="w-4 h-4 text-gray-400" />
                                                <span>View</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(user.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none">
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
                {currentUsers.map((user) => (
                    <div key={user.id} className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
                        {/* Row 1: Name and Actions */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-gray-900 text-base">{user.name}</h4>
                                <span className="text-xs text-gray-400">{user.phoneNumber}</span>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1.5 rounded-full border border-gray-100 bg-gray-50 text-gray-400 focus:outline-none">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32 bg-white rounded-xl shadow-md border p-1">
                                    <DropdownMenuItem onClick={() => handleView(user.id, user.name)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
                                        <Eye className="w-4 h-4 text-gray-400" />
                                        <span>View</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(user.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Row 2: Email */}
                        <div className="space-y-1 pt-1">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Email</span>
                            <p className="text-xs font-medium text-gray-700 break-all">{user.email}</p>
                        </div>

                        {/* Row 3: Grid Footer Info */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
                            <div>
                                <span className="text-gray-400 block text-[10px]">Created Date</span>
                                <span className="font-medium text-gray-700">{user.createdDate}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 block text-[10px]">Total Cases</span>
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#eefbf2] text-[#22c55e] text-xs font-semibold">
                                    {user.totalCases}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
                <div className="flex items-center justify-center md:justify-between gap-3 flex-wrap pt-2">
                    <p className="text-[#427791] text-xs md:text-base">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} clients
                    </p>
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
            )}

            {/* Empty state when no results */}
            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No clients found matching the criteria.</p>
                </div>
            )}
        </div>
    );
}