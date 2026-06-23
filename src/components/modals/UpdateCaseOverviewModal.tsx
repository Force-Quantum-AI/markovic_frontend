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
import { CaseStatusOptions, NewCaseStatusOptions } from "@/data/selectDropdownData";
import { TextAreaField } from "../shared/TextAreaField";
import { useMakeCompleteCaseMutation, useUpdateOverviewInfoOfCaseMutation } from "@/store/features/case/case.api";
import { toast } from "sonner";

interface UpdateCaseOverviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  caseId: string;
}

interface OverviewFormData {
  client_name: string;
  case_name: string;
  category: number;
  category_name: string;
  sub_category: number;
  sub_category_name: string;
  status: number;
  status_name: string;
  court: number;
  court_name: string;
  case_number: string;
  responsible_lawyer_ids: string[];
  opposing_parties: string[];
  shortDescription: string;
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

function buildInitialFormData(d: any): OverviewFormData {
  const normalizeParty = (party: any): string => {
    if (typeof party === "object" && party !== null) {
      return party.name || party.test || Object.values(party)[0] || "";
    }
    return String(party || "");
  };

  return {
    client_name: d?.client_name || "",
    case_name: d?.case_name || "",
    category: d?.category ?? 0,
    category_name: d?.category_name || "",
    sub_category: d?.sub_category ?? 0,
    sub_category_name: d?.sub_category_name || "",
    status: d?.status ?? 1,
    status_name: d?.status_name || "",
    court: d?.court ?? 100,
    court_name: d?.court_name || "",
    case_number: d?.case_number || "",
    responsible_lawyer_ids: d?.responsible_lawyers?.map((l: any) => l.id) || [],
    opposing_parties: (d?.opposing_parties || []).map(normalizeParty),
    shortDescription: "",
  };
}

export default function UpdateCaseOverviewModal({
  open,
  setOpen,
  data,
  caseId,
}: UpdateCaseOverviewModalProps) {
  const [formData, setFormData] = useState<OverviewFormData>(
    buildInitialFormData(data)
  );
  const [opposingInput, setOpposingInput] = useState("");

  const [updateOverviewInfoOfCase, { isLoading }] =
    useUpdateOverviewInfoOfCaseMutation();
  const [makeCompleteCase, { isLoading: isCompleteCaseLoading }] = useMakeCompleteCaseMutation()

  useEffect(() => {
    if (data) {
      setFormData(buildInitialFormData(data));
    }
  }, [data]);

  const handleInputChange =
    (field: keyof OverviewFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleTextAreaChange =
    (field: keyof OverviewFormData) =>
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleUpdate = async () => {
    try {
      if (formData.status === 7 || formData.status === 8) {
        await makeCompleteCase({
          caseId,
          description: formData.shortDescription,
        }).unwrap();
        toast.success("Case completed successfully.");
        setOpen(false);
        return;
      }

      await updateOverviewInfoOfCase({
        caseId,
        data: {
          client_name: formData.client_name,
          case_name: formData.case_name,
          category: formData.category,
          sub_category: formData.sub_category,
          status: formData.status,
          court: formData.court ?? 100,
          responsible_lawyer_ids: formData.responsible_lawyer_ids,
          opposing_parties: formData.opposing_parties,
        },
      }).unwrap();
      toast.success("Case overview updated successfully");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update case overview");
    }
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
            {/* Client Name */}
            <InputField
              label="Client name:"
              placeholder="Client Name"
              value={formData.client_name}
              onChange={handleInputChange("client_name")}
            />

            {/* Case Name */}
            <InputField
              label="Case Name:"
              placeholder="Case Name"
              value={formData.case_name}
              onChange={handleInputChange("case_name")}
            />

            {/* Opposing Parties (tag input) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opposing Parties:
              </label>
              <input
                type="text"
                value={opposingInput}
                onChange={(e) => setOpposingInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && opposingInput.trim()) {
                    e.preventDefault();
                    if (
                      !formData.opposing_parties.includes(
                        opposingInput.trim()
                      )
                    ) {
                      setFormData((prev) => ({
                        ...prev,
                        opposing_parties: [
                          ...prev.opposing_parties,
                          opposingInput.trim(),
                        ],
                      }));
                    }
                    setOpposingInput("");
                  }
                }}
                placeholder="Type name and press Enter to add"
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#135576] focus:ring-2 focus:ring-[#135576]/20"
              />
              {formData.opposing_parties.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.opposing_parties.map((party, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-full border border-gray-100 bg-[#e9eff2] px-3 py-1.5 text-xs font-semibold text-gray-800"
                    >
                      <span>{party}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            opposing_parties:
                              prev.opposing_parties.filter(
                                (_, idx) => idx !== i
                              ),
                          }))
                        }
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Court + Case Number */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Court:"
                placeholder="Court"
                inputType="number"
                value={formData.court}
                onChange={handleInputChange("court")}
              />

              <InputField
                label="Case Number:"
                placeholder="Case Number"
                value={formData.case_number}
                onChange={handleInputChange("case_number")}
              />
            </div>

            {/* Category + Subcategory */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectField
                label="Category:"
                value={formData.category_name}
                onChange={(value: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    category_name: value,
                  }))
                }
                options={categories}
              />
              <SelectField
                label="Subcategory:"
                value={formData.sub_category_name}
                onChange={(value: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    sub_category_name: value,
                  }))
                }
                options={subcategories}
              />
            </div>

            {/* Status */}
            <SelectField
              label="Status:"
              value={formData.status?.toString()}
              onChange={(value: any) =>
                setFormData((prev) => ({
                  ...prev,
                  status: Number(value),
                }))
              }
              options={NewCaseStatusOptions}
            />

            {formData.status === 7 ||
              formData.status === 8 ? (
              <TextAreaField
                label="Short description :"
                placeholder="write short description here..."
                value={formData.shortDescription}
                onChange={handleTextAreaChange("shortDescription")}
              />
            ) : null}

            {/* Footer */}
            <div className="flex justify-end pt-3">
              <button
                onClick={handleUpdate}
                disabled={isLoading}
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
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isLoading ? "Updating..." : "Update Now"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}