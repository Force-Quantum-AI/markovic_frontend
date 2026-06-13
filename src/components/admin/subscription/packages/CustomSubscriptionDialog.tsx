"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Info, CheckCircle2 } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import { toast } from "sonner";

interface CustomSubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FEATURES = [
  "Unlimited Cases.",
  "Clients, Calendar, Hearings & Deadlines.",
  "Documents Management.",
  "Laws & Bylaws Module.",
  "AI Court Practice Search.",
  "Global Search & Archive.",
  "Full Support.",
];

export default function CustomSubscriptionDialog({
  isOpen,
  onOpenChange,
}: CustomSubscriptionDialogProps) {
  const [email, setEmail] = useState("");
  const [screens, setScreens] = useState("50");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("User email is required!");
      return;
    }
    toast.success(`Custom subscription provided to ${email} with ${screens} screens!`);
    setEmail("");
    setScreens("50");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[460px] w-full bg-white rounded-[24px] p-8 md:p-10 border-none shadow-2xl overflow-hidden focus:outline-none"
      >
        {/* Custom close button */}
        <DialogClose asChild>
          <button className="absolute top-6 right-6 text-[#344054] hover:text-red-500 rounded-full border border-[#D0D5DD] hover:border-red-300 w-9 h-9 flex items-center justify-center focus:outline-none transition-all duration-200 cursor-pointer z-50">
            <X className="w-5 h-5" />
          </button>
        </DialogClose>

        <div className="pt-2">
          {/* Dialog Title */}
          <DialogTitle className="text-[28px] font-bold text-center text-[#101828] font-roboto mb-8">
            Custom Subscription
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Email */}
            <div className="space-y-2">
              <label className="block text-[#344054] font-roboto text-[14px] font-medium leading-[20px]">
                User: <span className="text-[#D92D20]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type email here..."
                className="w-full rounded-full border border-[#D0D5DD] bg-white px-5 py-3 h-[50px] text-[#101828] placeholder:text-[#98A2B3] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
                required
              />
              <div className="flex items-start gap-1.5 mt-2 text-[#155EEF]">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="font-roboto text-[12px] font-normal leading-[18px]">
                  Type email to add your co-worker to this case.
                </span>
              </div>
            </div>

            {/* Screens */}
            <div className="space-y-2">
              <label className="block text-[#344054] font-roboto text-[14px] font-medium leading-[20px]">
                Screens:
              </label>
              <input
                type="number"
                value={screens}
                onChange={(e) => setScreens(e.target.value)}
                placeholder="50"
                className="w-full rounded-full border border-[#D0D5DD] bg-white px-5 py-3 h-[50px] text-[#101828] placeholder:text-[#98A2B3] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
              />
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
                label="Provide Custom Subscription"
                className="w-full py-3.5 text-[16px] font-semibold justify-center rounded-full"
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
