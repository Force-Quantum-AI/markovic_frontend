import ReportMetrics from "@/components/admin/report/ReportMetrics";
import GrowthTrendsChart from "@/components/admin/report/GrowthTrendsChart";
import RevenueAnalysisChart from "@/components/admin/report/RevenueAnalysisChart";
import QuickReportActions from "@/components/admin/report/QuickReportActions";

export default function ReportPage() {
  return (
    <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden font-roboto">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-100">
        <h1 className="text-xl font-bold text-[#1A2328]">Reports</h1>
      </div>
      <div className="bg-[#F8FAFC] flex-1 p-6 space-y-6">
        <ReportMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <GrowthTrendsChart />
          <RevenueAnalysisChart />
        </div>
        <QuickReportActions />

      </div>
    </div>
  );
}
