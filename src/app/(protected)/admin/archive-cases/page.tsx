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
import { useGetArchiveCasesListQuery } from "@/store/features/admin/archive-cases/archive.api";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "@/store/features/admin/category-subcategory/category.api";
import { useGetAllCaseStatusesQuery } from "@/store/features/admin/global/global.api";

export default function ArchiveCasesPage() {
  const [page, setPage] = useState(1);

  // Input states
  const [searchVal, setSearchVal] = useState("");
  const [clientVal, setClientVal] = useState("");
  const [yearVal, setYearVal] = useState("");
  const [courtVal, setCourtVal] = useState("");
  const [lawyerVal, setLawyerVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("");
  const [subcategoryVal, setSubcategoryVal] = useState("");
  const [statusVal, setStatusVal] = useState("");

  // Applied filter state to trigger query only on Apply/Reset button clicks
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    client: "",
    year: "",
    court: "",
    lawyer: "",
    category: "",
    subcategory: "",
    status: "",
  });

  const queryParams = {
    page,
    search: appliedFilters.search || undefined,
    category: appliedFilters.category || undefined,
    court: appliedFilters.court || undefined,
    status: appliedFilters.status || undefined,
    "day / month / year": appliedFilters.year || undefined,
  };

  // Queries for dynamic filters and case data
  const { data: archiveData, isLoading, isFetching } = useGetArchiveCasesListQuery(queryParams);
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: subcategories } = useGetAllSubCategoriesQuery();
  const { data: statuses } = useGetAllCaseStatusesQuery();

  const handleApplyFilter = () => {
    setAppliedFilters({
      search: searchVal,
      client: clientVal,
      year: yearVal,
      court: courtVal,
      lawyer: lawyerVal,
      category: categoryVal,
      subcategory: subcategoryVal,
      status: statusVal,
    });
    setPage(1);
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
    setAppliedFilters({
      search: "",
      client: "",
      year: "",
      court: "",
      lawyer: "",
      category: "",
      subcategory: "",
      status: "",
    });
    setPage(1);
  };

  const showLoader = isLoading || isFetching;

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
              <Select value={categoryVal || "all"} onValueChange={(val) => setCategoryVal(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all data-placeholder:text-[#161A20]/60 flex items-center justify-between">
                  <SelectValue placeholder="Choose category..." />
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="all" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">All Category</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name} className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Sub category
              </label>
              <Select value={subcategoryVal || "all"} onValueChange={(val) => setSubcategoryVal(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all data-placeholder:text-[#161A20]/60 flex items-center justify-between">
                  <SelectValue placeholder="Choose sub category..." />
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="all" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">All Subcategory</SelectItem>
                  {subcategories?.map((sub) => (
                    <SelectItem key={sub.id} value={sub.name} className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 flex flex-col items-start w-full">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%] pl-2">
                Status
              </label>
              <Select value={statusVal || "all"} onValueChange={(val) => setStatusVal(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all data-placeholder:text-[#161A20]/60 flex items-center justify-between">
                  <SelectValue placeholder="Choose status..." />
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="all" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">All Status</SelectItem>
                  {statuses?.map((st) => (
                    <SelectItem key={st.id} value={st.name} className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]">
                      {st.name}
                    </SelectItem>
                  ))}
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
        {showLoader ? (
          <div className="w-full bg-white rounded-3xl p-10 border border-gray-100 flex flex-col justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#135576]"></div>
          </div>
        ) : (
          <ArchiveCasesTable
            archiveData={archiveData}
            currentPage={page}
            totalPages={archiveData?.total_pages || 1}
            onPageChange={setPage}
            isDashboard={false}
          />
        )}
      </div>
    </div>
  );
}
