export interface CaseStatus {
  id: number;
  name: string;
  created_at: string;
}

export type CaseStatusResponse = CaseStatus[];