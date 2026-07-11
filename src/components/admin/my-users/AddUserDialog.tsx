"use client";

import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Camera, X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import AdminButton from "@/components/shared/AdminButton";
import { useTranslation } from "react-i18next";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    role: string;
  }) => void;
}

export default function AddUserDialog({
  isOpen,
  onOpenChange,
  onAddUser,
}: AddUserDialogProps) {
  const { t } = useTranslation("adminMyUsers");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("/dummy-user.jpg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Lawyer");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and email are required!");
      return;
    }
    
    onAddUser({
      name,
      email,
      phone,
      avatar: photoPreview,
      role,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className="sm:max-w-[640px] md:max-w-[700px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden"
      >
        {/* Custom close button at top right */}
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        {/* Dialog Title */}
        <DialogTitle className="text-[24px] font-bold text-center text-[#101828] font-roboto mt-2 mb-6">
          {t("add_user")}
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* Card Frame containing form elements */}
          <div className="flex flex-col items-start gap-4 self-stretch p-6 rounded-[16px] border border-[#E8EEF2] bg-white w-full">
            
            <h3 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[28px] self-stretch">
              {t("account_information")}
            </h3>

            {/* Profile Photo Upload Row */}
            <div className="space-y-2 w-full flex flex-col items-start">
              <span className="block text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                {t("profile_photo")}
              </span>
              <div className="flex items-center gap-4">
                {/* Avatar wrapper */}
                <div className="relative w-20 h-20 rounded-full bg-slate-100 border border-[#BEC4D2]/30 flex-shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={photoPreview}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Camera badge at bottom-right of avatar circle */}
                  <div 
                    onClick={triggerFileSelect}
                    className="absolute bottom-0 right-0 bg-[#0F5A7F] text-white w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:bg-[#0c4968] transition-all flex items-center justify-center shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Change photo button */}
                <button
                  type="button"
                  onClick={triggerFileSelect}
                  style={{ padding: "7px 17.938px 11px 18px" }}
                  className="flex justify-center items-center rounded-[10px] border border-[#D1D5DC] bg-white text-[#364153] font-roboto text-[14px] font-medium leading-[20px] hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {t("change_photo")}
                </button>

                {/* Hidden input for image picker */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
              <label className="block text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                {t("full_name")}<span className="text-[#EF4444] font-roboto text-[14px] font-medium leading-[20px] ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Wade Warren"
                className="w-full rounded-[10px] border border-[#D1D5DC] bg-white px-4 py-3 text-[#101828] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#0F5A7F] focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                <label className="block text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                  {t("email_address")}<span className="text-[#EF4444] font-roboto text-[14px] font-medium leading-[20px] ml-0.5">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. wade.warren@email.com"
                  className="w-full rounded-[10px] border border-[#D1D5DC] bg-white px-4 py-3 text-[#101828] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#0F5A7F] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                <label className="block text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                  {t("phone_number")}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +386 852 9631"
                  className="w-full rounded-[10px] border border-[#D1D5DC] bg-white px-4 py-3 text-[#101828] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#0F5A7F] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                <label className="block text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                  {t("role")}<span className="text-[#EF4444] font-roboto text-[14px] font-medium leading-[20px] ml-0.5">*</span>
                </label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full h-[48px] rounded-[10px] border border-[#D1D5DC] bg-white px-4 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#0F5A7F] focus:border-transparent transition-all">
                    <SelectValue placeholder="Role" />
                    <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#101828] font-roboto min-w-[var(--radix-select-trigger-width)]">
                    <SelectItem value="Lawyer" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("lawyer") || "Lawyer"}</SelectItem>
                    <SelectItem value="Attorney" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("attorney") || "Attorney"}</SelectItem>
                    <SelectItem value="Paralegal" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("paralegal") || "Paralegal"}</SelectItem>
                    <SelectItem value="Judge" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("judge") || "Judge"}</SelectItem>
                    <SelectItem value="Mediator" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("mediator") || "Mediator"}</SelectItem>
                    <SelectItem value="Court Staff" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("court_staff") || "Court Staff"}</SelectItem>
                    <SelectItem value="Legal Researcher" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("legal_researcher") || "Legal Researcher"}</SelectItem>
                    <SelectItem value="Corporate Counsel" className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]">{t("corporate_counsel") || "Corporate Counsel"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                <label className="block text-[#364153] font-roboto text-[14px] font-medium leading-[20px]">
                  {t("required_password")}<span className="text-[#EF4444] font-roboto text-[14px] font-medium leading-[20px] ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. HeLl0@&*(963852741)Hi"
                  className="w-full h-[48px] rounded-[10px] border border-[#D1D5DC] bg-white px-4 py-3 text-[#101828] font-roboto text-[16px] font-normal leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#0F5A7F] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

          </div>

          {/* Form Actions (Add User Button) */}
          <div className="flex justify-end pt-2">
            <AdminButton
              type="submit"
              label={t("add_user")}
              className="px-6 md:px-8 py-3"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
