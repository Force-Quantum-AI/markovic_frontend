"use client";

import React, { useState } from "react";
import { CheckCircle2, X, Landmark } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ContactSupportModal from "./ContactSupportModal";

// ─── DUMMY DATASET ─────────────────────────────────────────────────────────

const featuresList = [
  "Unlimited Cases.",
  "Clients, Calendar, Hearings & Deadlines.",
  "Documents Management.",
  "Laws & Bylaws Module.",
  "AI Court Practice Search.",
  "Global Search & Archive.",
  "Full Support."
];

const subscriptionPackages = [
  {
    id: "basic",
    name: "Basic",
    devices: 3,
    monthlyPrice: 29,
    yearlyPrice: 313,
    isPopular: false,
  },
  {
    id: "standard",
    name: "Standard",
    devices: 6,
    monthlyPrice: 49,
    yearlyPrice: 529,
    isPopular: true,
  },
  {
    id: "premium",
    name: "Premium",
    devices: 9,
    monthlyPrice: 79,
    yearlyPrice: 853,
    isPopular: false,
  }
];

// ─── TYPES ─────────────────────────────────────────────────────────────────

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userPassword?: string;
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function SubscriptionModal({ isOpen, onClose, userEmail, userPassword }: SubscriptionModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);

  if (!isOpen) return null;

  const handleClose = async() => {
    onClose();
  };

return (
  <div
    className="
      fixed inset-0 z-50
      bg-black/40 backdrop-blur-sm
      p-2 md:p-4
      overflow-y-auto
    "
  >
    <div
      className="
        min-h-full
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          relative
          w-full
          max-w-6xl
          bg-[#F8FAFC]
          rounded-2xl
          md:rounded-[24px]
          shadow-2xl
          flex
          flex-col
          max-h-[95vh]
          overflow-hidden
        "
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="
            absolute
            top-3
            right-3
            md:top-6
            md:right-6
            p-2
            text-gray-400
            hover:text-gray-700
            hover:bg-gray-100
            rounded-full
            transition-colors
            z-20
          "
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div
          className="
            overflow-y-auto
            p-4
            sm:p-6
            md:p-8
            lg:p-10
          "
        >
          {/* Header */}
          <div className="text-center mb-6 flex flex-col items-center">
            <div
              className="
                relative
                h-10
                md:h-12
                w-[180px]
                md:w-[250px]
                mb-3
              "
            >
              <Image
                src="/brandLogo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>

            <h2
              className="
                text-lg
                sm:text-xl
                md:text-2xl
                font-bold
                text-slate-900
              "
            >
              Choose your required package
            </h2>

            <p
              className="
                text-slate-600
                text-sm
                md:text-base
                max-w-2xl
              "
            >
              Subscription is based on the number of devices.
              All features are included in every plan.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="mb-8 flex justify-center">
            <Tabs
              value={billingCycle}
              onValueChange={(v) =>
                setBillingCycle(v as "monthly" | "yearly")
              }
              className="w-full max-w-xs"
            >
              <TabsList className="grid w-full grid-cols-2 h-11 bg-slate-200/60 p-1 rounded-lg">
                <TabsTrigger
                  value="monthly"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Monthly
                </TabsTrigger>

                <TabsTrigger
                  value="yearly"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Cards */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
              mb-10
            "
          >
            {subscriptionPackages.map((pkg) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                billingCycle={billingCycle}
              />
            ))}
          </div>

          {/* Footer */}
          <div
            className="
              text-center
              space-y-3
              w-full
              pt-6
              border-t
              border-slate-200
            "
          >
            <p className="text-slate-500 text-sm">
              You will get{" "}
              <span className="font-semibold text-slate-700">
                7 days free trial
              </span>{" "}
              for each subscription.
            </p>

            <p className="text-slate-500 text-sm">
              Need subscription for more device?{" "}
              <button onClick={() => setIsContactSupportOpen(true)} className="text-[#135576] font-semibold hover:underline">
                Contact support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ContactSupportModal
      isOpen={isContactSupportOpen}
      onClose={() => setIsContactSupportOpen(false)}
    />
  </div>
);
}

// ─── REUSABLE CARD COMPONENT ───────────────────────────────────────────────

function PricingCard({ pkg, billingCycle }: { pkg: any, billingCycle: string }) {
  const isYearly = billingCycle === "yearly";
  const price = isYearly ? pkg.yearlyPrice : pkg.monthlyPrice;
  const isPopular = pkg.isPopular;

  return (
    <div className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
      isPopular 
        ? "bg-[#135576] shadow-xl md:-translate-y-4" 
        : "bg-white shadow-sm border border-slate-200"
    }`}>
      
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 left-0 w-full text-center py-2.5 bg-[#135576] text-white/90 text-xs font-medium rounded-t-2xl tracking-wide">
          Most Popular
        </div>
      )}

      {/* Card Content Wrapper (White background for popular card content) */}
      <div className={`flex flex-col h-full rounded-2xl ${isPopular ? "bg-white mt-10 border-x border-b border-[#135576]" : ""}`}>
        
        <div className="p-6 md:p-8 flex-grow">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">{pkg.name}</h3>
          
          <div className="flex items-end justify-between mb-2">
            <div className="flex items-baseline gap-1 text-[#135576]">
              <span className="text-4xl md:text-5xl font-bold tracking-tight">€{price}</span>
              <span className="text-slate-500 text-sm font-medium">/{billingCycle}</span>
            </div>
            <span className="text-slate-900 font-semibold text-sm">{pkg.devices} Devices</span>
          </div>

          <div className="h-5 mb-6">
            {isYearly && (
              <p className="text-slate-500 text-sm">Save 10% in yearly.</p>
            )}
          </div>

          <hr className="border-slate-100 mb-6" />

          <p className="text-slate-900 text-sm font-semibold mb-4">All Features Included:</p>
          
          <ul className="space-y-3 mb-8">
            {featuresList.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-600 text-sm leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section at bottom */}
        <div className="p-6 pt-0 mt-auto text-center">
          <button className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-3 ${
            isPopular 
              ? "bg-[#135576] text-white hover:bg-[#104663]" 
              : "bg-white text-[#135576] border border-[#135576] hover:bg-[#135576]/5"
          }`}>
            Purchase
          </button>
          <p className="text-slate-400 text-xs font-medium">Free Trial - 7 Days</p>
        </div>

      </div>
    </div>
  );
}