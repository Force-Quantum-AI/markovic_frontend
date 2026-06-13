"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Tag, FolderOpen } from "lucide-react";
import AddCategoryDialog from "@/components/admin/categories/AddCategoryDialog";
import AdminButton from "@/components/shared/AdminButton";

interface SubCategory {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
  cases: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
  subcategories: SubCategory[];
  totalCases: number;
  dotColor: string;
  iconBg: string;
}

const DEMO_DATA: Category[] = [
  {
    id: "1",
    name: "Civil Law",
    description: "Cases involving disputes between individuals or organizations",
    status: "Active",
    totalCases: 1240,
    dotColor: "#3B82F6",
    iconBg: "#EFF6FF",
    subcategories: [
      { id: "1-1", name: "Personal Injury", description: "Compensation for physical or psychological harm", status: "Active", cases: 430 },
      { id: "1-2", name: "Contract Disputes", description: "Breach of contract and related claims", status: "Active", cases: 310 },
      { id: "1-3", name: "Property Law", description: "Real estate and property ownership disputes", status: "Active", cases: 280 },
      { id: "1-4", name: "Debt Collection", description: "Recovery of outstanding debts", status: "Inactive", cases: 220 },
    ],
  },
  {
    id: "2",
    name: "Criminal Law",
    description: "Cases involving crimes prosecuted by the state",
    status: "Active",
    totalCases: 870,
    dotColor: "#EF4444",
    iconBg: "#FEF2F2",
    subcategories: [
      { id: "2-1", name: "Assault & Battery", description: "Physical harm and threatening behavior cases", status: "Active", cases: 320 },
      { id: "2-2", name: "Drug Offenses", description: "Cases related to drug possession and trafficking", status: "Active", cases: 215 },
      { id: "2-3", name: "Theft & Robbery", description: "Property crime and robbery cases", status: "Active", cases: 195 },
      { id: "2-4", name: "Fraud & Forgery", description: "Deceptive financial and identity crimes", status: "Inactive", cases: 140 },
    ],
  },
  {
    id: "3",
    name: "Family Law",
    description: "Cases related to family relationships and domestic matters",
    status: "Active",
    totalCases: 640,
    dotColor: "#EC4899",
    iconBg: "#FDF2F8",
    subcategories: [
      { id: "3-1", name: "Divorce", description: "Legal dissolution of marriage", status: "Active", cases: 240 },
      { id: "3-2", name: "Child Custody", description: "Determination of child living arrangements", status: "Active", cases: 185 },
      { id: "3-3", name: "Adoption", description: "Legal process of adopting a child", status: "Active", cases: 130 },
      { id: "3-4", name: "Domestic Violence", description: "Protection and legal action for abuse cases", status: "Active", cases: 85 },
    ],
  },
  {
    id: "4",
    name: "Corporate Law",
    description: "Legal matters involving businesses and corporations",
    status: "Active",
    totalCases: 490,
    dotColor: "#10B981",
    iconBg: "#ECFDF5",
    subcategories: [
      { id: "4-1", name: "Mergers & Acquisitions", description: "Business consolidation and takeover matters", status: "Active", cases: 145 },
      { id: "4-2", name: "Employment Law", description: "Workplace rights and disputes", status: "Active", cases: 180 },
      { id: "4-3", name: "Intellectual Property", description: "Patents, trademarks, and copyright issues", status: "Active", cases: 95 },
      { id: "4-4", name: "Securities Law", description: "Stock market and investment regulations", status: "Inactive", cases: 70 },
    ],
  },
  {
    id: "5",
    name: "Administrative Law",
    description: "Cases involving government agencies and public authorities",
    status: "Inactive",
    totalCases: 310,
    dotColor: "#F59E0B",
    iconBg: "#FFFBEB",
    subcategories: [
      { id: "5-1", name: "Immigration", description: "Visa, residency, and citizenship matters", status: "Active", cases: 120 },
      { id: "5-2", name: "Tax Law", description: "Disputes related to tax obligations", status: "Active", cases: 95 },
      { id: "5-3", name: "Environmental Law", description: "Cases related to environmental regulations", status: "Inactive", cases: 95 },
    ],
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered = DEMO_DATA.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  const openDialog = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDialogOpen(true);
  };

  const allSubcategories = DEMO_DATA.flatMap((cat) =>
    cat.subcategories.map((sub) => ({ value: sub.id, label: sub.name }))
  );

  return (
    <div className="w-full space-y-6 font-roboto">
      <h1 className="text-[#292E38] font-roboto text-[24px] font-semibold leading-[32px]">
        Categories & Sub Category
      </h1>

      <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-[#E5E7EB]">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-4 pr-10 rounded-[32px] border border-[#E5E7EB] bg-[#F9FAFB] text-[#292E38] placeholder:text-[#99A1AF] font-roboto text-[14px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          <AdminButton
            label="Add Category"
            onClick={openDialog}
            icon={<Plus className="w-4 h-4" />}
            className="h-10 py-2 px-5 text-[14px] font-roboto font-semibold shrink-0"
          />
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {filtered.map((cat) => {
            const isExpanded = expandedIds.includes(cat.id);
            return (
              <div key={cat.id}>
                <div
                  className="flex items-center gap-3 px-5 py-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  onClick={() => toggleExpand(cat.id)}
                >
                  <button className="text-[#99A1AF] flex-shrink-0 w-5 flex items-center justify-center cursor-pointer">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.dotColor }}
                  />

                  <div
                    className="w-8 h-8 rounded-[14px] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: cat.iconBg }}
                  >
                    <FolderOpen className="w-4 h-4" style={{ color: cat.dotColor }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#292E38] font-roboto text-[16px] font-semibold leading-[24px]">
                        {cat.name}
                      </span>
                      {cat.status === "Active" ? (
                        <span className="flex items-center justify-center px-[10px] py-[2px] rounded-full bg-[#D0FAE5] text-[#007A55] font-roboto text-[12px] font-medium leading-[16px]">
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center justify-center px-[10px] py-[2px] rounded-full bg-[#F3F4F6] text-[#6A7282] font-roboto text-[12px] font-medium leading-[16px]">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5 truncate">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 ml-auto pl-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-[#292E38] font-roboto text-[14px] font-semibold leading-[20px]">
                        {cat.subcategories.length}
                      </div>
                      <div className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px]">
                        subcategories
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#292E38] font-roboto text-[14px] font-semibold leading-[20px]">
                        {cat.totalCases.toLocaleString()}
                      </div>
                      <div className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px]">
                        cases
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-[#FAFAFA]">
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center gap-3 pl-14 pr-5 py-3.5 border-t border-[#F3F4F6] hover:bg-[#F3F4F6]/60 transition-colors"
                      >
                        <span className="w-5 h-px bg-[#E5E7EB] flex-shrink-0" />

                        <div className="w-8 h-8 rounded-[14px] flex items-center justify-center flex-shrink-0 bg-[#F3F4F6]">
                          <Tag className="w-4 h-4 text-[#99A1AF]" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[#292E38] font-roboto text-[14px] font-semibold leading-[20px]">
                              {sub.name}
                            </span>
                            {sub.status === "Active" ? (
                              <span className="flex items-center justify-center px-[10px] py-[2px] rounded-full bg-[#D0FAE5] text-[#007A55] font-roboto text-[12px] font-medium leading-[16px]">
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center justify-center px-[10px] py-[2px] rounded-full bg-[#F3F4F6] text-[#6A7282] font-roboto text-[12px] font-medium leading-[16px]">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5 truncate">
                            {sub.description}
                          </p>
                        </div>

                        <div className="text-right ml-auto pl-4 flex-shrink-0">
                          <div className="text-[#292E38] font-roboto text-[14px] font-semibold leading-[20px]">
                            {sub.cases}
                          </div>
                          <div className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px]">
                            cases
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pl-14 pr-5 py-3 border-t border-[#F3F4F6]">
                      <button
                        onClick={openDialog}
                        className="flex items-center gap-[6px] py-[6px] px-[12px] rounded-[10px] border border-dashed border-[#D1D5DC] text-[#99A1AF] font-roboto text-[12px] font-medium leading-[16px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                      >
                        <Plus className="w-[14px] h-[14px] flex-shrink-0" />
                        Add Subcategory
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-16 text-center text-[#99A1AF] font-roboto text-[14px]">
              No categories found matching your search.
            </div>
          )}
        </div>
      </div>

      <AddCategoryDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        subcategoryOptions={allSubcategories}
      />
    </div>
  );
}
