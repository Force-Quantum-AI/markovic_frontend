import { Gavel, Clock3, TrendingUp } from "lucide-react";

interface CaseHealthProps {
  case_name?: string;
  case_number?: string;
  status_name?: string;
  total_hearings?: number;
  total_deadlines?: number;
  case_age_days?: number;
}

export default function CaseHealth({
  case_name = "N/A",
  case_number = "N/A",
  status_name = "Archived",
  total_hearings = 0,
  total_deadlines = 0,
  case_age_days = 0
}: CaseHealthProps) {

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Blue Header Section */}
      <div className="bg-[#135576] p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">Case Health</p>
            <h2 className="text-2xl font-bold">{case_name}</h2>
            <p className="text-sm text-white/80 font-mono">{case_number}</p>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
            {status_name}
          </span>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <Gavel className="w-5 h-5" />
            <span className="text-sm font-medium">Total Hearings</span>
          </div>
          <span className="text-sm font-bold text-[#135576]">{total_hearings}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <Clock3 className="w-5 h-5" />
            <span className="text-sm font-medium">Total Deadlines</span>
          </div>
          <span className="text-sm font-bold text-amber-600">{total_deadlines}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Case Age (Days)</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{case_age_days}</span>
        </div>
      </div>
    </div>
  );
}