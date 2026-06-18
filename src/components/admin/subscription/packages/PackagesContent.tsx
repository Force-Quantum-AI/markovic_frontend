"use client";

import { useState, useMemo } from "react";
import PackageCard, { PackageProps } from "./PackageCard";
import UpdatePackageDialog from "./UpdatePackageDialog";
import {
  useGetAllSubscriptionQuery,
} from "@/store/features/admin/subscriptions/subscriptions.api";

export default function PackagesContent() {
  const { data: subscriptionPlans, isLoading, isError } = useGetAllSubscriptionQuery();

  const [selectedPlan, setSelectedPlan] = useState<PackageProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mappedPlans = useMemo(() => {
    return subscriptionPlans?.map((plan) => {
      const mappedFeatures: string[] = [];
      if (plan.features?.unlimited_cases) {
        mappedFeatures.push("Unlimited Cases.");
      }
      if (plan.features?.client_calendar_hearing_deadline) {
        mappedFeatures.push("Clients, Calendar, Hearings & Deadlines.");
      }
      if (plan.features?.documents_management) {
        mappedFeatures.push("Documents Management.");
      }
      if (plan.features?.laws_bylaws_module) {
        mappedFeatures.push("Laws & Bylaws Module.");
      }
      if (plan.features?.ai_court_practice_search) {
        mappedFeatures.push("AI Court Practice Search.");
      }
      if (plan.features?.global_search_archive) {
        mappedFeatures.push("Global Search & Archive.");
      }

      return {
        id: String(plan.id),
        name: plan.name,
        price: parseFloat(plan.price) || 0,
        billingCycle: (plan.session === "monthly" ? "month" : "yearly") as "month" | "yearly",
        devices: plan.devices,
        description: plan.quote || "",
        features: mappedFeatures,
        actionText: "Update package",
        showIcon: true,
        isVisible: plan.is_visible,
      };
    }) || [];
  }, [subscriptionPlans]);

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
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-roboto">
        <div className="w-8 h-8 border-4 border-[#135576] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Loading subscription plans...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500 font-roboto">
        <p className="text-sm font-medium">Failed to load subscription plans. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-8 pb-24">
      <h1 className="text-2xl md:text-[28px] font-bold text-[#1A2328] mb-8">Update your package</h1>

      {monthlyPlans.length > 0 && (
        <>
          <div className="mb-6 flex justify-center">
            <span className="px-5 py-1.5 rounded-md bg-white border border-[#BEC4D2] text-[13px] font-semibold text-[#135576]">
              Monthly Package
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
              Yearly package
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
        <div className="text-slate-400 font-medium">No subscription plans found.</div>
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
