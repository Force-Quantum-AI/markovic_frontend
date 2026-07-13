import React from "react";
import { useTranslation } from "react-i18next";

interface UploadedBy {
  id: number;
  full_name: string;
  email: string;
  professional_role?: string;
  profile_image?: string | null;
}

interface Document {
  id: number;
  file_name: string;
  file_url?: string;
  uploaded_by?: string | UploadedBy | null;
  created_at?: string;
}

interface AdminAllDocumentsTableProps {
  documents?: Document[];
}

export default function AdminAllDocumentsTable({ documents = [] }: AdminAllDocumentsTableProps) {
  const { t, i18n } = useTranslation("adminArchiveCases");
  const isMontenegrin = i18n.language === "me";

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getImageUrl = (url?: string | null) => {
    if (!url) return undefined;
    return url.startsWith("http") ? url : `https://res.cloudinary.com/dnu0axtez/${url}`;
  };

  const formatDocDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const day = d.getDate();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthsMe = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];
      const month = isMontenegrin ? monthsMe[d.getMonth()] : months[d.getMonth()];
      const year = d.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch {
      return dateStr;
    }
  };

  const formatHeader = (str: string) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8">
      {/* Header outside the card */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1e293b]">{t("all_documents")}</h2>
        <p className="text-sm text-slate-500 mt-1">{t("view_all_documents", "View all documents")}</p>
      </div>

      {/* Desktop Table Container Card */}
      <div className="hidden md:block w-full bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#eef2f6]">
                <th className="px-6 py-4 border-b border-r border-slate-200 text-left text-sm font-semibold text-slate-600 w-1/2">
                  {formatHeader(t("document_name") || "Document Name")}
                </th>
                <th className="px-6 py-4 border-b border-r border-slate-200 text-left text-sm font-semibold text-slate-600 w-1/4">
                  {formatHeader(t("uploaded_by") || "Uploaded By")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-600">
                  {formatHeader(t("date") || "Date")}
                </th>
              </tr>
            </thead>

            <tbody>
              {documents && documents.length > 0 ? (
                documents.map((doc, idx) => {
                  const isLast = idx === documents.length - 1;
                  const borderBottomClass = isLast ? "" : "border-b border-slate-200";

                  // Extract Uploader details
                  let uploaderName = t("unknown") || "Unknown";
                  let avatarUrl: string | undefined = undefined;

                  if (doc.uploaded_by) {
                    if (typeof doc.uploaded_by === "object") {
                      uploaderName = doc.uploaded_by.full_name || doc.uploaded_by.email;
                      avatarUrl = getImageUrl(doc.uploaded_by.profile_image);
                    } else {
                      uploaderName = doc.uploaded_by;
                    }
                  }

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/30 transition-colors">
                      {/* Document Name Column */}
                      <td className={`px-6 py-4 border-r border-slate-200 ${borderBottomClass} text-left text-sm font-medium text-slate-700`}>
                        {doc.file_url ? (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#135576] hover:underline transition-colors"
                          >
                            {doc.file_name}
                          </a>
                        ) : (
                          doc.file_name
                        )}
                      </td>

                      {/* Uploaded By Column */}
                      <td className={`px-6 py-4 border-r border-slate-200 ${borderBottomClass} text-left text-sm text-slate-600`}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#eef2f6] text-[#135576] border border-slate-100 flex items-center justify-center text-xs font-bold shrink-0">
                            {avatarUrl ? (
                              <img src={avatarUrl} alt={uploaderName} className="w-full h-full object-cover" />
                            ) : (
                              getInitials(uploaderName)
                            )}
                          </div>
                          <span className="font-medium text-slate-700">{uploaderName}</span>
                        </div>
                      </td>

                      {/* Date Column */}
                      <td className={`px-6 py-4 ${borderBottomClass} text-left text-sm text-slate-600`}>
                        {formatDocDate(doc.created_at)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-500 bg-white">
                    {t("no_documents_available")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view: Cards layout */}
      <div className="block md:hidden space-y-4">
        {documents && documents.length > 0 ? (
          documents.map((doc) => {
            // Extract Uploader details
            let uploaderName = t("unknown") || "Unknown";
            let avatarUrl: string | undefined = undefined;

            if (doc.uploaded_by) {
              if (typeof doc.uploaded_by === "object") {
                uploaderName = doc.uploaded_by.full_name || doc.uploaded_by.email;
                avatarUrl = getImageUrl(doc.uploaded_by.profile_image);
              } else {
                uploaderName = doc.uploaded_by;
              }
            }

            return (
              <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                {/* Document Title */}
                <div>
                  {doc.file_url ? (
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 font-bold text-base hover:text-[#135576] hover:underline transition-colors block"
                    >
                      {doc.file_name}
                    </a>
                  ) : (
                    <span className="text-slate-800 font-bold text-base block">{doc.file_name}</span>
                  )}
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="font-semibold text-slate-400 text-[10px] block mb-1 uppercase tracking-wider">
                      {formatHeader(t("uploaded_by") || "Uploaded By")}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-[#eef2f6] text-[#135576] flex items-center justify-center text-[9px] font-bold shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={uploaderName} className="w-full h-full object-cover" />
                        ) : (
                          getInitials(uploaderName)
                        )}
                      </div>
                      <span className="font-medium text-slate-700 truncate">{uploaderName}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 text-[10px] block mb-1 uppercase tracking-wider">
                      {formatHeader(t("date") || "Date")}
                    </span>
                    <span className="font-medium text-slate-700">{formatDocDate(doc.created_at)}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-sm text-slate-500 shadow-sm">
            {t("no_documents_available")}
          </div>
        )}
      </div>
    </div>
  );
}
