"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAddNewNoteInCaseMutation, useUpdateNoteInCaseMutation } from "@/store/features/note/note.api";

interface EditNoteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  caseId: string;
  /** Pass an existing note (id/title/content) to edit; omit/undefined to add a new one. */
  data?: {
    id?: number;
    title?: string;
    content?: string;
  };
}

export default function EditNoteModal({ open, setOpen, caseId, data }: EditNoteModalProps) {
  const [form, setForm] = useState({ title: "", content: "" });

  const [addNewNoteInCase, { isLoading: isAdding }] = useAddNewNoteInCaseMutation();
  const [updateNoteInCase, { isLoading: isUpdating }] = useUpdateNoteInCaseMutation();

  const isEditMode = Boolean(data?.id);
  const isLoading = isAdding || isUpdating;

  // Re-sync form whenever the modal opens (or the target note changes while open).
  useEffect(() => {
    if (!open) return;
    setForm({
      title: data?.title ?? "",
      content: data?.content ?? "",
    });
  }, [open, data?.id, data?.title, data?.content]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!caseId) {
      toast.error("Case ID is missing.");
      return;
    }
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Please fill in both title and note content.");
      return;
    }

    const payload = { title: form.title.trim(), content: form.content.trim() };

    try {
      if (isEditMode && data?.id) {
        await updateNoteInCase({ caseId, noteId: data.id, payload }).unwrap();
        toast.success("Note updated successfully");
      } else {
        await addNewNoteInCase({ caseId, payload }).unwrap();
        toast.success("Note added successfully");
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${isEditMode ? "update" : "add"} note.`);
    }
  };

  const handleCancel = () => {
    setForm({
      title: data?.title ?? "",
      content: data?.content ?? "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold text-gray-900">
            {isEditMode ? "Edit Note" : "Add Note"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1">Title</label>
            <Input
              placeholder="Note title..."
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border-gray-200 rounded-xl focus-visible:border-[#135576] focus-visible:ring-[#135576]/20 text-gray-700 placeholder:text-gray-400"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1">Note</label>
            <Textarea
              placeholder="Type here..."
              value={form.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="min-h-[180px] resize-y border-gray-200 rounded-xl focus:border-[#135576] focus:ring-[#135576]/20 p-4 text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#135576] hover:bg-[#0e445e] text-white rounded-xl disabled:opacity-60"
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update note"
              : "Save note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}