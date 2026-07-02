"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputField } from "@/components/shared/InputField";
import { useUpdateClientProfileInfoMutation } from "@/store/features/case/case.api";
import { updateClientProfileInfoType, UserData } from "@/types/case.types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface PersonalDetailsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: UserData;
  caseId: string;
}

export default function EditPersonalModal({
  open,
  setOpen,
  caseId,
  data,
}: PersonalDetailsModalProps) {
  const { t } = useTranslation("modals");
  const [updateClientProfileInfo, { isLoading }] = useUpdateClientProfileInfoMutation()

  const [formData, setFormData] = useState<UserData>({
    avatarUrl: "",
    name: "",
    email: "",
    phone: "",
    personalId: "",
    address: "",
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange =
    (field: keyof UserData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,

      avatarUrl: preview,

      avatarFile: file,
    }));
  };

  const handleUpdate = async () => {

    const updatedData: updateClientProfileInfoType = {

      client_image: formData.avatarFile || null,

      data: {
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        client_address: formData.address,
      },
    };
    try {
      await updateClientProfileInfo({
        caseId,
        data: updatedData,
      }).unwrap();
      toast.success(t("editPersonal.updateSuccess"));
      setOpen(false);
    } catch (error) {
      toast.error(t("editPersonal.updateFailed"))
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-3xl!
          rounded-[32px]
          border-none
          p-0
          overflow-hidden
        "
        showCloseButton={false}
      >
        <DialogTitle className="hidden">
          {t("editPersonal.title")}
        </DialogTitle>

        <div className="relative bg-white px-6 py-8 md:px-8 md:py-10">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6"
          >
            <X className="h-5 w-5 text-[#343A40]" />
          </button>

          {/* Heading */}
          <h2 className="text-center text-[24px] font-semibold text-[#111827]">
            {t("editPersonal.title")}
          </h2>

          {/* Content */}
          <div className="mt-10">
            <h3 className="mb-6 text-[16px] font-semibold text-[#111827]">
              {t("editPersonal.basicInfo")}
            </h3>

            {/* Avatar Upload */}
            <div className="mb-8 flex items-center gap-7">
              <div className="relative">
                <div
                  className="
                    h-24
                    w-24
                    overflow-hidden
                    rounded-full
                    border
                    border-dashed
                    border-[#9CAFC3]
                    bg-[#F8FAFC]
                  "
                >
                  {formData.avatarUrl ? (
                    <Image
                      src={formData.avatarUrl}
                      alt="profile"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <label
                  htmlFor="profile-upload"
                  className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    h-8
                    w-8
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    bg-[#135576]
                    text-white
                  "
                >
                  <Camera size={16} />
                </label>

                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <label
                htmlFor="profile-upload"
                className="
                  flex
                  h-11
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#D0D5DD]
                  px-8
                  text-[16px]
                  font-medium
                  text-[#344054]
                "
              >
                {t("editPersonal.addPhoto")}
              </label>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <InputField
                label={t("editPersonal.clientName")}
                placeholder={t("editPersonal.clientNamePlaceholder")}
                value={formData.name}
                onChange={handleInputChange("name")}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label={t("editPersonal.emailAddress")}
                  placeholder={t("editPersonal.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleInputChange("email")}
                />

                <InputField
                  label={t("editPersonal.phoneNumber")}
                  placeholder={t("editPersonal.phonePlaceholder")}
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                />
              </div>

              <InputField
                label={t("editPersonal.personalId")}
                placeholder={t("editPersonal.personalIdPlaceholder")}
                value={formData.personalId}
                onChange={handleInputChange("personalId")}
              />

              <InputField
                label={t("editPersonal.address")}
                placeholder={t("editPersonal.addressPlaceholder")}
                value={formData.address}
                onChange={handleInputChange("address")}
              />
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="
                  rounded-full
                  bg-[#135576]
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-[#0f4762]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isLoading ? t("editPersonal.updatingButton") : t("editPersonal.updateButton")}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}