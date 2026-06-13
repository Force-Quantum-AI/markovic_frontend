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
      trendIcon: <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />,
      icon: <FileText className="w-4 h-4" />,
      border: "border-[#1447E6]",
      bg: "bg-[#EFF6FF]",
      titleColor: "text-[#1447E6]",
      valueColor: "text-[#1C398E]",
      trendColor: "text-[#1447E6]",
      image: "/admin-images/my-users/avg-case.png",
      imageW: 88,
      imageH: 88,
    },
    {
      title: "Platform Usage",
      value: "94.2%",
      trend: "Excellent rate",
      trendIcon: <Award className="w-3.5 h-3.5 flex-shrink-0" />,
      icon: <TrendingUp className="w-4 h-4" />,
      border: "border-[#02A841]",
      bg: "bg-[#ECFDF5]",
      titleColor: "text-[#007A55]",
      valueColor: "text-[#004F3B]",
      trendColor: "text-[#007A55]",
      image: "/admin-images/my-users/platform.png",
      imageW: 88,
      imageH: 88,
    },
    {
      title: "Avg Case/User",
      value: "4.38",
      trend: "+0.8 vs last month",
      trendIcon: <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />,
      icon: <FileSpreadsheet className="w-4 h-4" />,
      border: "border-[#7E22CE]",
      bg: "bg-[#FAF5FF]",
      titleColor: "text-[#7E22CE]",
      valueColor: "text-[#581C87]",
      trendColor: "text-[#7E22CE]",
      image: "/admin-images/my-users/avg-case.png",
      imageW: 88,
      imageH: 88,
    },
    {
      title: "Response Time",
      value: "1.2s",
      trend: "-0.3s improvement",
      trendIcon: <ArrowDownRight className="w-3.5 h-3.5 flex-shrink-0" />,
      icon: <Zap className="w-4 h-4" />,
      border: "border-[#BB4D00]",
      bg: "bg-[#FFFBEB]",
      titleColor: "text-[#BB4D00]",
      valueColor: "text-[#7B3306]",
      trendColor: "text-[#BB4D00]",
      image: "/admin-images/my-users/response.png",
      imageW: 88,
      imageH: 88,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] w-full">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`relative flex w-full min-h-[120px] p-[20px] items-stretch justify-between rounded-[16px] border ${card.border} ${card.bg} transition-all hover:shadow-md overflow-hidden`}
        >
          {/* Left: title top, value+trend bottom */}
          <div className="flex flex-col justify-between flex-1 z-10">
            {/* Title row */}
            <div className={`flex items-center gap-2 font-roboto text-[14px] font-medium leading-[20px] ${card.titleColor}`}>
              {card.icon}
              <span>{card.title}</span>
            </div>

            {/* Value + trend */}
            <div className="space-y-0.5 mt-3">
              <span className={`block font-roboto text-[28px] font-bold leading-[34px] ${card.valueColor}`}>
                {card.value}
              </span>
              <span className={`flex items-center gap-1 font-roboto text-[13px] font-normal leading-[20px] ${card.trendColor}`}>
                {card.trendIcon}
                <span>{card.trend}</span>
              </span>
            </div>
          </div>

          {/* Right: graphic image, bottom-right aligned */}
          <div className="flex items-end justify-end flex-shrink-0 ml-2 z-10">
            <Image
              src={card.image}
              alt={`${card.title} graphic`}
              width={card.imageW}
              height={card.imageH}
              className="object-contain"
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
}
