"use client";

import { useState } from "react";
import PackagesContent from "@/components/admin/subscription/packages/PackagesContent";
import AdminButton from "@/components/shared/AdminButton";
import CustomSubscriptionDialog from "@/components/admin/subscription/packages/CustomSubscriptionDialog";
import AddSubscriptionDialog from "@/components/admin/subscription/packages/AddSubscriptionDialog";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PackagesPage() {
  const { t } = useTranslation("adminSubscriptionPackages");
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1A2328]">{t("subscriptions")}</h1>
          <div className="flex items-center gap-3">
            <AdminButton
              label={t("add_subscription_package")}
              onClick={() => setIsAddDialogOpen(true)}
              variant="secondary"
              icon={<Plus className="w-4 h-4 text-[#135576]" />}
              className="h-10 py-2 px-4 sm:px-5 text-[#135576] border-[#135576] hover:text-[#135576] text-[13px] sm:text-[14px] font-roboto font-semibold shrink-0 bg-transparent"
            />
            <AdminButton
              label={t("provide_custom_subscription")}
              onClick={() => setIsCustomDialogOpen(true)}
              className="h-10 py-2 px-4 sm:px-5 text-[13px] sm:text-[14px] font-roboto font-semibold shrink-0"
            />
          </div>
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

      {/* Add Subscription Dialog */}
      <AddSubscriptionDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
