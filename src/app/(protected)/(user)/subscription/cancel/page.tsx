"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Loader2 } from "lucide-react";
import { useCancelSubscriptionMutation } from "@/store/features/subscription/subscription.client.api";

// Paddle redirects here when the user backs out of payment without completing it.
export default function SubscriptionCancelPage() {
  const router = useRouter();
  const [detail, setDetail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [cancelSubscription] = useCancelSubscriptionMutation();

  useEffect(() => {
    const txnId = localStorage.getItem("paddle_transaction_id");

    if (!txnId) {
      // No transaction ID — redirect to subscription page
      router.replace("/subscription");
      return;
    }

    cancelSubscription(txnId)
      .unwrap()
      .then((data) => {
        setDetail(data.detail);
      })
      .catch(() => {
        // Even on error, show the cancelled UI
        setDetail("Payment was cancelled. No charges were made.");
      })
      .finally(() => {
        // Clear the stored transaction_id on cancel
        localStorage.removeItem("paddle_transaction_id");
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        {isLoading ? (
          <>
            <Loader2 className="w-12 h-12 text-[#135576] animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Checking status...</h2>
          </>
        ) : (
          <>
            <XCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Checkout cancelled</h2>
            <p className="text-sm text-slate-500 mb-6">
              {detail ?? "Payment was cancelled. No charges were made."}
            </p>
            <a
              href="/subscription"
              className="inline-block w-full py-3 px-4 rounded-xl font-semibold text-sm bg-[#135576] text-white hover:bg-[#104663] transition-all"
            >
              Back to Plans
            </a>
          </>
        )}
      </div>
    </div>
  );
}