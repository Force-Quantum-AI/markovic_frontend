"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Plus, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminButton from "@/components/shared/AdminButton";
import { Law } from "./LawCard";

interface Article {
  name: string;
  description: string;
}

interface Section {
  name: string;
  articles: Article[];
}

interface AddLawDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (newLaw: Law) => void;
}

export default function AddLawDialog({
  isOpen,
  onOpenChange,
  onAdd,
}: AddLawDialogProps) {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [gazette, setGazette] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [sections, setSections] = useState<Section[]>([
    {
      name: "",
      articles: [
        {
          name: "",
          description: "",
        },
      ],
    },
  ]);

  const handleSectionNameChange = (sIdx: number, val: string) => {
    setSections((prev) =>
      prev.map((sec, idx) => (idx === sIdx ? { ...sec, name: val } : sec)),
    );
  };

  const handleArticleNameChange = (sIdx: number, aIdx: number, val: string) => {
    setSections((prev) =>
      prev.map((sec, sIdx2) => {
        if (sIdx2 === sIdx) {
          return {
            ...sec,
            articles: sec.articles.map((art, aIdx2) =>
              aIdx2 === aIdx ? { ...art, name: val } : art,
            ),
          };
        }
        return sec;
      }),
    );
  };

  const handleArticleDescChange = (sIdx: number, aIdx: number, val: string) => {
    setSections((prev) =>
      prev.map((sec, sIdx2) => {
        if (sIdx2 === sIdx) {
          return {
            ...sec,
            articles: sec.articles.map((art, aIdx2) =>
              aIdx2 === aIdx ? { ...art, description: val } : art,
            ),
          };
        }
        return sec;
      }),
    );
  };

  const handleAddArticle = (sIdx: number) => {
    setSections((prev) =>
      prev.map((sec, idx) => {
        if (idx === sIdx) {
          return {
            ...sec,
            articles: [
              ...sec.articles,
              { name: `Article ${sec.articles.length + 1}`, description: "" },
            ],
          };
        }
        return sec;
      }),
    );
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        name: `Section ${prev.length + 1}`,
        articles: [{ name: "Article 1", description: "" }],
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !source) return;

    const categoryMapping: Record<string, string> = {
      "Civil Litigation": "Civil Law",
      "Criminal Defense": "Criminal Law",
      "Administrative Law": "Procedural Law",
    };

    const newLaw: Law = {
      id: String(Date.now()),
      title,
      gazette,
      lastUpdate: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      category: categoryMapping[category] || "Civil Law",
    };

    onAdd(newLaw);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[700px] md:max-w-[800px] lg:max-w-[850px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col focus:outline-none"
      >
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <DialogTitle className="text-[24px] font-bold text-center text-[#101828] font-roboto mt-2 mb-6 shrink-0">
          Add Law/Bylaw
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full font-roboto overflow-y-auto pr-2 flex-1 custom-scrollbar"
        >
          <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
            <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
              Title<span className="text-[#EF4444]">*</span>:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Law on Obligations"
              className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
            <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
              Source<span className="text-[#EF4444]">*</span>:
            </label>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. Official Gazette of the Republic of Montenegro, No. 031/06..."
              className="w-full rounded-[24px] border border-[#BEC4D2] bg-white p-[14px_16px] min-h-[100px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
            <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
              Official Gazette:
            </label>
            <input
              type="text"
              value={gazette}
              onChange={(e) => setGazette(e.target.value)}
              placeholder="e.g. 031/17 of 05/12/2017"
              className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
                Category:
              </label>
              <Select value={category || undefined} onValueChange={setCategory}>
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all">
                  <SelectValue placeholder="Category" />
                  <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]"
                >
                  <SelectItem
                    value="Civil Litigation"
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                  >
                    Civil Litigation
                  </SelectItem>
                  <SelectItem
                    value="Criminal Defense"
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                  >
                    Criminal Defense
                  </SelectItem>
                  <SelectItem
                    value="Administrative Law"
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                  >
                    Administrative Law
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
              <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
                Subcategory:
              </label>
              <Select
                value={subcategory || undefined}
                onValueChange={setSubcategory}
              >
                <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all">
                  <SelectValue placeholder="Subcategory" />
                  <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]"
                >
                  <SelectItem
                    value="Traffic Accident Damages"
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                  >
                    Traffic Accident Damages
                  </SelectItem>
                  <SelectItem
                    value="Contract Disputes"
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                  >
                    Contract Disputes
                  </SelectItem>
                  <SelectItem
                    value="Property Disputes"
                    className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                  >
                    Property Disputes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full border-t border-[#BEC4D2] my-6" />

          <div className="border p-2 md:p-3 rounded-xl border-[#EFF1F4]">
            {sections.map((section, sIdx) => (
              <div
                key={sIdx}
                className="w-full space-y-6 border-b border-[#BEC4D2]/30 pb-6 last:border-0"
              >
                <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                  <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
                    Sections:
                  </label>
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) =>
                      handleSectionNameChange(sIdx, e.target.value)
                    }
                    placeholder="e.g. I. BASIC PROVISIONS"
                    className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
                  />
                </div>

                {section.articles.map((article, aIdx) => (
                  <div
                    key={aIdx}
                    className="w-full space-y-6 pt-4 flex flex-col items-start"
                  >
                    <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                      <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
                        Article:
                      </label>
                      <input
                        type="text"
                        value={article.name}
                        onChange={(e) =>
                          handleArticleNameChange(sIdx, aIdx, e.target.value)
                        }
                        placeholder="e.g. Article 1"
                        className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                      <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
                        Description:
                      </label>
                      <textarea
                        value={article.description}
                        onChange={(e) =>
                          handleArticleDescChange(sIdx, aIdx, e.target.value)
                        }
                        placeholder="Type article description..."
                        className="w-full rounded-[24px] border border-[#BEC4D2] bg-white p-[14px_16px] min-h-[100px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddArticle(sIdx)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-700 rounded-full border border-gray-200 text-xs font-semibold cursor-pointer transition-all focus:outline-none active:scale-95 animate-fade-in"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add new article</span>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center w-full pt-4">
            <button
              type="button"
              onClick={handleAddSection}
              className="flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#EFF1F4] hover:bg-[#E2E8F0] text-[#135576] rounded-full border border-[#DDE0E7] text-sm font-semibold cursor-pointer transition-all focus:outline-none active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add new section</span>
            </button>
          </div>

          <div className="flex justify-center pt-4">
            <AdminButton
              type="submit"
              label="Update"
              className="px-12 py-3 w-[160px]"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
