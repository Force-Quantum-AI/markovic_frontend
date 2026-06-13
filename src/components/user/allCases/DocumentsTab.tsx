"use client";

import React, { useRef, useState } from "react";
import { Download, FileText, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainButton from "@/components/shared/MainButton";

// 1. TypeScript Interface matching the API payload structure
interface DocumentItem {
    id: string;
    fileName: string;
    uploadedDate: string;
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
        fileName: "Medical Report – 22.05.2026.pdf",
        uploadedDate: "17 May, 2026",
        uploadedBy: {
            name: "Eleanor Pena",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        },
    },
    {
        id: "doc-2",
        fileName: "Lawsuit Submission – 15.03.2026.pdf",
        uploadedDate: "22 Mar, 2026",
        uploadedBy: {
            name: "Cameron Williamson",
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        },
    },
    {
        id: "doc-3",
        fileName: "Financial Statement – 30.04.2026.pdf",
        uploadedDate: "1 Mar, 2026",
        uploadedBy: {
            name: "Darrell Steward",
            initials: "DS", // Renders the colored badge seen in the UI
        },
    },
    {
        id: "doc-4",
        fileName: "Power of Attorney.pdf",
        uploadedDate: "24 Feb, 2026",
        uploadedBy: {
            name: "Eleanor Pena",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        },
    },
];

export default function DocumentsTab() {
    const [documents, setDocuments] = useState<DocumentItem[]>(DUMMY_DOCUMENTS);
    const [uploadDocument, setUploadDocument] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock Upload Handler
    const handleUploadFile = (file: File) => {
        setUploadDocument(file);
    };

    const submitUpload = () => {
        console.log("Uploaded file", uploadDocument);
        alert("File uploaded successfully");
    }

    // Mock Actions Menu Handler
    const handleActionClick = (id: string, name: string) => {
        alert(`Opened context menu for: "${name}" (ID: ${id})`);
    };

    // Mock Delete Handler
    const handleRemove = (id: string) => {
        if (confirm("Are you sure you want to remove this document?")) {
            setDocuments(documents.filter((d) => d.id !== id));
        }
    };

    const handleDownload = () => {
        alert("Downloading document");
    };

    return (
        <div className="w-full max-w-7xl mx-auto  bg-white min-h-screen">

            {/* Header section with explicit custom color matching button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-gray-900 font-bold text-xl tracking-tight">Documents</h1>
                {uploadDocument ? (
                    <div className="flex items-center gap-2">
                        <p>{uploadDocument.name}</p>
                        <MainButton
                            label="Remove"
                            onClick={() => setUploadDocument(null)}
                            icon={<Trash2 />}
                            variant="secondary"
                        />
                        <MainButton
                            label="Upload File"
                            onClick={() => submitUpload()}
                        />
                    </div>
                ) : (
                    <MainButton
                        label="Upload"
                        onClick={() => fileInputRef.current?.click()}
                        icon={<Plus className="h-4 w-4"/>}
                    />
                )}
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handleUploadFile(e.target.files[0]);
                        }
                    }}
                    className="hidden"
                    ref={fileInputRef}
                />
            </div>

            {/* Main Documents Table container */}
            <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full border-collapse text-left">

                    {/* Table Header */}
                    <thead>
                        <tr className="bg-[#eaedf2] text-[#4a5568] text-[14px] font-medium border-b border-gray-200">
                            <th className="py-3 px-5 w-[45%] font-medium">Files</th>
                            <th className="py-3 px-5 w-[20%] font-medium border-l border-gray-300/40">Uploaded Date</th>
                            <th className="py-3 px-5 w-[35%] font-medium border-l border-gray-300/40">Upload by</th>
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
                                <td className="py-4 px-5 flex items-center gap-4">
                                    <div className="bg-[#eef2f6] text-[#0c5174] p-2.5 rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 stroke-[2.2]" />
                                    </div>
                                    <span className="font-medium text-gray-800 text-[15px] truncate">
                                        {doc.fileName}
                                    </span>
                                </td>

                                {/* Column 2: Uploaded Date */}
                                <td className="py-4 px-5 text-gray-700 text-[15px] align-middle">
                                    {doc.uploadedDate}
                                </td>

                                {/* Column 3: Uploaded By */}
                                <td className="py-4 px-5 align-middle">
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

                                        {/* Options Actions Button */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    onClick={() => handleActionClick(doc.id, doc.fileName)}
                                                    className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                                                    aria-label="More actions"
                                                >
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                                                <DropdownMenuItem onClick={handleDownload} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none">
                                                <Download className="w-4 h-4" />
                                                <span>Download</span>
                                            </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRemove(doc.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none hover:text-red-600!">
                                                    <Trash2 className="w-4 h-4 text-red-400 " />
                                                    <span>Remove</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}