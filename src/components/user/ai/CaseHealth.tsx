import { Gavel, Clock3, TrendingUp } from "lucide-react";

export default function CaseHealth() {
  // Dummy data representing the case health status
  const caseData = {
    title: "Johnson v. Meridian",
    caseId: "LIT-2024-00847",
    status: "Active",
    progress: 100,
    totalHearings: 14,
    deadline: "Mar 10, 2026",
    caseAge: "452 days"
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Blue Header Section */}
      <div className="bg-[#135576] p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">Case Health</p>
            <h2 className="text-2xl font-bold">{caseData.title}</h2>
            <p className="text-sm text-white/80 font-mono">{caseData.caseId}</p>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
            {caseData.status}
          </span>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Case Progress</span>
            <span>{caseData.progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full" 
              style={{ width: `${caseData.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <Gavel className="w-5 h-5" />
            <span className="text-sm font-medium">Total Hearing</span>
          </div>
          <span className="text-sm font-bold text-[#135576]">{caseData.totalHearings}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <Clock3 className="w-5 h-5" />
            <span className="text-sm font-medium">Case Deadline</span>
          </div>
          <span className="text-sm font-bold text-amber-600">{caseData.deadline}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Case Age</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{caseData.caseAge}</span>
        </div>
      </div>
    </div>
  );
}