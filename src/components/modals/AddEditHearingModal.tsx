"use client";

import { useEffect, useState } from "react";
import { X, Loader, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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
import { SelectField } from "../shared/SelectNewDropdown";
import { SelectFieldForStatus } from "../shared/SelectFieldForStatus";

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
  status: number;
  time_from: string;
  time_to: string;
  period: string;
  date: string;
  month: string;
  year: string;
}

const DEFAULT_FORM: HearingFormData = {
  reason: "",
  status: 1,
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
    status: (hearing?.status != null && !isNaN(Number(hearing.status))) ? Number(hearing.status) : 1,
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
  const { t } = useTranslation("modals");
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

  const handleChange = (key: keyof HearingFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isLoading =
    isAddingHearing || isUpdatingHearing || isAddingDeadline || isUpdatingDeadline;

  const handleSubmit = async () => {
    if (!caseId) {
      toast.error(t("addEditHearing.caseIdMissing"));
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
          toast.success(t("addEditHearing.hearingAddSuccess"));
        } else {
          await addDeadline({ caseId, data: payload }).unwrap();
          toast.success(t("addEditHearing.deadlineAddSuccess"));
        }
      } else {
        if (!hearing?.id) {
          toast.error(t("addEditHearing.itemIdMissing"));
          return;
        }
        if (forModal === "hearing") {
          await updateHearing({ caseId, hearingId: hearing.id, data: payload }).unwrap();
          toast.success(t("addEditHearing.hearingUpdateSuccess"));
        } else {
          await updateDeadline({ caseId, deadlineId: hearing.id, data: payload }).unwrap();
          toast.success(t("addEditHearing.deadlineUpdateSuccess"));
        }
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t("addEditHearing.failedOperation", { mode, item: t(`addEditHearing.${forModal}`) }));
    }
  };

  const months = [
    { value: "1", label: t("addEditHearing.january") },
    { value: "2", label: t("addEditHearing.february") },
    { value: "3", label: t("addEditHearing.march") },
    { value: "4", label: t("addEditHearing.april") },
    { value: "5", label: t("addEditHearing.may") },
    { value: "6", label: t("addEditHearing.june") },
    { value: "7", label: t("addEditHearing.july") },
    { value: "8", label: t("addEditHearing.august") },
    { value: "9", label: t("addEditHearing.september") },
    { value: "10", label: t("addEditHearing.october") },
    { value: "11", label: t("addEditHearing.november") },
    { value: "12", label: t("addEditHearing.december") },
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
          {mode === "edit" ? t("addEditHearing.title_edit") : t("addEditHearing.title_add")} {t(`addEditHearing.${forModal}`)}
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
            {mode === "edit" ? t("addEditHearing.title_edit") : t("addEditHearing.title_add")} {t(`addEditHearing.${forModal}`)}
          </h2>

          {/* Form */}
          <div className="space-y-6 overflow-y-auto">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label={t("addEditHearing.reason")}
                placeholder={t("addEditHearing.reasonPlaceholder")}
                value={formData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
              />

              <div className="space-y-1.5">
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  {t("addEditHearing.status")}
                </label>
                <div className="relative w-full">
                  <SelectFieldForStatus
                    label="Status"
                    value={formData.status ? String(formData.status) : ""}
                    onChange={(value) => handleChange("status", Number(value))}
                    classes="w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#135576]
                  "
                  />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label={t("addEditHearing.timeFrom")}
                placeholder={t("addEditHearing.timeFromPlaceholder")}
                value={formData.time_from}
                onChange={(e) => handleChange("time_from", e.target.value)}
              />
              <InputField
                label={t("addEditHearing.timeTo")}
                placeholder={t("addEditHearing.toPlaceholder")}
                value={formData.time_to}
                onChange={(e) => handleChange("time_to", e.target.value)}
              />

              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  {t("addEditHearing.period")}
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
                  <option value="AM">{t("addEditHearing.periodAM")}</option>
                  <option value="PM">{t("addEditHearing.periodPM")}</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  {t("addEditHearing.date")}
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
                  {t("addEditHearing.month")}
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
                label={t("addEditHearing.year")}
                placeholder={t("addEditHearing.yearPlaceholder")}
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
                  ? t("addEditHearing.savingButton")
                  : mode === "edit"
                    ? t("addEditHearing.updateButton")
                    : t("addEditHearing.addButton", { item: t(`addEditHearing.${forModal}`) })}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}