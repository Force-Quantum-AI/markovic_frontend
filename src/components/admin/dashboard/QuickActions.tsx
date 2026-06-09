"use client";

import React from "react";
import { Database, Users, Megaphone, BarChart3, ChevronRight } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      label: "Update Laws DB",
      icon: <Database className="w-4 h-4" />,
      active: true,
    },
    {
      label: "Manage Users",
      icon: <Users className="w-4 h-4" />,
      active: false,
    },
    {
      label: "Send Announcement",
      icon: <Megaphone className="w-4 h-4" />,
      active: false,
    },
    {
      label: "View Reports",
      icon: <BarChart3 className="w-4 h-4" />,
      active: false,
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <h3 className="font-bold text-gray-900 text-lg font-inter tracking-tight">Quick Actions</h3>

      <div className="space-y-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => alert(`Triggered action: ${action.label}`)}
            className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl transition-all font-inter text-sm font-medium cursor-pointer ${
              action.active
                ? "bg-[#135576] text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {action.icon}
              <span>{action.label}</span>
            </div>
            <ChevronRight className={`w-4 h-4 ${action.active ? "text-white/80" : "text-gray-400"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
