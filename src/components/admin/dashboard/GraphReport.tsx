"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Civil", value: 4200, color: "#3B82F6" },
  { name: "Criminal", value: 3100, color: "#8B5CF6" },
  { name: "Family", value: 2500, color: "#EC4899" },
  { name: "Corporate", value: 1900, color: "#10B981" },
  { name: "Other", value: 783, color: "#F59E0B" },
];

export default function GraphReport() {
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
          <span className="text-2xl font-bold text-gray-900 font-inter">12.5K</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="space-y-2.5 pt-2 border-t border-gray-50">
        {data.map((item) => (
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
