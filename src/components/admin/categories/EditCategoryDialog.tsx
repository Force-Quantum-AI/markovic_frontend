"use client";

import { X, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import AdminButton from "@/components/shared/AdminButton";

interface EditCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName?: string;
  onSubmit: (name: string) => Promise<boolean>;
  isSubmitting?: boolean;
}

type CategoryFormData = {
  name: string;
};

import { useTranslation } from "react-i18next";

export default function EditCategoryDialog({
  isOpen,
  onOpenChange,
  defaultName = "",
  onSubmit,
  isSubmitting = false,
}: EditCategoryDialogProps) {
  const { t } = useTranslation("adminCategories");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    values: {
      name: defaultName,
    },
  });

  const handleUpdateCategory = async (data: CategoryFormData) => {
    const name = data.name.trim();

    const success = await onSubmit(name);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[560px] w-full bg-white rounded-3xl p-8 border-none shadow-2xl"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <DialogTitle className="text-[#101828] font-roboto text-[24px] font-bold text-center mb-6">
          {t("edit_category_title")}
        </DialogTitle>

        <form onSubmit={handleSubmit(handleUpdateCategory)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
              {t("category_name")}
            </label>
            <input
              type="text"
              placeholder={t("category_name_placeholder") || "Category name..."}
              {...register("name", {
                required: t("category_name_required") || "Category name is required.",
                validate: (value) =>
                  value.trim() ? true : t("category_name_required") || "Category name is required.",
              })}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.name)}
              className="w-full px-5 py-3 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
            {errors.name && (
              <p className="text-[12px] font-roboto text-red-500 pl-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Info className="w-4 h-4 text-[#135576] flex-shrink-0 mt-0.5" />
            <p className="text-[#135576] font-roboto text-[13px] font-normal leading-[18px] italic">
              {t("independent_addition_info")}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <AdminButton
              type="submit"
              label={isSubmitting ? (t("saving") || "Saving...") : (t("update_category") || "Update Category")}
              className="px-7 py-3"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
