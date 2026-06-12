"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "../shared/SelectField";
import { CaseStatusOptions } from "@/data/selectDropdownData";
import { TextAreaField } from "../shared/TextAreaField";

export interface Lawyer {
  id: string;
  name: string;
}

interface CaseDetail {
  id: string;
  caseNumber: string;
  title: string;
  createdAt: string;
  client: string;
  opposingParty: string;
  court: string;
  category: string;
  subcategory: string;
  status: string;
  nextHearing: string;
  nextDeadline: string;
  scn: string;
  hearingDate: string;
  deadlineDate: string;
  assignedLawyers: Lawyer[];
  shortDescription: string;
}

const caseData: CaseDetail = {
  id: "1",
  caseNumber: "CS-126097-AGVT",
  title: "Insurance Claim",
  createdAt: "2026-01-01",
  client: "Markovic Aleksa",
  opposingParty: "Lovćen Insurance Company",
  court: "Basic Court Podgorica",
  category: "Civil Litigation",
  subcategory: "Traffic Accident Damages",
  status: "Active",
  nextHearing: "22 May 2026",
  nextDeadline: "05 June 2026",
  scn: "SCN-1001",
  hearingDate: "2026-05-22",
  deadlineDate: "2026-06-05",
  assignedLawyers: [],
  shortDescription: "",
};

interface UpdateCaseOverviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: CaseDetail;
}

const categories = [
  "Civil Litigation",
  "Criminal Law",
  "Family Law",
  "Corporate Law",
];

const subcategories = [
  "Traffic Accident Damages",
  "Insurance Claim",
  "Contract Dispute",
  "Property Issue",
];


export default function UpdateCaseOverviewModal({
  open,
  setOpen,
  data = caseData,
}: UpdateCaseOverviewModalProps) {
  const [formData, setFormData] =
    useState<CaseDetail>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleInputChange =
    (field: keyof CaseDetail) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleTextAreaChange =
    (field: keyof CaseDetail) =>
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleUpdate = () => {
    console.log("Updated Case:", formData);

    // future api integration

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="
          max-w-3xl!
          rounded-[32px]
          border-none
          p-0
          overflow-hidden
        "
      >
        <DialogTitle className="hidden">
          Update Case Overview
        </DialogTitle>

        <div className="relative bg-white px-6 py-8 md:px-8 md:py-10">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6"
          >
            <X className="h-5 w-5 text-[#343A40]" />
          </button>

          {/* Heading */}
          <h2 className="text-center text-[24px] font-semibold text-[#111827]">
            Update case overview
          </h2>

          <div className="mt-10 space-y-5">
            {/* Client */}
            <InputField
              label="Client name:"
              placeholder="Client Name"
              value={formData.client}
              onChange={handleInputChange("client")}
            />

            {/* Opposing Party */}
            <InputField
              label="Opposing Party:"
              placeholder="Opposing Party"
              value={formData.opposingParty}
              onChange={handleInputChange("opposingParty")}
            />

            {/* Court + Case Number */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Court:"
                placeholder="Court"
                value={formData.court}
                onChange={handleInputChange("court")}
              />

              <InputField
                label="Case Number:"
                placeholder="Case Number"
                value={formData.caseNumber}
                onChange={handleInputChange("caseNumber")}
              />
            </div>

            {/* Category + Subcategory */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <SelectField
                label="Category:"
                value={formData.category}
                onChange={(value: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
                options={categories}
              />
              <SelectField
                label="Subcategory:"
                value={formData.subcategory}
                onChange={(value: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    subcategory: value,
                  }))
                }
                options={subcategories}
              />
            </div>

            {/* Status */}
            <SelectField
              label="Status:"
              value={formData.status}
              onChange={(value: any) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value,
                }))
              }
              options={CaseStatusOptions}
            />

            {
              formData.status !== "Finished" ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Next Hearing:"
                    placeholder="Next Hearing"
                    value={formData.nextHearing}
                    onChange={handleInputChange(
                      "nextHearing"
                    )}
                  />

                  <InputField
                    label="Next Deadline:"
                    placeholder="Next Deadline"
                    value={formData.nextDeadline}
                    onChange={handleInputChange(
                      "nextDeadline"
                    )}
                  />
                </div>
              ) : (
                <TextAreaField
                  label="Short description :"
                  placeholder="write short description here..."
                  value={formData.shortDescription}
                  onChange={handleTextAreaChange(
                    "shortDescription"
                  )}
                />
              )
            }



            {/* Footer */}
            <div className="flex justify-end pt-3">
              <button
                onClick={handleUpdate}
                className="
                  rounded-full
                  bg-[#135576]
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-[#0f4762]
                "
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}