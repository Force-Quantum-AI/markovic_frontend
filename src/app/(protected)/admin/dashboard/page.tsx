"use client";

import AdminMetrics from "@/components/admin/dashboard/AdminMetrics";
import PlatformOverview from "@/components/admin/dashboard/PlatformOverview";
import GraphReport from "@/components/admin/dashboard/GraphReport";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import SystemHealth from "@/components/admin/dashboard/SystemHealth";
import MyUsersTable from "@/components/admin/dashboard/MyUsersTable";
import ArchiveCasesTable from "@/components/admin/dashboard/ArchiveCasesTable";

export default function Page() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Column: 3/4 width on desktop */}
        <div className="xl:col-span-3 space-y-6">
          {/* Stats Cards */}
          <AdminMetrics />

          {/* Charts: Bar Chart + Donut Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <PlatformOverview />
            </div>
            <div className="lg:col-span-2">
              <GraphReport />
            </div>
          </div>

          {/* Tables */}
          <MyUsersTable />
          <ArchiveCasesTable />
        </div>

        {/* Right Column: 1/4 width on desktop */}
        <div className="xl:col-span-1 space-y-6">
          <QuickActions />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}