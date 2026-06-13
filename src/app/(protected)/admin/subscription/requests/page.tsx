import RequestsContent from "@/components/admin/subscription/requests/RequestsContent";

export default function RequestsPage() {
  return (
    <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden font-roboto">
      <div className="bg-white px-6 py-5 border-b border-slate-100">
        <h1 className="text-xl font-bold text-[#1A2328]">Custom Subscriptions Request</h1>
      </div>

      <div className="bg-[#F8FAFC] flex-1">
        <RequestsContent />
      </div>
    </div>
  );
}

