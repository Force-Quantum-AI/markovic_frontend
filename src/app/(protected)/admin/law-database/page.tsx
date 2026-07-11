"use client";

import { useState, useMemo, useEffect } from "react";
import { Scale } from "lucide-react";
import { jsPDF } from "jspdf";
import LawCard, { Law } from "@/components/admin/law-database/LawCard";
import LawFilters from "@/components/admin/law-database/LawFilters";
import AddLawDialog from "@/components/admin/law-database/AddLawDialog";
import UpdateLawDialog from "@/components/admin/law-database/UpdateLawDialog";
import DeleteLawDialog from "@/components/admin/law-database/DeleteLawDialog";
import { toast } from "sonner";
import { LawDatabaseSkeleton } from "@/components/admin/admin-skeletons";
import {
  useGetAllLawsQuery,
  useCreateLawMutation,
  useUpdateLawsMutation,
  useDeleteLawsMutation,
  useLazyExportLawsQuery,
} from "@/store/features/admin/laws-database/laws.api";
import { LawDetails } from "@/store/features/admin/laws-database/laws.type";

import { parseCSVToLawDetails, generateLawPDF } from "./utils";
import { useGetAllCategoriesQuery } from "@/store/features/admin/category-subcategory/category.api";
import ViewLawDetailsDialog from "@/components/admin/law-database/ViewLawDetailsDialog";
import { useTranslation } from "react-i18next";

