import React from "react";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Hearing {
  id: number;
  date: string;
  reason?: string;
  status?: string;
}

interface AdminAllHearingsTableProps {
  hearings?: Hearing[];
}

export default function AdminAllHearingsTable({ hearings = [] }: AdminAllHearingsTableProps) {
  const { t } = useTranslation("adminArchiveCases");
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{t("all_hearings")}</h2>
        <p className="text-sm text-gray-500">{hearings?.length || 0} {t("scheduled_hearings")}</p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {[t("hearing_date") || "HEARING DATE", t("reason") || "REASON", t("status") || "STATUS", t("action") || "ACTION"].map((header) => (
                <th key={header} className="px-6 py-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {hearings && hearings.length > 0 ? hearings.map((hearing) => (
              <tr key={hearing.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{hearing.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{hearing.reason || "N/A"}</td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                    {hearing.status || "N/A"}
                  </span>
                </td>

                {/* Action Column */}
                <td className="px-6 py-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    {t("view")}
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">{t("no_hearings_available")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
