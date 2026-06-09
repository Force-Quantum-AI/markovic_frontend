"use client";

import { useState } from "react";
import { Search, Plus, Users, Files, Scale, FileCheck2 } from "lucide-react";
import MainButton from "@/components/shared/MainButton";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import { MetricCard } from "../dashboard/DashboardMetrics";
import UsersTable from "./UsersTable";

type CaseCategory = "All" | "Civil" | "Criminal" | "Commercial" | "Probate";

const statusOptions = ["All", "Active", "On appeal", "On revision", "In enforcement", "Finished", "Archived", "Before Const. Court", "Before Euro. Court of H.Rights"];
const categoryOptions = ["All", "Civil", "Criminal", "Family", "Property", "Insurance", "Labour", "Tax"];

const statsData = [
    {
        id: "total-clients",
        label: "Total Clients",
        value: 7,
        icon: <Users className="w-4 h-4 stroke-[2]" />,
        bgColor: "bg-[#E6D1E3]", // Soft Pink hue
        iconBgColor: "bg-[#fbe6f7]"
    },
    {
        id: "total-cases",
        label: "Total Cases",
        value: 86,
        icon: <Scale className="w-4 h-4 stroke-[2]" />,
        bgColor: "bg-[#DAE6C9]", // Soft Lime-Green hue
        iconBgColor: "bg-[#edf4e4]"
    },
    {
        id: "new-this-month",
        label: "New This Month",
        value: 2,
        icon: <FileCheck2 className="w-4 h-4 stroke-[2]" />,
        bgColor: "bg-[#F2E6D8]", // Soft Cream/Orange hue
        iconBgColor: "bg-[#fff2de]"
    },
    {
        id: "active-cases",
        label: "Active Cases",
        value: 72,
        icon: <Files className="w-4 h-4 stroke-[2]" />,
        bgColor: "bg-[#C8F0DB]", // Soft Mint hue
        iconBgColor: "bg-[#e2f6ec]"
    }
];

export default function ClientPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [court, setCourt] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

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
            {/* heading  */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-3">
                <PageHeadingTitle
                    title="My Clients"
                    subtitle="Manage and track your clients and their legal matters"
                />
                <MainButton icon={<Plus className="h-4 w-4" />} label="Add Client" onClick={() => setCurrentPage(1)} />
            </div>

            {/* matrix card  */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                {statsData.map((stat) => (
                    <MetricCard
                        key={stat.id}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        bgColor={stat.bgColor}
                        iconBgColor={stat.iconBgColor}
                    />
                ))}
            </div>
            {/* Search Bar */}
            <div className="mb-6 flex flex-col md:flex-row items-center gap-5">
                <div className="grow grid grid-cols-1 xl:grid-cols-3 gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by client name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by year..."
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by court name..."
                            value={court}
                            onChange={(e) => setCourt(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
                        />
                    </div>
                </div>
                <MainButton icon={<Search className="h-4 w-4" />} label="Search" onClick={() => setCurrentPage(1)} />
            </div>

            <UsersTable />
        </div>
    );
}