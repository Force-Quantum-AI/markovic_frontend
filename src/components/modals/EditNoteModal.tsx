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
import { Textarea } from "@/components/ui/textarea";

interface EditNoteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: {
    note?: string;
  };
  onSave?: (note: string) => void;
}

export default function EditNoteModal({ open, setOpen, data, onSave }: EditNoteModalProps) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open && data?.note !== undefined) {
      setNote(data.note);
    }
  }, [open, data?.note]);

  const handleSave = () => {
    if (onSave) {
      onSave(note);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setNote(data?.note || "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p3-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Notes
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="space-y-3">
            <Textarea
              placeholder="Type here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[200px] resize-y border-gray-200 rounded-xl focus:border-[#135576] focus:ring-[#135576]/20 p-4 text-gray-700 placeholder:text-gray-400"
              autoFocus
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#135576] hover:bg-[#0e445e] text-white rounded-xl"
          >
            Save note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}