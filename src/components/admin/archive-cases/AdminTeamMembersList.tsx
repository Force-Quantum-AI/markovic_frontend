import React from "react";
import { useTranslation } from "react-i18next";

interface Lawyer {
  id: string;
  full_name: string;
  email?: string;
  professional_role?: string | null;
  profile_image?: string | null;
}

interface AdminTeamMembersListProps {
  lawyers?: Lawyer[];
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const getInitialsColor = (initials: string, index: number) => {
  const colors = [
    "bg-[#135576]", // Slate/Blue-grey
    "bg-[#0D9488]", // Teal/Emerald
    "bg-[#7C3AED]", // Purple/Violet
    "bg-[#DC2626]", // Red
    "bg-[#D97706]", // Amber/Orange
  ];
  return colors[index % colors.length];
};

export default function AdminTeamMembersList({ lawyers = [] }: AdminTeamMembersListProps) {
  const { t } = useTranslation("adminArchiveCases");
  return (
    <div className="w-full bg-gray-50/50 rounded-2xl border border-gray-100/80 overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">{t("assigned_lawyer")}</h2>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-5">
        {lawyers && lawyers.length > 0 ? (
          lawyers.map((lawyer, index) => {
            const initials = getInitials(lawyer.full_name);
            const isLead = lawyer.professional_role?.toLowerCase().includes("lead");
            return (
              <div key={lawyer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Initials Avatar */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-sm ${getInitialsColor(initials, index)}`}>
                    {initials}
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{lawyer.full_name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{lawyer.professional_role || "Lawyer"}</p>
                  </div>
                </div>

                {/* Lead Badge */}
                {isLead && (
                  <span className="px-2.5 py-1 bg-[#EBF5FF] text-[#2563EB] rounded-full text-[11px] font-semibold">
                    {t("lead")}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">{t("no_lawyers_assigned")}</p>
        )}
      </div>
    </div>
  );
}
