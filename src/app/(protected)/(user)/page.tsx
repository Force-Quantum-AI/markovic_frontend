"use client"

import AddNewCase from "@/components/modals/AddNewCase";
import MainButton from "@/components/shared/MainButton";
import DashboardMetrics from "@/components/user/dashboard/DashboardMetrics";
import LawsAndBylaws from "@/components/user/dashboard/LawsAndBylaws";
import LegalCalendar from "@/components/user/dashboard/LegalCalendar";
import MyClients from "@/components/user/dashboard/MyClients";
import RecentCases from "@/components/user/dashboard/RecentCases";
import UpcomingHearings from "@/components/user/dashboard/UpcomingHearings";
import { useGetDashboardAllDataQuery } from "@/store/features/dashboard/dashboard.api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { data, isLoading } = useGetDashboardAllDataQuery(undefined);
  const [isAddNewCaseOpen, setIsAddNewCaseOpen] = useState(false);
  const {t} = useTranslation("common");

  const displayUser = data?.overview?.client_name || "Ahsan";

  const now = new Date();

  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = now.getHours();

  const greeting =
    hour < 12
      ? t("good_morning")
      : hour < 17
      ? t("good_afternoon")
      : t("good_evening");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      
      <div className="col-span-2 lg:col-span-3 space-y-5">
        {/* header  */}
        <section className="flex items-center justify-center md:justify-between flex-wrap gap-5 md:gap-3">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-xs md:text-base">{currentDate}</p>
            <h2 className="text-lg md:text-xl xl:text-3xl font-semibold">
              {greeting}, {isLoading ? "..." : displayUser}
            </h2>
          </div>
          <MainButton label={t("add_new_case")} icon={<Plus />} onClick={()=> setIsAddNewCaseOpen(true)} />
        </section>
        <DashboardMetrics data={data?.overview} isLoading={isLoading} />
        <UpcomingHearings data={data?.upcoming_hearings} isLoading={isLoading} />
        <LawsAndBylaws data={data?.laws_and_bylaws} isLoading={isLoading} />
        <RecentCases data={data?.recent_cases} isLoading={isLoading} />
      </div>
      <div className="col-span-2 lg:col-span-1 space-y-5">
      {/* skip this legal calendar for now, stay them as it is  */}
        <LegalCalendar/>
        <MyClients data={data?.my_clients} isLoading={isLoading} /> 
      </div>
      <AddNewCase
      isOpen={isAddNewCaseOpen}
      onClose={()=> setIsAddNewCaseOpen(false)}
      />
    </div>
  );
}