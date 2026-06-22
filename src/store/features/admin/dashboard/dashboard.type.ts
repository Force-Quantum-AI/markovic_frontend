// dashboard details data type 
export type Metric = {
  label: string;
  value: number;
};

export type SystemHealthMetric = {
  label: string;
  value: number;
  unit: string;
};

export type GraphMetric = {
  period: string;
  subscription: Metric;
  total_cases: Metric;
  archive_cases: Metric;
  total_users: Metric;
  total_courts: Metric;
  storage: Metric;
};

export type DashboardDataResponse = {
  overview: {
    total_users: number;
    ai_search: number;
    archive: number;
    cases: number;
    total_earning: number;
  };
  graph: {
    monthly: GraphMetric[];
    yearly: GraphMetric[];
  };
  total_cases_breakdown: Record<string, number | string>;
  system_health: {
    api_server: SystemHealthMetric;
    database: SystemHealthMetric;
    ai_service: SystemHealthMetric;
    storage: SystemHealthMetric;
  };
};


// achhieve case data type 
export type CaseStatus = {
  id: string;
  case_name: string;
  category: string;
  case_number: string;
  court_name: string;
  date: string;
  status: string;
};

export type CaseListResponse = {
  count: number;
  page: number;
  total_pages: number;
  results: CaseStatus[];
};

// My user all get data type 
export type User = {
  id: string;
  profile_image: string | null;
  full_name: string;
  email: string;
  number: string | null;
  account_created: string;
  subscription_plan: string | null;
  subscription_status: string | null;
};

export type UsersResponse = {
  count: number;
  page: number;
  total_pages: number;
  results: User[];
};

export type DataPaginationResponse = {
  count: number;
  page: number;
  total_pages: number;
}