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

interface AddCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => Promise<boolean>;
  isSubmitting?: boolean;
}

type CategoryFormData = {
  name: string;
};

export default function AddCategoryDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: AddCategoryDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
    },
  });

  const handleCreateCategory = async (data: CategoryFormData) => {
    const name = data.name.trim();

    const success = await onSubmit(name);
    if (success) {
      reset();
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
          Add Category
        </DialogTitle>

        <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Category name..."
              {...register("name", {
                required: "Category name is required.",
                validate: (value) =>
                  value.trim() ? true : "Category name is required.",
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
              Categories and subcategories can be added independently.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <AdminButton
              type="submit"
              label={isSubmitting ? "Saving..." : "Create Category"}
              className="px-7 py-3"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
