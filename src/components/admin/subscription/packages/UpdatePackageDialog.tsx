/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Info, ChevronDown } from "lucide-react";
import { PackageProps } from "./PackageCard";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/store/features/admin/subscriptions/subscriptions.api";
import { useTranslation } from "react-i18next";

interface UpdatePackageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PackageProps | null;
}

interface SubscriptionFormValues {
  name: string;
  devices: string;
  price: string;
  session: "Monthly" | "Yearly";
  quote: string;
  recommended: boolean;
  enabled: boolean;
}

export default function UpdatePackageDialog({
  isOpen,
  onOpenChange,
  plan,
}: UpdatePackageDialogProps) {
  const { t } = useTranslation("adminSubscriptionPackages");
  const {
    data: subscriptionDetails,
    isLoading,
    isError,
  } = useGetSingleSubscriptionQuery(
    { id: plan?.id || "" },
    { skip: !isOpen || !plan?.id }
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[650px] md:max-w-[720px] lg:max-w-[780px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col focus:outline-none font-roboto"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-colors duration-200 cursor-pointer z-50 group">
            <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
          </button>
        </DialogClose>

        <DialogTitle className="text-[28px] font-bold text-center text-[#101828] font-roboto mt-2 mb-6 shrink-0">
          {t("update_subscription")}
        </DialogTitle>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-roboto flex-1">
            <div className="w-8 h-8 border-4 border-[#135576] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">{t("loading_subscription_details")}</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500 font-roboto flex-1">
            <p className="text-sm font-medium">{t("failed_load_details")}</p>
          </div>
        ) : subscriptionDetails ? (
          <UpdatePackageForm
            key={JSON.stringify(subscriptionDetails)}
            subscriptionDetails={subscriptionDetails}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface UpdatePackageFormProps {
  subscriptionDetails: any;
  onOpenChange: (open: boolean) => void;
}

function UpdatePackageForm({ subscriptionDetails, onOpenChange }: UpdatePackageFormProps) {
  const { t } = useTranslation("adminSubscriptionPackages");
  const [updateSubscription, { isLoading: isUpdating }] = useUpdateSubscriptionMutation();

  const defaultValues: SubscriptionFormValues = {
    name: subscriptionDetails.name || "",
    devices: String(subscriptionDetails.devices) || "",
    price: subscriptionDetails.price ? `$ ${subscriptionDetails.price}` : "",
    session: subscriptionDetails.session === "monthly" ? "Monthly" : "Yearly",
    quote: subscriptionDetails.quote || "",
    recommended: !!subscriptionDetails.recommended,
    enabled: !!subscriptionDetails.is_visible,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({
    defaultValues,
  });

  const [features] = useState<string[]>(() => {
    const list: string[] = [];
    if (subscriptionDetails.features?.unlimited_cases) {
      list.push("Unlimited cases");
    }
    if (subscriptionDetails.features?.client_calendar_hearing_deadline) {
      list.push("Clients, Calendar, Hearing & Deadlines");
    }
    if (subscriptionDetails.features?.documents_management) {
      list.push("Documents Managements");
    }
    if (subscriptionDetails.features?.laws_bylaws_module) {
      list.push("Laws & Bylaws Module");
    }
    if (subscriptionDetails.features?.ai_court_practice_search) {
      list.push("AI Court Practice Search.");
    }
    if (subscriptionDetails.features?.global_search_archive) {
      list.push("Global Search & Archive.");
    }
    return list;
  });

  // const [newFeatureText, setNewFeatureText] = useState("");

  // const handleDeleteFeature = (featureToDelete: string) => {
  //   setFeatures((prev) => prev.filter((f) => f !== featureToDelete));
  // };

  // const handleAddFeature = () => {
  //   if (!newFeatureText.trim()) return;
  //   if (features.includes(newFeatureText.trim())) {
  //     toast.error("Feature already exists!");
  //     return;
  //   }
  //   setFeatures((prev) => [...prev, newFeatureText.trim()]);
  //   setNewFeatureText("");
  // };

  const onSubmit = async (data: SubscriptionFormValues) => {
    const cleanPriceStr = data.price.replace(/[$€s\s]/g, "");
    const toastId = toast.loading(`Updating package "${data.name}"...`);
    try {
      await updateSubscription({
        id: subscriptionDetails.id,
        data: {
          name: data.name,
          devices: parseInt(data.devices) || subscriptionDetails.devices,
          session: data.session === "Monthly" ? "monthly" : "yearly",
          price: cleanPriceStr || subscriptionDetails.price,
          quote: data.quote || null,
          recommended: data.recommended,
          label: subscriptionDetails.label,
          is_visible: data.enabled,
          features: {
            unlimited_cases: features.some((f) =>
              f.toLowerCase().includes("unlimited case")
            ),
            client_calendar_hearing_deadline: features.some(
              (f) =>
                f.toLowerCase().includes("client") ||
                f.toLowerCase().includes("calendar") ||
                f.toLowerCase().includes("hearing") ||
                f.toLowerCase().includes("deadline")
            ),
            documents_management: features.some((f) =>
              f.toLowerCase().includes("document")
            ),
            laws_bylaws_module: features.some(
              (f) =>
                f.toLowerCase().includes("laws") ||
                f.toLowerCase().includes("bylaws")
            ),
            ai_court_practice_search: features.some(
              (f) =>
                f.toLowerCase().includes("ai") ||
                f.toLowerCase().includes("court") ||
                f.toLowerCase().includes("practice")
            ),
            global_search_archive: features.some(
              (f) =>
                f.toLowerCase().includes("global") ||
                f.toLowerCase().includes("archive")
            ),
          },
        },
      }).unwrap();

      toast.success(`Package "${data.name}" updated successfully!`, { id: toastId });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update package. Please try again.", { id: toastId });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full font-roboto overflow-y-auto pr-2 flex-1 custom-scrollbar px-1"
    >
      <div className="space-y-1.5 w-full flex flex-col items-start">
        <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
          {t("name_of_package")} <span className="text-[#EF4444]">*</span>
        </label>
        <input
          type="text"
          {...register("name", { required: t("package_name_required") || "Package name is required!" })}
          placeholder={t("package_name_placeholder") || "Type the package name here..."}
          className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
        />
        {errors.name && (
          <span className="text-[#EF4444] text-[12px] pl-2">{errors.name.message}</span>
        )}
        <div className="flex items-center gap-1.5 text-[#3B82F6] cursor-pointer hover:underline text-[13px] font-semibold mt-1">
          <Info className="w-4 h-4 text-[#3B82F6]" />
          <span>{t("name_your_package")}</span>
        </div>
      </div>

      {/* Devices and Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <div className="space-y-1.5 w-full flex flex-col items-start">
          <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
            {t("devices_count_label") || "Devices:"}
          </label>
          <input
            type="text"
            {...register("devices", { required: t("devices_count_required") || "Devices count is required!" })}
            className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
          />
          {errors.devices && (
            <span className="text-[#EF4444] text-[12px] pl-2">{errors.devices.message}</span>
          )}
        </div>
        <div className="space-y-1.5 w-full flex flex-col items-start">
          <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
            {t("price_label") || "Price:"}
          </label>
          <input
            type="text"
            {...register("price", { required: t("price_required") || "Price is required!" })}
            className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
          />
          {errors.price && (
            <span className="text-[#EF4444] text-[12px] pl-2">{errors.price.message}</span>
          )}
        </div>
      </div>

      {/* Session */}
      <div className="space-y-1.5 w-full flex flex-col items-start">
        <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
          {t("session_label") || "Session:"}
        </label>
        <Controller
          name="session"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full h-12 rounded-full border border-[#D1D5DC] bg-white px-5 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all cursor-pointer">
                <SelectValue placeholder={t("session_placeholder") || "Session"} />
                <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-gray-500" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={4}
                className="z-[9999] bg-white border border-[#D1D5DC] rounded-2xl shadow-lg p-1 text-[#101828] font-roboto min-w-[var(--radix-select-trigger-width)]"
              >
                <SelectItem
                  value="Monthly"
                  className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
                >
                  {t("monthly")}
                </SelectItem>
                <SelectItem
                  value="Yearly"
                  className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
                >
                  {t("yearly")}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Quote */}
      <div className="space-y-1.5 w-full flex flex-col items-start">
        <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
          {t("quote_label") || "Quote:"}
        </label>
        <input
          type="text"
          {...register("quote")}
          className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
        />
      </div>

      {/* Recommended Switch */}
      <Controller
        name="recommended"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between w-full p-4 rounded-2xl border border-[#E5E7EB] bg-white">
            <div className="flex flex-col gap-0.5 items-start">
              <span className="text-[#101828] font-roboto text-[16px] font-semibold leading-[24px]">
                {t("recommended")}
              </span>
              <span className="text-[#6A7282] font-roboto text-[13px] font-medium leading-[18px]">
                {t("recommended_desc")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                field.value ? "bg-[#135576]" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  field.value ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        )}
      />

      {/* Divider */}
      {/* <div className="border-t border-[#E5E7EB] my-6" /> */}

      {/* Features List */}
      {/* <div className="space-y-3 w-full pt-2 flex flex-col items-start">
        <span className="block text-[#475467] font-roboto text-[14px] font-bold pl-1">
          {t("all_features_included")}
        </span>
        <div className="w-full space-y-2">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center justify-between w-full bg-white py-3.5 px-5 rounded-2xl border border-[#D1D5DC] text-[16px] text-[#101828] font-normal font-roboto transition-all"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => handleDeleteFeature(feature)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors cursor-pointer"
              >
                <MinusCircle className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder={t("add_more_features_placeholder") || "Add more features..."}
          value={newFeatureText}
          onChange={(e) => setNewFeatureText(e.target.value)}
          className="w-full rounded-full border border-[#D1D5DC] bg-[#F1F5F9] px-5 py-3 h-12 text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all mt-3"
        />
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-2.5 flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#135576] rounded-full border border-[#D5DFE9] text-[15px] font-semibold cursor-pointer transition-all focus:outline-none active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t("add_new_features")}</span>
        </button>
      </div> */}

      {/* Enabled Switch */}
      <Controller
        name="enabled"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between w-full p-4 rounded-2xl border border-[#E5E7EB] bg-white">
            <span className="text-[#101828] font-roboto text-[16px] font-semibold leading-[24px]">
              {t("enabled")}
            </span>
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                field.value ? "bg-[#135576]" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  field.value ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        )}
      />

      {/* Action button centered */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="bg-[#135576] hover:bg-[#135576]/90 text-white rounded-full px-12 py-3.5 text-base font-semibold transition-all cursor-pointer focus:outline-none active:scale-95 shadow-md disabled:opacity-50"
          disabled={isUpdating}
        >
          {isUpdating ? t("updating") : t("update_subscription")}
        </button>
      </div>
    </form>
  );
}
