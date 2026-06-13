"use client";

import React, { useState } from "react";
import PackageCard, { PackageProps } from "./PackageCard";
import UpdatePackageDialog from "./UpdatePackageDialog";
import { toast } from "sonner";

const FEATURES = [
  "Unlimited Cases.",
  "Clients, Calendar, Hearings & Deadlines.",
  "Documents Management.",
  "Laws & Bylaws Module.",
  "AI Court Practice Search.",
  "Global Search & Archive.",
  "Full Support.",
];

const MONTHLY_PLANS: PackageProps[] = [
  {
    id: "m-basic",
    name: "Basic",
    price: 29,
    billingCycle: "month",
    devices: 3,
    description: "Perfect for solo lawyers or very small offices",
    features: FEATURES,
    actionText: "Update package",
    showIcon: true,
  },
  {
    id: "m-standard",
    name: "Standard",
    price: 49,
    billingCycle: "month",
    devices: 6,
    description: "Perfect for small to medium law offices with multiple lawyers/trainees",
    features: FEATURES,
    actionText: "Update package",
    showIcon: true,
  },
  {
    id: "m-premium",
    name: "Premium",
    price: 79,
    billingCycle: "month",
    devices: 9,
    description: "Perfect for larger law offices or firms with more users",
    features: FEATURES,
    actionText: "Update package",
    showIcon: true,
  },
];

const YEARLY_PLANS: PackageProps[] = [
  {
    id: "y-basic",
    name: "Basic",
    price: 313,
    billingCycle: "yearly",
    devices: 3,
    description: "",
    saveText: "Save 10% in yearly.",
    features: FEATURES,
    actionText: "Purchase",
    showIcon: false,
  },
  {
    id: "y-standard",
    name: "Standard",
    price: 529,
    billingCycle: "yearly",
    devices: 6,
    description: "",
    saveText: "Save 10% in yearly.",
    features: FEATURES,
    actionText: "Purchase",
    showIcon: false,
  },
  {
    id: "y-premium",
    name: "Premium",
    price: 853,
    billingCycle: "yearly",
    devices: 9,
    description: "",
    saveText: "Save 10% in yearly.",
    features: FEATURES,
    actionText: "Purchase",
    showIcon: false,
  },
];

export default function PackagesContent() {
  const [monthlyPlans, setMonthlyPlans] = useState<PackageProps[]>(MONTHLY_PLANS);
  const [yearlyPlans, setYearlyPlans] = useState<PackageProps[]>(YEARLY_PLANS);
  const [selectedPlan, setSelectedPlan] = useState<PackageProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (plan: PackageProps) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleUpdatePackage = (updatedPlan: PackageProps) => {
    const updateInList = (list: PackageProps[]) => 
      list.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan);

    if (updatedPlan.billingCycle === "month") {
      setMonthlyPlans(updateInList);
    } else {
      setYearlyPlans(updateInList);
    }

    toast.success(`Package "${updatedPlan.name}" updated successfully!`);
  };

  return (
    <div className="w-full flex flex-col items-center py-8 pb-24">
      <h1 className="text-2xl md:text-[28px] font-bold text-[#1A2328] mb-8">Update your package</h1>
      
      <div className="mb-6 flex justify-center">
        <span className="px-5 py-1.5 rounded-md bg-white border border-[#BEC4D2] text-[13px] font-semibold text-[#135576]">
          Monthly Package
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5 mb-16">
        {monthlyPlans.map(plan => (
          <PackageCard 
            key={plan.id} 
            plan={plan} 
            onUpdate={handleOpenDialog}
          />
        ))}
      </div>

      <div className="mb-6 flex justify-center">
        <span className="px-5 py-1.5 rounded-md bg-white border border-[#BEC4D2] text-[13px] font-semibold text-[#135576]">
          Yearly package
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5">
        {yearlyPlans.map(plan => (
          <PackageCard 
            key={plan.id} 
            plan={plan} 
            onUpdate={handleOpenDialog}
          />
        ))}
      </div>

      <UpdatePackageDialog
        key={selectedPlan?.id || "empty"}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        plan={selectedPlan}
        onUpdate={handleUpdatePackage}
      />
    </div>
  );
}
