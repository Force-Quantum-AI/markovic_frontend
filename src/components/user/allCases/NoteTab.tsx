"use client";

import React, { useState } from "react";
import { Eye, FileText, Loader2, MoreHorizontal, Plus, SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainButton from "@/components/shared/MainButton";
import EditNoteModal from "@/components/modals/EditNoteModal";
import PreviewNoteModal from "@/components/modals/PreviewNoteModal";
import { toast } from "sonner";
import { useDeleteNoteInCaseMutation, useGetNoteOfCaseQuery } from "@/store/features/note/note.api";
import { CaseNote } from "@/types/settingPageTabs";

export default function NoteTab({ caseId }: { caseId: string }) {
  const {
    data: notes,
    isLoading,
    isFetching,
    isError,
  } = useGetNoteOfCaseQuery({ caseId }, { skip: !caseId });

  const [deleteNoteInCase, { isLoading: isDeleting }] = useDeleteNoteInCaseMutation();

  const displayNotes: CaseNote[] = notes ?? [];

  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<CaseNote | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAddNote = () => {
    setActiveNote(null);
    setAddOpen(true);
  };

  const handleEditNote = (note: CaseNote) => {
    setActiveNote(note);
    setEditOpen(true);
  };

  const handlePreviewNote = (note: CaseNote) => {
    setActiveNote(note);
    setPreviewOpen(true);
  };

  const handleRemove = async (noteId: number) => {
    if (!confirm("Are you sure you want to remove this note?")) return;
    setDeletingId(noteId);
    try {
      await deleteNoteInCase({ caseId, noteId }).unwrap();
      toast.success("Note removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove note.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-900 font-bold text-xl tracking-tight">Notes</h1>
        <MainButton label="Add Note" onClick={handleAddNote} icon={<Plus className="h-4 w-4" />} />
      </div>

      {/* Main Notes Table container */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#eaedf2] text-[#4a5568] text-[14px] font-medium border-b border-gray-200">
              <th className="py-3 px-5 w-66 font-medium">Files</th>
              <th className="py-3 px-5 w-[35%] font-medium border-l border-gray-300/40">Upload by</th>
              <th className="py-3 px-5 w-[20%] font-medium border-l border-gray-300/40">Last Updated</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                  Loading notes...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-red-400 text-sm">
                  Failed to load notes. Please try again.
                </td>
              </tr>
            ) : displayNotes.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400 text-sm">
                  No notes yet. Click &ldquo;Add Note&rdquo; to create the first one.
                </td>
              </tr>
            ) : (
              displayNotes.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50/70 transition-colors group text-[#2d3748]"
                >
                  {/* Column 1: Files */}
                  <td
                    className="py-4 px-5 max-w-66 flex items-center gap-4 cursor-pointer"
                    onClick={() => handlePreviewNote(doc)}
                  >
                    <div className="bg-[#eef2f6] text-[#0c5174] p-2.5 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-medium text-gray-800 text-[15px] truncate">
                      {doc.title}
                    </span>
                  </td>

                  {/* Column 2: Uploaded By */}
                  <td className="py-4 px-5 align-middle cursor-pointer" onClick={() => handlePreviewNote(doc)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fef08a] text-[#854d0e] flex items-center justify-center text-xs font-bold tracking-wider shrink-0">
                        {doc.created_by_name ? doc.created_by_name.charAt(0) : "U"}
                      </div>
                      <span className="text-gray-800 font-medium text-[15px] truncate">
                        {doc.created_by_name || "Unknown"}
                      </span>
                    </div>
                  </td>

                  {/* Column 3: Uploaded Date + Actions */}
                  <td className="py-4 px-5 text-gray-700 text-[15px] align-middle flex items-center justify-between">
                    {doc.updated_at ? new Date(doc.updated_at).toLocaleDateString() : "-"}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                          aria-label="More actions"
                          disabled={isDeleting && deletingId === doc.id}
                        >
                          {isDeleting && deletingId === doc.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <MoreHorizontal className="w-5 h-5" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1"
                      >
                        <DropdownMenuItem
                          onClick={() => handlePreviewNote(doc)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditNote(doc)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none"
                        >
                          <SquarePen className="w-4 h-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRemove(doc.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                          <span>Remove</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Note Modal */}
      <EditNoteModal open={addOpen} setOpen={setAddOpen} caseId={caseId} data={undefined} />

      {/* Edit Note Modal */}
      <EditNoteModal
        open={editOpen}
        setOpen={setEditOpen}
        caseId={caseId}
        data={
          activeNote
            ? { id: activeNote.id, title: activeNote.title, content: activeNote.content }
            : undefined
        }
      />

      {/* Preview Note Modal */}
      <PreviewNoteModal
        open={previewOpen}
        setOpen={setPreviewOpen}
        note={activeNote}
        onEdit={(note) => handleEditNote(note)}
      />
    </div>
  );
}