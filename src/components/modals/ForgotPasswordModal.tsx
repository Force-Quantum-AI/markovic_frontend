"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ArrowLeft, 
  RefreshCw 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"; // Standard Shadcn/UI import
import { toast } from "sonner";
import { useForgotPasswordRequestMutation, useResetPasswordMutation } from "@/store/features/auth/authApi";

// Step Definitions
type ResetStep = "EMAIL" | "OTP" | "NEW_PASSWORD" | "SUCCESS" | "ERROR";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onOpenChange,
}: ForgotPasswordModalProps) {

  const [forgotPasswordRequest, {isLoading:isForgotPasswordRequestLoading}] = useForgotPasswordRequestMutation();
  const [resetPassword, {isLoading:isResetPasswordLoading}] = useResetPasswordMutation();

  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState<ResetStep>("EMAIL");
  const [isLoading, setIsLoading] = useState(false);
  
  // Input States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI States
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [timeLeft, setTimeLeft] = useState(299);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const isEmailValid = email.includes("@") && email.includes(".");

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setStep("EMAIL");
      setOtp(new Array(6).fill(""));
      setTimeLeft(299);
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  // Track pending timeouts so we can clear them if the component unmounts
  const pendingTimeouts = useRef<number[]>([]);

  // Timer logic for Step 2 — create a single interval while on OTP step.
  useEffect(() => {
    if (step !== "OTP") return;

    const timer = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await resetPassword({ 
        email : email,
        otp: otp.join(""),
        new_password : password,
        confirm_password: confirmPassword
      }).unwrap();
      toast.success("Password reset successfully");
      setStep("SUCCESS");
    } catch (error:any) {
      toast.error("Failed to reset password");
    }
  };

  const handleOtpChange = (val: string, idx: number) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    if (!cleanVal) return;
    const newOtp = [...otp];
    newOtp[idx] = cleanVal.substring(cleanVal.length - 1);
    setOtp(newOtp);
    if (idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpSent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordRequest({ email }).unwrap();
      setStep("OTP");
      toast.success("An OTP has been sent to your email address.");
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to send OTP");
    }
  };

  // --- SWITCH CASE UI RENDER ---
  const renderContent = () => {
    switch (step) {
      case "EMAIL":
        return (
          <div className="flex flex-col items-center text-center px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password?</h2>
            <p className="text-sm text-gray-500 max-w-sm mb-10 leading-relaxed">
              No problem. Enter your registered email address and we&apos;ll send you 6 digit verification code to reset your password.
            </p>

            <form onSubmit={handleOtpSent} className="w-full max-w-md space-y-8">
              <div className="relative flex items-center">
                <Mail className="absolute left-5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] transition-all shadow-sm"
                  placeholder="Enter your email"
                  required
                />
                {isEmailValid && (
                  <CheckCircle2 className="absolute right-5 w-5 h-5 text-emerald-500 fill-emerald-500 stroke-white" />
                )}
              </div>

              <button
                type="submit"
                disabled={isForgotPasswordRequestLoading}
                className="w-full sm:w-64 mx-auto bg-[#135576] hover:bg-[#0f445f] text-white font-medium py-3.5 rounded-full shadow-md flex items-center justify-center gap-2"
              >
                {isForgotPasswordRequestLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send OTP"}
              </button>
            </form>

            <button 
              onClick={() => onOpenChange(false)}
              className="mt-8 text-sm font-semibold text-[#8a94a6] hover:text-[#135576] transition-colors"
            >
              Back to log in
            </button>
          </div>
        );

      case "OTP":
        return (
          <div className="flex flex-col items-center text-center px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">OTP Verification</h2>
            <p className="text-sm text-gray-500 max-w-md mt-1 leading-relaxed">
              We have sent a 6-digit verification code to your email address.
              Please enter the code below to complete your registration.
            </p>
            <p className="text-sm text-gray-500 max-w-sm my-4">
             <span className="font-semibold text-gray-800">{email}</span>
            </p>
            <div className="text-red-500 font-bold mb-8">{formatTime(timeLeft)}</div>
            
            <div className="flex gap-3 mb-8">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={el => { if(el) otpRefs.current[i] = el }}
                  type="text"
                  value={d}
                  onChange={e => handleOtpChange(e.target.value, i)}
                  className="w-14 h-14 border border-gray-200 rounded-full text-center text-xl focus:ring-2 focus:ring-[#135576] outline-none transition-all"
                  placeholder="-"
                />
              ))}
            </div>

            <div className="text-sm text-gray-400 mb-8">
              Didn&apos;t get code. <button className="text-[#135576] font-bold">Resend</button>
            </div>

            <button
              onClick={()=> setStep("NEW_PASSWORD")}
              disabled={otp.join("").length < 6}
              className="w-full sm:w-64 bg-[#135576] text-white py-3.5 rounded-full font-medium disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify"}
            </button>
          </div>
        );

      case "NEW_PASSWORD":
        return (
          <div className="flex flex-col items-center text-center px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Reset Your Password</h2>
            <p className="text-sm text-gray-500 mb-10">You are ready to go. Setup your new password.</p>

            <form onSubmit={handlePasswordReset} className="w-full max-w-md space-y-4">
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full pl-14 pr-12 py-3.5 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-[#135576] outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-14 pr-12 py-3.5 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-[#135576] outline-none"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                  {showConfirmPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button type="submit" className="w-full sm:w-64 bg-[#135576] text-white py-3.5 rounded-full font-medium mt-6">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Reset Password"}
              </button>
            </form>
          </div>
        );

      case "SUCCESS":
        return (
          <div className="flex flex-col items-center text-center p-12">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 fill-emerald-500 stroke-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful</h2>
            <p className="text-sm text-gray-500 mb-10">You can now use your new password to access your account.</p>
            <button
              onClick={() => onOpenChange(false)}
              className="bg-[#135576] text-white px-10 py-3 rounded-full font-medium"
            >
              Back to Login
            </button>
          </div>
        );

      case "ERROR":
        return (
          <div className="flex flex-col items-center text-center p-12">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100">
              <XCircle className="w-12 h-12 text-rose-500 fill-rose-500 stroke-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
            <p className="text-sm text-gray-400 mb-10">Verification failed. Please check the code or resend it.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setStep("OTP")}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => setStep("EMAIL")}
                className="bg-[#135576] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Resend
              </button>
            </div>
          </div>
        );
    }
  };

  // Clear any pending timeouts when this component unmounts
  useEffect(() => {
    return () => {
      if (pendingTimeouts.current && pendingTimeouts.current.length) {
        pendingTimeouts.current.forEach((id) => window.clearTimeout(id));
        pendingTimeouts.current = [];
      }
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl! w-[95vw] sm:w-full bg-white rounded-[40px] border-none shadow-2xl p-6 overflow-hidden">
        
        {renderContent()}

        {/* Legal Footer for Step 1 - As per Image */}
        {step === "EMAIL" && (
          <div className="text-center text-[11px] text-gray-400 mt-10 border-t border-gray-50 pt-6">
            By logging in, you agree to our{" "}
            <a href="#" className="underline font-medium hover:text-gray-600">Terms of services</a>
            {" "}and{" "}
            <a href="#" className="underline font-medium hover:text-gray-600">Privacy Policy</a>.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
