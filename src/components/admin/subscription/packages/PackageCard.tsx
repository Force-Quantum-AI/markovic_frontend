import { useState } from "react";
import { CheckCircle2, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeletePackageMutation } from "@/store/features/admin/subscriptions/subscriptions.api";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/admin/categories/DeleteConfirmationDialog";
import { useTranslation } from "react-i18next";

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
  isVisible?: boolean;
}

export default function PackageCard({ 
  plan, 
  onUpdate 
}: { 
  plan: PackageProps; 
  onUpdate?: (plan: PackageProps) => void;
}) {
  const { t } = useTranslation("adminSubscriptionPackages");
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading(`Deleting package "${plan.name}"...`);
    try {
      await deletePackage({ id: plan.id }).unwrap();
      toast.success(`Package "${plan.name}" deleted successfully!`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete package. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#BEC4D2]/40 p-6 flex flex-col w-[300px] xl:w-[320px] shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-[#1A2328]">{plan.name}</h3>
          {plan.isVisible !== undefined && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              plan.isVisible 
                ? "bg-[#D0FAE5] text-[#007A55]" 
                : "bg-gray-100 text-gray-500"
            }`}>
              {plan.isVisible ? t("enabled") : t("disabled")}
            </span>
          )}
        </div>
        <span className="text-[13px] font-bold text-[#1A2328]">
          {plan.devices === 1 ? t("device") || "1 Device" : t("devices", { count: plan.devices })}
        </span>
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
        <p className="text-[11px] font-bold text-[#1A2328] mb-3">{t("all_features_included")}</p>
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-[14px] h-[14px] text-slate-500 shrink-0 mt-[2px]" strokeWidth={1.5} />
              <span className="text-[13px] text-[#4A5568]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 w-full mt-auto">
        <Button 
          variant="outline" 
          onClick={() => onUpdate?.(plan)}
          className="w-full border-[#135576] text-[#135576] hover:bg-[#135576]/5 hover:text-[#135576] rounded-full font-semibold h-12 cursor-pointer flex items-center justify-center gap-2"
        >
          {plan.showIcon && <Settings className="w-4 h-4" />}
          <span>{plan.actionText}</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsDeleteDialogOpen(true)}
          disabled={isDeleting}
          className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/5 hover:text-[#EF4444] rounded-full font-semibold h-12 cursor-pointer flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t("delete_package")}</span>
        </Button>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={t("delete_subscription_package")}
        description={t("delete_package_confirm_desc", { name: plan.name })}
        onConfirm={handleDelete}
        isSubmitting={isDeleting}
      />
    </div>
  );
}
