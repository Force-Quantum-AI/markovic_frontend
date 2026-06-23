"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Info, ChevronDown, MinusCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateSubscriptionMutation } from "@/store/features/admin/subscriptions/subscriptions.api";

interface AddSubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

export default function AddSubscriptionDialog({
  isOpen,
  onOpenChange,
}: AddSubscriptionDialogProps) {
  const [createSubscription, { isLoading: isCreating }] =
    useCreateSubscriptionMutation();

  const defaultValues: SubscriptionFormValues = {
    name: "",
    devices: "",
    price: "",
    session: "Monthly",
    quote: "",
    recommended: true,
    enabled: true,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({
    defaultValues,
  });

  // Initialize with the 4 default features shown in the Add Subscription screenshot
  const [features, setFeatures] = useState<string[]>([
    "Unlimited cases",
    "Clients, Calendar, Hearing & Deadlines",
    "Documents Managements",
    "Laws & Bylaws",
  ]);

  const [newFeatureText, setNewFeatureText] = useState("");

  const handleDeleteFeature = (featureToDelete: string) => {
    setFeatures((prev) => prev.filter((f) => f !== featureToDelete));
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    if (features.includes(newFeatureText.trim())) {
      toast.error("Feature already exists!");
      return;
    }
    setFeatures((prev) => [...prev, newFeatureText.trim()]);
    setNewFeatureText("");
  };

  const onSubmit = async (data: SubscriptionFormValues) => {
    const cleanPriceStr = data.price.replace(/[$€s\s]/g, "");

    const toastId = toast.loading(`Adding package "${data.name}"...`);
    try {
      await createSubscription({
        name: data.name,
        devices: parseInt(data.devices) || 1,
        session: data.session === "Monthly" ? "monthly" : "yearly",
        price: cleanPriceStr || "0",
        quote: data.quote || null,
        recommended: data.recommended,
        label: null,
        is_visible: data.enabled,
        features: {
          unlimited_cases: features.some((f) =>
            f.toLowerCase().includes("unlimited case"),
          ),
          client_calendar_hearing_deadline: features.some(
            (f) =>
              f.toLowerCase().includes("client") ||
              f.toLowerCase().includes("calendar") ||
              f.toLowerCase().includes("hearing") ||
              f.toLowerCase().includes("deadline"),
          ),
          documents_management: features.some((f) =>
            f.toLowerCase().includes("document"),
          ),
          laws_bylaws_module: features.some(
            (f) =>
              f.toLowerCase().includes("laws") ||
              f.toLowerCase().includes("bylaws"),
          ),
          ai_court_practice_search: features.some(
            (f) =>
              f.toLowerCase().includes("ai") ||
              f.toLowerCase().includes("court") ||
              f.toLowerCase().includes("practice"),
          ),
          global_search_archive: features.some(
            (f) =>
              f.toLowerCase().includes("global") ||
              f.toLowerCase().includes("archive"),
          ),
        },
      }).unwrap();

      toast.success(`Package "${data.name}" added successfully!`, {
        id: toastId,
      });
      // Reset form fields
      reset(defaultValues);
      setFeatures([
        "Unlimited cases",
        "Clients, Calendar, Hearing & Deadlines",
        "Documents Managements",
        "Laws & Bylaws",
      ]);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add package. Please try again.", { id: toastId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[650px] md:max-w-[720px] lg:max-w-[780px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col focus:outline-none font-roboto"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <DialogTitle className="text-[28px] font-bold text-center text-[#101828] font-roboto mt-2 mb-6 shrink-0">
          Add Subscription
        </DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full font-roboto overflow-y-auto px-1 flex-1 custom-scrollbar"
        >
          {/* Name of Package */}
          <div className="space-y-1.5 w-full flex flex-col items-start">
            <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
              Name of the package: <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Package name is required!" })}
              placeholder="Type the package name here..."
              className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
            />
            {errors.name && (
              <span className="text-[#EF4444] text-[12px] pl-2">
                {errors.name.message}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-[#3B82F6] cursor-pointer hover:underline text-[13px] font-semibold mt-1">
              <Info className="w-4 h-4 text-[#3B82F6]" />
              <span>Name your pacjage</span>
            </div>
          </div>

          {/* Devices & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="space-y-1.5 w-full flex flex-col items-start">
              <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
                Devices:
              </label>
              <input
                type="text"
                {...register("devices", {
                  required: "Devices count is required!",
                })}
                placeholder="Enter device limit"
                className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
              />
              {errors.devices && (
                <span className="text-[#EF4444] text-[12px] pl-2">
                  {errors.devices.message}
                </span>
              )}
            </div>
            <div className="space-y-1.5 w-full flex flex-col items-start">
              <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
                Price:
              </label>
              <input
                type="text"
                {...register("price", { required: "Price is required!" })}
                placeholder="Enter price"
                className="w-full rounded-full border border-[#D1D5DC] bg-white px-5 py-3 h-12 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all"
              />
              {errors.price && (
                <span className="text-[#EF4444] text-[12px] pl-2">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          {/* Session Selector */}
          <div className="space-y-1.5 w-full flex flex-col items-start">
            <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
              Session:
            </label>
            <Controller
              name="session"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-12 rounded-full border border-[#D1D5DC] bg-white px-5 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576] focus:border-transparent transition-all cursor-pointer">
                    <SelectValue placeholder="Session" />
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
                      Monthly
                    </SelectItem>
                    <SelectItem
                      value="Yearly"
                      className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
                    >
                      Yearly
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Quote Input */}
          <div className="space-y-1.5 w-full flex flex-col items-start">
            <label className="block text-[#364153] font-roboto text-[14px] font-semibold">
              Quote:
            </label>
            <input
              type="text"
              {...register("quote")}
              placeholder="Perfect for solo lawyers or very small offices"
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
                    Recommended
                  </span>
                  <span className="text-[#6A7282] font-roboto text-[13px] font-medium leading-[18px]">
                    Add a level for your subscription package.
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

          <div className="border-t border-[#E5E7EB] my-6" />

          {/* Dynamic Features List */}
          <div className="space-y-3 w-full pt-2 flex flex-col items-start">
            <span className="block text-[#475467] font-roboto text-[14px] font-bold pl-1">
              All Features:
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

            {/* Add feature input */}
            <input
              type="text"
              placeholder="Add more features..."
              value={newFeatureText}
              onChange={(e) => setNewFeatureText(e.target.value)}
              className="w-full rounded-full border border-[#D1D5DC] bg-[#F1F5F9] px-5 py-3 h-12 text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all mt-3"
            />

            {/* Add feature button */}
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-2.5 flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#135576] rounded-full border border-[#D5DFE9] text-[15px] font-semibold cursor-pointer transition-all focus:outline-none active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New features</span>
            </button>
          </div>

          {/* Enabled Switch */}
          <Controller
            name="enabled"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between w-full p-4 rounded-2xl border border-[#E5E7EB] bg-white">
                <span className="text-[#101828] font-roboto text-[16px] font-semibold leading-[24px]">
                  Enabled
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
              disabled={isCreating}
            >
              {isCreating ? "Adding..." : "Add Subscription"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
