// Subscription enums
export type SubscriptionStatus = "basic" | "standard" | "premium";

export type SubscriptionPeriod = "day" | "month" | "year";

// User type
export interface User {
  unique_id: string;
  profile_image: string | null;
  full_name: string; // client name
  email: string;
  number: string | null;
  account_created: string;
  subscription: string | null;
}

// Stats type
export interface UserStats {
  total_users: number;
  active_users: number;
  new_today: number;
}

// Main API response type
export interface UsersResponse {
  count: number;
  page: number;
  total_pages: number;
  results: {
    stats: UserStats;
    users: User[];
  };
}

// pagination ResponseData type
export type PaginationQueryParams = {
  page?: number;
  search?: string;
  subscription?: string;
  day?: string | number;
  month?: string | number;
  year?: string | number;
}