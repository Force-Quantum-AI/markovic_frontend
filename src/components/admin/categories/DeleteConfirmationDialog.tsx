"use client";

import { X, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => Promise<void> | void;
  isSubmitting?: boolean;
}

import { useTranslation } from "react-i18next";

export default function DeleteConfirmationDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  isSubmitting = false,
}: DeleteConfirmationDialogProps) {
  const { t } = useTranslation("adminCategories");
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[440px] w-full bg-white rounded-3xl p-6 border-none shadow-2xl"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
            <Trash2 className="w-5 h-5" />
          </div>

          <DialogTitle className="text-[#101828] font-roboto text-[20px] font-bold">
            {title}
          </DialogTitle>

          <p className="text-gray-500 font-roboto text-[14px] leading-relaxed max-w-[320px]">
            {description}
          </p>

          <div className="flex items-center gap-3 w-full pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-[32px] border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-roboto text-[14px] font-semibold transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-[32px] bg-red-600 hover:bg-red-700 text-white font-roboto text-[14px] font-semibold transition-colors focus:outline-none cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (t("deleting") || "Deleting...") : (t("delete") || "Delete")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
