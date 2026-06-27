"use client";
import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Check,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
} from "@/store/features/profile/profile.api";
import { useTranslation } from "react-i18next";

export default function Account() {
  const {t} = useTranslation("common");
  const { data: profileInfo, isLoading: isLoadingProfileInfo } =
    useGetProfileInfoQuery({});
  const [updateProfileInfo, { isLoading: isLoadingUpdateProfileInfo }] =
    useUpdateProfileInfoMutation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [professionalRole, setProfessionalRole] = useState("");
  const [barAssociationNumber, setBarAssociationNumber] = useState("");

  // Using a placeholder image similar to the design
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFullName(profileInfo?.full_name || "");
    setEmail(profileInfo?.email || "");
    setPhoneNumber(profileInfo?.number || "");
    setProfessionalRole(profileInfo?.professional_role || "");
    setBarAssociationNumber(profileInfo?.bar_association_number || "");
    setAvatarUrl(
      profileInfo?.profile_image ||
        "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0 ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
  }, [profileInfo]);

  const handleSave = async () => {
    try {
      await updateProfileInfo({
        data: {
          full_name: fullName,
          number: phoneNumber,
          professional_role: professionalRole,
          bar_association_number: barAssociationNumber,
          two_factor_enabled: profileInfo?.two_factor_enabled,
        },
        profile_image: avatarUrl,
      });
      toast.success("Profile information updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile information");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      toast.success("Profile photo updated");
    }
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-[#e8eef2] p-6 rounded-2xl flex flex-col gap-4 w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-7 mb-2">
          {t("account_information")}
        </h2>

        {/* Profile Photo Section */}
        <div className="flex flex-col gap-4 mb-2">
          <label className="text-[#364153] text-sm font-medium">
            {t("profile_photo")}
          </label>
          <div className="flex items-center gap-7">
            <div className="relative w-24 h-24 rounded-full">
              {isLoadingProfileInfo ? (
                <Loader2 className="animate-spin w-24 h-24 text-[#9abed1]" />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <button
                onClick={handleChangePhoto}
                className="absolute bottom-0 right-0 bg-[#135576] w-8 h-8 rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-[#0f435c] transition-colors"
                title="Change Photo"
              >
                <Camera size={16} />
              </button>
            </div>
            <button
              onClick={handleChangePhoto}
              className="border border-[#d1d5dc] h-[42px] px-6 rounded-[10px] text-[#364153] text-base font-medium hover:bg-gray-50 transition-colors"
            >
              {t("change_photo")}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full pb-6 border-b border-[#e8eef2]">
          {/* Row 1: Full Name & Email */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">
                {t("full_name")}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-[50px] bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576]"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">
                {t("email_address")}
              </label>
              <div className="relative w-full h-[50px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 pr-24 text-[#101828] text-base focus:outline-none focus:border-[#135576]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ecfdf5] text-[#007a55] text-xs font-medium px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
                  <Check size={12} strokeWidth={3} />
                  {t("verified")}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Phone Number & Professional Role */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">
                {t("phone_number")}
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-[50px] bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576]"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">
                {t("professional_role")}
              </label>
              <div className="relative w-full h-[50px]">
                <select
                  value={professionalRole}
                  onChange={(e) => setProfessionalRole(e.target.value)}
                  className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576] appearance-none cursor-pointer"
                >
                  <option value="">{t("choose_role")}</option>
                  <option value="lawyer">{t("lawyer")}</option>
                  <option value="attorney">{t("attorney")}</option>
                  <option value="paralegal">{t("paralegal")}</option>
                  <option value="judge">{t("judge")}</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Bar Association Number */}
          <div className="flex w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">
                {t("bar_association_number")}
              </label>
              <input
                type="text"
                value={barAssociationNumber}
                onChange={(e) => setBarAssociationNumber(e.target.value)}
                className="w-full h-[50px] bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576]"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end w-full mt-2">
          <button
            onClick={handleSave}
            disabled={isLoadingUpdateProfileInfo}
            className="bg-[#135576] hover:bg-[#0f435c] text-white text-base font-medium py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingUpdateProfileInfo ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              t("save_changes")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
