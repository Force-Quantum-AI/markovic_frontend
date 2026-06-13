"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasedSelectOption {
  value: string;
  label: string;
}

interface BasedSelectProps {
  label: string;
  placeholder: string;
  options: BasedSelectOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function BasedSelect({
  label,
  placeholder,
  options,
  value,
  onValueChange,
}: BasedSelectProps) {
  // Treat "all" or empty string as undefined to trigger Radix placeholder styling
  const selectValue = value === "all" || !value ? undefined : value;

  return (
    <div className="space-y-1.5">
      <label className="block text-[14px] font-medium text-[#344054] font-roboto pl-2">
        {label}
      </label>
      <Select value={selectValue} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
          <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={4}
          className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#101828] font-roboto min-w-[var(--radix-select-trigger-width)]"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="rounded-xl cursor-pointer py-2.5 px-4 text-[14px] focus:bg-[#EFF1F4] focus:text-[#101828]"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
