"use client";

import React, { useRef, useState } from "react";
import { Download, FileText, Loader2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainButton from "@/components/shared/MainButton";
import { toast } from "sonner";
import { useDeleteDocumentFromCaseMutation, useDownloadCaseDocumentMutation, useGetDocumentOfCaseQuery, useUploadDocumentToCaseMutation } from "@/store/features/document/document.api";
import { CaseDocument } from "@/types/case.types";

export default function DocumentsTab({ caseId }: { caseId: string }) {
  const {
    data: documents,
    isLoading,
    isError,
  } = useGetDocumentOfCaseQuery({ caseId }, { skip: !caseId });

  const [uploadDocumentToCase, { isLoading: isUploading }] = useUploadDocumentToCaseMutation();
  const [deleteDocumentFromCase] = useDeleteDocumentFromCaseMutation();
  const [downloadCaseDocument] = useDownloadCaseDocumentMutation();

  const displayDocuments: CaseDocument[] = documents ?? [];

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = (file: File) => {
    setPendingFile(file);
  };

  const submitUpload = async () => {
    if (!pendingFile) return;
    if (!caseId) {
      toast.error("Case ID is missing.");
      return;
    }

    try {
      await uploadDocumentToCase({
        caseId,
        payload: {
          file: pendingFile,
          file_name: pendingFile.name,
        },
      }).unwrap();
      toast.success("File uploaded successfully");
      setPendingFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document.");
    }
  };

  const handleRemove = async (id: number | string) => {
    if (!confirm("Are you sure you want to remove this document?")) return;
    setDeletingId(Number(id));
    try {
      await deleteDocumentFromCase({ caseId, documentId: Number(id) }).unwrap();
      toast.success("Document removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove document.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (id: number | string) => {
    setDownloadingId(Number(id));
    try {
      const result = await downloadCaseDocument({ caseId, documentId: Number(id) }).unwrap();
      // Trigger the browser download/open using the signed URL returned by the API.
      const link = document.createElement("a");
      link.href = result.download_url;
      link.download = result.file_name || "document";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download document.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-900 font-bold text-xl tracking-tight">Documents</h1>
        {pendingFile ? (
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 max-w-[200px] truncate">{pendingFile.name}</p>
            <MainButton
              label="Remove"
              onClick={() => {
                setPendingFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              icon={<Trash2 className="h-4 w-4" />}
              variant="secondary"
            />
            <MainButton
              label={isUploading ? "Uploading..." : "Upload File"}
              onClick={submitUpload}
              icon={isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
            />
          </div>
        ) : (
          <MainButton
            label="Upload"
            onClick={() => fileInputRef.current?.click()}
            icon={<Plus className="h-4 w-4" />}
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
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                  Loading documents...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-red-400 text-sm">
                  Failed to load documents. Please try again.
                </td>
              </tr>
            ) : displayDocuments.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400 text-sm">
                  No documents yet. Click &ldquo;Upload&rdquo; to add the first one.
                </td>
              </tr>
            ) : (
              displayDocuments.map((doc) => (
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
                      {doc.file_name}
                    </span>
                  </td>

                  {/* Column 2: Uploaded Date */}
                  <td className="py-4 px-5 text-gray-700 text-[15px] align-middle">
                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "-"}
                  </td>

                  {/* Column 3: Uploaded By */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#fef08a] text-[#854d0e] flex items-center justify-center text-xs font-bold tracking-wider shrink-0">
                          {doc.uploaded_by?.full_name ? doc.uploaded_by.full_name.charAt(0) : "U"}
                        </div>
                        <span className="text-gray-800 font-medium text-[15px] truncate">
                          {doc.uploaded_by?.full_name || "Unknown"}
                        </span>
                      </div>

                      {/* Options Actions Button */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                            aria-label="More actions"
                          >
                              <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1"
                        >
                          <DropdownMenuItem
                            onClick={() => handleDownload(doc.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemove(doc.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none hover:text-red-600!"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}