"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminButton from "@/components/shared/AdminButton";
import ArchiveCasesTable from "@/components/admin/dashboard/ArchiveCasesTable";

export default function ArchiveCasesPage() {
  const [searchVal, setSearchVal] = useState("");
  const [clientVal, setClientVal] = useState("");
  const [yearVal, setYearVal] = useState("");
  const [courtVal, setCourtVal] = useState("");
  const [lawyerVal, setLawyerVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("");
  const [subcategoryVal, setSubcategoryVal] = useState("");
  const [statusVal, setStatusVal] = useState("");

  const handleApplyFilter = () => {
  };

  const handleResetFilter = () => {
    setSearchVal("");
    setClientVal("");
    setYearVal("");
    setCourtVal("");
    setLawyerVal("");
    setCategoryVal("");
    setSubcategoryVal("");
    setStatusVal("");
  };

  return (
    <div className="w-full space-y-6 font-roboto">
      <h1 className="text-[24px] font-bold text-[#101828] font-roboto text-left">
        Archive Cases
      </h1>

      <div className="w-full bg-white rounded-3xl p-6 border border-[#BEC4D2]/40 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#101828]" />
          <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[130%]">
            Search & Filter
          </h2>
        </div>

        <div className="space-y-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search laws, bylaws, articles, keywords"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] placeholder:text-[#161A20]/60 font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Client name
              </label>
              <input
                type="text"
                placeholder="Search client name..."
                value={clientVal}
                onChange={(e) => setClientVal(e.target.value)}
                className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] placeholder:text-[#161A20]/60 font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
              />
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Year
              </label>
              <input
                type="text"
                placeholder="Search by year..."
                value={yearVal}
                onChange={(e) => setYearVal(e.target.value)}
                className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] placeholder:text-[#161A20]/60 font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
              />
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Court Name
              </label>
              <input
                type="text"
                placeholder="Search court name..."
                value={courtVal}
                onChange={(e) => setCourtVal(e.target.value)}
                className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] placeholder:text-[#161A20]/60 font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
              />
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Responsible lawyer or legal trainee
              </label>
              <input
                type="text"
                placeholder="Add lawyer name..."
                value={lawyerVal}
                onChange={(e) => setLawyerVal(e.target.value)}
                className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] placeholder:text-[#161A20]/60 font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
              />
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Category
              </label>
              <Select value={categoryVal || undefined} onValueChange={(val) => setCategoryVal(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all data-placeholder:text-[#161A20]/60 flex items-center justify-between">
                  <SelectValue placeholder="Choose status..." />
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="all" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">All Category</SelectItem>
                  <SelectItem value="Case" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Case</SelectItem>
                  <SelectItem value="Law Record" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Law Record</SelectItem>
                  <SelectItem value="AI Search" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">AI Search</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Sub category
              </label>
              <Select value={subcategoryVal || undefined} onValueChange={(val) => setSubcategoryVal(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all data-placeholder:text-[#161A20]/60 flex items-center justify-between">
                  <SelectValue placeholder="Choose status..." />
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="all" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">All Subcategory</SelectItem>
                  <SelectItem value="Property Dispute" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Property Dispute</SelectItem>
                  <SelectItem value="Contract Dispute" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Contract Dispute</SelectItem>
                  <SelectItem value="Employment Dispute" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Employment Dispute</SelectItem>
                  <SelectItem value="Family Dispute" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Family Dispute</SelectItem>
                  <SelectItem value="Commercial Dispute" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Commercial Dispute</SelectItem>
                  <SelectItem value="Criminal Dispute" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Criminal Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Status
              </label>
              <Select value={statusVal || undefined} onValueChange={(val) => setStatusVal(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all data-placeholder:text-[#161A20]/60 flex items-center justify-between">
                  <SelectValue placeholder="Choose status..." />
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="all" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">All Status</SelectItem>
                  <SelectItem value="Archived" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <AdminButton
              onClick={handleApplyFilter}
              label="Apply Filter"
              className="h-[50px] py-3 px-6"
            />
            <AdminButton
              onClick={handleResetFilter}
              label="Reset Filter"
              variant="secondary"
              className="h-[50px] py-3 px-6"
            />
          </div>
        </div>
      </div>
      <div>
        <ArchiveCasesTable/>
      </div>
    </div>
  );
}
