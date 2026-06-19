/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Info, CheckCircle2 } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useCreateCustomSubscriptionMutation } from "@/store/features/admin/subscriptions/subscriptions.api";

interface CustomSubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CustomSubscriptionFormValues {
  user_email: string;
  devices: string;
}

const FEATURES = [
  "Unlimited Cases.",
  "Clients, Calendar, Hearings & Deadlines.",
  "Documents Management.",
  "Laws & Bylaws Module.",
  "AI Court Practice Search.",
  "Global Search & Archive."
];

export default function CustomSubscriptionDialog({
  isOpen,
  onOpenChange,
}: CustomSubscriptionDialogProps) {
  const [createCustomSubscription, { isLoading }] = useCreateCustomSubscriptionMutation();

  const defaultValues: CustomSubscriptionFormValues = {
    user_email: "",
    devices: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomSubscriptionFormValues>({
    defaultValues,
  });

  const onSubmit = async (data: CustomSubscriptionFormValues) => {
    const toastId = toast.loading(`Providing custom subscription to ${data.user_email}...`);
    try {
      const res = await createCustomSubscription({
        user_email: data.user_email,
        devices: parseInt(data.devices) || 1,
      }).unwrap();
      if (res) {
        toast.success(`Custom subscription provided successfully to ${data.user_email}!`, { id: toastId });
        reset(defaultValues);
        onOpenChange(false);
      } else {
        toast.error("Failed to provide custom subscription. Please try again.", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.data.message || "Failed to provide custom subscription. Please try again.", { id: toastId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[560px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col focus:outline-none font-roboto"
      >
        {/* Custom close button */}
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-colors duration-200 cursor-pointer z-50 group">
            <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </DialogClose>

        {/* Dialog Title */}
        <DialogTitle className="text-[28px] font-bold text-center text-[#101828] font-roboto mt-2 mb-6 shrink-0">
          Custom Subscription
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full font-roboto overflow-y-auto px-1 flex-1 custom-scrollbar pt-2 min-h-0">
            {/* User Email */}
            <div className="space-y-2">
              <label className="block text-[#344054] font-roboto text-[14px] font-medium leading-[20px]">
                User: <span className="text-[#D92D20]">*</span>
              </label>
              <input
                type="email"
                {...register("user_email", { required: "User email is required!" })}
                placeholder="Type email here..."
                className="w-full rounded-full border border-[#D0D5DD] bg-white px-5 py-3 h-[50px] text-[#101828] placeholder:text-[#98A2B3] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
                disabled={isLoading}
              />
              {errors.user_email && (
                <span className="text-[#EF4444] text-[12px] pl-2">{errors.user_email.message}</span>
              )}
              <div className="flex items-start gap-1.5 mt-2 text-[#155EEF]">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="font-roboto text-[12px] font-normal leading-[18px]">
                  Type user email address to provide custom subscription.
                </span>
              </div>
            </div>

            {/* Devices */}
            <div className="space-y-2">
              <label className="block text-[#344054] font-roboto text-[14px] font-medium leading-[20px]">
                Devices:
              </label>
              <input
                type="number"
                {...register("devices", { required: "Devices count is required!" })}
                placeholder="Enter your device limit"
                className="w-full rounded-full border border-[#D0D5DD] bg-white px-5 py-3 h-[50px] text-[#101828] placeholder:text-[#98A2B3] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
                disabled={isLoading}
              />
              {errors.devices && (
                <span className="text-[#EF4444] text-[12px] pl-2">{errors.devices.message}</span>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E4E7EC] my-6" />

            {/* Features List */}
            <div className="space-y-4">
              <span className="block text-[#101828] font-roboto text-[15px] font-semibold leading-[20px]">
                All Features Included:
              </span>
              <div className="space-y-3">
                {FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#667085] flex-shrink-0" />
                    <span className="text-[#475467] font-roboto text-[14px] font-normal leading-[20px]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button - Full Width */}
            <div className="pt-4">
              <AdminButton
                type="submit"
                label={isLoading ? "Providing..." : "Provide Custom Subscription"}
                disabled={isLoading}
                className="w-full py-3.5 text-[16px] font-semibold justify-center rounded-full"
              />
            </div>
          </form>
      </DialogContent>
    </Dialog>
  );
}
