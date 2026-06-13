"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Info, ChevronDown, CheckCircle2 } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import { PackageProps } from "./PackageCard";

interface UpdatePackageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PackageProps | null;
  onUpdate: (updatedPlan: PackageProps) => void;
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

export default function UpdatePackageDialog({
  isOpen,
  onOpenChange,
  plan,
  onUpdate,
}: UpdatePackageDialogProps) {
  const [name, setName] = useState(plan?.name || "");
  const [screens, setScreens] = useState(plan ? String(plan.devices) : "");
  const [price, setPrice] = useState(plan ? `€ ${plan.price}` : "");
  const [session, setSession] = useState(plan?.billingCycle === "month" ? "Monthly" : "Yearly");
  const [quote, setQuote] = useState(plan?.description || "");
  const [recommended, setRecommended] = useState(plan?.name === "Standard");
  const [enabled, setEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    const cleanPriceStr = price.replace(/[€$s\s]/g, "");
    const numericPrice = parseFloat(cleanPriceStr) || plan.price;

    const updatedPlan: PackageProps = {
      ...plan,
      name,
      devices: parseInt(screens) || plan.devices,
      price: numericPrice,
      billingCycle: session === "Monthly" ? "month" : "yearly",
      description: quote,
    };

    onUpdate(updatedPlan);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className="sm:max-w-[540px] md:max-w-[600px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col focus:outline-none"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <DialogTitle className="text-[24px] font-bold text-center text-[#101828] font-roboto mt-2 mb-6 shrink-0">
          Update Subscription
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-6 w-full font-roboto overflow-y-auto pr-2 flex-1 custom-scrollbar">
          
          <div className="space-y-1.5 w-full flex flex-col items-start">
            <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
              Name of the package: <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type the package name here..."
              className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
              required
            />
            <div className="flex items-center gap-1.5 text-[#3B82F6] cursor-pointer hover:underline text-[13px] font-semibold mt-1">
              <Info className="w-4 h-4 text-[#3B82F6]" />
              <span>Name your package</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="space-y-1.5 w-full flex flex-col items-start">
              <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
                Screens:
              </label>
              <input
                type="text"
                value={screens}
                onChange={(e) => setScreens(e.target.value)}
                className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-1.5 w-full flex flex-col items-start">
              <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
                Price:
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5 w-full flex flex-col items-start">
            <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
              Session:
            </label>
            <div className="relative w-full">
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 w-full flex flex-col items-start">
            <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
              Quote:
            </label>
            <input
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center justify-between w-full p-4 rounded-2xl border border-[#E5E7EB] bg-white">
            <div className="flex flex-col gap-0.5 items-start">
              <span className="text-[#101828] font-roboto text-[16px] font-semibold leading-[24px]">
                Recommended
              </span>
              <span className="text-[#6A7282] font-roboto text-[13px] font-medium leading-[18px]">
                Add a level for your subscription package.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setRecommended(!recommended)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                recommended ? "bg-[#135576]" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  recommended ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="space-y-3 w-full border-t border-gray-100 pt-4 flex flex-col items-start">
            <span className="block text-[#101828] font-roboto text-[14px] font-bold leading-[20px]">
              All Features Included:
            </span>
            <ul className="space-y-2.5 w-full text-left">
              {FEATURES.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
                  <span className="text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between w-full p-4 rounded-2xl border border-[#E5E7EB] bg-white">
            <span className="text-[#101828] font-roboto text-[16px] font-semibold leading-[24px]">
              Enabled
            </span>
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                enabled ? "bg-[#135576]" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  enabled ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-center pt-2">
            <AdminButton
              type="submit"
              label="Update"
              className="px-12 py-3 w-[160px]"
            />
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}
