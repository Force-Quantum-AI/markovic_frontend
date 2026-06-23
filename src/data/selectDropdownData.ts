// import { CaseStatusOption } from "@/types/case.types";

import { SelectOptionType } from "@/types/selectOptions";

// export const CaseStatusOptions: SelectOptionType[] = [
//     { value: "Upcoming", label: "Active" },
//     { value: "Overdue", label: "On appeal" },
//     { value: "Completed", label: "In enforcement" },
//     { value: "Canceled", label: "Before Const. Court" },
//     { value: "Canceled", label: "Before Euro. Court of H.Rights" },
//     { value: "Canceled", label: "On revision" },
//     { value: "Canceled", label: "Finished" },
//     { value: "Canceled", label: "Archived" },
// ]

// export const CaseCategoryDummyOptions: CaseStatusOption[] = [
//     { value: "Civil Litigation", label: "Civil Litigation" },
//     { value: "Criminal Law", label: "Criminal Law" },
//     { value: "Family Law", label: "Family Law" },
//     { value: "Corporate Law", label: "Corporate Law" },
//     { value: "Real Estate Law", label: "Real Estate Law" },
//     { value: "Employment Law", label: "Employment Law" },
// ]

// export const CaseSubCategoryOptions: CaseStatusOption[] = [
//     { value: "Civil Litigation", label: "Civil Litigation" },
//     { value: "Criminal Law", label: "Criminal Law" },
//     { value: "Family Law", label: "Family Law" },
//     { value: "Corporate Law", label: "Corporate Law" },
//     { value: "Real Estate Law", label: "Real Estate Law" },
//     { value: "Employment Law", label: "Employment Law" },
// ]

export const CaseStatusOptions: string[] = [
    "Active",
    "On appeal",
    "In enforcement",
    "Before Const. Court",
    "Before Euro. Court of H.Rights",
    "On revision",
    "Finished",
    "Archived",
];

export const NewCaseStatusOptions: SelectOptionType[] = [
    { id: 1, name: "Active" },
    { id: 2, name: "On appeal" },
    { id: 3, name: "In enforcement" },
    { id: 4, name: "Before Const. Court" },
    { id: 5, name: "Before Euro. Court of H.Rights" },
    { id: 6, name: "On revision" },
    { id: 7, name: "Finished" },
    { id: 8, name: "Archived" },
];
    