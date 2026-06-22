import {
  CaseDetail,
  ClientProfile,
  Hearing,
  Deadline,
  CaseDocument,
  CaseNote,
} from "@/types/case.types";

export const DUMMY_CLIENT: ClientProfile = {
  id: "client-1",
  name: "Esther Howard",
  company: "Bank of America",
  phone: "(702) 555-0122",
  avatarUrl: "/dummy-user.jpg",
  email: "sara.cruz@example.com",
  address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  personalId: "#555-0128",
  notes:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  cases: [
    {
      id: "case-1",
      title: "Milanovic/Plitvice Insurance - property claim - P 205/19 - complex Vourt Zagreb...",
      status: "Active",
    },
    {
      id: "case-2",
      title: "Vazquez/Lovcen Insurance - damages claim - P 104/24 - basic Vourt Podgorica",
      status: "Active",
    },
    {
      id: "case-3",
      title: "Petrovic/Black Sea Insurance - fire claim - P 410/22 - major Vourt Novi Sad",
      status: "On Appeal",
    },
    {
      id: "case-4",
      title: "Jovanovic/Sandwich Insurance - theft claim - P 307/21 - minor Vourt Belgrade",
      status: "Finished",
    },
  ],
};

export const DUMMY_CASE: CaseDetail = {
  id: "case-1",
  caseNumber: "CS-126097-AGVT",
  title:
    "Milanovic/Plitvice Insurance - property claim - P 205/19 - complex Vourt Zagreb...",
  createdAt: "2 Mar, 2025",
  client: "Esther Howard",
  opposingParty: "Lovćen Insurance Company",
  court: "Basic Court Podgorica",
  category: "Civil Litigation",
  subcategory: "Traffic Accident Damages",
  status: "Active",
  nextHearing: "22 May 2026, 09:00",
  nextDeadline: "05 June 2026",
  scn: "#3446-4548-5454",
  hearingDate: "May 22, 2026",
  deadlineDate: "May 30, 2026",
  assignedLawyers: [
    { id: "l1", name: "Eleanor Pena", initials: "EP", color: "bg-pink-300", image: "/dummy-user.jpg" },
    { id: "l2", name: "Cameron Williamson", initials: "CW", color: "bg-gray-400", image: "/dummy-user.jpg" },
    { id: "l3", name: "Darrell Steward", initials: "DS", color: "bg-yellow-400", image: "/dummy-user.jpg" },
  ],
};

export const DUMMY_HEARINGS: Hearing[] = [
  {
    id: "h1",
    title: "Initial Hearing",
    date: "22 May 2026",
    time: "09:00 AM",
    court: "Basic Court Podgorica",
    judge: "Judge Miroslav Petric",
    status: "Upcoming",
    notes: "Bring all insurance documents and claimant medical reports.",
  },
  {
    id: "h2",
    title: "Evidence Submission Hearing",
    date: "15 April 2026",
    time: "10:30 AM",
    court: "Basic Court Podgorica",
    judge: "Judge Miroslav Petric",
    status: "Completed",
    notes: "All evidence was submitted successfully.",
  },
  {
    id: "h3",
    title: "Witness Examination",
    date: "10 March 2026",
    time: "11:00 AM",
    court: "Basic Court Podgorica",
    judge: "Judge Ana Kovacevic",
    status: "Completed",
  },
  {
    id: "h4",
    title: "Mediation Session",
    date: "20 February 2026",
    time: "02:00 PM",
    court: "Mediation Center Podgorica",
    judge: "Mediator Stevan Jovic",
    status: "Postponed",
    notes: "Postponed due to opposing counsel unavailability.",
  },
];

export const DUMMY_DEADLINES: Deadline[] = [
  {
    id: "d1",
    title: "Submit Final Evidence Package",
    dueDate: "05 June 2026",
    type: "Evidence Submission",
    priority: "High",
    status: "Pending",
    assignedTo: "Eleanor Pena",
  },
  {
    id: "d2",
    title: "File Appeal Response",
    dueDate: "30 May 2026",
    type: "Legal Filing",
    priority: "High",
    status: "Pending",
    assignedTo: "Darrell Steward",
  },
  {
    id: "d3",
    title: "Client Consultation",
    dueDate: "18 May 2026",
    type: "Meeting",
    priority: "Medium",
    status: "Completed",
    assignedTo: "Cameron Williamson",
  },
  {
    id: "d4",
    title: "Insurance Valuation Report",
    dueDate: "10 April 2026",
    type: "Document Preparation",
    priority: "Medium",
    status: "Completed",
    assignedTo: "Eleanor Pena",
  },
  {
    id: "d5",
    title: "Court Fee Payment",
    dueDate: "01 March 2026",
    type: "Administrative",
    priority: "Low",
    status: "Overdue",
    assignedTo: "Darrell Steward",
  },
];

export const DUMMY_NOTES: CaseNote[] = [
  {
    id: "n1",
    author: "Eleanor Pena",
    authorInitials: "EP",
    authorColor: "bg-pink-400",
    content:
      "Client confirmed all original insurance documents are available. She will bring them to the next hearing scheduled for 22 May. Remind her to also bring personal identification.",
    createdAt: "10 May 2026, 14:32",
  },
  {
    id: "n2",
    author: "Darrell Steward",
    authorInitials: "DS",
    authorColor: "bg-yellow-400",
    content:
      "Opposing counsel (Lovćen Insurance) has requested a 2-week extension for evidence submission. Motion was denied by Judge Petric. We need to prepare counter-arguments for the next session.",
    createdAt: "07 May 2026, 09:15",
  },
  {
    id: "n3",
    author: "Cameron Williamson",
    authorInitials: "CW",
    authorColor: "bg-blue-400",
    content:
      "Reviewed the valuation report. The assessed damage is approximately €45,000. Our claim is €52,000 — need to justify the €7,000 difference with additional expert testimony.",
    createdAt: "02 May 2026, 11:00",
  },
];