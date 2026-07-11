"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DeleteLawDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lawTitle: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeleteLawDialog({
  isOpen,
  onOpenChange,
  lawTitle,
  onConfirm,
  isLoading = false,
}: DeleteLawDialogProps) {
  const { t } = useTranslation("adminLawDatabase");
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[400px] w-full bg-white rounded-3xl p-6 border-none shadow-2xl overflow-hidden flex flex-col focus:outline-none font-roboto"
      >
        <DialogClose asChild>
          <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
            <Trash2 className="w-6 h-6 animate-pulse" />
          </div>

          <DialogTitle className="text-[20px] font-bold text-[#101828] font-roboto">
            {t("delete_law_title")}
          </DialogTitle>

          <p className="text-sm text-gray-500 leading-relaxed">
            {t("delete_law_desc", { title: lawTitle })}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full mt-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-all cursor-pointer focus:outline-none active:scale-95"
            disabled={isLoading}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all cursor-pointer focus:outline-none active:scale-95 flex items-center justify-center gap-1.5"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{t("delete")}</span>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
