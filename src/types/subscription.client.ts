// ─── Plan list ────────────────────────────────────────────────────────────────

export interface PlanFeatures {
  unlimited_cases: boolean;
  client_calendar_hearing_deadline: boolean;
  documents_management: boolean;
  laws_bylaws_module: boolean;
  ai_court_practice_search: boolean;
  global_search_archive: boolean;
}

export type BillingSession = "monthly" | "yearly";

export interface SubscriptionPlan {
  id: number;
  name: string;
  devices: number;
  session: BillingSession;
  price: string; // API returns this as a string, e.g. "529.00"
  quote: string | null;
  recommended: boolean;
  label: string | null;
  is_visible: boolean;
  features: PlanFeatures;
  created_at: string;
  updated_at: string;
}

/** UI-friendly shape: one card per plan tier, holding both billing variants. */
export interface GroupedPlan {
  name: string;
  devices: number;
  recommended: boolean;
  label: string | null;
  features: PlanFeatures;
  monthly: SubscriptionPlan | null;
  yearly: SubscriptionPlan | null;
}

// ─── Current subscription ───────────────────────────────────────────────────
export type SubscriptionStatus = "trial" | "active" | "expired" | "cancelled";

export interface CurrentSubscription {
  id: number;
  user_email: string;
  user_name: string;
  plan: string | null;
  status: SubscriptionStatus;
  trial_start: string | null;
  trial_end: string | null;
  started_at: string | null;
  expires_at: string | null;
}

// ─── Checkout / payment verification ────────────────────────────────────────

export interface CheckoutResponse {
  checkout_url: string;
}

export interface PaymentVerificationResponse {
  status: "pending" | "succeeded" | "failed" | string;
  plan: string;
  amount: number;
  subscription_status: SubscriptionStatus | null;
  expires_at: string | null;
}

export interface PaymentCancelResponse {
  detail: string;
}