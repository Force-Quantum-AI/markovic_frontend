"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import BasedSelect from "@/components/shared/BasedSelect";
import AdminButton from "@/components/shared/AdminButton";

interface MyUsersFiltersProps {
  onFilter: (filters: {
    search: string;
    subscription: string;
    day: string;
    month: string;
    year: string;
  }) => void;
  onReset: () => void;
}

const subscriptionOptions = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

const monthOptions = [
  { value: "all", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function MyUsersFilters({ onFilter, onReset }: MyUsersFiltersProps) {
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState("all");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("");

  const handleApplyFilter = () => {
    onFilter({ search, subscription, day, month, year });
  };

  const handleResetFilter = () => {
    setSearch("");
    setSubscription("all");
    setDay("");
    setMonth("all");
    setYear("");
    onReset();
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-[#BEC4D2]/40 shadow-xs space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-[#101828]" />
        <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[130%]">
          Search &amp; Filter
        </h2>
      </div>

      <div className="space-y-4">
        {/* Full Width Search Field */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name, email, number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3.5 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
          />
        </div>

        {/* Grid Fields: subscription + day + month + year */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Subscription */}
          <BasedSelect
            label="Subscription"
            placeholder="All"
            options={subscriptionOptions}
            value={subscription}
            onValueChange={setSubscription}
          />

          {/* Day */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">Day</label>
            <input
              type="number"
              placeholder="e.g. 22"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-5 py-3 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          {/* Month */}
          <BasedSelect
            label="Month"
            placeholder="All Months"
            options={monthOptions}
            value={month}
            onValueChange={setMonth}
          />

          {/* Year */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">Year</label>
            <input
              type="number"
              placeholder="e.g. 2026"
              min={2000}
              max={2100}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-5 py-3 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          <AdminButton
            onClick={handleApplyFilter}
            label="Apply Filter"
            className="py-3"
          />
          <AdminButton
            onClick={handleResetFilter}
            label="Reset Filter"
            variant="secondary"
            className="py-3"
          />
        </div>
      </div>
    </div>
  );
}
