"use client";

import { useState } from "react";
import { X, ChevronDown, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminButton from "@/components/shared/AdminButton";

interface AddCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subcategoryOptions: { value: string; label: string }[];
}

export default function AddCategoryDialog({
  isOpen,
  onOpenChange,
  subcategoryOptions,
}: AddCategoryDialogProps) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCategory("");
    setSubcategory("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[560px] w-full bg-white rounded-3xl p-8 border-none shadow-2xl"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <DialogTitle className="text-[#101828] font-roboto text-[24px] font-bold text-center mb-6">
          Add Category & Sub-Category
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
              Category
            </label>
            <input
              type="text"
              placeholder="Add your category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
              Sub-Category
            </label>
            <Select
              value={subcategory || undefined}
              onValueChange={setSubcategory}
            >
              <SelectTrigger className="w-full h-12 rounded-[32px] border border-[#BEC4D2] bg-[#F5F6F7] px-5 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all">
                <SelectValue placeholder="Add your Sub-Category..." />
                <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={4}
                className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#101828] font-roboto min-w-[var(--radix-select-trigger-width)]"
              >
                {subcategoryOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#101828] py-2.5 px-4 text-[14px]"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Info className="w-4 h-4 text-[#135576] flex-shrink-0 mt-0.5" />
            <p className="text-[#135576] font-roboto text-[13px] font-normal leading-[18px] italic">
              Categories and subcategories can be added independently.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <AdminButton
              type="submit"
              label="Update Changes"
              className="px-7 py-3"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
