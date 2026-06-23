export type CreateSubscriptionPlan = {
  name: string;
  devices: number;
  session: "monthly" | "yearly";
  price: string;
  quote?: string | null;
  recommended?: boolean;
  label?: string | null;
  is_visible?: boolean;
  features?: UpdatePlanFeatures;
};

// get subscription plan type 
export type PlanFeatures = {
  unlimited_cases: boolean;
  client_calendar_hearing_deadline: boolean;
  documents_management: boolean;
  laws_bylaws_module: boolean;
  ai_court_practice_search: boolean;
  global_search_archive: boolean;
};

export type SubscriptionPlan = {
  id: number;
  name: string;
  devices: number;
  session: "monthly" | "yearly";
  price: string;
  quote: string | null;
  recommended: boolean;
  label: string | null;
  is_visible: boolean;
  features: PlanFeatures;
  created_at: string;
  updated_at: string;
};

export type SubscriptionPlansResponse = SubscriptionPlan[];

// update subscription plan type 

export type UpdatePlanFeatures = {
  unlimited_cases: boolean;
  client_calendar_hearing_deadline: boolean;
  documents_management: boolean;
  laws_bylaws_module: boolean;
  ai_court_practice_search: boolean;
  global_search_archive: boolean;
};

export type UpdatePlanPayload = {
  name: string;
  devices: number;
  session: "monthly" | "yearly";
  price: string;
  quote: string | null;
  recommended: boolean;
  label: string | null;
  is_visible: boolean;
  features: UpdatePlanFeatures;
};

// cteate custom subscription type 
export type CreateCustomSubscriptionType = {
    user_email: string;
    devices: number;
}

// subscription request type 

export type SubscriptionRequest = {
  id: number;
  user_email: string;
  full_name: string;
  email: string;
  phone_number: string;
  devices_needed: number;
  message: string;
  status: "pending" | "approved" | "declined";
  admin_note: string | null;
  created_at: string;
  updated_at: string;
};

export type SubscriptionRequestResponse = SubscriptionRequest[];

// -----------------------------
