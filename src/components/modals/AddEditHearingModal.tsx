"use client";

import { useEffect, useState } from "react";
import { X, Loader } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { InputField } from "@/components/shared/InputField";
import {
  useAddHearingInCaseMutation,
  useUpdateHearingInCaseMutation,
  useAddDeadlineInCaseMutation,
  useUpdateDeadlineInCaseMutation,
} from "@/store/features/case/case.api";

interface HearingModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode?: "add" | "edit";
  hearing?: any | null;
  forModal?: "hearing" | "deadline";
  caseId: string;
}

export interface HearingFormData {
  reason: string;
  status: string;
  time_from: string;
  time_to: string;
  period: string;
  date: string;
  month: string;
  year: string;
}

const DEFAULT_FORM: HearingFormData = {
  reason: "",
  status: "Upcoming",
  time_from: "",
  time_to: "",
  period: "AM",
  date: String(new Date().getDate()),
  month: String(new Date().getMonth() + 1),
  year: String(new Date().getFullYear()),
};

/** Builds form state from a raw hearing/deadline API object, with safe fallbacks. */
function buildFormFromHearing(hearing: any): HearingFormData {
  return {
    reason: hearing?.reason ?? hearing?.type ?? "",
    status: hearing?.status ?? "Upcoming",
    time_from: hearing?.time_from ?? "",
    time_to: hearing?.time_to ?? "",
    period: hearing?.am_pm ?? "AM",
    // Use `!= null` (not truthy check) so day/month/year of 0 wouldn't be wrongly discarded.
    date: hearing?.day != null ? String(hearing.day) : String(new Date().getDate()),
    month: hearing?.month != null ? String(hearing.month) : String(new Date().getMonth() + 1),
    year: hearing?.year != null ? String(hearing.year) : String(new Date().getFullYear()),
  };
}

export default function AddEditHearingModal({
  forModal = "hearing",
  open,
  setOpen,
  mode = "add",
  hearing,
  caseId,
}: HearingModalProps) {
  const [addHearing, { isLoading: isAddingHearing }] = useAddHearingInCaseMutation();
  const [updateHearing, { isLoading: isUpdatingHearing }] = useUpdateHearingInCaseMutation();
  const [addDeadline, { isLoading: isAddingDeadline }] = useAddDeadlineInCaseMutation();
  const [updateDeadline, { isLoading: isUpdatingDeadline }] = useUpdateDeadlineInCaseMutation();

  const [formData, setFormData] = useState<HearingFormData>(DEFAULT_FORM);

  // Re-sync form data whenever the modal opens, or the target item / mode changes
  // while it's open. Keying off `open` ensures stale data from a previous edit
  // session can't leak into a freshly opened "add" form (and vice versa).
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && hearing) {
      setFormData(buildFormFromHearing(hearing));
    } else {
      setFormData(DEFAULT_FORM);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode, hearing?.id]);

  const handleChange = (key: keyof HearingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isLoading =
    isAddingHearing || isUpdatingHearing || isAddingDeadline || isUpdatingDeadline;

  const handleSubmit = async () => {
    if (!caseId) {
      toast.error("Case ID is missing.");
      return;
    }

    const payload = {
      reason: formData.reason,
      status: formData.status,
      time_from: formData.time_from,
      time_to: formData.time_to,
      am_pm: formData.period,
      day: Number(formData.date),
      month: Number(formData.month),
      year: Number(formData.year),
    };

    try {
      if (mode === "add") {
        if (forModal === "hearing") {
          await addHearing({ caseId, data: payload }).unwrap();
          toast.success("Hearing added successfully!");
        } else {
          await addDeadline({ caseId, data: payload }).unwrap();
          toast.success("Deadline added successfully!");
        }
      } else {
        if (!hearing?.id) {
          toast.error("Item ID is missing for update.");
          return;
        }
        if (forModal === "hearing") {
          await updateHearing({ caseId, hearingId: hearing.id, data: payload }).unwrap();
          toast.success("Hearing updated successfully!");
        } else {
          await updateDeadline({ caseId, deadlineId: hearing.id, data: payload }).unwrap();
          toast.success("Deadline updated successfully!");
        }
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${mode} ${forModal}.`);
    }
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[95vw]
          max-w-5xl!
          rounded-[32px]
          border-0
          p-0
          overflow-y-auto
          max-h-[90vh]
        "
      >
        <DialogTitle className="sr-only">
          {mode === "edit" ? "Edit" : "Add"} {forModal}
        </DialogTitle>

        <div className="relative bg-white px-6 md:px-10 py-8 md:py-10">
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6"
            disabled={isLoading}
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          {/* Heading */}
          <h2 className="text-center text-3xl font-bold text-[#111827] mb-10 capitalize">
            {mode === "edit" ? "Edit" : "Add"} {forModal}
          </h2>

          {/* Form */}
          <div className="space-y-6 overflow-y-auto">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Reason:"
                placeholder="Reason"
                value={formData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
              />

              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  Status:
                </label>

                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="
                    w-full
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-2.5
                    text-sm
                    focus:outline-none
                    focus:ring-1
                    focus:ring-[#135576]
                  "
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Held">Held</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Extended">Extended</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Time From:"
                placeholder="09:00"
                value={formData.time_from}
                onChange={(e) => handleChange("time_from", e.target.value)}
              />
              <InputField
                label="Time To:"
                placeholder="10:00"
                value={formData.time_to}
                onChange={(e) => handleChange("time_to", e.target.value)}
              />

              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  Period:
                </label>

                <select
                  value={formData.period}
                  onChange={(e) => handleChange("period", e.target.value)}
                  className="
                    w-full
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-2.5
                    text-sm
                    focus:outline-none
                    focus:ring-1
                    focus:ring-[#135576]
                  "
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  Date:
                </label>

                <select
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="
                    w-full
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-2.5
                    text-sm
                  "
                >
                  {Array.from({ length: 31 }).map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  Month:
                </label>

                <select
                  value={formData.month}
                  onChange={(e) => handleChange("month", e.target.value)}
                  className="
                    w-full
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-2.5
                    text-sm
                  "
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label="Year:"
                placeholder="2026"
                value={formData.year}
                inputType="number"
                onChange={(e) => handleChange("year", e.target.value)}
              />
            </div>

            {/* Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="
                  flex items-center justify-center gap-2
                  rounded-full
                  bg-[#135576]
                  px-10
                  py-3
                  text-white
                  font-semibold
                  hover:bg-[#0f4964]
                  transition
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                {isLoading
                  ? "Saving..."
                  : mode === "edit"
                  ? "Update Now"
                  : `Add ${forModal}`}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}