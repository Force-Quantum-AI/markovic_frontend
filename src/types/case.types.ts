export type CaseStatus = "Active" | "On Appeal" | "Finished" | "Pending";

export interface Lawyer {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  color: string; // bg color for initials avatar
  image?: string;
}

export interface ClientCase {
  id: string;
  title: string;
  status: CaseStatus;
}

export interface CaseStatusOption {
  value: string;
  label: string;
}

export interface CaseDetail {
  id: string;
  caseNumber: string;
  title: string;
  createdAt: string;
  client: string;
  opposingParty: string;
  court: string;
  category: string;
  subcategory: string;
  status: CaseStatus;
  nextHearing: string;
  nextDeadline: string;
  scn: string;
  hearingDate: string;
  deadlineDate: string;
  assignedLawyers: Lawyer[];
}

export interface ClientProfile {
  id: string;
  name: string;
  company: string;
  avatarUrl?: string;
  phone: string;
  email: string;
  address: string;
  personalId: string;
  notes: string;
  cases: ClientCase[];
}

export interface Hearing {
  id: string;
  title: string;
  date: string;
  time: string;
  court: string;
  judge: string;
  status: "Upcoming" | "Completed" | "Postponed";
  notes?: string;
}

export interface Deadline {
  id: string;
  title: string;
  dueDate: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed" | "Overdue";
  assignedTo: string;
}

export interface HearingAndDeadlinePageDataParamsType{
  search?: string;
  category?: number;
  sub_category?: number;
  hearing_day?: number;
  hearing_month?: number;
  hearing_year?: number;
  deadline_day?: number;
  deadline_month?: number;
  deadline_year?: number;
  page?: number;
  page_size?: number;
}

export interface CaseDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface CaseNote {
  id: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  content: string;
  createdAt: string;
}