"use client";

import { Download, Users, DollarSign, FileText } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import { toast } from "sonner";

export default function QuickReportActions() {
  const handleExportSingle = (reportType: string) => {
    toast.success(`Exporting ${reportType}...`);
  };

  const handleExportAll = () => {
    toast.success("Exporting all reports compiled successfully!");
  };

  return (
    <div 
      style={{ 
        borderRadius: "24px",
        border: "1px solid #E5E7EB",
        background: "#FFF",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)",
        padding: "24px"
      }}
      className="space-y-6 hover:shadow-md transition-all w-full"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-lg font-roboto tracking-tight">
          Quick Report Actions
        </h3>
        <AdminButton
          label="Export All"
          icon={<Download className="w-4 h-4" />}
          variant="secondary"
          onClick={handleExportAll}
          style={{ padding: "10px 20px" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        <div 
          onClick={() => handleExportSingle("User Activity Report")}
          style={{
            borderRadius: "16px",
            border: "2px solid #E5E7EB",
            padding: "24px"
          }}
          className="flex flex-col items-start gap-4 bg-white cursor-pointer hover:border-[#135576]/30 hover:bg-slate-50/50 transition-all"
        >
          <div className="w-10 h-10 bg-[#EFF6FF] text-[#1D4ED8] rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 
              style={{
                color: "#101828",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px"
              }}
            >
              User Activity Report
            </h4>
            <p 
              style={{
                color: "#6A7282",
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px"
              }}
              className="mt-1"
            >
              Download detailed user activity data
            </p>
          </div>
        </div>

        <div 
          onClick={() => handleExportSingle("Revenue Report")}
          style={{
            borderRadius: "16px",
            border: "2px solid #E5E7EB",
            padding: "24px"
          }}
          className="flex flex-col items-start gap-4 bg-white cursor-pointer hover:border-[#135576]/30 hover:bg-slate-50/50 transition-all"
        >
          <div className="w-10 h-10 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h4 
              style={{
                color: "#101828",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px"
              }}
            >
              Revenue Report
            </h4>
            <p 
              style={{
                color: "#6A7282",
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px"
              }}
              className="mt-1"
            >
              Export financial performance metrics
            </p>
          </div>
        </div>

        <div 
          onClick={() => handleExportSingle("Case Analytics Report")}
          style={{
            borderRadius: "16px",
            border: "2px solid #E5E7EB",
            padding: "24px"
          }}
          className="flex flex-col items-start gap-4 bg-white cursor-pointer hover:border-[#135576]/30 hover:bg-slate-50/50 transition-all"
        >
          <div className="w-10 h-10 bg-[#F3E8FF] text-[#7E22CE] rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 
              style={{
                color: "#101828",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px"
              }}
            >
              Case Analytics
            </h4>
            <p 
              style={{
                color: "#6A7282",
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px"
              }}
              className="mt-1"
            >
              Analyze case distribution and trends
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
