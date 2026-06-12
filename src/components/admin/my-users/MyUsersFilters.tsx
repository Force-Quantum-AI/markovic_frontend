"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import BasedSelect from "@/components/shared/BasedSelect";

interface MyUsersFiltersProps {
  onFilter: (filters: {
    search: string;
    clientName: string;
    year: string;
    subscription: string;
  }) => void;
  onReset: () => void;
}

const subscriptionOptions = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "professional", label: "Professional" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "enterprise", label: "Enterprise" },
  { value: "ultimate", label: "Ultimate" },
  { value: "custom", label: "Custom" },
  { value: "limited edition", label: "Limited Edition" },
];

export default function MyUsersFilters({ onFilter, onReset }: MyUsersFiltersProps) {
  // Search state
  const [search, setSearch] = useState("");
  const [clientName, setClientName] = useState("");
  const [year, setYear] = useState("");
  const [subscription, setSubscription] = useState("all");

  const handleApplyFilter = () => {
    onFilter({
      search,
      clientName,
      year,
      subscription,
    });
  };

  const handleResetFilter = () => {
    setSearch("");
    setClientName("");
    setYear("");
    setSubscription("all");
    onReset();
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-[#BEC4D2]/40 shadow-xs space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-[#101828]" />
        <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[130%]">
          Search & Filter
        </h2>
      </div>

      <div className="space-y-4">
        {/* Full Width Search Field */}
        <div className="w-full">
          <input 
            type="text" 
            placeholder="Search laws, bylaws, articles, keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3.5 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
          />
        </div>

        {/* Grid fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Client name */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">Client name</label>
            <input 
              type="text"
              placeholder="Search client name..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-5 py-3 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">Year</label>
            <input 
              type="text"
              placeholder="Search by year..."
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-5 py-3 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          {/* Subscription */}
          <BasedSelect
            label="Subscription"
            placeholder="All"
            options={subscriptionOptions}
            value={subscription}
            onValueChange={setSubscription}
          />

        </div>

        {/* Action buttons */}
        <div className="flex gap-4 pt-2">
          <button 
            onClick={handleApplyFilter}
            className="px-6 py-3 rounded-[32px] bg-[#0F5A7F] text-white font-roboto text-[14px] font-medium leading-[20px] hover:bg-[#0c4968] transition-all cursor-pointer"
          >
            Apply Filter
          </button>
          <button 
            onClick={handleResetFilter}
            className="px-6 py-3 rounded-[32px] border border-[#BEC4D2] bg-white text-[#475467] font-roboto text-[14px] font-medium leading-[20px] hover:bg-gray-50 transition-all cursor-pointer"
          >
            Reset Filter
          </button>
        </div>

      </div>
    </div>
  );
}
