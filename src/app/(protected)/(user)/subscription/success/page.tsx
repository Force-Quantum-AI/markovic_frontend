"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";
import { useIsPaymentVerifiedMutation } from "@/store/features/subscription/subscription.client.api";
import { PaymentVerificationResponse } from "@/types/subscription.client";

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [verification, setVerification] = useState<PaymentVerificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isPaymentVerified] = useIsPaymentVerifiedMutation();

  useEffect(() => {
    const txnId = localStorage.getItem("paddle_transaction_id");

    if (!txnId) {
      // No transaction ID found — redirect back to subscription page
      router.replace("/subscription");
      return;
    }

    setTransactionId(txnId);

    isPaymentVerified(txnId)
      .unwrap()
      .then((data) => {
        setVerification(data);
        // Clear the stored transaction_id after successful verification
        localStorage.removeItem("paddle_transaction_id");
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!transactionId && !isLoading) return null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        {isLoading ? (
          <>
            <Loader2 className="w-12 h-12 text-[#135576] animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Verifying your payment...</h2>
            <p className="text-sm text-slate-500">This will only take a moment.</p>
          </>
        ) : isError ? (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              We couldn&apos;t verify this payment
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Please contact support if you believe a charge went through.
            </p>
            <BackToSubscriptionButton />
          </>
        ) : verification?.status === "succeeded" ? (
          <>
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Payment successful!</h2>
            <p className="text-sm text-slate-500 mb-1">
              You&apos;re now subscribed to the{" "}
              <span className="font-semibold capitalize text-slate-700">{verification.plan}</span> plan.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Amount charged: <span className="font-semibold text-slate-700">€{verification.amount}</span>
            </p>
            <BackToSubscriptionButton label="Go to Dashboard" href="/dashboard" />
          </>
        ) : verification?.status === "pending" ? (
          <>
            <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Payment processing</h2>
            <p className="text-sm text-slate-500 mb-1">
              Your payment for the{" "}
              <span className="font-semibold capitalize text-slate-700">{verification.plan}</span> plan
              is still being processed.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              This page will update automatically — you can also check back in a few minutes.
            </p>
            <BackToSubscriptionButton />
          </>
        ) : (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Payment failed</h2>
            <p className="text-sm text-slate-500 mb-6">
              Something went wrong while processing your payment. No charges were made.
            </p>
            <BackToSubscriptionButton />
          </>
        )}
      </div>
    </div>
  );
}

function BackToSubscriptionButton({
  label = "Back to Plans",
  href = "/subscription",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-block w-full py-3 px-4 rounded-xl font-semibold text-sm bg-[#135576] text-white hover:bg-[#104663] transition-all"
    >
      {label}
    </a>
  );
}