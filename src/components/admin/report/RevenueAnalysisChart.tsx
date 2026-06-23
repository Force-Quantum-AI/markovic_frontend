"use client";

import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 38000 },
  { name: "Feb", revenue: 45000 },
  { name: "Mar", revenue: 29000 },
  { name: "Apr", revenue: 58000 },
  { name: "May", revenue: 45000 },
];

export default function RevenueAnalysisChart() {
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
          Revenue Analysis
        </h3>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="95%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
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
              domain={[0, 60000]}
              ticks={[0, 15000, 30000, 45000, 60000]}
              tickFormatter={(val) => `${val / 1000}k`}
            />
            <Tooltip 
              contentStyle={{
                borderRadius: "12px",
                borderColor: "#E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
              formatter={(val) => [`€${Number(val).toLocaleString()}`, "Revenue"]}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 6 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
