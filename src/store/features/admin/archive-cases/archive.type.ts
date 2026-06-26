export interface ArchiveCase {
  id: string;
  case_name: string;
  category: string;
  case_number: string;
  court_name: string;
  date: string;
  status: string;
}

export interface ArchiveCasesResponse {
  count: number;
  page: number;
  total_pages: number;
  results: ArchiveCase[];
}

export interface ArchiveCasesQueryParams {
  page?: number;
  search?: string;
  category?: string;
  court?: string;
  status?: string;
  "day / month / year"?: string;
}

// Archive case details page type format 
export type ResponsibleLawyer = {
  id: string;
  full_name: string;
  email: string;
  professional_role: string | null;
  profile_image: string | null;
};

export type CaseHistory = {
  id: number;
  date: string;
  reason: string;
  status: string;
};

export type CaseDocument = {
  id: number;
  file_name: string;
  file_url: string;
  uploaded_by: string | null;
  created_at: string;
};

export type CaseDetailsResponse = {
  id: string;
  case_number: string;
  case_name: string;
  client_name: string;
  opposing_parties: string[];

  court: number;
  court_name: string;

  category: number;
  category_name: string;

  sub_category: number;
  sub_category_name: string;

  status: number;
  status_name: string;

  total_hearings: number;
  total_deadlines: number;

  closing_description: string;
  closed_at: string;
  case_age_days: number;

  responsible_lawyers: ResponsibleLawyer[];

  hearing_history: CaseHistory[];

  deadline_history: CaseHistory[];

  documents: CaseDocument[];
};
