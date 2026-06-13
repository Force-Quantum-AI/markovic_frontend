"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, Scale } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import OtpVerificationModal from "@/components/modals/OtpVerificationModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import { useRegisterUserMutation } from "@/store/features/auth/authApi";

export default function RegisterPage() {
  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal State Management
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // api 
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  // Validation feedback matching the green check icon on the image
  const isEmailValid = email.includes("@") && email.includes(".");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Dummy backend API payload
    const dummyRegisterPayload = {
      full_name: fullName,
      email,
      number: phone,
      password,
      confirm_password: confirmPassword,
    };

    try {
      await registerUser(dummyRegisterPayload).unwrap();

      console.log("is success is : ", isSuccess);


      // if (isSuccess) {
        toast.success("user registered successfully");
        setIsOtpModalOpen(true)
      // } else {
      //   toast.error("user registration failed");
      // }
    } catch (error) {
      console.log("error is : ", error);
      toast.error("user registration failed, Please try again later.");
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Container: constrained to max-w-6xl and 70vh */}
      <div className="w-full max-w-6xl h-auto md:h-[70vh] min-h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side: Form Controls */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-white h-full">

          {/* Header Brand */}
          <div className="flex items-center gap-2 text-[#135576]">
            <div className="p-1.5 border-2 border-[#135576] rounded-full flex items-center justify-center">
              <Scale className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-semibold text-xl tracking-tight">Case Solver</span>
          </div>

          {/* Form Content */}
          <div className="my-auto py-4 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Create Your Account</h1>
            <p className="text-sm text-gray-400 mb-6">Get started with your law office management system</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name Input (Full Width row) */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#8a94a6] block">
                  Full Name:
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone Rows (Two Column Split) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8a94a6] block">
                    Email address:
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700"
                      required
                    />
                    {isEmailValid && (
                      <CheckCircle2 className="absolute right-4 w-5 h-5 text-emerald-500 fill-emerald-500 stroke-white" />
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8a94a6] block">
                    Phone Number:
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(225) 555-0118"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700 placeholder-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password Rows (Two Column Split) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8a94a6] block">
                    Password:
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700 tracking-wider"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 stroke-[1.5]" /> : <Eye className="w-5 h-5 stroke-[1.5]" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8a94a6] block">
                    Confirm Password:
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700 tracking-wider"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5 stroke-[1.5]" /> : <Eye className="w-5 h-5 stroke-[1.5]" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-56 bg-[#135576] hover:bg-[#0f445f] text-white font-medium py-3 px-6 rounded-full shadow-md transition-all transform active:scale-95 text-center text-sm"
                >
                  Register
                </button>
              </div>
            </form>

            {/* Redirection link back to login page */}
            <p className="text-center text-xs text-gray-400 mt-6">
              I have an account?{" "}
              <Link href="/login" className="text-[#135576] font-bold hover:underline ml-1">
                Log in
              </Link>
            </p>
          </div>

          {/* Legal Footer Context */}
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

        {/* Right Side: Visual Banner Component */}
        <div className="hidden md:block w-1/2 md:w-5/12 lg:w-1/2 p-3 h-full">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#181d20] flex flex-col justify-end p-8 lg:p-12 text-white">

            {/* Background Image Setup mimicking Lady Justice theme */}
            <Image
              src="/lawImg4.png"
              alt="Lady Justice statue banner"
              fill
              priority
              className="object-cover opacity-35 mix-blend-luminosity select-none pointer-events-none"
            />

            {/* Dark gradient overlay to preserve readable text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Card Content Overlay matching original specs */}
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
      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        onOpenChange={setIsOtpModalOpen}
        userEmail={email}
      />
      
    </div>
  );
}