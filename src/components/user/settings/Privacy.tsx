"use client";

import { useEffect, useState } from "react";
import { Download, AlertCircle, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import {
  useGetCookiePreferenceQuery,
  useUpdateCookiePreferenceMutation,
  useExportDataFromSettingPageMutation,
} from "@/store/features/setting/setting.api";

import { useDeleteUserAccountMutation } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";
import { logout } from "@/store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import DeleteModal from "@/components/modals/DeleteModal";

export default function Privacy() { 
  const { data: cookiePreferenceData } = useGetCookiePreferenceQuery({});

  const [updateCookiePreference] =
    useUpdateCookiePreferenceMutation();

  const [
    exportDataFromSettingPage,
    { isLoading: isDownloading },
  ] = useExportDataFromSettingPageMutation();

  const [
    deleteUserAccount,
    { isLoading: isUserDeleting },
  ] = useDeleteUserAccountMutation();

  const [analyticsCookies, setAnalyticsCookies] =
    useState(false);

  const [marketingCookies, setMarketingCookies] =
    useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (cookiePreferenceData) {
      setAnalyticsCookies(
        cookiePreferenceData.analytics_cookies
      );

      setMarketingCookies(
        cookiePreferenceData.marketing_cookies
      );
    }
  }, [cookiePreferenceData]);

  const handleDownload = async () => {
    try {
      const blob = await exportDataFromSettingPage().unwrap();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "my-data.zip";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error) {
      console.log(error);
      toast.error("Failed to download data");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserAccount({}).unwrap();
      dispatch(logout());
      toast.success("Account deleted successfully");
      router.replace("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete account");
    }
  };

  const handleUpdateCookiePreference = async (
    analytics: boolean,
    marketing: boolean
  ) => {
    try {
      await updateCookiePreference({
        analytics_cookies: analytics,
        marketing_cookies: marketing,
      }).unwrap();

      toast.success(
        "Cookie preference updated successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to update cookie preference"
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Data Export */}
      <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#101828] text-lg font-semibold leading-[28px]">
            Data Export
          </h2>

          <p className="text-[#4a5565] text-sm leading-[20px]">
            Download all your data including cases,
            documents, and account information.
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 border border-[#d1d5dc] h-[44px] px-4 rounded-[10px] text-[#364153] text-sm font-medium w-fit hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={18} />

          {isDownloading
            ? "Downloading..."
            : "Download My Data as ZIP"}
        </button>
      </div>

      {/* Cookie Preferences */}
      <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl flex flex-col gap-6">
        <h2 className="text-[#101828] text-lg font-semibold leading-[28px]">
          Cookie Preferences
        </h2>

        <div className="flex flex-col gap-6">
          {/* Essential Cookies */}
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#101828] text-base font-medium">
                Essential Cookies
              </span>

              <span className="text-[#4a5565] text-sm">
                Required for the platform to function
              </span>
            </div>

            <span className="text-[#667085] text-sm">
              Always On
            </span>
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#101828] text-base font-medium">
                Analytics Cookies
              </span>

              <span className="text-[#4a5565] text-sm">
                Help us improve our service
              </span>
            </div>

            <Switch
              checked={analyticsCookies}
              onCheckedChange={async (checked) => {
                setAnalyticsCookies(checked);

                await handleUpdateCookiePreference(
                  checked,
                  marketingCookies
                );
              }}
              className="data-[state=checked]:bg-[#135576]"
            />
          </div>

          {/* Marketing Cookies */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[#101828] text-base font-medium">
                Marketing Cookies
              </span>

              <span className="text-[#4a5565] text-sm">
                Used for targeted advertising
              </span>
            </div>

            <Switch
              checked={marketingCookies}
              onCheckedChange={async (checked) => {
                setMarketingCookies(checked);

                await handleUpdateCookiePreference(
                  analyticsCookies,
                  checked
                );
              }}
              className="data-[state=checked]:bg-[#135576]"
            />
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white border border-[#fda29b] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle
              className="text-[#d92d20]"
              size={20}
            />

            <h2 className="text-[#101828] text-lg font-semibold">
              Delete Account
            </h2>
          </div>

          <p className="text-[#4a5565] text-sm ml-7 mt-[-4px]">
            Permanently delete your account and all
            associated data. This action cannot be
            undone.
          </p>
        </div>

        <button
          onClick={()=> setDeleteModalOpen(true)}
          className="flex items-center gap-2 bg-[#e7000b] hover:bg-[#c2000a] text-white h-[44px] px-5 rounded-[10px] text-sm font-medium w-fit ml-7 mt-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        loading={isUserDeleting}
        title="Delete Account"
        description="Are you sure you want to delete your account?"
      />
    </div>
  );
}