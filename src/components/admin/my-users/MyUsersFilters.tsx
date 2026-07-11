"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import BasedSelect from "@/components/shared/BasedSelect";
import AdminButton from "@/components/shared/AdminButton";
import { MyUsersFiltersSkeleton } from "@/components/admin/admin-skeletons";

import { useTranslation } from "react-i18next";

interface MyUsersFiltersProps {
  onFilter: (filters: {
    search: string;
    subscription: string;
    day: string;
    month: string;
    year: string;
  }) => void;
  onReset: () => void;
  isLoading?: boolean;
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

export default function MyUsersFilters({ onFilter, onReset, isLoading }: MyUsersFiltersProps) {
  const { t } = useTranslation(["adminMyUsers", "common"]);
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

  if (isLoading) {
    return <MyUsersFiltersSkeleton />;
  }

  const translatedSubscriptionOptions = subscriptionOptions.map(opt => ({
    ...opt,
    label: opt.value === "all" ? t("all") : t(opt.value, opt.label)
  }));

  const translatedMonthOptions = monthOptions.map(opt => ({
    ...opt,
    label: opt.value === "all" ? t("all_months") : t(opt.label.toLowerCase(), opt.label)
  }));

  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-[#BEC4D2]/40 shadow-xs space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-[#101828]" />
        <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[130%]">
          {t("search_and_filter")}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Full Width Search Field */}
        <div className="w-full">
          <input
            type="text"
            placeholder={t("search_users_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3.5 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
          />
        </div>

        {/* Grid Fields: subscription + day + month + year */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">

          {/* Left half: Subscription */}
          <div className="w-full lg:w-1/2">
            <BasedSelect
              label={t("subscription")}
              placeholder={t("all")}
              options={translatedSubscriptionOptions}
              value={subscription}
              onValueChange={setSubscription}
            />
          </div>

          {/* Right half: Day, Month, Year */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Day */}
            <div className="space-y-1.5">
              <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">{t("day")}</label>
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
              label={t("month")}
              placeholder={t("all_months")}
              options={translatedMonthOptions}
              value={month}
              onValueChange={setMonth}
            />

            {/* Year */}
            <div className="space-y-1.5">
              <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">{t("year")}</label>
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

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <AdminButton
            onClick={handleApplyFilter}
            label={t("apply_filter")}
            className="py-3 w-full sm:w-auto"
          />
          <AdminButton
            onClick={handleResetFilter}
            label={t("reset_filter")}
            variant="secondary"
            className="py-3 w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
