"use client";

import React from "react";
import { Eye, FileText, File } from "lucide-react";
import { NoContent } from "@/components/shared/NoContent";

interface UploadedBy {
  id: string;
  full_name: string;
  email: string;
  professional_role?: string;
}

interface Document {
  id: number;
  file_name: string;
  file_url?: string;
  uploaded_by?: string | UploadedBy | null;
  created_at?: string;
}

interface AllDocumentsTableProps {
  documents?: Document[];
}

// Helper to get dynamic category colors
const getCategoryStyles = (category: string) => {
  switch (category) {
    case "Evidence": return "bg-purple-50 text-purple-600";
    case "Pleadings": return "bg-sky-50 text-sky-600";
    case "Expert Reports": return "bg-emerald-50 text-emerald-600";
    case "Discovery": return "bg-amber-50 text-amber-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

// Helper to determine file type from URL or extension
const getFileType = (fileName: string): "pdf" | "doc" => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext === "pdf" ? "pdf" : "doc";
};

export default function AllDocumentsTable({ documents = [] }: AllDocumentsTableProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 ">
        <h2 className="text-xl font-bold text-gray-900">All Documents</h2>
        <p className="text-sm text-gray-500">{documents?.length || 0}  documents</p>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto m-2 rounded-2xl border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {["DOCUMENT NAME", "UPLOADED BY", "DATE"].map((header) => (
                <th key={header} className="px-6 py-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {documents && documents.length > 0 ? documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {getFileType(doc.file_name) === "pdf" ? (
                      <FileText className="w-5 h-5 text-sky-400" />
                    ) : (
                      <File className="w-5 h-5 text-sky-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">{doc.file_name}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 text-sm text-gray-600">
                  {typeof doc.uploaded_by === "object" && doc.uploaded_by
                    ? doc.uploaded_by.full_name
                    : doc.uploaded_by || "Unknown"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "N/A"}</td>
                
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  <NoContent/>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}