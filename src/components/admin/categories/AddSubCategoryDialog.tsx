"use client";

import { X, ChevronDown, Info } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminButton from "@/components/shared/AdminButton";

interface AddSubCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: { id: string | number; name: string }[];
  selectedCategoryId?: string;
  onSubmit: (name: string, categoryId: string) => Promise<boolean>;
  isSubmitting?: boolean;
}

type SubCategoryFormData = {
  categoryId: string;
  name: string;
};

import { useTranslation } from "react-i18next";

export default function AddSubCategoryDialog({
  isOpen,
  onOpenChange,
  categories = [],
  selectedCategoryId = "",
  onSubmit,
  isSubmitting = false,
}: AddSubCategoryDialogProps) {
  const { t } = useTranslation("adminCategories");
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>({
    values: {
      categoryId: selectedCategoryId,
      name: "",
    },
  });

  const handleCreateSubcategory = async (data: SubCategoryFormData) => {
    const name = data.name.trim();

    const success = await onSubmit(name, data.categoryId);
    if (success) {
      reset({ categoryId: "", name: "" });
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
          {t("add_subcategory")}
        </DialogTitle>

        <form onSubmit={handleSubmit(handleCreateSubcategory)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
              {t("select_category")}
            </label>
            <Controller
              control={control}
              name="categoryId"
              rules={{ required: t("category_selection_required") || "Category selection is required." }}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full h-12 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] px-5 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all">
                    <SelectValue placeholder={t("select_category_placeholder") || "Select Category..."} />
                    <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#99A1AF]" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={4}
                    className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#101828] font-roboto min-w-[var(--radix-select-trigger-width)]"
                  >
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={String(cat.id)}
                        className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <p className="text-[12px] font-roboto text-red-500 pl-2">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
              {t("subcategory_name")}
            </label>
            <input
              type="text"
              placeholder={t("subcategory_name_placeholder") || "Sub-Category name..."}
              {...register("name", {
                required: t("subcategory_name_required") || "Subcategory name is required.",
                validate: (value) =>
                  value.trim() ? true : t("subcategory_name_required") || "Subcategory name is required.",
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
              label={isSubmitting ? (t("saving") || "Saving...") : (t("create_subcategory") || "Create Sub-Category")}
              className="px-7 py-3"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
