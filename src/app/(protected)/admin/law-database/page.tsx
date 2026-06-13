"use client";

import React, { useState, useMemo } from "react";
import { Plus, Download, ChevronDown, Scale } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import LawCard, { Law } from "@/components/admin/law-database/LawCard";
import AddLawDialog from "@/components/admin/law-database/AddLawDialog";
import { toast } from "sonner";

const INITIAL_LAWS: Law[] = [
  {
    id: "1",
    title: "Law on Obligations",
    gazette: "031/17 of 05/12/2017",
    lastUpdate: "17 Oct, 2020",
    category: "Civil Law",
  },
  {
    id: "2",
    title: "Civil Procedure Law",
    gazette: "22/10, 49/13, 44/21",
    lastUpdate: "17 Oct, 2020",
    category: "Procedural Law",
  },
  {
    id: "3",
    title: "Law on Courts",
    gazette: "13/18, 01/23",
    lastUpdate: "21 Sep, 2020",
    category: "Civil Law",
  },
  {
    id: "4",
    title: "Law on Enforcement and Security",
    gazette: "36/11, 58/14, 11/17",
    lastUpdate: "24 May, 2020",
    category: "Procedural Law",
  },
  {
    id: "5",
    title: "Criminal Procedure Law",
    gazette: "031/17 of 05/12/2017",
    lastUpdate: "17 Oct, 2020",
    category: "Criminal Law",
  },
  {
    id: "6",
    title: "Family Law",
    gazette: "72/21",
    lastUpdate: "1 Feb, 2020",
    category: "Procedural Law",
  },
  {
    id: "7",
    title: "Law on Courts",
    gazette: "13/18, 01/23",
    lastUpdate: "1 Feb, 2020",
    category: "Civil Law",
  },
  {
    id: "8",
    title: "Law on Obligations",
    gazette: "47/08, 04/10, 22/17",
    lastUpdate: "24 May, 2020",
    category: "Civil Law",
  },
  {
    id: "9",
    title: "Criminal Procedure Law",
    gazette: "031/17 of 05/12/2017",
    lastUpdate: "17 Oct, 2020",
    category: "Criminal Law",
  },
  {
    id: "10",
    title: "Family Law",
    gazette: "72/21",
    lastUpdate: "1 Feb, 2020",
    category: "Procedural Law",
  },
  {
    id: "11",
    title: "Law on Courts",
    gazette: "13/18, 01/23",
    lastUpdate: "1 Feb, 2020",
    category: "Civil Law",
  },
  {
    id: "12",
    title: "Law on Obligations",
    gazette: "47/08, 04/10, 22/17",
    lastUpdate: "24 May, 2020",
    category: "Civil Law",
  },
];

export default function LawDatabasePage() {
  const [laws, setLaws] = useState<Law[]>(INITIAL_LAWS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  const handleAddNewLaw = (newLaw: Law) => {
    setLaws((prev) => [newLaw, ...prev]);
    toast.success(`"${newLaw.title}" added to database!`);
  };

  const handleEditLaw = (law: Law) => {
    toast.info(`Editing "${law.title}"...`);
  };

  const handleDeleteLaw = (law: Law) => {
    setLaws((prev) => prev.filter((item) => item.id !== law.id));
    toast.success(`"${law.title}" deleted successfully!`);
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
          {filteredLaws.length === 0 ? (
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
            Showing 1-{Math.min(filteredLaws.length, 6)} of {filteredLaws.length} results
          </span>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-all font-semibold rounded-md hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              disabled={currentPage === 1}
            >
              Prev.
            </button>

            <button 
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-full transition-all cursor-pointer ${
                currentPage === 1 
                  ? "bg-[#135576] text-white shadow-sm" 
                  : "text-gray-600 hover:bg-slate-50"
              }`}
            >
              1
            </button>

            <button 
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-full transition-all cursor-pointer ${
                currentPage === 2 
                  ? "bg-[#135576] text-white shadow-sm" 
                  : "text-gray-600 hover:bg-slate-50"
              }`}
            >
              2
            </button>

            <button 
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-full transition-all cursor-pointer ${
                currentPage === 3 
                  ? "bg-[#135576] text-white shadow-sm" 
                  : "text-gray-600 hover:bg-slate-50"
              }`}
            >
              3
            </button>

            <span className="text-sm text-gray-400 px-1 font-semibold">...</span>

            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-all font-semibold rounded-md hover:bg-slate-50 cursor-pointer"
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

    </div>
  );
}
