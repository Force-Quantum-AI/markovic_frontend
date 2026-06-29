"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setClientSideLanguage } from "@/store/features/language/language.client.slice";
import i18n from "@/i18n";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.clientLanguage.language);

  const handleChange = (value: string) => {
    dispatch(setClientSideLanguage(value));
    i18n.changeLanguage(value);
  };

  // Helper to map current language code to its display label and flag emoji
  const getLanguageDetails = (code: string) => {
    switch (code) {
      case "me":
        return { label: "Montenegrin", flag: "🇲🇪" };
      case "en":
      default:
        return { label: "English", flag: "🇺🇸" }; // or 🇬🇧 depending on region preference
    }
  };

  const current = getLanguageDetails(language);

  return (
    <Select value={language} onValueChange={handleChange}>
      <SelectTrigger className=" max-w-fit mt-1 h-9 gap-2 rounded-md border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none shrink-0" aria-hidden="true">
            {current.flag}
          </span>
          <SelectValue placeholder="Language">
            <span className="hidden md:block">{current.label}</span>
          </SelectValue>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </SelectTrigger>

      <SelectContent align="end" className="rounded-md">
        <SelectItem value="en" className="text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="text-base leading-none">🇺🇸</span> English
          </span>
        </SelectItem>
        <SelectItem value="me" className="text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="text-base leading-none">🇲🇪</span> Montenegrin
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}