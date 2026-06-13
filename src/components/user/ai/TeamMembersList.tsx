import React from "react";

// ─── DUMMY DATASET ─────────────────────────────────────────────────────────

const teamMembers = [
  { id: 1, name: "Sarah Mitchell", role: "Lead Lawyer", initials: "SM", isLead: true },
  { id: 2, name: "James Chen", role: "Associate Lawyer", initials: "JC", isLead: false },
  { id: 3, name: "Emily Torres", role: "Paralegal", initials: "ET", isLead: false },
  { id: 4, name: "Robert Kim", role: "Case Manager", initials: "RK", isLead: false },
  { id: 5, name: "Lisa Park", role: "Legal Assistant", initials: "LP", isLead: false },
];

// Helper to assign background colors to initials
const getInitialsColor = (initials: string) => {
  const colors: Record<string, string> = {
    "SM": "bg-slate-700",
    "JC": "bg-teal-600",
    "ET": "bg-violet-600",
    "RK": "bg-red-600",
    "LP": "bg-orange-600",
  };
  return colors[initials] || "bg-gray-400";
};

export default function TeamMembersList() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Team Members</h2>
      
      <div className="space-y-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Initials Avatar */}
              <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-sm ${getInitialsColor(member.initials)}`}>
                {member.initials}
              </div>
              
              {/* Name and Role */}
              <div>
                <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{member.role}</p>
              </div>
            </div>

            {/* Lead Badge */}
            {member.isLead && (
              <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Lead
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}