export default function LawDatabasePage() {
  const { t } = useTranslation("adminLawDatabase");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: allLaws, isLoading, isError } = useGetAllLawsQuery({
    title: debouncedSearch || undefined,
  });
  const [createLaw] = useCreateLawMutation();
  const [updateLaw] = useUpdateLawsMutation();
  const [deleteLaw, { isLoading: isDeleting }] = useDeleteLawsMutation();
  const [triggerExport] = useLazyExportLawsQuery();
  const { data: categories } = useGetAllCategoriesQuery();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);

  const laws = useMemo(() => {
    return allLaws?.results.map((item) => ({
      id: String(item.id),
      title: item.title,
      gazette: item.official_gazette,
      lastUpdate: item.last_updated,
      category: item.category_name,
    })) || [];
  }, [allLaws]);

  const filterCategories = useMemo(() => {
    const apiCatNames = categories?.map((cat) => cat.name) || [];
    const lawCatNames = laws
      .map((law) => law.category)
      .filter((cat): cat is string => !!cat);
    return Array.from(new Set([...apiCatNames, ...lawCatNames])).sort();
  }, [categories, laws]);

  const filteredLaws = useMemo(() => {
    return laws.filter((law) => {
      const lawTitle = law.title || "";
      const lawGazette = law.gazette || "";
      const lawCategory = law.category || "";

      const matchesSearch =
        lawTitle.toLowerCase().includes(search.toLowerCase()) ||
        lawGazette.toLowerCase().includes(search.toLowerCase()) ||
        lawCategory.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        categoryFilter === "all" ||
        lawCategory.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [laws, search, categoryFilter]);

  const handleExportSingleLaw = async (law: Law) => {
    const toastId = toast.loading(t("exporting_single_law", { title: law.title }) || `Exporting "${law.title}" as PDF...`);
    try {
      const result = await triggerExport({ id: law.id }).unwrap();
      const parsed = parseCSVToLawDetails(result);
      generateLawPDF(parsed);
      toast.success(t("export_single_success", { title: law.title }) || `"${law.title}" exported as PDF successfully!`, { id: toastId });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(t("export_single_failed") || "Failed to export law as PDF. Please try again.", { id: toastId });
    }
  };

  // const handleExportSingleLawCSV = async (law: Law) => {
  //   const toastId = toast.loading(`Exporting "${law.title}" as CSV...`);
  //   try {
  //     const result = await triggerExport({ id: law.id }).unwrap();
  //     downloadCSVFile(result, `${law.title.replace(/\s+/g, "_")}_export.csv`);
  //     toast.success(`"${law.title}" exported as CSV successfully!`, { id: toastId });
  //   } catch (error) {
  //     console.error("Export failed:", error);
  //     toast.error("Failed to export law as CSV. Please try again.", { id: toastId });
  //   }
  // };

  const handleExport = async () => {
    if (filteredLaws.length === 0) {
      toast.error(t("no_laws_export") || "No laws available to export.");
      return;
    }
    const toastId = toast.loading(t("exporting_db") || "Exporting laws database as PDF...");
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      let firstLaw = true;

      for (const law of filteredLaws) {
        const result = await triggerExport({ id: law.id }).unwrap();
        const parsed = parseCSVToLawDetails(result);

        if (!firstLaw) {
          doc.addPage();
        } else {
          firstLaw = false;
        }

        let y = margin;

        const checkPageBreak = (neededHeight: number) => {
          if (y + neededHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
        };

        // Title
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 0);
        const titleLines = doc.splitTextToSize(parsed.title || "Law Document", contentWidth);
        const titleHeight = titleLines.length * 8;
        checkPageBreak(titleHeight + 10);
        doc.text(titleLines, margin, y);
        y += titleHeight + 10;

        // Metadata
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        
        const metadata = [
          { label: "Source:", value: parsed.source },
          { label: "Official Gazette:", value: parsed.official_gazette },
          { label: "Category:", value: parsed.categoryName },
          { label: "Subcategory:", value: parsed.subCategoryName },
          { label: "Last Updated:", value: parsed.lastUpdated },
        ];

        metadata.forEach((item) => {
          if (item.value) {
            doc.setFont("Helvetica", "bold");
            const labelText = item.label;
            const labelWidth = doc.getTextWidth(labelText) + 2;

            doc.setFont("Helvetica", "normal");
            const valueLines = doc.splitTextToSize(String(item.value), contentWidth - labelWidth);
            const valHeight = valueLines.length * 5;

            checkPageBreak(valHeight + 4);

            doc.setFont("Helvetica", "bold");
            doc.setTextColor(80, 80, 80);
            doc.text(labelText, margin, y);

            doc.setFont("Helvetica", "normal");
            doc.setTextColor(120, 120, 120);
            doc.text(valueLines, margin + labelWidth, y);

            y += valHeight + 2;
          }
        });

        y += 5; // spacing after metadata

        // Divider Line
        checkPageBreak(5);
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;

        // Sections & Articles
        if (parsed.sections && parsed.sections.length > 0) {
          parsed.sections.forEach((section) => {
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(19, 85, 118); // #135576 brand color
            
            const secLines = doc.splitTextToSize(section.title, contentWidth);
            const secHeight = secLines.length * 6;
            checkPageBreak(secHeight + 8);
            doc.text(secLines, margin, y);
            y += secHeight + 6;

            if (section.articles && section.articles.length > 0) {
              section.articles.forEach((article) => {
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(11);
                doc.setTextColor(40, 40, 40);

                const artLines = doc.splitTextToSize(article.title, contentWidth);
                const artHeight = artLines.length * 5;
                
                doc.setFont("Helvetica", "normal");
                doc.setFontSize(10);
                doc.setTextColor(80, 80, 80);

                const descLines = doc.splitTextToSize(article.description, contentWidth);
                const descHeight = descLines.length * 5;

                checkPageBreak(artHeight + descHeight + 12);

                doc.setFont("Helvetica", "bold");
                doc.text(artLines, margin, y);
                y += artHeight + 2;

                doc.setFont("Helvetica", "normal");
                doc.text(descLines, margin, y);
                y += descHeight + 8;
              });
            }

            y += 4;
          });
        }
      }
      doc.save("laws_database_export.pdf");
      toast.success(t("export_db_success") || "Laws database exported successfully as PDF!", { id: toastId });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(t("export_db_failed") || "Failed to export laws database as PDF. Please try again.", { id: toastId });
    }
  };

  // const handleExportCSV = async () => {
  //   if (filteredLaws.length === 0) {
  //     toast.error("No laws available to export.");
  //     return;
  //   }
  //   const toastId = toast.loading("Exporting laws database as CSV...");
  //   try {
  //     let combinedCsvContent = "";
  //     for (const law of filteredLaws) {
  //       const result = await triggerExport({ id: law.id }).unwrap();
  //       combinedCsvContent += result + "\n---\n\n";
  //     }
  //     downloadCSVFile(combinedCsvContent, "laws_database_export.csv");
  //     toast.success("Laws database exported successfully as CSV!", { id: toastId });
  //   } catch (error) {
  //     console.error("Export failed:", error);
  //     toast.error("Failed to export laws database as CSV. Please try again.", { id: toastId });
  //   }
  // };

  const handleAddLaw = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddNewLaw = async (newLaw: LawDetails) => {
    try {
      await createLaw(newLaw).unwrap();
      toast.success(t("add_success", { title: newLaw.title }) || `"${newLaw.title}" added to database!`);
    } catch (error: unknown) {
      const err = error as { data?: Record<string, string[]> };
      if (err?.data) {
        const messages = Object.entries(err.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error(t("add_failed") || "Failed to add law. Please try again.");
      }
    }
  };

  const handleEditLaw = (law: Law) => {
    setSelectedLaw(law);
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteLaw = (law: Law) => {
    setSelectedLaw(law);
    setIsDeleteDialogOpen(true);
  };

  const handleViewLaw = (law: Law) => {
    setSelectedLaw(law);
    setIsViewDialogOpen(true);
  };

  const handleUpdateLaw = async (id: string | number, updatedLaw: LawDetails) => {
    try {
      await updateLaw({ id, data: updatedLaw }).unwrap();
      toast.success(t("update_success", { title: updatedLaw.title }) || `"${updatedLaw.title}" updated successfully!`);
    } catch (error: unknown) {
      const err = error as { data?: Record<string, string[]> };
      if (err?.data) {
        const messages = Object.entries(err.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error(t("update_failed") || "Failed to update law. Please try again.");
      }
    }
  };

  const handleDeleteLawConfirm = async () => {
    if (!selectedLaw) return;
    try {
      await deleteLaw(selectedLaw.id).unwrap();
      toast.success(t("delete_success", { title: selectedLaw.title }) || `"${selectedLaw.title}" deleted successfully!`);
      setIsDeleteDialogOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: Record<string, string[]> };
      if (err?.data) {
        const messages = Object.entries(err.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error(t("delete_failed") || "Failed to delete law. Please try again.");
      }
    }
  };

  return (
    <div className="w-full space-y-6 font-roboto">
      
      <h1 
        style={{
          color: "#101828",
          fontFamily: "Roboto, sans-serif",
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "32px"
        }}
        className="text-left"
      >
        {t("laws_database")}
      </h1>

      <LawFilters
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        filterCategories={filterCategories}
        onExport={handleExport}
        onAddLaw={handleAddLaw}
      />

      <h2 
        style={{
          color: "#101828",
          fontFamily: "Roboto, sans-serif",
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "32px"
        }}
        className="text-left mt-6"
      >
        {t("all_laws")}
      </h2>

      <div className="w-full bg-white p-6 rounded-[24px] border border-[#E5E7EB] shadow-sm space-y-6">
        
        <div 
          style={{
            padding: "12px",
            borderRadius: "20px",
            border: "1px solid #DDE0E7"
          }}
          className="w-full"
        >
          {isLoading ? (
            <LawDatabaseSkeleton />
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 text-red-500 font-roboto">
              <p className="text-lg font-medium">{t("error_loading_laws")}</p>
            </div>
          ) : filteredLaws.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 font-roboto">
              <Scale className="w-12 h-12 mb-3 opacity-60 text-slate-400" />
              <p className="text-lg font-medium">{t("no_laws_found")}</p>
              <p className="text-sm">{t("reset_filters_msg")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {filteredLaws.map((law) => (
                <LawCard 
                  key={law.id} 
                  law={law} 
                  onEdit={handleEditLaw}
                  onDelete={handleDeleteLaw}
                  onExportPDF={handleExportSingleLaw}
                  onView={handleViewLaw}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 w-full font-roboto">
          
          <span className="text-sm text-gray-500">
            {t("showing_results", { count: filteredLaws.length, total: allLaws?.count || filteredLaws.length })}
          </span>

          <div className="flex items-center gap-1">
            <button 
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-all font-semibold rounded-md hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              disabled={!allLaws?.previous}
            >
              {t("previous")}
            </button>

            <button 
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-all font-semibold rounded-md hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              disabled={!allLaws?.next}
            >
              {t("next")}
            </button>
          </div>
        </div>

      </div>

      {isAddDialogOpen && (
        <AddLawDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddNewLaw}
        />
      )}

      {isUpdateDialogOpen && selectedLaw && (
        <UpdateLawDialog
          isOpen={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          lawId={selectedLaw.id}
          onUpdate={handleUpdateLaw}
        />
      )}

      {isDeleteDialogOpen && selectedLaw && (
        <DeleteLawDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          lawTitle={selectedLaw.title}
          onConfirm={handleDeleteLawConfirm}
          isLoading={isDeleting}
        />
      )}

      {isViewDialogOpen && selectedLaw && (
        <ViewLawDetailsDialog
          isOpen={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          lawId={selectedLaw.id}
        />
      )}

    </div>
  );
}
