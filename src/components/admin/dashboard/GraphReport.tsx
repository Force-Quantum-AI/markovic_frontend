"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GraphReportSkeleton } from "@/components/admin/admin-skeletons";

interface GraphReportProps {
  totalCasesBreakdown?: Record<string, number | string>;
  isLoading?: boolean;
}

export default function GraphReport({ totalCasesBreakdown, isLoading }: GraphReportProps) {
  if (isLoading) {
    return <GraphReportSkeleton />;
  }

  const breakdown = totalCasesBreakdown || {};
  const totalCasesValue = breakdown.total !== undefined ? String(breakdown.total) : "0";

  const categoriesData = Object.entries(breakdown)
    .filter(([key]) => key !== "total")
    .map(([key, val], idx) => {
      const name = key
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const value = typeof val === "string" ? parseFloat(val) : Number(val);
      const color = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"][idx % 5];
      return { name, value, color };
    });

  const finalData = categoriesData.length > 0 ? categoriesData : [
    { name: "Civil", value: 0, color: "#3B82F6" },
    { name: "Criminal", value: 0, color: "#8B5CF6" },
    { name: "Family", value: 0, color: "#EC4899" },
    { name: "Corporate", value: 0, color: "#10B981" },
    { name: "Other", value: 0, color: "#F59E0B" },
  ];
  const finalTotal = categoriesData.length > 0 ? totalCasesValue : "0";

  return (
    <div className="w-full h-[520px] bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-[#101828] font-inter text-[18px] font-semibold leading-[28px]">
          Graph Report
        </h2>
        <p className="text-[#6A7282] font-inter text-[14px] font-normal leading-[20px]">
          Case distribution
        </p>
      </div>

      {/* Donut Chart Container */}
      <div className="relative w-full h-[270px] flex items-center justify-center my-4">
        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 font-inter">{finalTotal}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={finalData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="space-y-2.5 pt-2 border-t border-gray-50">
        {finalData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-500 font-inter font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-gray-800 font-inter">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
