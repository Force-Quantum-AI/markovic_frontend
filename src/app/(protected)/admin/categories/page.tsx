"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Plus, Tag, FolderOpen, MoreVertical } from "lucide-react";
import AddCategoryDialog from "@/components/admin/categories/AddCategoryDialog";
import EditCategoryDialog from "@/components/admin/categories/EditCategoryDialog";
import AddSubCategoryDialog from "@/components/admin/categories/AddSubCategoryDialog";
import EditSubCategoryDialog from "@/components/admin/categories/EditSubCategoryDialog";
import DeleteConfirmationDialog from "@/components/admin/categories/DeleteConfirmationDialog";
import AdminButton from "@/components/shared/AdminButton";
import { AdminCategoriesSkeleton } from "@/components/admin/admin-skeletons";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useCreateSubCategoryMutation,
  useGetAllSubCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "@/store/features/admin/category-subcategory/category.api";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const CATEGORY_COLORS = [
  { dotColor: "#3B82F6", iconBg: "#EFF6FF" },
  { dotColor: "#EF4444", iconBg: "#FEF2F2" },
  { dotColor: "#EC4899", iconBg: "#FDF2F8" },
  { dotColor: "#10B981", iconBg: "#ECFDF5" },
  { dotColor: "#F59E0B", iconBg: "#FFFBEB" },
];

