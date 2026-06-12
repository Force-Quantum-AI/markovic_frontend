import PackagesContent from "@/components/admin/subscription/packages/PackagesContent";

export default function PackagesPage() {
  return (
    <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-100">
        <h1 className="text-xl font-bold text-[#1A2328]">Subscriptions</h1>
      </div>
      
      {/* Content Area with slight gray background so white cards pop */}
      <div className="bg-[#F8FAFC] flex-1">
        <PackagesContent />
      </div>
    </div>
  );
}
