import { CheckCircle2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PackageProps {
  id: string;
  name: string;
  price: number;
  billingCycle: "month" | "yearly";
  devices: number;
  description: string;
  saveText?: string;
  features: string[];
  actionText: string;
  showIcon?: boolean;
}

export default function PackageCard({ 
  plan, 
  onUpdate 
}: { 
  plan: PackageProps; 
  onUpdate?: (plan: PackageProps) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#BEC4D2]/40 p-6 flex flex-col w-[300px] xl:w-[320px] shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-base font-semibold text-[#1A2328]">{plan.name}</h3>
        <span className="text-[13px] font-bold text-[#1A2328]">{plan.devices} Devices</span>
      </div>
      
      <div className="flex items-baseline mb-3">
        <span className="text-[36px] font-bold text-[#135576] leading-none">€{plan.price}</span>
        <span className="text-xs text-slate-500 font-medium ml-1">/{plan.billingCycle}</span>
      </div>
      
      {plan.saveText ? (
        <p className="text-[13px] text-slate-500 mb-5 h-10">{plan.saveText}</p>
      ) : (
        <p className="text-[13px] text-slate-500 mb-5 h-10 leading-relaxed pr-2">{plan.description}</p>
      )}

      <div className="border-t border-[#BEC4D2]/40 pt-4 flex-1">
        <p className="text-[11px] font-bold text-[#1A2328] mb-3">All Features Included:</p>
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-[14px] h-[14px] text-slate-500 shrink-0 mt-[2px]" strokeWidth={1.5} />
              <span className="text-[13px] text-[#4A5568]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button 
        variant="outline" 
        onClick={() => onUpdate?.(plan)}
        className="w-full border-[#135576] text-[#135576] hover:bg-[#135576]/5 hover:text-[#135576] rounded-full font-semibold h-10 mt-auto cursor-pointer"
      >
        {plan.showIcon && <Settings className="w-4 h-4 mr-2" />}
        {plan.actionText}
      </Button>
    </div>
  );
}
