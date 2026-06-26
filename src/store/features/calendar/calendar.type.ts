// Calender get api data type 
export type DashboardScheduleHearingType = {
  id?: string;
  case_id?: string;
  name: string;
  time: string;
  date: string;
  status: string;
};

export type DashboardScheduleDeadlineType = {
  id?: string;
  case_id?: string;
  name: string;
  time: string;
  date: string;
  status: string;
};

export type DashboardScheduleResponseType = {
  current_date: string;
  hearings: DashboardScheduleHearingType[];
  deadlines: DashboardScheduleDeadlineType[];
};

// case details type 
export type ResponsibleLawyer = {
  id: string;
  full_name: string;
  email: string;
  professional_role: string | null;
  profile_image: string | null;
};

export type CaseDetailsResponseType = {
  id: string;
  personal_id: string;
  case_number: string;

  client_image: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  note: string;

  case_name: string;

  category: number;
  category_name: string;

  sub_category: number;
  sub_category_name: string;

  status: number;
  status_name: string;

  court: number;
  court_name: string;

  responsible_lawyers: ResponsibleLawyer[];

  opposing_parties: string[];

  hearing_date: string;
  deadline_date: string;

  created_by: string;
  created_by_name: string;

  created_at: string;
  updated_at: string;
};