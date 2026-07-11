"use client";

import { Database, Users, BarChart3, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { QuickActionsSkeleton } from "@/components/admin/admin-skeletons";

import { useTranslation } from "react-i18next";

export default function QuickActions({ isLoading }: { isLoading?: boolean }) {
  const { t } = useTranslation("adminDashboard");
  const router = useRouter();

  if (isLoading) {
    return <QuickActionsSkeleton />;
  }
  const actions = [
    {
      label: t("update_laws_database"),
      icon: <Database className="w-4 h-4" />,
      active: false,
      href: "/admin/law-database",
    },
    {
      label: t("manage_users"),
      icon: <Users className="w-4 h-4" />,
      active: false,
      href: "/admin/my-users",
    },
    {
      label: t("view_reports"),
      icon: <BarChart3 className="w-4 h-4" />,
      active: false,
      href: "/admin/report",
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <h3 className="font-bold text-gray-900 text-lg font-inter tracking-tight">{t("quick_actions")}</h3>

      <div className="space-y-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (action.href) {
                router.push(action.href);
              } else {
                alert(`${t("action")}: ${action.label}`);
              }
            }}
            className={`relative overflow-hidden group w-full flex items-center justify-between py-3.5 px-4 rounded-xl transition-all duration-500 ease-in-out font-inter text-sm font-medium cursor-pointer border ${
              action.active
                ? "bg-[#135576] border-[#135576] text-white shadow-sm"
                : "bg-white text-gray-700 border-gray-100 hover:text-white hover:border-[#135576]"
            }`}
          >
            <span
              className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 ${
                action.active ? "bg-[#0f4460]" : "bg-[#135576]"
              }`}
            />
            <div className="relative z-10 flex items-center gap-3">
              {action.icon}
              <span>{action.label}</span>
            </div>
            <ChevronRight
              className={`relative z-10 w-4 h-4 transition-all duration-500 ease-in-out group-hover:translate-x-1 ${
                action.active ? "text-white/80" : "text-gray-400 group-hover:text-white"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
