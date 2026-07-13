import React from "react";
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
  const { t, i18n } = useTranslation("adminArchiveCases");
  const isMontenegrin = i18n.language === "me";

  const parseDateStr = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    
    // Check if it's DD/MM/YYYY or MM/DD/YYYY format
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month, day);
        }
      }
    }
    
    // Fallback to standard Date constructor
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d;
    }
    
    return null;
  };

  const formatHearingDate = (dateStr: string) => {
    if (!dateStr) return { date: "N/A", time: "" };
    
    const d = parseDateStr(dateStr);
    if (!d) return { date: dateStr, time: "" };

    let dateFormatted = "";
    if (isMontenegrin) {
      dateFormatted = new Intl.DateTimeFormat("sr-RS", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(d);
    } else {
      dateFormatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(d);
    }

    // Check if string contains time info
    const hasTimeInfo = dateStr.includes(":") || dateStr.toLowerCase().includes("t");
    
    let startTime = "";
    let endTime = "";
    
    if (hasTimeInfo) {
      const hours = d.getHours();
      const minutes = d.getMinutes();
      
      if (isMontenegrin) {
        startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const endD = new Date(d.getTime() + 60 * 60 * 1000);
        endTime = `${endD.getHours().toString().padStart(2, '0')}:${endD.getMinutes().toString().padStart(2, '0')}`;
      } else {
        const ampm = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        startTime = `${displayHours}:${displayMinutes}${ampm}`;
        
        const endD = new Date(d.getTime() + 60 * 60 * 1000);
        const endHours = endD.getHours();
        const endMinutes = endD.getMinutes();
        const endAmpm = endHours >= 12 ? 'pm' : 'am';
        const endDisplayHours = endHours % 12 || 12;
        const endDisplayMinutes = endMinutes.toString().padStart(2, '0');
        endTime = `${endDisplayHours}:${endDisplayMinutes}${endAmpm}`;
      }
    } else {
      // Default time range if not provided, to follow the visual design of the image
      startTime = isMontenegrin ? "09:30" : "9:30am";
      endTime = isMontenegrin ? "10:30" : "10:30am";
    }

    return {
      date: dateFormatted,
      time: `${startTime} - ${endTime}`
    };
  };

  const getStatusStyles = (status?: string) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes("complete") || s.includes("held") || s.includes("završeno")) {
      return "text-[#16a34a] font-semibold text-sm";
    }
    if (s.includes("postpone") || s.includes("odloženo")) {
      return "text-[#d97706] font-semibold text-sm";
    }
    if (s.includes("upcom") || s.includes("predstoje")) {
      return "text-blue-600 font-semibold text-sm";
    }
    return "text-slate-600 font-semibold text-sm";
  };

  const displayStatus = (status?: string) => {
    if (!status) return "N/A";
    const s = status.toLowerCase();
    
    if (s === "upcoming") return t("upcoming", "Upcoming");
    if (s === "completed") return t("completed", "Completed");
    if (s === "postponed") return t("postponed", "Postponed");
    if (s === "held") return t("held", "Held");
    
    return status.charAt(0).toUpperCase() + status.slice(1);
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
        <h2 className="text-2xl font-bold text-[#1e293b]">{t("all_hearings")}</h2>
        <p className="text-sm text-slate-500 mt-1">{t("view_all_hearings", "View all hearings")}</p>
      </div>

      {/* Desktop Table Container Card */}
      <div className="hidden md:block w-full bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#eef2f6]">
                <th className="px-6 py-4 border-b border-r border-slate-200 text-left text-sm font-semibold text-slate-600 w-1/3">
                  {formatHeader(t("hearing_date") || "Hearing Date")}
                </th>
                <th className="px-6 py-4 border-b border-r border-slate-200 text-left text-sm font-semibold text-slate-600 w-1/2">
                  {formatHeader(t("reason") || "Reason")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-600">
                  {formatHeader(t("status") || "Status")}
                </th>
              </tr>
            </thead>

            <tbody>
              {hearings && hearings.length > 0 ? (
                hearings.map((hearing, idx) => {
                  const isLast = idx === hearings.length - 1;
                  const borderBottomClass = isLast ? "" : "border-b border-slate-200";
                  const { date, time } = formatHearingDate(hearing.date);

                  return (
                    <tr key={hearing.id} className="hover:bg-slate-50/30 transition-colors">
                      {/* Date & Time Column */}
                      <td className={`px-6 py-4 border-r border-slate-200 ${borderBottomClass} text-left`}>
                        <div className="text-slate-800 font-bold text-[15px]">{date}</div>
                        {time && <div className="text-slate-400 font-semibold text-[11px] mt-1">{time}</div>}
                      </td>

                      {/* Reason Column */}
                      <td className={`px-6 py-4 border-r border-slate-200 ${borderBottomClass} text-left text-sm text-slate-700 leading-relaxed`}>
                        {hearing.reason || "N/A"}
                      </td>

                      {/* Status Column */}
                      <td className={`px-6 py-4 ${borderBottomClass} text-left`}>
                        <span className={getStatusStyles(hearing.status)}>
                          {displayStatus(hearing.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-500 bg-white">
                    {t("no_hearings_available")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view: Cards layout */}
      <div className="block md:hidden space-y-4">
        {hearings && hearings.length > 0 ? (
          hearings.map((hearing) => {
            const { date, time } = formatHearingDate(hearing.date);
            return (
              <div key={hearing.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="text-slate-800 font-bold text-base">{date}</div>
                    {time && <div className="text-slate-400 font-semibold text-xs mt-0.5">{time}</div>}
                  </div>
                  <span className={getStatusStyles(hearing.status)}>
                    {displayStatus(hearing.status)}
                  </span>
                </div>
                <div className="text-sm text-slate-700 leading-relaxed bg-[#eef2f6]/40 p-3 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-400 text-[10px] block mb-1 uppercase tracking-wider">
                    {formatHeader(t("reason") || "Reason")}
                  </span>
                  {hearing.reason || "N/A"}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-sm text-slate-500 shadow-sm">
            {t("no_hearings_available")}
          </div>
        )}
      </div>
    </div>
  );
}
