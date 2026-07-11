"use client";

import { useState, useMemo } from "react";
import PackageCard, { PackageProps } from "./PackageCard";
import UpdatePackageDialog from "./UpdatePackageDialog";
import {
  useGetAllSubscriptionQuery,
} from "@/store/features/admin/subscriptions/subscriptions.api";
import { SubscriptionPackagesSkeleton } from "@/components/admin/admin-skeletons";
import { useTranslation } from "react-i18next";

export default function PackagesContent() {
  const { t } = useTranslation(["adminSubscriptionPackages", "common"]);
  const { data: subscriptionPlans, isLoading, isError } = useGetAllSubscriptionQuery();

  const [selectedPlan, setSelectedPlan] = useState<PackageProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mappedPlans = useMemo(() => {
    return subscriptionPlans?.map((plan) => {
      const mappedFeatures: string[] = [];
      if (plan.features?.unlimited_cases) {
        mappedFeatures.push(t("common:subscriptionPage.features.unlimited_cases"));
      }
      if (plan.features?.client_calendar_hearing_deadline) {
        mappedFeatures.push(t("common:subscriptionPage.features.client_calendar_hearing_deadline"));
      }
      if (plan.features?.documents_management) {
        mappedFeatures.push(t("common:subscriptionPage.features.documents_management"));
      }
      if (plan.features?.laws_bylaws_module) {
        mappedFeatures.push(t("common:subscriptionPage.features.laws_bylaws_module"));
      }
      if (plan.features?.ai_court_practice_search) {
        mappedFeatures.push(t("common:subscriptionPage.features.ai_court_practice_search"));
      }
      if (plan.features?.global_search_archive) {
        mappedFeatures.push(t("common:subscriptionPage.features.global_search_archive"));
      }

      return {
        id: String(plan.id),
        name: plan.name,
        price: parseFloat(plan.price) || 0,
        billingCycle: (plan.session === "monthly" ? "month" : "yearly") as "month" | "yearly",
        devices: plan.devices,
        description: plan.quote || "",
        features: mappedFeatures,
        actionText: t("update_package"),
        showIcon: true,
        isVisible: plan.is_visible,
      };
    }) || [];
  }, [subscriptionPlans, t]);

  const monthlyPlans = useMemo(() => {
    return mappedPlans.filter((plan) => plan.billingCycle === "month");
  }, [mappedPlans]);

  const yearlyPlans = useMemo(() => {
    return mappedPlans.filter((plan) => plan.billingCycle === "yearly");
  }, [mappedPlans]);

  const handleOpenDialog = (plan: PackageProps) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center py-8 pb-24 font-roboto">
        <h1 className="text-2xl md:text-[28px] font-bold text-[#1A2328] mb-8">{t("update_your_package")}</h1>

        <div className="mb-6 flex justify-center">
          <span className="px-5 py-1.5 rounded-md bg-white border border-[#BEC4D2] text-[13px] font-semibold text-[#135576]">
            {t("monthly_package")}
          </span>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-5 mb-16 max-w-7xl px-4 w-full">
          <SubscriptionPackagesSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500 font-roboto space-y-2">
        <p className="text-sm font-medium">{t("failed_load_subscription")}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-8 pb-24">
      <h1 className="text-2xl md:text-[28px] font-bold text-[#1A2328] mb-8">{t("update_your_package")}</h1>

      {monthlyPlans.length > 0 && (
        <>
          <div className="mb-6 flex justify-center">
            <span className="px-5 py-1.5 rounded-md bg-white border border-[#BEC4D2] text-[13px] font-semibold text-[#135576]">
              {t("monthly_package")}
            </span>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-5 mb-16 max-w-7xl px-4">
            {monthlyPlans.map((plan) => (
              <PackageCard
                key={plan.id}
                plan={plan}
                onUpdate={handleOpenDialog}
              />
            ))}
          </div>
        </>
      )}

      {yearlyPlans.length > 0 && (
        <>
          <div className="mb-6 flex justify-center">
            <span className="px-5 py-1.5 rounded-md bg-white border border-[#BEC4D2] text-[13px] font-semibold text-[#135576]">
              {t("yearly_package")}
            </span>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-5 max-w-7xl px-4">
            {yearlyPlans.map((plan) => (
              <PackageCard
                key={plan.id}
                plan={plan}
                onUpdate={handleOpenDialog}
              />
            ))}
          </div>
        </>
      )}

      {monthlyPlans.length === 0 && yearlyPlans.length === 0 && (
        <div className="text-slate-400 font-medium">{t("no_subscription_found")}</div>
      )}

      <UpdatePackageDialog
        key={selectedPlan?.id || "empty"}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        plan={selectedPlan}
      />
    </div>
  );
}
