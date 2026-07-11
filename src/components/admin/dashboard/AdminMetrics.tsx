"use client";

import Image from "next/image";
import { Users, Sparkles, FolderOpen, DollarSign, ArrowUpRight } from "lucide-react";
import { AdminMetricsSkeleton } from "@/components/admin/admin-skeletons";

import { useTranslation } from "react-i18next";

interface AdminMetricsProps {
  overview?: {
    total_users: number;
    ai_search: number;
    archive: number;
    cases: number;
    total_earning: number;
  };
  isLoading?: boolean;
}

export default function AdminMetrics({ overview, isLoading }: AdminMetricsProps) {
  const { t } = useTranslation("adminDashboard");

  if (isLoading) {
    return <AdminMetricsSkeleton cardCount={4} />;
  }

  const cards = [
    {
      title: t("total_users"),
      value: overview?.total_users?.toLocaleString() ?? "0",
      trend: `+8% ${t("this_month")}`,
      icon: <Users className="w-4 h-4" />,
      border: "border-[#029CA8]",
      bg: "bg-[#E4FDFF]",
      titleColor: "text-[#007595]",
      valueColor: "text-[#104E64]",
      trendColor: "text-[#007595]",
      image: "/admin-images/dashboard/total-users.png",
      imageW: 116,
      imageH: 72,
    },
    {
      title: t("ai_search"),
      value: overview?.ai_search?.toLocaleString() ?? "0",
      trend: `+12% ${t("this_month")}`,
      icon: <Sparkles className="w-4 h-4" />,
      border: "border-[#02A841]",
      bg: "bg-[#E4FFF3]",
      titleColor: "text-[#027A31]",
      valueColor: "text-[#0E4B1E]",
      trendColor: "text-[#027A31]",
      image: "/admin-images/dashboard/ai-features.png",
      imageW: 116,
      imageH: 72,
    },
    {
      title: t("archived_cases"),
      value: overview?.archive?.toLocaleString() ?? "0",
      trend: `+15% ${t("this_month")}`,
      icon: <FolderOpen className="w-4 h-4" />,
      border: "border-[#909404]",
      bg: "bg-[#FFFEEF]",
      titleColor: "text-[#7D8103]",
      valueColor: "text-[#4C4F01]",
      trendColor: "text-[#7D8103]",
      image: "/admin-images/dashboard/archive-case.png",
      imageW: 88,
      imageH: 88,
    },
    {
      title: t("total_earning"),
      value: overview?.total_earning !== undefined ? `$${overview.total_earning.toLocaleString()}` : "$0",
      trend: `+15% ${t("this_month")}`,
      icon: <DollarSign className="w-4 h-4" />,
      border: "border-[#6502A8]",
      bg: "bg-[#F9F3FF]",
      titleColor: "text-[#55018F]",
      valueColor: "text-[#340057]",
      trendColor: "text-[#55018F]",
      image: "/admin-images/dashboard/total-earning.png",
      imageW: 90,
      imageH: 80,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[24px] w-full">
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
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{card.trend}</span>
              </span>
            </div>
          </div>

          {/* Right: graphic image, self-end aligned */}
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
