// "use client";

// import React, { useState } from "react";
// import { CheckCircle2, X, Landmark } from "lucide-react";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Image from "next/image";
// import ContactSupportModal from "@/components/modals/ContactSupportModal";

// // ─── DUMMY DATASET ─────────────────────────────────────────────────────────

// const featuresList = [
//   "Unlimited Cases.",
//   "Clients, Calendar, Hearings & Deadlines.",
//   "Documents Management.",
//   "Laws & Bylaws Module.",
//   "AI Court Practice Search.",
//   "Global Search & Archive.",
// ];

// const subscriptionPackages = [
//   {
//     id: "basic",
//     name: "Basic",
//     devices: 3,
//     monthlyPrice: 29,
//     yearlyPrice: 313,
//     isPopular: false,
//   },
//   {
//     id: "standard",
//     name: "Standard",
//     devices: 6,
//     monthlyPrice: 49,
//     yearlyPrice: 529,
//     isPopular: true,
//   },
//   {
//     id: "premium",
//     name: "Premium",
//     devices: 9,
//     monthlyPrice: 79,
//     yearlyPrice: 853,
//     isPopular: false,
//   }
// ];


// // ─── MAIN COMPONENT ────────────────────────────────────────────────────────

// export default function Subscription() {
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
//   const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);

// return (
//   <div
//     className="
//       p-2 md:p-4 border rounded-2xl
//     "
//   >
//     <div
//       className="
//         min-h-full
//         flex
//         items-center
//         justify-center
//       "
//     >
//       <div
//         className="
//           relative
//           w-full
//           max-w-6xl
//           rounded-2xl
//           md:rounded-[24px]
//           flex
//           flex-col

//         "
//       >

//         {/* Scrollable Content */}
//         <div
//           className="
//             p-4
//             sm:p-6
//             md:p-8
//             lg:p-10
//           "
//         >
//           {/* Header */}
//           <div className="text-center mb-6 flex flex-col items-center">
//             <div
//               className="
//                 relative
//                 h-10
//                 md:h-12
//                 w-[180px]
//                 md:w-[250px]
//                 mb-3
//               "
//             >
//               <Image
//                 src="/brandLogo.png"
//                 alt="Logo"
//                 fill
//                 className="object-contain"
//               />
//             </div>

//             <h2
//               className="
//                 text-lg
//                 sm:text-xl
//                 md:text-2xl
//                 font-bold
//                 text-slate-900
//               "
//             >
//               Choose your required package
//             </h2>

//             <p
//               className="
//                 text-slate-600
//                 text-sm
//                 md:text-base
//                 max-w-2xl
//               "
//             >
//               Subscription is based on the number of devices.
//               All features are included in every plan.
//             </p>
//           </div>

//           {/* Billing Toggle */}
//           <div className="mb-8 flex justify-center">
//             <Tabs
//               value={billingCycle}
//               onValueChange={(v) =>
//                 setBillingCycle(v as "monthly" | "yearly")
//               }
//               className="w-full max-w-xs"
//             >
//               <TabsList className="grid w-full grid-cols-2 h-11 bg-slate-200/60 p-1 rounded-lg">
//                 <TabsTrigger
//                   value="monthly"
//                   className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                 >
//                   Monthly
//                 </TabsTrigger>

//                 <TabsTrigger
//                   value="yearly"
//                   className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                 >
//                   Yearly
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>

//           {/* Cards */}
//           <div
//             className="
//               grid
//               grid-cols-1
//               sm:grid-cols-2
//               xl:grid-cols-3
//               gap-6
//               mb-10
//             "
//           >
//             {subscriptionPackages.map((pkg) => (
//               <PricingCard
//                 key={pkg.id}
//                 pkg={pkg}
//                 billingCycle={billingCycle}
//               />
//             ))}
//           </div>

//           {/* Footer */}
//           <div
//             className="
//               text-center
//               space-y-3
//               w-full
//               pt-6

//             "
//           >
//             <p className="text-slate-500 text-sm">
//               You will get{" "}
//               <span className="font-semibold text-slate-700">
//                 7 days free trial
//               </span>{" "}
//               for each subscription.
//             </p>

//             <p className="text-slate-500 text-sm">
//               Need subscription for more device?{" "}
//               <button onClick={() => setIsContactSupportOpen(true)} className="text-[#135576] font-semibold hover:underline">
//                 Contact support
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <ContactSupportModal
//       isOpen={isContactSupportOpen}
//       onClose={() => setIsContactSupportOpen(false)}
//     />
//   </div>
// );
// }

// // ─── REUSABLE CARD COMPONENT ───────────────────────────────────────────────

