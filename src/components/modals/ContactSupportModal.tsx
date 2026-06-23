"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, User, Mail, Phone, Landmark } from "lucide-react";
import Image from "next/image";
import { useContactForCustomSubscriptionMutation } from "@/store/features/subscription/subscription.client.api";
import { toast } from "sonner";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSupportModal({ isOpen, onClose }: ContactSupportModalProps) {
  const [contactForCustomSubscription, { isLoading }] = useContactForCustomSubscriptionMutation()

  // Controlled form states initialized with the design placeholders
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(
    ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactForCustomSubscription({
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        message,
      }).unwrap();
      toast.success("Your request has been submitted successfully.", {
        position: "top-right"
      });
      setIsSuccess(true);
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
      onClose();
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to submit your request. Please try again.", {
        position: "top-right"
      })
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 ">
      {/* Modal Box */}
      <div className="relative w-full max-w-3xl h-[90vh] bg-white rounded-[24px] shadow-2xl my-8 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Close Toggle Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header Group */}
        <div className="text-center my-6 flex flex-col items-center">
          <div
            className="
                        relative
                        h-10
                        md:h-12
                        w-[180px]
                        md:w-[250px]
                      "
          >
            <Image
              src="/brandLogo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>

          <h2
            className="
                        text-base
                        sm:text-lg
                        md:text-xl
                        font-bold
                        text-slate-900
                      "
          >
            Contact Support
          </h2>

          <p
            className="
                        text-slate-600
                        text-xs
                        md:text-sm
                        max-w-2xl
                        text-wrap
                      "
          >
            Please provide your contact info, we will contact you and
            make a custom subscription package for you.
          </p>
        </div>

        {/* Main Content Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto bg-[#F8FAFC]">

          <div className="border border-slate-200/80 rounded-2xl p-5 md:p-6 space-y-5 bg-white shadow-sm">
            <h3 className="text-base font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3 -mx-1">
              Contact Details:
            </h3>

            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Full Name:</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all"
                />
              </div>
            </div>

            {/* Email & Phone Dual Column Grid Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Email Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Email address:</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all"
                  />
                  {/* Design Verification Badge Checklist Indicator */}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                    ✓
                  </span>
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Phone Number:</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    placeholder="(225) 555-0118"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-300 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all"
                  />
                </div>
              </div>

            </div>

            {/* Custom Description Textarea Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Message:</label>
              <textarea
                required
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] transition-all resize-none leading-relaxed"
              />
            </div>

          </div>

          {/* Form Action Submit Interface Trigger Button */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full max-w-xs py-3.5 px-6 rounded-full font-bold text-sm tracking-wide shadow-md transition-all duration-150 ${isSuccess
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-[#135576] text-white hover:bg-[#0e445f] active:scale-[0.99] disabled:opacity-50"
                }`}
            >
              {isSubmitting ? "Sending..." : isSuccess ? "Submitted Successfully!" : "Submit"}
            </button>
          </div>

          <p className="text-xs bg-[#F8FAFC] text-center py-6 text-slate-500">We will contact you through the email id and phone number that you are providing.</p>
        </form>
      </div>
    </div>
  );
}

// (cleanup moved inside component)