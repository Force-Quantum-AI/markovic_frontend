"use client";

import { Download, Plus, ChevronDown } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LawFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  filterCategories: string[];
  onExport: () => void;
  onAddLaw: () => void;
}

export default function LawFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  filterCategories,
  onExport,
  onAddLaw,
}: LawFiltersProps) {
  return (
    <div className="w-full bg-white p-6 rounded-[24px] border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row items-end justify-between gap-4 font-roboto">
      {/* Search Input */}
      <div className="w-full md:flex-1 space-y-1.5 flex flex-col items-start">
        <span className="text-sm font-semibold text-gray-700 pl-1">Search:</span>
        <input
          type="text"
          placeholder="Search laws, bylaws, articles, keywords"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-5 py-3 h-12 rounded-full border border-[#D1D5DC] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
        />
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-[220px] space-y-1.5 flex flex-col items-start">
        <span className="text-sm font-semibold text-gray-700 pl-1">Filters:</span>
        <Select
          value={categoryFilter}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="w-full h-12 rounded-full border border-[#D1D5DC] bg-[#F5F6F7] px-5 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all cursor-pointer">
            <SelectValue placeholder="All Laws" />
            <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-gray-500" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            sideOffset={4}
            className="z-[9999] bg-white border border-[#D1D5DC] rounded-2xl shadow-lg p-1 text-[#101828] font-roboto min-w-[var(--radix-select-trigger-width)]"
          >
            <SelectItem
              value="all"
              className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
            >
              All Laws
            </SelectItem>
            {filterCategories.map((catName) => (
              <SelectItem
                key={catName}
                value={catName}
                className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
              >
                {catName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full md:w-auto shrink-0">
        <AdminButton
          label="Export"
          icon={<Download className="w-4 h-4" />}
          variant="secondary"
          onClick={onExport}
          style={{ padding: "12px 24px" }}
          className="flex-1 md:flex-none h-12"
        />
        <AdminButton
          label="Add Law"
          icon={<Plus className="w-4 h-4" />}
          onClick={onAddLaw}
          style={{ padding: "12px 24px" }}
          className="flex-1 md:flex-none h-12"
        />
      </div>
    </div>
  );
}
