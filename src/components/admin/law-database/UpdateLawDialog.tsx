"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminButton from "@/components/shared/AdminButton";
import { LawDetails } from "@/store/features/admin/laws-database/laws.type";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "@/store/features/admin/category-subcategory/category.api";
import { useGetSingleLawsQuery } from "@/store/features/admin/laws-database/laws.api";
import { useTranslation } from "react-i18next";

interface DialogSection {
  name: string;
  articles: { name: string; description: string }[];
}

interface UpdateLawDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lawId: string | number;
  onUpdate: (lawId: string | number, updatedLaw: LawDetails) => void;
}

export default function UpdateLawDialog({
  isOpen,
  onOpenChange,
  lawId,
  onUpdate,
}: UpdateLawDialogProps) {
  const { t } = useTranslation("adminLawDatabase");
  const {
    data: lawDetails,
    isLoading,
    isError,
  } = useGetSingleLawsQuery({ id: lawId }, { skip: !isOpen || !lawId });

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
          {t("update_law")}
        </DialogTitle>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-roboto flex-1">
            <div className="w-8 h-8 border-4 border-[#135576] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">{t("loading_details")}</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500 font-roboto flex-1">
            <p className="text-sm font-medium">
              {t("failed_load_details")}
            </p>
          </div>
        ) : lawDetails ? (
          <UpdateLawForm
            key={JSON.stringify(lawDetails)}
            lawDetails={lawDetails}
            lawId={lawId}
            onUpdate={onUpdate}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface UpdateLawFormProps {
  lawDetails: LawDetails;
  lawId: string | number;
  onUpdate: (lawId: string | number, updatedLaw: LawDetails) => void;
  onOpenChange: (open: boolean) => void;
}

function UpdateLawForm({
  lawDetails,
  lawId,
  onUpdate,
  onOpenChange,
}: UpdateLawFormProps) {
  const { t } = useTranslation("adminLawDatabase");
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: allSubCategories } = useGetAllSubCategoriesQuery();

  const [title, setTitle] = useState(lawDetails.title || "");
  const [source, setSource] = useState(lawDetails.source || "");
  const [gazette, setGazette] = useState(lawDetails.official_gazette || "");
  const [category, setCategory] = useState(
    lawDetails.category ? String(lawDetails.category) : "",
  );
  const [subcategory, setSubcategory] = useState(
    lawDetails.sub_category ? String(lawDetails.sub_category) : "",
  );
  const [sections, setSections] = useState<DialogSection[]>(() => {
    if (lawDetails.sections) {
      return lawDetails.sections.map((sec) => ({
        name: sec.title || "",
        articles: sec.articles.map((art) => ({
          name: art.title || "",
          description: art.description || "",
        })),
      }));
    }
    return [];
  });

  // Filter subcategories based on selected category
  const filteredSubCategories =
    allSubCategories?.filter((sub) => sub.category === Number(category)) || [];

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSubcategory("");
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !source) return;

    const lawData: LawDetails = {
      title,
      source,
      official_gazette: gazette,
      category: Number(category),
      sub_category: Number(subcategory),
      sections: sections.map((sec, sIdx) => ({
        title: sec.name,
        order: sIdx + 1,
        articles: sec.articles.map((art, aIdx) => ({
          title: art.name,
          description: art.description,
          order: aIdx + 1,
        })),
      })),
    };

    onUpdate(lawId, lawData);
    onOpenChange(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full font-roboto overflow-y-auto p-1 flex-1 custom-scrollbar"
    >
      <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
        <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
          {t("title_label")}<span className="text-[#EF4444]">*</span>:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("title_required") || "Law on Obligations"}
          className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
        <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
          {t("source_label")}<span className="text-[#EF4444]">*</span>:
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
          {t("official_gazette")}
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
            {t("category_label") || "Category:"}
          </label>
          <Select
            value={category || undefined}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all">
              <SelectValue placeholder={t("category") || "Category"} />
              <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={4}
              className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]"
            >
              {categories?.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={String(cat.id)}
                  className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
          <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
            {t("subcategory_label") || "Subcategory:"}
          </label>
          <Select
            value={subcategory || undefined}
            onValueChange={setSubcategory}
            disabled={!category}
          >
            <SelectTrigger className="w-full h-[50px] rounded-[32px] border border-[#BEC4D2] bg-white p-[14px_16px] text-[#161A20] font-roboto text-[16px] font-normal focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue
                placeholder={
                  category ? t("subcategory") || "Subcategory" : t("select_category_first") || "Select category first"
                }
              />
              <ChevronDown className="ml-auto w-5 h-5 shrink-0 text-[#9CA6BB]" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={4}
              className="z-[9999] bg-white border border-[#BEC4D2] rounded-2xl shadow-lg p-1 text-[#161A20] font-roboto min-w-[var(--radix-select-trigger-width)]"
            >
              {filteredSubCategories.map((sub) => (
                <SelectItem
                  key={sub.id}
                  value={String(sub.id)}
                  className="rounded-xl cursor-pointer hover:bg-[#EFF1F4] focus:bg-[#EFF1F4] focus:text-[#161A20] py-2.5 px-4 text-[14px]"
                >
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full border-t border-[#BEC4D2] my-6" />

      {sections.length > 0 && (
        <div className="border p-2 md:p-3 rounded-xl border-[#EFF1F4]">
          {sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="w-full space-y-6 border-b border-[#BEC4D2]/30 pb-6 last:border-0"
            >
              <div className="space-y-1.5 w-full flex flex-col items-start font-roboto">
                <label className="block text-[#667085] font-roboto text-[14px] font-medium leading-[140%]">
                  {t("sections_label") || "Sections:"}
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
                      {t("article_label") || "Article:"}
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
                      {t("description_label") || "Description:"}
                    </label>
                    <textarea
                      value={article.description}
                      onChange={(e) =>
                        handleArticleDescChange(sIdx, aIdx, e.target.value)
                      }
                      placeholder={t("no_description") || "Type article description..."}
                      className="w-full rounded-[24px] border border-[#BEC4D2] bg-white p-[14px_16px] min-h-[100px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] placeholder:text-[#161A20]/60 focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <AdminButton
          type="submit"
          label={t("update_law")}
          className="px-12 py-3 w-[160px]"
        />
      </div>
    </form>
  );
}
