"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import MainButton from "@/components/shared/MainButton";
import { Trash2 } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export default function DeleteModal({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to delete this? This action cannot be undone.",
  loading = false,
  confirmText = "Delete",
  cancelText = "Cancel",
}: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">

        <DialogHeader className="space-y-4">

          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-7 w-7 text-red-600" />
          </div>

          <DialogTitle className="text-center text-xl font-semibold">
            {title}
          </DialogTitle>

          <DialogDescription className="text-center text-gray-500">
            {description}
          </DialogDescription>

        </DialogHeader>

        <DialogFooter className="mt-4 flex-col sm:flex-row gap-3">

          <button
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50 transition"
          >
            {cancelText}
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="w-full rounded-full bg-red-600 text-white py-2.5 text-sm font-medium hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmText}
          </button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}