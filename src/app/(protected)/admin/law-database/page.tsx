"use client";

import { useState, useMemo } from "react";
import { Plus, Download, ChevronDown, Scale } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import LawCard, { Law } from "@/components/admin/law-database/LawCard";
import AddLawDialog from "@/components/admin/law-database/AddLawDialog";
import UpdateLawDialog from "@/components/admin/law-database/UpdateLawDialog";
import DeleteLawDialog from "@/components/admin/law-database/DeleteLawDialog";
import { toast } from "sonner";
import {
  useGetAllLawsQuery,
  useCreateLawMutation,
  useUpdateLawsMutation,
  useDeleteLawsMutation,
} from "@/store/features/admin/laws-database/laws.api";
import { LawDetails } from "@/store/features/admin/laws-database/laws.type";

export default function LawDatabasePage() {
  const { data: allLaws, isLoading, isError } = useGetAllLawsQuery(undefined);
  const [createLaw] = useCreateLawMutation();
  const [updateLaw] = useUpdateLawsMutation();
  const [deleteLaw, { isLoading: isDeleting }] = useDeleteLawsMutation();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const filteredLaws = useMemo(() => {
    return laws.filter((law) => {
      const matchesSearch =
        law.title.toLowerCase().includes(search.toLowerCase()) ||
        law.gazette.toLowerCase().includes(search.toLowerCase()) ||
        law.category.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        categoryFilter === "all" ||
        law.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [laws, search, categoryFilter]);

  const handleExport = () => {
    toast.success("Laws database exported successfully!");
  };

  const handleAddLaw = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddNewLaw = async (newLaw: LawDetails) => {
    try {
      await createLaw(newLaw).unwrap();
      toast.success(`"${newLaw.title}" added to database!`);
    } catch (error: unknown) {
      const err = error as { data?: Record<string, string[]> };
      if (err?.data) {
        const messages = Object.entries(err.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error("Failed to add law. Please try again.");
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

  const handleUpdateLaw = async (id: string | number, updatedLaw: LawDetails) => {
    try {
      await updateLaw({ id, data: updatedLaw }).unwrap();
      toast.success(`"${updatedLaw.title}" updated successfully!`);
    } catch (error: unknown) {
      const err = error as { data?: Record<string, string[]> };
      if (err?.data) {
        const messages = Object.entries(err.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error("Failed to update law. Please try again.");
      }
    }
  };

  const handleDeleteLawConfirm = async () => {
    if (!selectedLaw) return;
    try {
      await deleteLaw(selectedLaw.id).unwrap();
      toast.success(`"${selectedLaw.title}" deleted successfully!`);
      setIsDeleteDialogOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: Record<string, string[]> };
      if (err?.data) {
        const messages = Object.entries(err.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error("Failed to delete law. Please try again.");
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
        Laws Database
      </h1>

      <div className="w-full bg-white p-6 rounded-[24px] border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row items-end justify-between gap-4">
        
        <div className="w-full md:flex-1 space-y-1.5 flex flex-col items-start">
          <span className="text-sm font-semibold text-gray-700 pl-1">Search:</span>
          <input
            type="text"
            placeholder="Search laws, bylaws, articles, keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 h-12 rounded-full border border-[#D1D5DC] bg-[#F5F6F7] text-[#101828] placeholder-[#9CA6BB] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all"
          />
        </div>

        <div className="w-full md:w-[220px] space-y-1.5 flex flex-col items-start">
          <span className="text-sm font-semibold text-gray-700 pl-1">Filters:</span>
          <div className="relative w-full">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-12 rounded-full border border-[#D1D5DC] bg-[#F5F6F7] px-5 py-3 text-[#101828] font-roboto text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-[#135576]/30 focus:border-transparent transition-all appearance-none cursor-pointer pr-10"
            >
              <option value="all">All Laws</option>
              <option value="Civil Law">Civil Law</option>
              <option value="Procedural Law">Procedural Law</option>
              <option value="Criminal Law">Criminal Law</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto shrink-0">
          <AdminButton
            label="Export"
            icon={<Download className="w-4 h-4" />}
            variant="secondary"
            onClick={handleExport}
            style={{ padding: "12px 24px" }}
            className="flex-1 md:flex-none h-12"
          />
          <AdminButton
            label="Add Law"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleAddLaw}
            style={{ padding: "12px 24px" }}
            className="flex-1 md:flex-none h-12"
          />
        </div>

      </div>

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
        All Laws
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
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 font-roboto">
              <p className="text-lg font-medium">Loading laws...</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 text-red-500 font-roboto">
              <p className="text-lg font-medium">Error loading laws. Please try again later.</p>
            </div>
          ) : filteredLaws.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 font-roboto">
              <Scale className="w-12 h-12 mb-3 opacity-60 text-slate-400" />
              <p className="text-lg font-medium">No laws found matching your search</p>
              <p className="text-sm">Try typing different keywords or resetting filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {filteredLaws.map((law) => (
                <LawCard 
                  key={law.id} 
                  law={law} 
                  onEdit={handleEditLaw}
                  onDelete={handleDeleteLaw}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 w-full font-roboto">
          
          <span className="text-sm text-gray-500">
            Showing {filteredLaws.length} of {allLaws?.count || filteredLaws.length} results
          </span>

          <div className="flex items-center gap-1">
            <button 
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-all font-semibold rounded-md hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              disabled={!allLaws?.previous}
            >
              Prev.
            </button>

            <button 
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-all font-semibold rounded-md hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              disabled={!allLaws?.next}
            >
              Next
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

    </div>
  );
}
