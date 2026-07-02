"use client";

import { useState } from "react";
import { Search, Users, Files, Scale, FileCheck2 } from "lucide-react";
import MainButton from "@/components/shared/MainButton";
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import { MetricCard } from "../dashboard/DashboardMetrics";
import UsersTable from "./UsersTable";
import { useGetAllClientsQuery } from "@/store/features/profile/profile.api";
import { useTranslation } from "react-i18next";

const itemsPerPage = 5;

const formatDateFilter = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;
  return trimmed;
};

export default function ClientPage() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [court, setCourt] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterCourt, setFilterCourt] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation("common");

  const { data, isLoading, isError } = useGetAllClientsQuery({
    client_name: filterName || undefined,
    search: filterCourt || undefined,
    date: formatDateFilter(filterYear) || undefined,
    page: currentPage,
    page_size: itemsPerPage,
  });

  const stats = data?.stats;
  const statsData = [
    {
      id: "total-clients",
      label: t("total_clients"),
      value: stats?.total_clients ?? 0,
      icon: <Users className="w-4 h-4 stroke-2" />,
      bgColor: "bg-[#E6D1E3]",
      iconBgColor: "bg-[#fbe6f7]",
    },
    {
      id: "total-cases",
      label: t("total_cases"),
      value: stats?.total_cases ?? 0,
      icon: <Scale className="w-4 h-4 stroke-2" />,
      bgColor: "bg-[#DAE6C9]",
      iconBgColor: "bg-[#edf4e4]",
    },
    {
      id: "new-this-month",
      label: t("new_this_month"),
      value: stats?.new_this_month ?? 0,
      icon: <FileCheck2 className="w-4 h-4 stroke-2" />,
      bgColor: "bg-[#F2E6D8]",
      iconBgColor: "bg-[#fff2de]",
    },
    {
      id: "active-cases",
      label: t("active_cases"),
      value: stats?.active_cases ?? 0,
      icon: <Files className="w-4 h-4 stroke-2" />,
      bgColor: "bg-[#C8F0DB]",
      iconBgColor: "bg-[#e2f6ec]",
    },
  ];

  const clients = data?.clients?.results ?? [];
  const totalCount = data?.clients?.count ?? 0;

  const handleApplyFilter = () => {
    setFilterName(name);
    setFilterYear(year);
    setFilterCourt(court);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-2 md:p-3">
      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
        <PageHeadingTitle
          title={t("my_clients")}
          subtitle={t("manage_clients_and_track_their_legal_matters")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[135px] animate-pulse bg-gray-50">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
                <div className="mt-4 space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))
        ): statsData.map((stat) => (
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

      <div className="mb-6 flex flex-col md:flex-row items-center gap-5">
        <div className="grow grid grid-cols-1 xl:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("search_by_name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("search_by_year")}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("search_by_court_name")}
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
            />
          </div>
        </div>
        <MainButton icon={<Search className="h-4 w-4" />} label={t("search")} onClick={handleApplyFilter} />
      </div>

      <UsersTable
        clients={clients}
        totalCount={totalCount}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        isError={isError}
      />

      {isError && (
        <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          Failed to load clients. Please try again.
        </div>
      )}
    </div>
  );
}