// function PricingCard({ pkg, billingCycle }: { pkg: any, billingCycle: string }) {
//   const isYearly = billingCycle === "yearly";
//   const price = isYearly ? pkg.yearlyPrice : pkg.monthlyPrice;
//   const isPopular = pkg.isPopular;

//   return (
//     <div className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
//       isPopular 
//         ? "bg-[#135576] shadow-xl md:-translate-y-4" 
//         : "bg-white shadow-sm border border-slate-200"
//     }`}>
      
//       {/* Most Popular Badge */}
//       {isPopular && (
//         <div className="absolute top-0 left-0 w-full text-center py-2.5 bg-[#135576] text-white/90 text-xs font-medium rounded-t-2xl tracking-wide">
//           Most Popular
//         </div>
//       )}

//       {/* Card Content Wrapper (White background for popular card content) */}
//       <div className={`flex flex-col h-full rounded-2xl ${isPopular ? "bg-white mt-10 border-x border-b border-[#135576]" : ""}`}>
        
//         <div className="p-6 md:p-8 flex-grow">
//           <h3 className="text-xl font-semibold text-slate-900 mb-4">{pkg.name}</h3>
          
//           <div className="flex items-end justify-between mb-2">
//             <div className="flex items-baseline gap-1 text-[#135576]">
//               <span className="text-4xl md:text-5xl font-bold tracking-tight">€{price}</span>
//               <span className="text-slate-500 text-sm font-medium">/{billingCycle}</span>
//             </div>
//             <span className="text-slate-900 font-semibold text-sm">{pkg.devices} Devices</span>
//           </div>

//           <div className="h-5 mb-6">
//             {isYearly && (
//               <p className="text-slate-500 text-sm">Save 10% in yearly.</p>
//             )}
//           </div>

//           <hr className="border-slate-100 mb-6" />

//           <p className="text-slate-900 text-sm font-semibold mb-4">All Features Included:</p>
          
//           <ul className="space-y-3 mb-8">
//             {featuresList.map((feature, i) => (
//               <li key={i} className="flex items-start gap-2.5">
//                 <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
//                 <span className="text-slate-600 text-sm leading-tight">{feature}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* CTA Section at bottom */}
//         <div className="p-6 pt-0 mt-auto text-center">
//           <button className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-3 ${
//             isPopular 
//               ? "bg-[#135576] text-white hover:bg-[#104663]" 
//               : "bg-white text-[#135576] border border-[#135576] hover:bg-[#135576]/5"
//           }`}>
//             Purchase
//           </button>
//           <p className="text-slate-400 text-xs font-medium">Free Trial - 7 Days</p>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { toast } from "sonner";
import ContactSupportModal from "@/components/modals/ContactSupportModal";
import { BillingSession, GroupedPlan, SubscriptionPlan } from "@/types/subscription.client";
import { useGetAllSubscriptionListQuery, useGetClientCurrentSubscriptionQuery, usePurchaseSubscriptionPlanMutation } from "@/store/features/subscription/subscription.client.api";

// ─── Feature label mapping ──────────────────────────────────────────────────
// Maps the boolean feature flags from the API into the human-readable labels
// your design shows. Order here defines display order.

