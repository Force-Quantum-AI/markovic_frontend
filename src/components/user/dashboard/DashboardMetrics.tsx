"use client";

import React from "react";
import Image from "next/image";
import { 
  Scale, 
  Files, 
  Gavel, 
  CalendarDays, 
  Users2, 
  FileCheck2, 
  ArrowUpRight 
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- TYPES FOR THE REUSABLE CARD ---
interface MetricCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  bgColor: string;
  iconBgColor: string;
}

// --- REUSABLE METRIC CARD COMPONENT ---
export function MetricCard({ icon, value, label, bgColor, iconBgColor }: MetricCardProps) {
  return (
    <div className={`p-5 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[135px] transition-all hover:shadow-md ${bgColor}`}>
      {/* Icon Wrapper */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[#135576] ${iconBgColor}`}>
        {icon}
      </div>
      
      {/* Metrics Data */}
      <div className="mt-4 space-y-1">
        <span className="block text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </span>
        <span className="block text-xs font-medium text-gray-500">
          {label}
        </span>
      </div>
    </div>
  );
}

// --- MAIN WRAPPER COMPONENT ---
export default function DashboardMetrics() {
  const router = useRouter()
  
  // Dummy dataset representing your backend API payloads
  const statsData = [
    {
      id: "total-cases",
      label: "Total Cases",
      value: 86,
      icon: <Scale className="w-4 h-4 stroke-[2]" />,
      bgColor: "bg-[#DAE6C9]", // Soft Lime-Green hue
      iconBgColor: "bg-[#edf4e4]"
    },
    {
      id: "active-cases",
      label: "Active Cases",
      value: 72,
      icon: <Files className="w-4 h-4 stroke-[2]" />,
      bgColor: "bg-[#C8F0DB]", // Soft Mint hue
      iconBgColor: "bg-[#e2f6ec]"
    },
    {
      id: "todays-hearing",
      label: "Todays Hearing",
      value: 5,
      icon: <Gavel className="w-4 h-4 stroke-[2]" />,
      bgColor: "bg-[#D4D4F2]", // Soft Purple hue
      iconBgColor: "bg-[#ebebfe]"
    },
    {
      id: "upcoming-deadlines",
      label: "Upcoming Deadlines",
      value: 3,
      icon: <CalendarDays className="w-4 h-4 stroke-[2]" />,
      bgColor: "bg-[#D6E7ED]", // Soft Ice Blue hue
      iconBgColor: "bg-[#e3f3ff]"
    },
    {
      id: "total-clients",
      label: "Total Clients",
      value: 7,
      icon: <Users2 className="w-4 h-4 stroke-[2]" />,
      bgColor: "bg-[#E6D1E3]", // Soft Pink hue
      iconBgColor: "bg-[#fbe6f7]"
    },
    {
      id: "case-completed",
      label: "Case Completed",
      value: 14,
      icon: <FileCheck2 className="w-4 h-4 stroke-[2]" />,
      bgColor: "bg-[#F2E6D8]", // Soft Cream/Orange hue
      iconBgColor: "bg-[#fff2de]"
    },
  ];

  const handleExploreAction = () => {
    router.push("/ai-search")
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Container Layout Matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        
        {/* Left Aspect: Feature AI Court Practice Hero Card */}
        <div className="xl:col-span-2 relative rounded-3xl p-6 bg-gradient-to-b from-gray-900 to-black border-[3px] border-[#135576] shadow-md flex flex-col justify-between min-h-[290px] md:min-h-[300px] overflow-hidden group">
          
          {/* Background Statue Asset */}
          <Image
            src="/lawImg5.png"
            alt="Lady Justice Banner background"
            fill
            priority
            className="object-cover opacity-30 select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Top Right Action Button Indicator */}
          <div className="flex justify-end relative z-10">
            <button 
              onClick={handleExploreAction}
              className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-all focus:outline-none"
              aria-label="Explore AI search"
            >
              <ArrowUpRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Bottom Card Copy & Trigger Action CTA */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                AI Court Practice
              </h3>
              <p className="text-xs text-gray-300 font-light">
                Go to Full AI Search
              </p>
            </div>

            <button
              onClick={handleExploreAction}
              className="bg-white hover:bg-gray-100 text-[#135576] font-semibold text-xs px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95 focus:outline-none whitespace-nowrap"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Right Aspect: Fully Responsive Metrics Grid */}
        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-white p-2 rounded-2xl">
          {statsData.map((stat) => (
            <MetricCard
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              bgColor={stat.bgColor}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>

      </div>
    </div>
  );
}