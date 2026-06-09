"use client";
import { useState } from "react";
import { Download, AlertCircle, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Privacy() {
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const handleDownload = () => {
    toast.success("Data export started", { description: "Your data is being prepared as a ZIP file." });
  };

  const handleDelete = () => {
    toast.error("Account deleted", { description: "This action cannot be undone." });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Data Export */}
      <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#101828] text-lg font-semibold leading-[28px]">Data Export</h2>
          <p className="text-[#4a5565] text-sm leading-[20px]">
            Download all your data including cases, documents, and account information.
          </p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 border border-[#d1d5dc] h-[44px] px-4 rounded-[10px] text-[#364153] text-sm font-medium w-fit hover:bg-gray-50 transition-colors"
        >
          <Download size={18} />
          Download My Data as ZIP
        </button>
      </div>

      {/* Cookie Preferences */}
      <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl flex flex-col gap-6">
        <h2 className="text-[#101828] text-lg font-semibold leading-[28px]">Cookie Preferences</h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#101828] text-base font-medium">Essential Cookies</span>
              <span className="text-[#4a5565] text-sm">Required for the platform to function</span>
            </div>
            <span className="text-[#667085] text-sm">Always On</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#101828] text-base font-medium">Analytics Cookies</span>
              <span className="text-[#4a5565] text-sm">Help us improve our service</span>
            </div>
            <Switch 
              checked={analyticsCookies} 
              onCheckedChange={setAnalyticsCookies}
              className="data-[state=checked]:bg-[#135576]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[#101828] text-base font-medium">Marketing Cookies</span>
              <span className="text-[#4a5565] text-sm">Used for targeted advertising</span>
            </div>
            <Switch 
              checked={marketingCookies} 
              onCheckedChange={setMarketingCookies}
              className="data-[state=checked]:bg-[#135576]"
            />
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white border border-[#fda29b] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-[#d92d20]" size={20} />
            <h2 className="text-[#101828] text-lg font-semibold">Delete Account</h2>
          </div>
          <p className="text-[#4a5565] text-sm ml-7 mt-[-4px]">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
        <button 
          onClick={handleDelete}
          className="flex items-center gap-2 bg-[#e7000b] hover:bg-[#c2000a] text-white h-[44px] px-5 rounded-[10px] text-sm font-medium w-fit ml-7 mt-1 transition-colors"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>
    </div>
  );
}
