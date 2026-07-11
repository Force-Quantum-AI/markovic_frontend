"use client";

import { Activity, CheckCircle } from "lucide-react";
import { SystemHealthSkeleton } from "@/components/admin/admin-skeletons";

interface SystemHealthProps {
  systemHealth?: {
    api_server: { label: string; value: number; unit: string };
    database: { label: string; value: number; unit: string };
    ai_service: { label: string; value: number; unit: string };
    storage: { label: string; value: number; unit: string };
  };
  isLoading?: boolean;
}

import { useTranslation } from "react-i18next";

export default function SystemHealth({ systemHealth, isLoading }: SystemHealthProps) {
  const { t } = useTranslation("adminDashboard");

  if (isLoading) {
    return <SystemHealthSkeleton />;
  }
  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-emerald-500";
    if (value >= 10) return "bg-amber-500";
    return "bg-red-500";
  };

  const metrics = [
    {
      name: systemHealth?.api_server?.label ? t("api_server") : "API Server",
      score: systemHealth?.api_server ? `${systemHealth.api_server.value}${systemHealth.api_server.unit}` : "0%",
      val: systemHealth?.api_server?.value ?? 0,
      color: getProgressColor(systemHealth?.api_server?.value ?? 0),
    },
    {
      name: systemHealth?.database?.label ? t("database") : "Database",
      score: systemHealth?.database ? `${systemHealth.database.value}${systemHealth.database.unit}` : "0%",
      val: systemHealth?.database?.value ?? 0,
      color: getProgressColor(systemHealth?.database?.value ?? 0),
    },
    {
      name: systemHealth?.ai_service?.label ? t("ai_service") : "AI Service",
      score: systemHealth?.ai_service ? `${systemHealth.ai_service.value}${systemHealth.ai_service.unit}` : "0%",
      val: systemHealth?.ai_service?.value ?? 0,
      color: getProgressColor(systemHealth?.ai_service?.value ?? 0),
    },
    {
      name: systemHealth?.storage?.label ? t("storage") : "Storage",
      score: systemHealth?.storage ? `${systemHealth.storage.value}${systemHealth.storage.unit}` : "0%",
      val: systemHealth?.storage?.value ?? 0,
      color: getProgressColor(systemHealth?.storage?.value ?? 0),
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-lg font-inter tracking-tight">{t("system_health")}</h3>
        <Activity className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="space-y-4 pt-1">
        {metrics.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-xs font-semibold font-inter">
              <span className="text-gray-700">{item.name}</span>
              <span className="text-gray-500">{item.score}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                style={{ width: `${item.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Operational Status indicator banner */}
      <div className="pt-2">
        <div className="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold font-inter">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{t("all_systems_operational")}</span>
        </div>
      </div>
    </div>
  );
}
