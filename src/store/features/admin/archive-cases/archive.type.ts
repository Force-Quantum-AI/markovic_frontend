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

