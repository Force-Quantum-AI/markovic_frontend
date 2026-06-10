"use client";

import { useState, useEffect } from "react";
import { AiSearchFilters } from "@/types/ai";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterX, ChevronDown, Settings2 } from "lucide-react";

interface AiFiltersProps {
  filters: AiSearchFilters;
  setFilters: (filters: AiSearchFilters) => void;
}

// Mock data for select options - replace with actual API calls
const courtOptions = [
  { value: "supreme-court", label: "Supreme Court" },
  { value: "high-court", label: "High Court" },
  { value: "district-court", label: "District Court" },
  { value: "civil-court", label: "Civil Court" },
  { value: "criminal-court", label: "Criminal Court" },
  { value: "family-court", label: "Family Court" },
  { value: "commercial-court", label: "Commercial Court" },
];

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

const categoryOptions = [
  { value: "civil", label: "Civil" },
  { value: "criminal", label: "Criminal" },
  { value: "family", label: "Family" },
  { value: "corporate", label: "Corporate" },
  { value: "constitutional", label: "Constitutional" },
  { value: "labor", label: "Labor" },
  { value: "tax", label: "Tax" },
  { value: "property", label: "Property" },
];

export default function AiFilters({ filters, setFilters }: AiFiltersProps) {
  const [localFilters, setLocalFilters] = useState<AiSearchFilters>(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof AiSearchFilters, value: any) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: AiSearchFilters = {
      category: "",
      court: "",
      year: "",
      minimumSimilarity: 50,
      resentDecisionOnly: true,
      sourceVerified: true,
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  const handleSliderChange = (value: number[]) => {
    handleFilterChange("minimumSimilarity", value[0]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <Settings2 />
        <h3 className="text-lg font-semibold text-gray-900">Refine Results</h3>
      </div>

      {/* Filter Content */}
      <div className="p-5 space-y-6">
        {/* Court Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Court</label>
          <Select
            value={localFilters.court || ""}
            onValueChange={(value) => handleFilterChange("court", value)}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 focus:border-[#135576] focus:ring-[#135576]/20">
              <SelectValue placeholder="Select court" />
            </SelectTrigger>
            <SelectContent>
              {courtOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Decision Year Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Decision Year</label>
          <Select
            value={localFilters.year || ""}
            onValueChange={(value) => handleFilterChange("year", value)}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 focus:border-[#135576] focus:ring-[#135576]/20">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Case Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Case Category</label>
          <Select
            value={localFilters.category || ""}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 focus:border-[#135576] focus:ring-[#135576]/20">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Similarity Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Minimum Similarity
            </label>
            <span className="text-sm font-semibold text-[#135576]">
              {localFilters.minimumSimilarity}%
            </span>
          </div>
          <Slider
            value={[localFilters.minimumSimilarity]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Checkbox Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="recent-decisions"
              checked={localFilters.resentDecisionOnly}
              onCheckedChange={(checked) =>
                handleFilterChange("resentDecisionOnly", checked === true)
              }
              className="border-gray-300 data-[state=checked]:bg-[#135576] data-[state=checked]:border-[#135576]"
            />
            <label
              htmlFor="recent-decisions"
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              Recent Decisions Only
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="source-verified"
              checked={localFilters.sourceVerified}
              onCheckedChange={(checked) =>
                handleFilterChange("sourceVerified", checked === true)
              }
              className="border-gray-300 data-[state=checked]:bg-[#135576] data-[state=checked]:border-[#135576]"
            />
            <label
              htmlFor="source-verified"
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              Source Verified
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-[#135576] hover:bg-[#16a34a] text-white font-semibold py-4! rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Apply Filters
          </Button>
          
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium py-2.5 rounded-xl transition-all duration-200"
          >
            <FilterX className="w-4 h-4 mr-2" />
            Reset All
          </Button>
        </div>

      </div>
    </div>
  );
}