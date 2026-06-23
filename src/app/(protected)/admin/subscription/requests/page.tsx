"use client";

import RequestsContent from "@/components/admin/subscription/requests/RequestsContent";
import AdminButton from "@/components/shared/AdminButton";
import CustomSubscriptionDialog from "@/components/admin/subscription/packages/CustomSubscriptionDialog";
import { useState } from "react";

export default function RequestsPage() {
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  return (
    <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden font-roboto">
      <div className="bg-white flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <h1 className="text-xl font-bold text-[#1A2328]">
          Custom Subscriptions Request
        </h1>
        <AdminButton
          label="Provide Custom Subscription"
          onClick={() => setIsCustomDialogOpen(true)}
          className="h-10 py-2 px-4 sm:px-5 text-[13px] sm:text-[14px] font-roboto font-semibold shrink-0"
        />
      </div>

      <div className="bg-[#F8FAFC] flex-1">
        <RequestsContent />
      </div>

      <CustomSubscriptionDialog
        isOpen={isCustomDialogOpen}
        onOpenChange={setIsCustomDialogOpen}
      />
    </div>
  );
}
