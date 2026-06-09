"use client";

import React, { useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { name: "Subscription", value: 1180 },
  { name: "Total Cases", value: 780 },
  { name: "Archive Cases", value: 980 },
  { name: "Total User", value: 1350 },
  { name: "AI Search", value: 1500 },
  { name: "Total Court", value: 450 },
  { name: "Storage", value: 1350 },
];

const yearlyData = [
  { name: "Subscription", value: 1400 },
  { name: "Total Cases", value: 920 },
  { name: "Archive Cases", value: 1150 },
  { name: "Total User", value: 1520 },
  { name: "AI Search", value: 1600 },
  { name: "Total Court", value: 600 },
  { name: "Storage", value: 1480 },
];

const colors = [
  "#F3B0A7", // Subscription
  "#F3F0A7", // Total Cases
  "#C8F3A7", // Archive Cases
  "#A7F3E4", // Total User
  "#A7CAF3", // AI Search
  "#EFA7F3", // Total Court
  "#A7E5F3", // Storage
];

export default function PlatformOverview() {
  const [view, setView] = useState<"Monthly" | "Yearly">("Monthly");
  const data = view === "Monthly" ? monthlyData : yearlyData;

  return (
    <div className="w-full h-[520px] bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
      {/* Title Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#101828] font-inter text-[18px] font-semibold leading-[28px]">
            Total Platform Overview
          </h2>
          <p className="text-[#6A7282] font-inter text-[14px] font-normal leading-[20px]">
            Monthly activity metrics
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setView("Monthly")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-inter transition-all cursor-pointer ${
              view === "Monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("Yearly")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-inter transition-all cursor-pointer ${
              view === "Yearly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Recharts Bar Chart Container */}
      <div className="w-full h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12, fontFamily: "Inter", fontWeight: 400 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12, fontFamily: "Inter", fontWeight: 400 }}
              domain={[0, 1600]}
              ticks={[0, 400, 800, 1200, 1600]}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
              contentStyle={{
                borderRadius: "8px",
                borderColor: "#E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Bar dataKey="value" radius={[16, 16, 0, 0]} barSize={26}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
