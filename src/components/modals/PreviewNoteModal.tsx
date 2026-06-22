"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Edit2, FileText } from "lucide-react";
import { CaseNote } from "@/types/settingPageTabs";

interface PreviewNoteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  note: CaseNote | null;
  onEdit: (note: CaseNote) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PreviewNoteModal({ open, setOpen, note, onEdit }: PreviewNoteModalProps) {
  if (!note) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] p-6 gap-6 bg-white rounded-2xl">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-[#eef2f6] p-2.5 rounded-lg text-[#0c5174] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 truncate">{note.title}</h2>
          </div>

          <button
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium shrink-0"
            onClick={() => {
              onEdit(note);
              setOpen(false);
            }}
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </div>

        {/* Metadata Section */}
        <div className="space-y-2 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium w-28 shrink-0">Created by:</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#fef08a] text-[#854d0e] flex items-center justify-center text-[10px] font-bold shrink-0">
                {note.created_by_name?.charAt(0) ?? "U"}
              </div>
              <span className="text-gray-900 font-medium">{note.created_by_name}</span>
              <span className="text-gray-400 text-xs">({note.created_by_role})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium w-28 shrink-0">Last Updated:</span>
            <span className="text-gray-900">{formatDate(note.updated_at)}</span>
          </div>
        </div>

        {/* Note Content Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Note:</h3>
          <div className="bg-gray-50 p-5 rounded-xl text-gray-700 leading-relaxed text-sm whitespace-pre-line border border-gray-100">
            {note.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}