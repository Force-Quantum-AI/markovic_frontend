import React, { useEffect, useMemo } from "react";
import { useLazyGetCategoryDropdownOptionsQuery, useLazyGetSelectDropdownOptionsQuery, useLazyGetSubCategoryDropdownOptionsQuery } from "@/store/features/case/case.api";

type DropdownOption = {
  id: number;
  name: string;
  category?: number;
  category_name?: string;
  created_at?: string;
};

interface SelectFieldProps {
  label: string;
  type: "category" | "subCategory" | "status";
  categoryId?: number;
  value: string;
  onChange: (value: string) => void;
  classes?: string | null;
}

export function SelectField({ label, type, categoryId, value, onChange, classes = null }: SelectFieldProps) {
  const [fetchCategories, { data: categoryData, isLoading: categoryLoading }] = useLazyGetCategoryDropdownOptionsQuery();
  const [fetchSubCategories, { data: subCategoryData, isLoading: subCategoryLoading }] = useLazyGetSubCategoryDropdownOptionsQuery();
  const [fetchStatus, { data: statusData, isLoading: statusLoading }] = useLazyGetSelectDropdownOptionsQuery();

  useEffect(() => {
    if (type === "category" || type === "subCategory") {
      fetchCategories();
    }
  }, [type, fetchCategories]);

  useEffect(() => {
    if (type === "status") {
      fetchStatus(0 as number);
    }
  }, [type, fetchStatus]);

  useEffect(() => {
    if (type === "subCategory" && categoryId) {
      fetchSubCategories(categoryId);
    }
  }, [type, categoryId, fetchSubCategories]);

  const options: DropdownOption[] =
    type === "category"
      ? categoryData ?? []
      : type === "subCategory"
        ? subCategoryData ?? []
        : statusData ?? [];

  const isLoading =
    type === "category"
      ? categoryLoading
      : type === "subCategory"
        ? subCategoryLoading
        : statusLoading;

  return (
    <div className="">
      <label className="mb-1 block text-xs font-medium text-gray-500">
        {label}
      </label>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading || options.length === 0 || type === "subCategory"
          ? !categoryId || isLoading
          : isLoading
        }
        className={`${classes === null ? "w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer transition-all shadow-sm" : classes} `}
      >
        <option value="">{isLoading ? `Loading ${label.toLowerCase()}...` : `Select ${label}`}</option>
        {options.map((option) => (
          <option key={option.id} value={String(option.id)}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
