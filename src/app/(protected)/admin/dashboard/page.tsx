"use client";

import AdminMetrics from "@/components/admin/dashboard/AdminMetrics";
import PlatformOverview from "@/components/admin/dashboard/PlatformOverview";
import GraphReport from "@/components/admin/dashboard/GraphReport";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import SystemHealth from "@/components/admin/dashboard/SystemHealth";
import ArchiveCasesTable from "@/components/admin/dashboard/ArchiveCasesTable";
import { useGetAdminDashboardArchieveCaseQuery, useGetAdminDashboardDetailsQuery } from "@/store/features/admin/dashboard/dashboard.api";
import { useGetAllUsersQuery } from "@/store/features/admin/my-users/my-users.api";
import MyUsersDashboardTable from "@/components/admin/dashboard/MyUsersDashboardTable";

export default function Dashboard() {
  const { data, isLoading } = useGetAdminDashboardDetailsQuery(undefined);
  const {data: archiveData, isLoading: archiveLoading} = useGetAdminDashboardArchieveCaseQuery(undefined);
  const {data: usersData, isLoading: usersLoading} = useGetAllUsersQuery(undefined);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#135576]"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Column: 3/4 width on desktop */}
        <div className="xl:col-span-3 space-y-6">
          {/* Stats Cards */}
          <AdminMetrics overview={data?.overview} />

          {/* Charts: Bar Chart + Donut Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <PlatformOverview graph={data?.graph} />
            </div>
            <div className="lg:col-span-2">
              <GraphReport totalCasesBreakdown={data?.total_cases_breakdown} />
            </div>
          </div>

          {/* Tables */}
          <MyUsersDashboardTable usersData={usersData} isLoading={usersLoading} />
          <ArchiveCasesTable archiveData={archiveData} isLoading={archiveLoading} isDashboard={true} />
        </div>

        {/* Right Column: 1/4 width on desktop */}
        <div className="xl:col-span-1 space-y-6">
          <QuickActions />
          <SystemHealth systemHealth={data?.system_health} />
        </div>
      </div>
    </div>
  );
}