const FEATURE_LABELS: { key: keyof SubscriptionPlan["features"]; label: string }[] = [
  { key: "unlimited_cases", label: "Unlimited Cases." },
  { key: "client_calendar_hearing_deadline", label: "Clients, Calendar, Hearings & Deadlines." },
  { key: "documents_management", label: "Documents Management." },
  { key: "laws_bylaws_module", label: "Laws & Bylaws Module." },
  { key: "ai_court_practice_search", label: "AI Court Practice Search." },
  { key: "global_search_archive", label: "Global Search & Archive." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Groups the flat plan list (one row per name+session combo) into one card
 * per plan name, holding both its monthly and yearly variant. If the API
 * returns duplicate rows for the same name+session (as it currently does for
 * "standard"/yearly), the latest `created_at` wins.
 */
function groupPlans(plans: SubscriptionPlan[]): GroupedPlan[] {
  const map = new Map<string, GroupedPlan>();

  for (const plan of plans) {
    if (!plan.is_visible) continue;

    const key = plan.name.toLowerCase();
    const existing = map.get(key);

    const group: GroupedPlan =
      existing ??
      {
        name: plan.name,
        devices: plan.devices,
        recommended: plan.recommended,
        label: plan.label,
        features: plan.features,
        monthly: null,
        yearly: null,
      };

    const variantKey: BillingSession = plan.session;
    const currentVariant = group[variantKey];

    // Keep the most recently updated row if there's a duplicate for the same variant.
    if (!currentVariant || new Date(plan.updated_at) > new Date(currentVariant.updated_at)) {
      group[variantKey] = plan;
    }

    map.set(key, group);
  }

  // Sort: basic → standard → premium → anything else, alphabetically as fallback.
  const order = ["basic", "standard", "premium"];
  return Array.from(map.values()).sort((a, b) => {
    const ai = order.indexOf(a.name.toLowerCase());
    const bi = order.indexOf(b.name.toLowerCase());
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function formatPrice(price: string): string {
  const num = Number(price);
  return Number.isFinite(num) ? num.toLocaleString(undefined, { maximumFractionDigits: 0 }) : price;
}

function daysRemaining(dateIso: string | null): number | null {
  if (!dateIso) return null;
  const diffMs = new Date(dateIso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

// ─── Current subscription banner ───────────────────────────────────────────

function CurrentSubscriptionBanner() {
  const { data: subscription, isLoading } = useGetClientCurrentSubscriptionQuery();

  if (isLoading) {
    return (
      <div className="mb-6 flex items-center justify-center gap-2 text-sm text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        Checking your subscription status...
      </div>
    );
  }

  if (!subscription) return null;

  if (subscription.status === "trial") {
    const remaining = daysRemaining(subscription.trial_end);
    return (
      <div className="mb-8 flex items-center justify-center gap-2.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium rounded-xl px-4 py-3 max-w-xl mx-auto">
        <Clock className="w-4 h-4 shrink-0" />
        <span>
          You&apos;re on a free trial
          {remaining !== null && (
            <> — <strong>{remaining} day{remaining === 1 ? "" : "s"}</strong> remaining</>
          )}
          . Choose a plan below to continue uninterrupted.
        </span>
      </div>
    );
  }

  if (subscription.status === "active") {
    return (
      <div className="mb-8 flex items-center justify-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3 max-w-xl mx-auto">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          You&apos;re subscribed to the <strong className="capitalize">{subscription.plan}</strong> plan
          {subscription.expires_at && (
            <> — renews {new Date(subscription.expires_at).toLocaleDateString()}</>
          )}
          .
        </span>
      </div>
    );
  }

  if (subscription.status === "expired" || subscription.status === "cancelled") {
    return (
      <div className="mb-8 flex items-center justify-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl px-4 py-3 max-w-xl mx-auto">
        <Clock className="w-4 h-4 shrink-0" />
        <span>
          Your subscription is {subscription.status}. Choose a plan below to reactivate.
        </span>
      </div>
    );
  }

  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<BillingSession>("yearly");
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);
  const [purchasingPlanId, setPurchasingPlanId] = useState<number | null>(null);

  const { data: plans, isLoading: isLoadingPlans, isError: isPlansError } =
    useGetAllSubscriptionListQuery();
  const { data: currentSubscription } = useGetClientCurrentSubscriptionQuery();
  const [purchaseSubscriptionPlan] = usePurchaseSubscriptionPlanMutation();

  const groupedPlans = useMemo(() => groupPlans(plans ?? []), [plans]);

  const handlePurchase = async (plan: SubscriptionPlan | null) => {
    if (!plan) {
      toast.error("This billing option isn't available for this plan yet.");
      return;
    }

    setPurchasingPlanId(plan.id);
    try {
      const result = await purchaseSubscriptionPlan(plan.id).unwrap();
      // Stripe Checkout is hosted on an external domain, so we do a full
      // browser navigation rather than a Next.js client-side route push.
      window.location.href = result.checkout_url;
    } catch (error) {
      console.error(error);
      toast.error("Failed to start checkout. Please try again.");
      setPurchasingPlanId(null);
    }
  };

  return (
    <div className="p-2 md:p-4 border rounded-2xl">
      <div className="min-h-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl rounded-2xl md:rounded-[24px] flex flex-col">
          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-6 flex flex-col items-center">
              <div className="relative h-10 md:h-12 w-[180px] md:w-[250px] mb-3">
                <Image src="/brandLogo.png" alt="Logo" fill className="object-contain" />
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                Choose your required package
              </h2>

              <p className="text-slate-600 text-sm md:text-base max-w-2xl">
                Subscription is based on the number of devices. All features are included in
                every plan.
              </p>
            </div>

            {/* Current subscription status */}
            <CurrentSubscriptionBanner />

            {/* Billing Toggle */}
            <div className="mb-8 flex justify-center">
              <Tabs
                value={billingCycle}
                onValueChange={(v) => setBillingCycle(v as BillingSession)}
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
            {isLoadingPlans ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#135576]" />
                <p className="text-sm text-slate-400">Loading subscription plans...</p>
              </div>
            ) : isPlansError ? (
              <div className="text-center py-20">
                <p className="text-sm text-red-400">
                  Failed to load subscription plans. Please refresh and try again.
                </p>
              </div>
            ) : groupedPlans.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-slate-400">No subscription plans are available right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {groupedPlans.map((pkg) => (
                  <PricingCard
                    key={pkg.name}
                    pkg={pkg}
                    billingCycle={billingCycle}
                    currentPlanName={currentSubscription?.plan}
                    isPurchasing={purchasingPlanId !== null}
                    purchasingThisPlan={
                      purchasingPlanId !== null &&
                      (pkg.monthly?.id === purchasingPlanId || pkg.yearly?.id === purchasingPlanId)
                    }
                    onPurchase={handlePurchase}
                  />
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="text-center space-y-3 w-full pt-6">
              <p className="text-slate-500 text-sm">
                You will get{" "}
                <span className="font-semibold text-slate-700">7 days free trial</span> for each
                subscription.
              </p>

              <p className="text-slate-500 text-sm">
                Need subscription for more device?{" "}
                <button
                  onClick={() => setIsContactSupportOpen(true)}
                  className="text-[#135576] font-semibold hover:underline"
                >
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

// ─── Reusable Card Component ───────────────────────────────────────────────

function PricingCard({
  pkg,
  billingCycle,
  currentPlanName,
  isPurchasing,
  purchasingThisPlan,
  onPurchase,
}: {
  pkg: GroupedPlan;
  billingCycle: BillingSession;
  currentPlanName?: string | null;
  isPurchasing: boolean;
  purchasingThisPlan: boolean;
  onPurchase: (plan: SubscriptionPlan | null) => void;
}) {
  const isYearly = billingCycle === "yearly";
  const activeVariant = isYearly ? pkg.yearly : pkg.monthly;
  const isPopular = pkg.recommended;
  const isCurrentPlan = currentPlanName?.toLowerCase() === pkg.name.toLowerCase();

  return (
    <div
      className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
        isPopular ? "bg-[#135576] shadow-xl md:-translate-y-4" : "bg-white shadow-sm border border-slate-200"
      }`}
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 left-0 w-full text-center py-2.5 bg-[#135576] text-white/90 text-xs font-medium rounded-t-2xl tracking-wide">
          {pkg.label || "Most Popular"}
        </div>
      )}

      {/* Card Content Wrapper */}
      <div
        className={`flex flex-col h-full rounded-2xl ${
          isPopular ? "bg-white mt-10 border-x border-b border-[#135576]" : ""
        }`}
      >
        <div className="p-6 md:p-8 flex-grow">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-slate-900 capitalize">{pkg.name}</h3>
            {isCurrentPlan && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Current Plan
              </span>
            )}
          </div>

          {activeVariant ? (
            <div className="flex items-end justify-between flex-wrap mb-2">
              <div className="flex items-baseline flex-wrap gap-1 text-[#135576]">
                <span className="text-4xl md:text-5xl font-bold tracking-tight">
                  €{formatPrice(activeVariant.price)}
                </span>
                <span className="text-slate-500 text-sm font-medium">/{billingCycle}</span>
              </div>
              <div className="text-slate-900 font-semibold text-sm">{pkg.devices} Devices</div>
            </div>
          ) : (
            <div className="mb-2">
              <p className="text-sm text-slate-400">Not available for {billingCycle} billing.</p>
            </div>
          )}

          <div className="h-5 mb-6">
            {isYearly && activeVariant && (
              <p className="text-slate-500 text-sm">Save 10% in yearly.</p>
            )}
          </div>

          <hr className="border-slate-100 mb-6" />

          <p className="text-slate-900 text-sm font-semibold mb-4">All Features Included:</p>

          <ul className="space-y-3 mb-8">
            {FEATURE_LABELS.filter(({ key }) => pkg.features?.[key]).map(({ key, label }) => (
              <li key={key} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-600 text-sm leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="p-6 pt-0 mt-auto text-center">
          <button
            onClick={() => onPurchase(activeVariant)}
            disabled={!activeVariant || isPurchasing || isCurrentPlan}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isPopular
                ? "bg-[#135576] text-white hover:bg-[#104663]"
                : "bg-white text-[#135576] border border-[#135576] hover:bg-[#135576]/5"
            }`}
          >
            {purchasingThisPlan && <Loader2 className="w-4 h-4 animate-spin" />}
            {isCurrentPlan ? "Active Plan" : purchasingThisPlan ? "Redirecting..." : "Purchase"}
          </button>
          <p className="text-slate-400 text-xs font-medium">Free Trial - 7 Days</p>
        </div>
      </div>
    </div>
  );
}