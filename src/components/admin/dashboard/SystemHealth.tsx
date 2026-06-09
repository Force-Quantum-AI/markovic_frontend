"use client";

import React from "react";
import { Activity, CheckCircle } from "lucide-react";

export default function SystemHealth() {
  const metrics = [
    { name: "API Server", score: "99.9%", val: 99.9, color: "bg-emerald-500" },
    { name: "Database", score: "98.8%", val: 98.8, color: "bg-emerald-500" },
    { name: "AI Service", score: "95.7%", val: 95.7, color: "bg-emerald-500" },
    { name: "Storage", score: "96.5%", val: 96.5, color: "bg-amber-500" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-lg font-inter tracking-tight">System Health</h3>
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
          <span>All Systems Operational</span>
        </div>
      </div>
    </div>
  );
}
