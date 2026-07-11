import { Eye, FileText, File } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UploadedBy {
  id: number;
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

interface AdminAllDocumentsTableProps {
  documents?: Document[];
}

const getFileType = (fileName: string): "pdf" | "doc" => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext === "pdf" ? "pdf" : "doc";
};

export default function AdminAllDocumentsTable({ documents = [] }: AdminAllDocumentsTableProps) {
  const { t } = useTranslation("adminArchiveCases");
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{t("all_documents")}</h2>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {[t("document_name") || "DOCUMENT NAME", t("uploaded_by") || "UPLOADED BY", t("date") || "DATE", t("action") || "ACTIONS"].map((header) => (
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
                      <FileText className="w-5 h-5 text-rose-400" />
                    ) : (
                      <File className="w-5 h-5 text-sky-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">{doc.file_name}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {doc.uploaded_by
                    ? typeof doc.uploaded_by === "object"
                      ? doc.uploaded_by.full_name || doc.uploaded_by.email
                      : doc.uploaded_by
                    : t("unknown") || "Unknown"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "N/A"}</td>

                <td className="px-6 py-4">
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    {t("preview")}
                  </a>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">{t("no_documents_available")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
