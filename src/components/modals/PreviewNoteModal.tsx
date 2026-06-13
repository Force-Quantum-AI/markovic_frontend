"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Ensure your path matches your project structure
import { Edit2, X, FileText } from "lucide-react";

// 1. Interface for Props
interface NoteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  handleEdit: (note: string, id: string) => void;
}

// 2. Dummy Data (Simulating API response by ID)
const getDummyNoteData = (id: string) => ({
  id: "doc-4",
  note: "Power of Attorneyfgdfg Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, praesentium. Dolore numquam vitae animi cum? Magni, sed sit doloribus voluptatibus repellendus sint temporibus, commodi laborum atque soluta magnam natus, itaque beatae! Vitae voluptas in quidem at quos mollitia inventore tempora!",
  lastUpdated: "24 Feb, 2026",
  uploadedBy: {
    name: "Eleanor Pena",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
});

export default function PreviewNoteModal({ open, setOpen, id, handleEdit }: NoteModalProps) {
  // In a real scenario, use an effect or React Query here to fetch data by ID
  const noteData = getDummyNoteData(id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] p-6 gap-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#eef2f6] p-2.5 rounded-lg text-[#0c5174]">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Note</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium" onClick={() => {
                handleEdit(noteData.id, noteData.note)
                setOpen(false)
                }}>
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            {/* Shadcn automatically provides a close button, but can be customized if needed */}
          </div>
        </div>

        {/* Metadata Section */}
        <div className="space-y-2 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium w-28">Uploaded by:</span>
            <div className="flex items-center gap-2">
              <img
                src={noteData.uploadedBy.avatarUrl}
                alt={noteData.uploadedBy.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-gray-900 font-medium">
                {noteData.uploadedBy.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium w-28">Last Updated:</span>
            <span className="text-gray-900">{noteData.lastUpdated}</span>
          </div>
        </div>

        {/* Note Content Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Note:</h3>
          <div className="bg-gray-50 p-5 rounded-xl text-gray-700 leading-relaxed text-sm whitespace-pre-line border border-gray-100">
            {noteData.note}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}