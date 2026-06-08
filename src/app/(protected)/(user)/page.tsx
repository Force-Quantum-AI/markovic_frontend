import MainButton from "@/components/shared/MainButton";
import DashboardMetrics from "@/components/user/dashboard/DashboardMetrics";
import LawsAndBylaws from "@/components/user/dashboard/LawsAndBylaws";
import LegalCalendar from "@/components/user/dashboard/LegalCalendar";
import MyClients from "@/components/user/dashboard/MyClients";
import RecentCases from "@/components/user/dashboard/RecentCases";
import UpcomingHearings from "@/components/user/dashboard/UpcomingHearings";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <div className="col-span-2 lg:col-span-3 space-y-5">
        {/* header  */}
        <section className="flex items-center justify-center md:justify-between flex-wrap gap-5 md:gap-3">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-xs md:text-base">Tuesday, 19 May 2026</p>
            <h2 className="text-lg md:text-xl xl:text-3xl font-semibold">Good Morning, Ahsan</h2>
          </div>
          <MainButton label="Add New Cases" icon={<Plus />} />
        </section>
        <DashboardMetrics />
        <UpcomingHearings/>
        <LawsAndBylaws/>
        <RecentCases/>
      </div>
      <div className="col-span-2 lg:col-span-1 space-y-5">
        <LegalCalendar/>
        <MyClients/>
      </div>

    </div>
  );
}