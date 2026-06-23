"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Scale, BookOpen, Info, FileText } from "lucide-react";
import { useGetSingleLawsQuery } from "@/store/features/admin/laws-database/laws.api";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "@/store/features/admin/category-subcategory/category.api";

interface ViewLawDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lawId: string | number;
}

export default function ViewLawDetailsDialog({
  isOpen,
  onOpenChange,
  lawId,
}: ViewLawDetailsDialogProps) {
  const {
    data: lawDetails,
    isLoading,
    isError,
  } = useGetSingleLawsQuery({ id: lawId }, { skip: !isOpen || !lawId });

  const { data: categories } = useGetAllCategoriesQuery(undefined, { skip: !isOpen });
  const { data: subcategories } = useGetAllSubCategoriesQuery(undefined, { skip: !isOpen });

  const categoryName = lawDetails
    ? categories?.find((c) => Number(c.id) === Number(lawDetails.category))?.name || "N/A"
    : "N/A";

  const subCategoryName = lawDetails
    ? subcategories?.find((s) => Number(s.id) === Number(lawDetails.sub_category))?.name || "N/A"
    : "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[700px] md:max-w-[800px] lg:max-w-[850px] w-full bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col focus:outline-none font-roboto"
      >
        {/* Close Button */}
        <DialogClose asChild>
          <button className="absolute top-5 right-5 text-gray-400 hover:text-[#135576] hover:bg-slate-50 hover:rotate-90 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer z-50">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        {/* Dialog Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#135576]/10 flex items-center justify-center text-[#135576]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <DialogTitle className="text-[20px] md:text-[22px] font-bold text-[#101828] font-roboto">
              Law Details
            </DialogTitle>
            <p className="text-xs text-gray-500">Read-only view of the database entry</p>
          </div>
        </div>

        {/* Main Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-roboto flex-1">
            <div className="w-8 h-8 border-4 border-[#135576] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">Loading law details...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500 font-roboto flex-1">
            <Info className="w-10 h-10 mb-2 text-red-400" />
            <p className="text-sm font-medium">Failed to load law details. Please try again.</p>
          </div>
        ) : lawDetails ? (
          <div className="overflow-y-auto flex-1 pr-2 space-y-6 custom-scrollbar text-[#101828]">
            
            {/* Title & Gazette */}
            <div className="space-y-2 bg-[#F9FAFB] p-5 rounded-2xl border border-gray-100">
              <h3 className="text-[22px] font-bold text-[#101828] leading-snug">
                {lawDetails.title}
              </h3>
              {lawDetails.official_gazette && (
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Official Gazette: {lawDetails.official_gazette}</span>
                </div>
              )}
            </div>

            {/* Metadata Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Category</span>
                <span className="text-sm font-medium text-gray-800">{categoryName}</span>
              </div>
              <div className="space-y-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Subcategory</span>
                <span className="text-sm font-medium text-gray-800">{subCategoryName}</span>
              </div>
            </div>

            {/* Source */}
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block pl-1">Source / Reference</span>
              <div className="p-4 rounded-xl bg-white border border-gray-200 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {lawDetails.source || "No source specified"}
              </div>
            </div>

            <div className="border-t border-gray-100 my-6" />

            {/* Sections & Articles */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#135576]" />
                <h4 className="text-lg font-bold text-[#135576]">Sections & Articles</h4>
              </div>

              {!lawDetails.sections || lawDetails.sections.length === 0 ? (
                <p className="text-sm text-gray-500 italic pl-1">This law has no sections or articles defined.</p>
              ) : (
                <div className="space-y-6">
                  {lawDetails.sections.map((section, sIdx) => (
                    <div
                      key={sIdx}
                      className="border border-[#EFF1F4] rounded-2xl overflow-hidden shadow-xs bg-white"
                    >
                      <div className="bg-[#EFF1F4]/60 p-4 border-b border-[#EFF1F4] flex justify-between items-center">
                        <span className="text-[15px] font-bold text-[#135576]">
                          {section.title || `Section ${sIdx + 1}`}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white text-gray-500 font-medium">
                          Order: {section.order}
                        </span>
                      </div>

                      <div className="p-4 md:p-5 divide-y divide-gray-100">
                        {!section.articles || section.articles.length === 0 ? (
                          <p className="text-sm text-gray-400 italic py-2">No articles in this section.</p>
                        ) : (
                          section.articles.map((article, aIdx) => (
                            <div
                              key={aIdx}
                              className="py-4 first:pt-0 last:pb-0 space-y-2 flex flex-col items-start"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="font-semibold text-[15px] text-gray-800">
                                  {article.title || `Article ${aIdx + 1}`}
                                </span>
                                <span className="text-[11px] text-gray-400">
                                  Order: {article.order}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {article.description || "No description provided."}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : null}

        {/* Dialog Footer Actions */}
        <div className="flex items-center justify-end w-full mt-6 pt-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-6 h-11 rounded-full bg-[#135576] hover:bg-[#135576]/90 text-white text-sm font-semibold transition-all cursor-pointer focus:outline-none active:scale-95 flex items-center justify-center gap-1.5"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
