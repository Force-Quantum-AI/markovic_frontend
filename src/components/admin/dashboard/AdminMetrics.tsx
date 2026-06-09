"use client";

import Image from "next/image";
import { Users, Search, Archive, CreditCard, ArrowUpRight } from "lucide-react";

export default function AdminMetrics() {
  const cards = [
    {
      title: "Total Users",
      value: "2,847",
      trend: "+8% this month",
      icon: <Users className="w-4 h-4" />,
      border: "border-[#029CA8]",
      bg: "bg-[#E4FDFF]",
      titleColor: "text-[#007595]",
      valueColor: "text-[#104E64]",
      trendColor: "text-[#007595]",
      image: "/admin-images/dashboard/total-users.png",
    },
    {
      title: "AI Search",
      value: "156",
      trend: "+12% this month",
      icon: <Search className="w-4 h-4" />,
      border: "border-[#02A841]",
      bg: "bg-[#E4FFF3]",
      titleColor: "text-[#027A31]",
      valueColor: "text-[#0E4B1E]",
      trendColor: "text-[#027A31]",
      image: "/admin-images/dashboard/ai-features.png",
    },
    {
      title: "Archive Cases",
      value: "12.6K",
      trend: "+15% this month",
      icon: <Archive className="w-4 h-4" />,
      border: "border-[#909404]",
      bg: "bg-[#FFFEEF]",
      titleColor: "text-[#7D8103]",
      valueColor: "text-[#4C4F01]",
      trendColor: "text-[#7D8103]",
      image: "/admin-images/dashboard/archive-case.png",
    },
    {
      title: "Total Earning",
      value: "47.6K",
      trend: "+15% this month",
      icon: <CreditCard className="w-4 h-4" />,
      border: "border-[#6502A8]",
      bg: "bg-[#F9F3FF]",
      titleColor: "text-[#55018F]",
      valueColor: "text-[#340057]",
      trendColor: "text-[#55018F]",
      image: "/admin-images/dashboard/total-earning.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[24px] w-full">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`flex w-full p-[24px] items-end justify-between gap-[16px] rounded-[16px] border ${card.border} ${card.bg} transition-all hover:shadow-md`}
        >
          {/* Left Text details */}
          <div className="flex flex-col h-full justify-between">
            <div className={`flex items-center gap-2 font-roboto text-[14px] font-medium leading-[20px] ${card.titleColor}`}>
              {card.icon}
              <span>{card.title}</span>
            </div>
            
            <div className="space-y-1">
              <span className={`block font-roboto text-[30px] font-bold leading-[36px] ${card.valueColor}`}>
                {card.value}
              </span>
              <span className={`flex items-center gap-1 font-roboto text-[14px] font-normal leading-[20px] ${card.trendColor}`}>
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{card.trend}</span>
              </span>
            </div>
          </div>

          {/* Right graphic asset */}
          <div className="flex-shrink-0 self-end">
            <Image
              src={card.image}
              alt={`${card.title} graphic`}
              width={116}
              height={58}
              className="object-contain"
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
}
