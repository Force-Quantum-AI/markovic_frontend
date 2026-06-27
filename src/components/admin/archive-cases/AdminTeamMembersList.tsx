import React from "react";

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
    "bg-slate-700",
    "bg-teal-600",
    "bg-violet-600",
    "bg-red-600",
    "bg-orange-600",
    "bg-pink-600",
    "bg-cyan-600",
    "bg-emerald-600",
  ];
  return colors[index % colors.length];
};

export default function AdminTeamMembersList({ lawyers = [] }: AdminTeamMembersListProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Responsible Lawyers</h2>

      <div className="space-y-6">
        {lawyers && lawyers.length > 0 ? (
          lawyers.map((lawyer, index) => {
            const initials = getInitials(lawyer.full_name);
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
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No lawyers assigned</p>
        )}
      </div>
    </div>
  );
}
