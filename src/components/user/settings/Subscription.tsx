"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck, Clock, ArrowLeft, ChevronLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { toast } from "sonner";
import ContactSupportModal from "@/components/modals/ContactSupportModal";
import { BillingSession, GroupedPlan, SubscriptionPlan } from "@/types/subscription.client";
import { useGetAllSubscriptionListQuery, useGetClientCurrentSubscriptionQuery, usePurchaseSubscriptionPlanMutation, useCancelSubscriptionMutation } from "@/store/features/subscription/subscription.client.api";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { data: subscription, isLoading } = useGetClientCurrentSubscriptionQuery();

  if (isLoading) {
    return (
      <div className="mb-6 flex items-center justify-center gap-2 text-sm text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        {t("subscriptionPage.checkingStatus")}
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
          {t("subscriptionPage.freeTrial")}
          {remaining !== null && (
            <> — <strong>{remaining} {remaining === 1 ? t("subscriptionPage.dayRemaining") : t("subscriptionPage.daysRemaining")}</strong></>
          )}
          {t("subscriptionPage.trialInstruction")}
        </span>
      </div>
    );
  }

  if (subscription.status === "active") {
    return (
      <div className="mb-8 flex items-center justify-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3 max-w-xl mx-auto">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          {t("subscriptionPage.subscribedTo")}<strong className="capitalize">{subscription.plan?.name}</strong>{t("subscriptionPage.planSuffix")}
          {subscription.expires_at && (
            <>{t("subscriptionPage.renewsOn")}{new Date(subscription.expires_at).toLocaleDateString()}</>
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
          {t("subscriptionPage.subscriptionStatusPrefix")}{subscription.status}{t("subscriptionPage.reactivateInstruction")}
        </span>
      </div>
    );
  }

  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Subscription() {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<BillingSession>("monthly");
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);
  const [purchasingPlanId, setPurchasingPlanId] = useState<number | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const { data: plans, isLoading: isLoadingPlans, isError: isPlansError } =
    useGetAllSubscriptionListQuery();
  const { data: currentSubscription } = useGetClientCurrentSubscriptionQuery();
  const [purchaseSubscriptionPlan] = usePurchaseSubscriptionPlanMutation();
  const [cancelSubscription] = useCancelSubscriptionMutation();

  const groupedPlans = useMemo(() => groupPlans(plans ?? []), [plans]);

  const handlePurchase = async (plan: SubscriptionPlan | null) => {
    if (!plan) {
      toast.error(t("subscriptionPage.unavailableBilling"));
      return;
    }

    setPurchasingPlanId(plan.id);
    try {
      const result = await purchaseSubscriptionPlan(plan.id).unwrap();
      // Store transaction_id so success/cancel pages can send it to the API
      localStorage.setItem("paddle_transaction_id", result.transaction_id);
      // Paddle Checkout is hosted on an external domain, so we do a full
      // browser navigation rather than a Next.js client-side route push.
      window.location.href = result.checkout_url;
    } catch (error) {
      console.error(error);
      toast.error(t("subscriptionPage.failedCheckout"));
      setPurchasingPlanId(null);
    }
  };

  const handleCancel = async () => {
    if (isCancelling) return;
    setIsCancelling(true);
    try {
      // transaction_id is empty for active-subscription cancels;
      // the backend identifies the subscription via the auth token.
      await cancelSubscription("").unwrap();
      toast.success(t("subscriptionPage.cancelSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("subscriptionPage.cancelFailed"));
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="p-2 md:p-4 border rounded-2xl">
      {path.includes("/subscription") && (
        <div className="absolute top-4 left-4 z-999">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">
            <ChevronLeft /> {t("subscriptionPage.back")}
          </button>
        </div>
      )}
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
                {t("subscriptionPage.choosePackage")}
              </h2>

              <p className="text-slate-600 text-sm md:text-base max-w-2xl">
                {t("subscriptionPage.subtitle")}
              </p>
            </div>

            {/* Current subscription status */}
            <CurrentSubscriptionBanner />

            {/* Billing Toggle */}
            <div className="mb-8 flex justify-center">
              <Tabs
                value={billingCycle}
                onValueChange={(v) => setBillingCycle(v as BillingSession)}
                className="w-fit"
              >
                <TabsList className="grid w-full grid-cols-2 h-11 bg-slate-200/60 p-2 rounded-lg">
                  <TabsTrigger
                    value="monthly"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm p-1 "
                  >
                    {t("subscriptionPage.monthly")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    {t("subscriptionPage.yearly")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Cards */}
            {isLoadingPlans ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#135576]" />
                <p className="text-sm text-slate-400">{t("subscriptionPage.loadingPlans")}</p>
              </div>
            ) : isPlansError ? (
              <div className="text-center py-20">
                <p className="text-sm text-red-400">
                  {t("subscriptionPage.failedLoad")}
                </p>
              </div>
            ) : groupedPlans.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-slate-400">{t("subscriptionPage.noPlans")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {groupedPlans.map((pkg) => (
                  <PricingCard
                    key={pkg.name}
                    pkg={pkg}
                    billingCycle={billingCycle}
                    currentPlanName={currentSubscription?.plan?.name}
                    currentPlanSession={currentSubscription?.plan?.session}
                    isPurchasing={purchasingPlanId !== null}
                    purchasingThisPlan={
                      purchasingPlanId !== null &&
                      (pkg.monthly?.id === purchasingPlanId || pkg.yearly?.id === purchasingPlanId)
                    }
                    onPurchase={handlePurchase}
                    onCancel={handleCancel}
                    isCancelling={isCancelling}
                  />
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="text-center space-y-3 w-full pt-6">
              <p className="text-slate-500 text-sm">
                {t("subscriptionPage.trialNotice", { trial: "" }).split("{{trial}}")[0]}
                <span className="font-semibold text-slate-700">
                  {t("subscriptionPage.sevenDaysTrial")}
                </span>
                {t("subscriptionPage.trialNotice", { trial: "" }).split("{{trial}}")[1]}
              </p>

              <p className="text-slate-500 text-sm">
                {t("subscriptionPage.moreDevicesPrompt")}
                <button
                  onClick={() => setIsContactSupportOpen(true)}
                  className="text-[#135576] font-semibold hover:underline cursor-pointer"
                >
                  {t("subscriptionPage.contactSupport")}
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
  currentPlanSession,
  isPurchasing,
  purchasingThisPlan,
  onPurchase,
  onCancel,
  isCancelling,
}: {
  pkg: GroupedPlan;
  billingCycle: BillingSession;
  currentPlanName?: string | null;
  currentPlanSession?: BillingSession | null;
  isPurchasing: boolean;
  purchasingThisPlan: boolean;
  onPurchase: (plan: SubscriptionPlan | null) => void;
  onCancel: () => void;
  isCancelling: boolean;
}) {
  const { t } = useTranslation();
  const isYearly = billingCycle === "yearly";
  const activeVariant = isYearly ? pkg.yearly : pkg.monthly;
  const isPopular = pkg.recommended;
  // Only mark as current plan when both name AND billing session match the active tab
  const isCurrentPlan =
    currentPlanName?.toLowerCase() === pkg.name.toLowerCase() &&
    currentPlanSession === billingCycle;

  return (
    <div
      className={`relative flex flex-col rounded-2xl transition-all duration-300 ${isPopular ? "bg-[#135576] shadow-xl md:-translate-y-4" : "bg-white shadow-sm border border-slate-200"
        }`}
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 left-0 w-full text-center py-2.5 bg-[#135576] text-white/90 text-xs font-medium rounded-t-2xl tracking-wide">
          {pkg.label || t("subscriptionPage.mostPopular")}
        </div>
      )}

      {/* Card Content Wrapper */}
      <div
        className={`flex flex-col h-full rounded-2xl ${isPopular ? "bg-white mt-10 border-x border-b border-[#135576]" : ""
          }`}
      >
        <div className="p-6 md:p-8 grow">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-slate-900 capitalize">{pkg.name}</h3>
            {isCurrentPlan && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                {t("subscriptionPage.currentPlan")}
              </span>
            )}
          </div>

          {activeVariant ? (
            <div className="flex items-end justify-between flex-wrap mb-2">
              <div className="flex items-baseline flex-wrap gap-1 text-[#135576]">
                <span className="text-4xl md:text-5xl font-normal tracking-tight">
                  €{formatPrice(activeVariant.price)}
                </span>
                <span className="text-slate-500 text-sm font-medium">/{t(`subscriptionPage.${billingCycle}`)}</span>
              </div>
              <div className="text-slate-900 font-semibold text-sm">{t("subscriptionPage.devicesCount", { count: pkg.devices })}</div>
            </div>
          ) : (
            <div className="mb-2">
              <p className="text-sm text-slate-400">{t("subscriptionPage.notAvailable", { cycle: t(`subscriptionPage.${billingCycle}`) })}</p>
            </div>
          )}

          <div className="h-5 mb-6">
            {isYearly && activeVariant && (
              <p className="text-slate-500 text-sm">{t("subscriptionPage.savePercent")}</p>
            )}
          </div>

          <hr className="border-slate-100 mb-6" />

          <p className="text-slate-900 text-sm font-semibold mb-4">{t("subscriptionPage.featuresIncluded")}</p>

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
          {isCurrentPlan ? (
            <button
              onClick={onCancel}
              disabled={isCancelling}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
            >
              {isCancelling && <Loader2 className="w-4 h-4 animate-spin" />}
              {isCancelling ? t("subscriptionPage.cancelling") : t("subscriptionPage.cancelSubscription")}
            </button>
          ) : (
            <button
              onClick={() => onPurchase(activeVariant)}
              disabled={!activeVariant || isPurchasing}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${isPopular
                  ? "bg-[#135576] text-white hover:bg-[#104663]"
                  : "bg-white text-[#135576] border border-[#135576] hover:bg-[#135576]/5"
                }`}
            >
              {purchasingThisPlan && <Loader2 className="w-4 h-4 animate-spin" />}
              {purchasingThisPlan ? t("subscriptionPage.redirecting") : t("subscriptionPage.purchase")}
            </button>
          )}
          <p className="text-slate-400 text-xs font-medium">{t("subscriptionPage.freeTrialLabel")}</p>
        </div>
      </div>
    </div>
  );
}