"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, CheckCircle2, Scale } from "lucide-react";
import Link from "next/link";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import { useAppDispatch } from "@/store/hooks";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function LoginPage() {
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  // Basic validation state to show the green checkmark from login.png
  const isEmailValid = email.includes("@") && email.includes(".");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await login({ email, password }).unwrap();

      document.cookie = `accessToken=${res.access}; path=/; SameSite=Lax`;

      // Redirect to the originally requested page or dashboard
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      if (res.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace(callbackUrl);
      }
    } catch (err: any) {
      const detail =
        err?.data?.detail ||
        err?.data?.non_field_errors?.[0] ||
        "Invalid email or password. Please try again.";
      setErrorMsg(detail);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Main Container tailored to max-w-6xl and 70vh */}
      <div className="w-full max-w-6xl h-auto lg:h-[70vh] min-h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* Left Side: Form Area */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-white h-full">

          {/* Logo / Brand Header */}
          <div className="flex items-center gap-2 text-[#135576]">
            <div className="p-1.5 border-2 border-[#135576] rounded-full flex items-center justify-center">
              <Scale className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-semibold text-xl tracking-tight">Case Solver</span>
          </div>

          {/* Form Content */}
          <div className="my-auto py-6 max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-500 mb-8">Sign in to your Law Office System</p>

            {errorMsg && (
              <div className="mb-5 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 block">
                  Email address:
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700"
                    required
                  />
                  {isEmailValid && (
                    <CheckCircle2 className="absolute right-4 w-5 h-5 text-emerald-500 fill-emerald-500 stroke-white" />
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 block">
                  Password:
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700 tracking-wider"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-5 h-5 stroke-[1.5]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#135576] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#135576] focus:ring-[#135576]"
                  />
                  Remember
                </label>
                <button
                  onClick={() => setIsForgotPasswordModalOpen(true)}
                  className="text-[#135576] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full sm:w-56 bg-[#135576] hover:bg-[#0f445f] disabled:opacity-60 text-white font-medium py-3 px-6 rounded-full shadow-md transition-all transform active:scale-95 text-center text-sm flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            {/* Registration Prompt */}
            <p className="text-center text-xs text-gray-400 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#135576] font-bold hover:underline">
                Register
              </Link>
            </p>
          </div>

          {/* Footer Agreement */}
          <div className="text-center md:text-left text-[10px] xl:text-xs text-gray-400 mt-auto pt-4">
            By logging in, you agree to our{" "}
            <a href="#terms" className="underline hover:text-gray-600 font-medium">
              Terms of services
            </a>{" "}
            and{" "}
            <a href="#privacy" className="underline hover:text-gray-600 font-medium">
              Privacy Policy
            </a>.
          </div>
        </div>

        {/* Right Side: Visual Hero Card */}
        <div className="hidden lg:block w-1/2 p-3 h-full">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black flex flex-col justify-end p-8 lg:p-12 text-white">

            {/* Background Image Placeholder */}
            <Image
              src="/lawImg1.jpg"
              alt="Gavel background"
              fill
              priority
              className="object-cover opacity-40 select-none pointer-events-none"
            />

            {/* Content overlay matched to login.png */}
            <div className="relative z-10 space-y-4 max-w-md">
              <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold leading-tight tracking-tight">
                Fast. Simple. Built for Lawyers.
              </h2>
              <p className="text-sm lg:text-base text-gray-300 font-light italic leading-relaxed">
                Created by lawyers, for lawyers. Quick case creation, smart calendar,
                powerful AI court practice search, and clean organization — all in one place.
              </p>

              <div className="pt-4 border-t border-white/20">
                <p className="text-base font-semibold tracking-wide">Markovic Aleksa</p>
                <p className="text-xs text-gray-400">Founder of Case Solver</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onOpenChange={setIsForgotPasswordModalOpen}
      />
    </div>
  );
}