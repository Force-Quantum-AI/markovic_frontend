"use client";

import React, { useRef, useState } from "react";
import { Eye, FileText, MoreHorizontal, Plus, SquarePen, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainButton from "@/components/shared/MainButton";
import EditNoteModal from "@/components/modals/EditNoteModal";
import PreviewNoteModal from "@/components/modals/PreviewNoteModal";

// 1. TypeScript Interface matching the API payload structure
interface DocumentItem {
    id: string;
    note: string;
    lastUpdated: string;
    uploadedBy: {
        name: string;
        avatarUrl?: string; // If missing, fallback to initial badges like 'DS'
        initials?: string;
    };
}

// 2. Dummy Dataset mimicking the image
const DUMMY_DOCUMENTS: DocumentItem[] = [
    {
        id: "doc-1",
        note: "Medical Report dsfdsfsdfsdfs Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, praesentium. Dolore numquam vitae animi cum? Magni, sed sit doloribus voluptatibus repellendus sint temporibus, commodi laborum atque soluta magnam natus, itaque beatae! Vitae voluptas in quidem at quos mollitia inventore tempora!",
        lastUpdated: "17 May, 2026",
        uploadedBy: {
            name: "Eleanor Pena",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        },
    },
    {
        id: "doc-2",
        note: "Lawsuit Submission sadfsafsfs Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, praesentium. Dolore numquam vitae animi cum? Magni, sed sit doloribus voluptatibus repellendus sint temporibus, commodi laborum atque soluta magnam natus, itaque beatae! Vitae voluptas in quidem at quos mollitia inventore tempora!",
        lastUpdated: "22 Mar, 2026",
        uploadedBy: {
            name: "Cameron Williamson",
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        },
    },
    {
        id: "doc-3",
        note: "Financial Statement retewt Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, praesentium. Dolore numquam vitae animi cum? Magni, sed sit doloribus voluptatibus repellendus sint temporibus, commodi laborum atque soluta magnam natus, itaque beatae! Vitae voluptas in quidem at quos mollitia inventore tempora!",
        lastUpdated: "1 Mar, 2026",
        uploadedBy: {
            name: "Darrell Steward",
            initials: "DS", // Renders the colored badge seen in the UI
        },
    },
    {
        id: "doc-4",
        note: "Power of Attorneyfgdfg Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, praesentium. Dolore numquam vitae animi cum? Magni, sed sit doloribus voluptatibus repellendus sint temporibus, commodi laborum atque soluta magnam natus, itaque beatae! Vitae voluptas in quidem at quos mollitia inventore tempora!",
        lastUpdated: "24 Feb, 2026",
        uploadedBy: {
            name: "Eleanor Pena",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        },
    },
];

export default function NoteTab() {
    const [documents, setDocuments] = useState<DocumentItem[]>(DUMMY_DOCUMENTS);
    const [editNotesOpen, setEditNotesOpen] = useState(false);
    const [previewNotesOpen, setPreviewNotesOpen] = useState(false);
    const [addNotesOpen, setAddNotesOpen] = useState(false);
    const [note, setNote] = useState({
        note: "",
        id: "",
    });

    const handleEditNote = (id: string, note: string) => {
        setNote({
            note,
            id,
        });
        setEditNotesOpen(true);
    }

    const handlePreviewNote = (id: string, note: string) => {
        setNote({
            note,
            id,
        });
        setPreviewNotesOpen(true);
    }

    // Mock Delete Handler
    const handleRemove = (id: string) => {
        if (confirm("Are you sure you want to remove this document?")) {
            setDocuments(documents.filter((d) => d.id !== id));
        }
    };

    return (
        <div className="w-full mx-auto  bg-white min-h-screen">

            {/* Header section with explicit custom color matching button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-gray-900 font-bold text-xl tracking-tight">Notes</h1>
                    <MainButton
                        label="Add Note"
                        onClick={() => setAddNotesOpen(true)}
                        icon={<Plus className="h-4 w-4" />}
                    />
            </div>

            {/* Main Documents Table container */}
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
                        {documents.map((doc) => (
                            <tr
                                key={doc.id}
                                className="hover:bg-gray-50/70 transition-colors group text-[#2d3748]"
                            >
                                {/* Column 1: Files */}
                                <td className="py-4 px-5 max-w-66 flex items-center gap-4" onClick={() => handlePreviewNote(doc.id, doc.note)} >
                                    <div className="bg-[#eef2f6] text-[#0c5174] p-2.5 rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 stroke-[2.2]" />
                                    </div>
                                    <span className="font-medium text-gray-800 text-[15px] truncate">
                                        {doc.note}
                                    </span>
                                </td>

                                {/* Column 2: Uploaded By */}
                                <td className="py-4 px-5 align-middle" onClick={() => handlePreviewNote(doc.id, doc.note)} >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {doc.uploadedBy.avatarUrl ? (
                                                <img
                                                    src={doc.uploadedBy.avatarUrl}
                                                    alt={doc.uploadedBy.name}
                                                    className="w-8 h-8 rounded-full object-cover border border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-[#fef08a] text-[#854d0e] flex items-center justify-center text-xs font-bold tracking-wider">
                                                    {doc.uploadedBy.initials || "U"}
                                                </div>
                                            )}
                                            <span className="text-gray-800 font-medium text-[15px]">
                                                {doc.uploadedBy.name}
                                            </span>
                                        </div>

                                    </div>
                                </td>

                                {/* Column 3: Uploaded Date */}
                                <td className="py-4 px-5 text-gray-700 text-[15px] align-middle flex items-center justify-between" >
                                    {doc.lastUpdated}
                                    {/* Options Actions Button */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                                                aria-label="More actions"
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                                            <DropdownMenuItem onClick={() => handlePreviewNote(doc.id, doc.note)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none">
                                                <Eye className="w-4 h-4" />
                                                <span>Preview</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditNote(doc.id, doc.note)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none">
                                                <SquarePen className="w-4 h-4" />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRemove(doc.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                                <span>Remove</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <EditNoteModal
                open={addNotesOpen}
                setOpen={() => { setAddNotesOpen(false); }}
                data={{ note: "" }}
            />
            <EditNoteModal
                open={editNotesOpen}
                setOpen={() => { setEditNotesOpen(false); }}
                data={note}
            />
            <PreviewNoteModal
                open={previewNotesOpen}
                setOpen={() => { setPreviewNotesOpen(false); }}
                id={note.id}
                handleEdit={handleEditNote}
            />
        </div>
    );
}