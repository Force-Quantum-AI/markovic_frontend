"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { InputField } from "@/components/shared/InputField";

export interface Hearing {
  id: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: "Upcoming" | "Held" | "Postponed";
  daysRemaining?: number;
}

interface HearingModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  mode?: "add" | "edit";

  hearing?: Hearing | null;

  forModal?: "hearing" | "deadline";
}

export interface HearingFormData {
  reason: string;
  status: string;
  time: string;
  period: string;
  date: string;
  month: string;
  year: string;
}

export default function AddEditHearingModal({
  forModal="hearing",
  open,
  setOpen,
  mode = "add",
  hearing
}: HearingModalProps) {
  const [formData, setFormData] = useState<HearingFormData>({
    reason: "",
    status: "Upcoming",
    time: "",
    period: "AM",
    date: "",
    month: "May",
    year: "2026",
  });

  useEffect(() => {
    if (hearing && mode === "edit") {
      setFormData({
        reason: hearing.type,
        status: hearing.status,
        time: hearing.time,
        period: "AM",
        date: "22",
        month: "May",
        year: "2026",
      });
    } else {
      setFormData({
        reason: "",
        status: "Upcoming",
        time: "",
        period: "AM",
        date: "",
        month: "May",
        year: "2026",
      });
    }
  }, [hearing, mode]);

  const handleChange = (
    key: keyof HearingFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (mode === "add") {
      if (forModal === "hearing") {
        
      }else{
        
      }
    } else {
      if (forModal === "hearing") {
        
      }else{
        
      }
    }
    setOpen(false);
  };

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
          Hearing Modal
        </DialogTitle>

        <div className="relative bg-white px-6 md:px-10 py-8 md:py-10">
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          {/* Heading */}
          <h2 className="text-center text-3xl font-bold text-[#111827] mb-10">
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
                onChange={(e) =>
                  handleChange("reason", e.target.value)
                }
              />

              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  Status:
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value)
                  }
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
                  <option>Upcoming</option>
                  <option>Held</option>
                  <option>Postponed</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Time:"
                placeholder="9:30 - 10:00"
                value={formData.time}
                onChange={(e) =>
                  handleChange("time", e.target.value)
                }
              />

              <div>
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                  Period:
                </label>

                <select
                  value={formData.period}
                  onChange={(e) =>
                    handleChange("period", e.target.value)
                  }
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
                  <option>AM</option>
                  <option>PM</option>
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
                  onChange={(e) =>
                    handleChange("date", e.target.value)
                  }
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
                    <option key={i + 1}>
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
                  onChange={(e) =>
                    handleChange("month", e.target.value)
                  }
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
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <option key={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label="Year:"
                placeholder="2026"
                value={formData.year}
                onChange={(e) =>
                  handleChange("year", e.target.value)
                }
              />
            </div>

            {/* Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                className="
                  rounded-full
                  bg-[#135576]
                  px-10
                  py-3
                  text-white
                  font-semibold
                  hover:bg-[#0f4964]
                  transition
                "
              >
                {mode === "edit"
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