export default function CategoriesPage() {
  const { t } = useTranslation("adminCategories");
  const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();
  const [createSubCategory, { isLoading: isCreatingSubCategory }] = useCreateSubCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeletingCategory }] = useDeleteCategoryMutation();
  const [updateSubCategory, { isLoading: isUpdatingSubCategory }] = useUpdateSubCategoryMutation();
  const [deleteSubCategory, { isLoading: isDeletingSubCategory }] = useDeleteSubCategoryMutation();

  const {
    data: categoriesData = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoriesQuery();
  const {
    data: subcategoriesData = [],
  } = useGetAllSubCategoriesQuery();
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Dialog states
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [addSubCategoryOpen, setAddSubCategoryOpen] = useState(false);
  const [editSubCategoryOpen, setEditSubCategoryOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmType, setDeleteConfirmType] = useState<"category" | "subcategory" | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [defaultName, setDefaultName] = useState("");
  const [editId, setEditId] = useState<string | number>("");

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const categories = useMemo<Category[]>(
    () =>
      categoriesData.map((category, index) => {
        const colors = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

        const subList = subcategoriesData
          .filter((sub) => Number(sub.category) === Number(category.id))
          .map((sub) => ({
            id: String(sub.id),
            name: sub.name,
            description: sub.created_at
              ? t("created_at", { date: new Date(sub.created_at).toLocaleDateString("en-US", { timeZone: "UTC" }) })
              : t("no_description"),
            status: "Active" as const,
            cases: 0,
          }));

        return {
          id: String(category.id),
          name: category.name,
          description: category.created_at
            ? t("created_at", { date: new Date(category.created_at).toLocaleDateString("en-US", { timeZone: "UTC" }) })
            : t("no_description"),
          status: "Active",
          subcategories: subList,
          totalCases: 0,
          ...colors,
        };
      }),
    [categoriesData, subcategoriesData, t]
  );

  const filtered = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  const openCategoryDialog = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAddCategoryOpen(true);
  };

  const openSubcategoryDialog = (categoryId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedCategoryId(categoryId);
    setAddSubCategoryOpen(true);
  };

  const handleEditCategoryClick = (cat: Category) => {
    setEditId(cat.id);
    setDefaultName(cat.name);
    setEditCategoryOpen(true);
  };

  const handleDeleteCategoryClick = (id: string | number, name: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType("category");
    setDeleteConfirmName(name);
    setDeleteConfirmOpen(true);
  };

  const handleEditSubcategoryClick = (sub: SubCategory, parentCategoryId: string) => {
    setEditId(sub.id);
    setDefaultName(sub.name);
    setSelectedCategoryId(parentCategoryId);
    setEditSubCategoryOpen(true);
  };

  const handleDeleteSubcategoryClick = (id: string | number, name: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType("subcategory");
    setDeleteConfirmName(name);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId || !deleteConfirmType) return;
    try {
      if (deleteConfirmType === "category") {
        await deleteCategory(deleteConfirmId).unwrap();
        toast.success(t("category_deleted_success") || "Category deleted successfully!");
      } else {
        await deleteSubCategory(deleteConfirmId).unwrap();
        toast.success(t("subcategory_deleted_success") || "Subcategory deleted successfully!");
      }
    } catch (err) {
      console.error(`Failed to delete ${deleteConfirmType}:`, err);
      toast.error(
        deleteConfirmType === "category"
          ? t("failed_delete_category")
          : t("failed_delete_subcategory")
      );
    }
  };

  const handleCreateCategory = async (name: string) => {
    try {
      const res = await createCategory({ name }).unwrap();
      if (res){
        toast.success(t("category_created_success") || "Category created successfully!");
        return true;
      }
    } catch (err) {
      console.error("Failed to create category:", err);
      toast.error(t("failed_create_category") || "Failed to create category. Please try again.");
    }
    return false;
  };

  const handleCreateSubcategory = async (name: string, categoryId: string) => {
    try {
      const res = await createSubCategory({ name, category: Number(categoryId) }).unwrap();
      if (res){
        toast.success(t("subcategory_created_success") || "Subcategory created successfully!");
        return true;
      }
    } catch (err) {
      console.error("Failed to create subcategory:", err);
      toast.error(t("failed_create_subcategory") || "Failed to create subcategory. Please try again.");
    }
    return false;
  };

  const handleEditCategory = async (name: string) => {
    try {
      const res = await updateCategory({ id: editId, name }).unwrap();
      if (res) {
        toast.success(t("category_updated_success") || "Category updated successfully!");
        return true;
      }
    } catch (err) {
      console.error("Failed to update category:", err);
      toast.error(t("failed_update_category") || "Failed to update category. Please try again.");
    }
    return false;
  };

  const handleEditSubcategory = async (name: string, categoryId: string) => {
    try {
      const res = await updateSubCategory({ id: editId, name, category: Number(categoryId) }).unwrap();
      if (res) {
        toast.success(t("subcategory_updated_success") || "Subcategory updated successfully!");
        return true;
      }
    } catch (err) {
      console.error("Failed to update subcategory:", err);
      toast.error(t("failed_update_subcategory") || "Failed to update subcategory. Please try again.");
    }
    return false;
  };

  return (
    <div className="w-full space-y-6 font-roboto">
      <h1 className="text-[#292E38] font-roboto text-[24px] font-semibold leading-[32px]">
        {t("categories_subcategory")}
      </h1>

      <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-[#E5E7EB]">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder={t("search_categories") || "Search categories..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-4 pr-10 rounded-[32px] border border-[#E5E7EB] bg-[#F9FAFB] text-[#292E38] placeholder:text-[#99A1AF] font-roboto text-[14px] font-normal leading-[140%] focus:outline-none focus:ring-2 focus:ring-[#BEC4D2]/40 transition-all"
            />
          </div>

          <AdminButton
            label={t("add_category")}
            onClick={openCategoryDialog}
            icon={<Plus className="w-4 h-4" />}
            className="h-10 py-2 px-5 text-[14px] font-roboto font-semibold shrink-0"
          />
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {isCategoriesLoading && <AdminCategoriesSkeleton />}

          {isCategoriesError && !isCategoriesLoading && (
            <div className="py-16 text-center text-[#99A1AF] font-roboto text-[14px]">
              {t("failed_load_categories")}
            </div>
          )}

          {!isCategoriesLoading && !isCategoriesError && filtered.map((cat) => {
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
                          {t("active")}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center px-[10px] py-[2px] rounded-full bg-[#F3F4F6] text-[#6A7282] font-roboto text-[12px] font-medium leading-[16px]">
                          {t("inactive")}
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
                        {t("subcategories_count")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#292E38] font-roboto text-[14px] font-semibold leading-[20px]">
                        {cat.totalCases.toLocaleString()}
                      </div>
                      <div className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px]">
                        {t("cases_count")}
                      </div>
                    </div>

                    {/* Category Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#99A1AF] hover:text-[#292E38] p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-white">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCategoryClick(cat);
                          }}
                          className="cursor-pointer"
                        >
                          {t("edit_category_title")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategoryClick(cat.id, cat.name);
                          }}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        >
                          {t("delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                            <span className="flex items-center justify-center px-[10px] py-[2px] rounded-full bg-[#D0FAE5] text-[#007A55] font-roboto text-[12px] font-medium leading-[16px]">
                              {t("active")}
                            </span>
                          </div>
                          <p className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px] mt-0.5 truncate">
                            {sub.description}
                          </p>
                        </div>

                        <div className="text-right ml-auto pl-4 flex-shrink-0 flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-[#292E38] font-roboto text-[14px] font-semibold leading-[20px]">
                              {sub.cases}
                            </div>
                            <div className="text-[#99A1AF] font-roboto text-[12px] font-normal leading-[16px]">
                              {t("cases_count")}
                            </div>
                          </div>

                          {/* Subcategory Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#99A1AF] hover:text-[#292E38] p-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <MoreVertical className="w-4.5 h-4.5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 bg-white">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditSubcategoryClick(sub, cat.id);
                                }}
                                className="cursor-pointer"
                              >
                                {t("edit_subcategory_title")}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSubcategoryClick(sub.id, sub.name);
                                }}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                              >
                                {t("delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}

                    <div className="pl-14 pr-5 py-3 border-t border-[#F3F4F6]">
                      <button
                        onClick={(e) => openSubcategoryDialog(cat.id, e)}
                        className="flex items-center gap-[6px] py-[6px] px-[12px] rounded-[10px] border border-dashed border-[#D1D5DC] text-[#99A1AF] font-roboto text-[12px] font-medium leading-[16px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                      >
                        <Plus className="w-[14px] h-[14px] flex-shrink-0" />
                        {t("add_subcategory")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!isCategoriesLoading && !isCategoriesError && filtered.length === 0 && (
            <div className="py-16 text-center text-[#99A1AF] font-roboto text-[14px]">
              {t("no_categories_found")}
            </div>
          )}
        </div>
      </div>

      <AddCategoryDialog
        key={addCategoryOpen ? "add-category-open" : "add-category-closed"}
        isOpen={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
        onSubmit={handleCreateCategory}
        isSubmitting={isCreatingCategory}
      />

      <EditCategoryDialog
        key={editCategoryOpen ? `edit-category-${editId}-${defaultName}` : "edit-category-closed"}
        isOpen={editCategoryOpen}
        onOpenChange={setEditCategoryOpen}
        defaultName={defaultName}
        onSubmit={handleEditCategory}
        isSubmitting={isUpdatingCategory}
      />

      <AddSubCategoryDialog
        key={addSubCategoryOpen ? `add-subcategory-${selectedCategoryId}` : "add-subcategory-closed"}
        isOpen={addSubCategoryOpen}
        onOpenChange={setAddSubCategoryOpen}
        categories={categoriesData}
        selectedCategoryId={selectedCategoryId}
        onSubmit={handleCreateSubcategory}
        isSubmitting={isCreatingSubCategory}
      />

      <EditSubCategoryDialog
        key={editSubCategoryOpen ? `edit-subcategory-${editId}-${selectedCategoryId}-${defaultName}` : "edit-subcategory-closed"}
        isOpen={editSubCategoryOpen}
        onOpenChange={setEditSubCategoryOpen}
        categories={categoriesData}
        selectedCategoryId={selectedCategoryId}
        defaultName={defaultName}
        onSubmit={handleEditSubcategory}
        isSubmitting={isUpdatingSubCategory}
      />

      <DeleteConfirmationDialog
        key={deleteConfirmOpen ? `delete-${deleteConfirmType}-${deleteConfirmId}` : "delete-confirm-closed"}
        isOpen={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title={deleteConfirmType === "category" ? t("delete_category") : t("delete_subcategory")}
        description={
          deleteConfirmType === "category"
            ? t("delete_category_desc", { name: deleteConfirmName })
            : t("delete_subcategory_desc", { name: deleteConfirmName })
        }
        onConfirm={handleConfirmDelete}
        isSubmitting={deleteConfirmType === "category" ? isDeletingCategory : isDeletingSubCategory}
      />
    </div>
  );
}
