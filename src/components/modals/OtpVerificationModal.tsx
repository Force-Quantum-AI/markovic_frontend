"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useLoginMutation, useVerifyOtpMutation } from "@/store/features/auth/authApi";
import { useTranslation } from "react-i18next";

// Step type definitions
type ModalStep = "ENTER_OTP" | "SUCCESS" | "ERROR";

interface OtpModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail?: string;
  userPassword?: string;
  onVerificationSuccess?: () => void;
}

export default function OtpVerificationModal({
  isOpen,
  onOpenChange,
  userEmail = "marko@markoviclaw.me",
  userPassword,
  onVerificationSuccess,
}: OtpModalProps) {
  const [verifyOtp, { isLoading, isSuccess }] = useVerifyOtpMutation();
  const [login] = useLoginMutation();
  const { t } = useTranslation("auth");

  // State Matrix
  const [step, setStep] = useState<ModalStep>("ENTER_OTP");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(299); // 4:59 in seconds
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Reset states when modal reopens
  useEffect(() => {
    if (isOpen) {
      setStep("ENTER_OTP");
      setOtp(new Array(6).fill(""));
      setTimeLeft(299);
    }
  }, [isOpen]);

  // Keep a reference to any pending close timer so we can clear it on
  // unmount to avoid dangling timeouts.
  const closeTimerRef = useRef<number | null>(null);
  const closeTimerId = useRef<number | null>(null);

  // Countdown Timer Logic — create a single interval while the modal is
  // open and the user is entering the OTP. Use functional updates so the
  // effect does not re-run every second.
  useEffect(() => {
    if (!isOpen || step !== "ENTER_OTP") return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isOpen, step]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle Input Changes
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Keep only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Extract latest character
    setOtp(newOtp);

    // Auto focus next input
    if (index < 5 && element.value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Keyboard Navigation (Backspace)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        // If current block is empty, delete previous block and focus it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Delete current entry
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle Direct Code Paste (Clipboard Content)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");

    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  // Simulation Trigger for Verification Process
  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsVerifying(true);
      const verifyPayload = {
        email: userEmail,
        otp: fullOtp,
      };

      await verifyOtp(verifyPayload).unwrap();
      setIsVerifying(false);
      setStep("SUCCESS");
      toast.success("OTP verified successfully");

      // auto login - after successful otp verification
      if(userEmail && userPassword) {
        const res = await login({ email: userEmail, password: userPassword }).unwrap();
        document.cookie = `accessToken=${res.access}; path=/; SameSite=Lax`;      
      }

      // Close OTP modal first, then notify parent to open subscription modal
      onOpenChange(false);
      // Small delay to let the OTP modal fully unmount before opening subscription
      closeTimerRef.current = window.setTimeout(() => {
        onVerificationSuccess?.();
      }, 300);
    } catch (error) {
      console.log("error is : ", error);
      toast.error("OTP verification failed, Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(299);
    setOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  // Switch Case Render Block
  const renderModalContent = () => {
    switch (step) {
      case "ENTER_OTP":
        return (
          <div className="flex flex-col items-center justify-center text-center px-4 py-6">
            <DialogHeader className="items-center">
              <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight">
                {t("otp_title")}
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-500 max-w-md mt-4 leading-relaxed">
              {t("otp_desc")}
            </p>

            <span className="text-sm font-semibold text-gray-800 mt-6 tracking-wide block">
              {userEmail}
            </span>

            {/* Countdown timer matching formatting color from verifyOtp.png */}
            <div className="text-red-500 font-semibold text-base mt-8 tracking-wider">
              {timeLeft > 0 ? formatTime(timeLeft) : t("code_expired")}
            </div>

            {/* 6-Input Row Wrapper */}
            <div className="flex gap-3 my-8 justify-center items-center">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => { if (el) inputRefs.current[idx] = el; }}
                  onChange={(e) => handleChange(e.target, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className="w-14 h-14 border border-gray-200 rounded-full text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all shadow-sm bg-white placeholder-gray-300 text-gray-700"
                  placeholder="-"
                />
              ))}
            </div>

            {/* Support Links */}
            <div className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
              {t("didnt_get_code")}{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-[#135576] font-bold hover:underline"
              >
                {t("resend")}
              </button>
            </div>

            {/* Primary Action Control */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={otp.join("").length < 6 || isVerifying || timeLeft === 0}
              className="w-full max-w-sm bg-[#135576] hover:bg-[#0f445f] text-white font-medium py-3 px-12 rounded-full shadow-md transition-all transform active:scale-95 text-center text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("verifying")}
                </>
              ) : (
                t("verify")
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600 mt-5 transition-colors"
            >
              {t("skip_for_now")}
            </button>

            {/* Agreement Terms Block */}
            <div className="text-center text-[10px] text-gray-400 mt-12 border-t border-gray-100 pt-4 w-full">
              {t("by_logging_in")}{" "}
              <a href="#terms" className="underline hover:text-gray-600 font-medium">{t("terms_of_services")}</a>
              {" "}{t("and")}{" "}
              <a href="#privacy" className="underline hover:text-gray-600 font-medium">{t("privacy_policy")}</a>.
            </div>
          </div>
        );

      case "SUCCESS":
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 fill-emerald-500 stroke-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t("verification_success_title")}
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mt-2 leading-relaxed">
              {t("verification_success_desc")}
            </p>

            {/* <button
              onClick={() => onOpenChange(false)}
              className="mt-8 bg-[#135576] hover:bg-[#0f445f] text-white text-sm font-medium py-2.5 px-8 rounded-full shadow-sm flex items-center gap-2 transition-all group"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button> */}
          </div>
        );

      case "ERROR":
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100">
              <XCircle className="w-10 h-10 text-rose-500 fill-rose-500 stroke-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t("verification_failed_title")}
            </h2>
            <p className="text-sm text-rose-500/90 font-medium mt-1">
              {t("verification_failed_invalid_code")}
            </p>
            <p className="text-sm text-gray-400 max-w-xs mt-1 leading-relaxed">
              {t("verification_failed_desc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs">
              <button
                type="button"
                onClick={() => {
                  setOtp(new Array(6).fill(""));
                  setStep("ENTER_OTP");
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-full transition-colors"
              >
                {t("try_again")}
              </button>
              <button
                type="button"
                onClick={handleResend}
                className="flex-1 bg-[#135576] hover:bg-[#0f445f] text-white text-sm font-medium py-2.5 px-4 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t("resend_code")}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl! w-[92vw] sm:w-full bg-white rounded-3xl overflow-hidden p-4 md:p-6 shadow-2xl border-none">
        {renderModalContent()}
      </DialogContent>
    </Dialog>
  );
}