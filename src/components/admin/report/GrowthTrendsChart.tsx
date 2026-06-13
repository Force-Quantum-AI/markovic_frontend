"use client";

import React from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

const growthData = [
  { name: "Jan", lawyers: 1400, trainees: 1000 },
  { name: "Feb", lawyers: 1200, trainees: 1200 },
  { name: "Mar", lawyers: 1500, trainees: 1000 },
  { name: "Apr", lawyers: 1300, trainees: 1700 },
  { name: "May", lawyers: 1400, trainees: 1400 },
  { name: "Jun", lawyers: 1200, trainees: 1500 },
  { name: "Jul", lawyers: 1300, trainees: 1200 },
];

export default function GrowthTrendsChart() {
  return (
    <div 
      style={{ 
        borderRadius: "24px",
        border: "1px solid #E5E7EB",
        background: "#FFF",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)",
        padding: "24px",
        height: "400px"
      }}
      className="flex flex-col justify-between w-full hover:shadow-md transition-all"
    >
      <div className="mb-4">
        <h3 className="text-[#101828] font-roboto text-[18px] font-semibold leading-[28px]">
          Monthly Growth Trends
        </h3>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={growthData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorLawyers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTrainees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#9CA3AF", fontSize: 12, fontFamily: "Roboto" }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#9CA3AF", fontSize: 12, fontFamily: "Roboto" }} 
              domain={[0, 2000]}
              ticks={[0, 500, 1000, 1500, 2000]}
            />
            <Tooltip 
              contentStyle={{
                borderRadius: "12px",
                borderColor: "#E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Area 
              type="monotone" 
              dataKey="lawyers" 
              stroke="#8B5CF6" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#colorLawyers)" 
              activeDot={{ r: 6 }} 
            />
            <Area 
              type="monotone" 
              dataKey="trainees" 
              stroke="#F97316" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#colorTrainees)" 
              activeDot={{ r: 6 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            <span className="text-sm font-semibold text-slate-600 font-roboto">lawyers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F97316]" />
            <span className="text-sm font-semibold text-slate-600 font-roboto">trainees</span>
          </div>
        </div>
      </div>
    </div>
  );
}
