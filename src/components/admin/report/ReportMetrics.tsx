"use client";

import Image from "next/image";
import {
  FileText,
  TrendingUp,
  FileSpreadsheet,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Award,
} from "lucide-react";

export default function ReportMetrics() {
  const cards = [
    {
      title: "Total Reports",
      value: "1,284",
      trend: "+32 this week",
      trendIcon: <ArrowUpRight className="w-4 h-4" />,
      icon: <FileText className="w-[18px] h-[18px]" />,
      border: "border-[#BEDBFF]",
      bg: "bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]",
      titleColor: "text-[#1447E6]",
      valueColor: "text-[#1C398E]",
      trendColor: "text-[#1447E6]",
      image: "/admin-images/my-users/avg-case.png",
    },
    {
      title: "Platform Usage",
      value: "94.2%",
      trend: "Excellent rate",
      trendIcon: <Award className="w-4 h-4" />,
      icon: <TrendingUp className="w-[18px] h-[18px]" />,
      border: "border-[#A4F4CF]",
      bg: "bg-gradient-to-br from-[#D0FAE5] to-[#ECFDF5]",
      titleColor: "text-[#007A55]",
      valueColor: "text-[#004F3B]",
      trendColor: "text-[#007A55]",
      image: "/admin-images/my-users/platform.png",
    },
    {
      title: "Avg Case/User",
      value: "4.38",
      trend: "+0.8 vs last month",
      trendIcon: <ArrowUpRight className="w-4 h-4" />,
      icon: <FileSpreadsheet className="w-[18px] h-[18px]" />,
      border: "border-[#E9D5FF]",
      bg: "bg-gradient-to-br from-[#F3E8FF] to-[#FAF5FF]",
      titleColor: "text-[#7E22CE]",
      valueColor: "text-[#581C87]",
      trendColor: "text-[#7E22CE]",
      image: "/admin-images/my-users/avg-case.png",
    },
    {
      title: "Response Time",
      value: "1.2s",
      trend: "-0.3s improvement",
      trendIcon: <ArrowDownRight className="w-4 h-4" />,
      icon: <Zap className="w-[18px] h-[18px]" />,
      border: "border-[#FEE685]",
      bg: "bg-gradient-to-br from-[#FEF3C6] to-[#FFFBEB]",
      titleColor: "text-[#BB4D00]",
      valueColor: "text-[#7B3306]",
      trendColor: "text-[#BB4D00]",
      image: "/admin-images/my-users/response.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{ height: "142px" }}
          className={`relative flex w-full p-6 justify-between items-center rounded-[24px] border ${card.border} ${card.bg} shadow-sm hover:shadow-md transition-all overflow-hidden`}
        >
          {/* Left: title top, value+trend bottom */}
          <div className="flex flex-col justify-between h-full z-10">
            {/* Title row */}
            <div className={`flex items-center gap-2 font-roboto text-[14px] font-medium leading-[20px] ${card.titleColor}`}>
              {card.icon}
              <span>{card.title}</span>
            </div>

            {/* Value + trend */}
            <div className="space-y-1">
              <span className={`block font-roboto text-[30px] font-bold leading-[36px] ${card.valueColor}`}>
                {card.value}
              </span>
              <span className={`flex items-center gap-1 font-roboto text-[14px] font-normal leading-[20px] ${card.trendColor}`}>
                {card.trendIcon}
                <span>{card.trend}</span>
              </span>
            </div>
          </div>

          {/* Card Bg image graphic */}
          <Image
            src={card.image}
            alt={`${card.title} Graphic`}
            width={155}
            height={155}
            className="absolute -top-[58px] left-1/2 -translate-x-[15%] w-[155px] h-[155px] select-none pointer-events-none z-0 object-contain"
            priority
          />
        </div>
      ))}
    </div>
  );
}
