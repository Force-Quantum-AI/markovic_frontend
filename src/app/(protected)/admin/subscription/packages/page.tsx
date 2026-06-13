"use client";

import { useState } from "react";
import PackagesContent from "@/components/admin/subscription/packages/PackagesContent";
import AdminButton from "@/components/shared/AdminButton";
import CustomSubscriptionDialog from "@/components/admin/subscription/packages/CustomSubscriptionDialog";

export default function PackagesPage() {
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);

  return (
    <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1A2328]">Subscriptions</h1>
          <AdminButton
            label="Provide Custom Subscription"
            onClick={() => setIsCustomDialogOpen(true)}
            className="h-10 py-2 px-4 sm:px-5 text-[13px] sm:text-[14px] font-roboto font-semibold shrink-0"
          />
        </div>
      </div>

      {/* Content Area with slight gray background so white cards pop */}
      <div className="bg-[#F8FAFC] flex-1 overflow-x-auto">
        <PackagesContent />
      </div>

      {/* Custom Subscription Dialog */}
      <CustomSubscriptionDialog
        isOpen={isCustomDialogOpen}
        onOpenChange={setIsCustomDialogOpen}
      />
    </div>
  );
}
