"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, Scale, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import OtpVerificationModal from "@/components/modals/OtpVerificationModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import { useRegisterUserMutation } from "@/store/features/auth/authApi";
import AdminButton from "@/components/shared/AdminButton";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation("auth");

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
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

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
      toast.success("An OTP has been sent to your email address.");
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
      <div className="w-full max-w-6xl h-auto md:h-[70vh] min-h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row hover:translate-y-1 transition-all duration-300">

        {/* Left Side: Form Controls */}
        <div className="w-full md:w-7/12 lg:w-7/12 p-8 lg:p-12 flex flex-col justify-between bg-white h-full">

          {/* Header Brand */}
          <div className="relative">
            <Image
              src="/brandLogo.png"
              alt="logo"
              width={148}
              height={42}
            />
          </div>

          {/* Form Content */}
          <div className="my-auto py-4 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{t("create_account")}</h1>
            <p className="text-sm text-gray-400 mb-6">{t("get_started_sub")}</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name Input (Full Width row) */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#8a94a6] block">
                  {t("full_name_label")}
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("full_name_placeholder")}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone Rows (Two Column Split) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8a94a6] block">
                    {t("email_label")}
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("email_placeholder")}
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
                    {t("phone_label")}
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
                    {t("password_label")}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("password_placeholder_short")}
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
                    {t("confirm_password_label")}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t("confirm_password_placeholder")}
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
                <AdminButton
                  type="submit"
                  disabled={isLoading}
                  label={isLoading ? t("registering") : t("register_cta")}
                  icon={
                    isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : undefined
                  }
                  className="w-full sm:w-56"
                />
              </div>
            </form>

            {/* Redirection link back to login page */}
            <p className="text-center text-xs text-gray-400 mt-6">
              {t("already_have_account")}{" "}
              <Link href="/login" className="text-[#135576] font-bold hover:underline ml-1">
                {t("log_in")}
              </Link>
            </p>
          </div>

          {/* Legal Footer Context */}
          <div className="text-center md:text-left text-[10px] xl:text-xs text-gray-400 mt-auto pt-4">
            {t("by_logging_in")}{" "}
            <a href="#terms" className="underline hover:text-gray-600 font-medium">
              {t("terms_of_services")}
            </a>{" "}
            {t("and")}{" "}
            <a href="#privacy" className="underline hover:text-gray-600 font-medium">
              {t("privacy_policy")}
            </a>.
          </div>
        </div>

        {/* Right Side: Visual Banner Component */}
        <div className="hidden md:block w-1/2 md:w-5/12 lg:w-5/12 p-3 h-full group">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#181d20] flex flex-col justify-end p-8 lg:p-12 text-white">

            {/* Background Image Setup mimicking Lady Justice theme */}
            <Image
              src="/lawImg4.png"
              alt="Lady Justice statue banner"
              fill
              priority
              className="object-cover opacity-35 mix-blend-luminosity select-none pointer-events-none group-hover:scale-105 transition-all duration-500"
            />

            {/* Dark gradient overlay to preserve readable text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Card Content Overlay matching original specs */}
            <div className="relative z-10 space-y-4 max-w-md">
              <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold leading-tight tracking-tight">
                {t("hero_title")}
              </h2>
              <p className="text-sm lg:text-base text-gray-300 font-light italic leading-relaxed">
                {t("hero_description")}
              </p>

              <div className="pt-4 border-t border-white/20">
                <p className="text-base font-semibold tracking-wide">Markovic Aleksa</p>
                <p className="text-xs text-gray-400">{t("hero_founder_title")}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        onOpenChange={setIsOtpModalOpen}
        userEmail={email}
        userPassword={password}
        onVerificationSuccess={() => setIsSubscriptionModalOpen(true)}
      />

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
        />
      )}
    </div>
  );
}