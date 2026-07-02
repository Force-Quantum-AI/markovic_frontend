import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/admin/categories/DeleteConfirmationDialog";
import { useDeleteArchiveCaseMutation } from "@/store/features/admin/archive-cases/archive.api";
import {
  Eye,
  Trash2,
  FileText,
  Database,
  Search,
  Clock,
  Landmark,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useGetArchiveCasesListQuery } from "@/store/features/admin/archive-cases/archive.api";
import { ArchiveCasesResponse } from "@/store/features/admin/archive-cases/archive.type";
import { ArchiveCasesTableSkeleton } from "@/components/admin/admin-skeletons";

interface ArchiveCasesTableProps {
  archiveData?: ArchiveCasesResponse;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  hidePagination?: boolean;
  isDashboard?: boolean;
}

const statusBadgeStyles: Record<string, string> = {
  Active: "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]",
  Archived: "bg-[#F2F4F7] text-[#344054] border border-[#D0D5DD]",
  Pending: "bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]",
};

export default function ArchiveCasesTable({
  archiveData,
  isLoading: propsLoading,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
  hidePagination = false,
  isDashboard = false,
}: ArchiveCasesTableProps) {
  const { data: internalData, isLoading: internalLoading } =
    useGetArchiveCasesListQuery(undefined, {
      skip: !!archiveData,
    });

  const resolvedData = archiveData || internalData;
  const isLoading = propsLoading || internalLoading;

  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [deleteArchiveCase, { isLoading: isDeleting }] = useDeleteArchiveCaseMutation();

  const rawCases = resolvedData?.results || [];
  const cases = isDashboard ? rawCases.slice(0, 5) : rawCases;

  const getCategoryIcon = (category: string) => {
    const normCategory = (category || "").toLowerCase();
    if (normCategory.includes("case")) {
      return <FileText className="w-4 h-4 text-[#808CA5]" />;
    }
    if (normCategory.includes("record")) {
      return <Database className="w-4 h-4 text-[#808CA5]" />;
    }
    return <Search className="w-4 h-4 text-[#808CA5]" />;
  };

  const getStatusBadgeClass = (status: string) => {
    return statusBadgeStyles[status] || "bg-[#F2F4F7] text-[#344054] border border-[#D0D5DD]";
  };

  if (isLoading) {
    return <ArchiveCasesTableSkeleton isDashboard={isDashboard} />;
  }

  const showPagination = !hidePagination && !isDashboard && totalPages > 1 && onPageChange;

  return (
    <div className="w-full bg-white rounded-2xl pt-6 border border-[#E5E7EB] overflow-hidden">
      {/* Tab/Header Navigation */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6">
        <div className="relative pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[#135576] font-roboto text-[16px] font-semibold leading-[24px]">
              Archive Cases
            </h2>
            <span className="text-[#427791] font-roboto text-[12px] font-medium leading-[140%]">
              ({resolvedData?.count ?? 0} Cases)
            </span>
          </div>
          {/* Tab Underline */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#135576]" />
        </div>
        {isDashboard && (
          <button
            onClick={() => router.push("/admin/archive-cases")}
            className="text-sm font-semibold text-[#135576] hover:underline font-inter pb-3"
          >
            View All
          </button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block w-full overflow-x-auto bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#475467] text-[14px] font-medium font-roboto">
              <th className="p-4 font-medium">Case Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Case Number</th>
              <th className="p-4 font-medium">Court Name</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-sm text-gray-700">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400 font-roboto">
                  No archived cases found.
                </td>
              </tr>
            ) : (
              cases.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Case Name */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6 font-bold text-[#1D2939] font-roboto text-[14px] whitespace-pre-line leading-relaxed max-w-[280px]">
                    <span
                      onClick={() =>
                        router.push(`/admin/archive-cases/${row.id}`)
                      }
                      className="hover:text-[#135576] hover:underline transition-colors cursor-pointer"
                    >
                      {row.case_name}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(row.category)}
                      <span>{row.category}</span>
                    </div>
                  </td>

                  {/* Case Number */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                    {row.case_number}
                  </td>

                  {/* Court Name */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                      <span>{row.court_name}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6 font-roboto text-[14px] text-[#344054]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                      <span>{row.date}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusBadgeClass(row.status)} font-roboto`}>
                      {row.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 first:pl-6 last:pr-6">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() =>
                          router.push(`/admin/archive-cases/${row.id}`)
                        }
                        className="p-1 hover:bg-gray-100 rounded text-[#135576] transition-colors cursor-pointer"
                        title="View Case"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(row.id)}
                        className="p-1 hover:bg-red-50 rounded text-[#D92D20] transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden space-y-4 px-6 pb-6">
        {cases.length === 0 ? (
          <div className="text-center py-6 text-gray-400 font-roboto text-sm">
            No archived cases found.
          </div>
        ) : (
          cases.map((row) => (
            <div
              key={row.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#1D2939] text-sm font-roboto line-clamp-2 max-w-[80%]">
                  <span
                    onClick={() => router.push(`/admin/archive-cases/${row.id}`)}
                    className="hover:text-[#135576] hover:underline transition-colors cursor-pointer"
                  >
                    {row.case_name}
                  </span>
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(row.status)}`}>
                  {row.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
                <div>
                  <span className="text-[#808CA5] block text-[10px]">
                    Category
                  </span>
                  <span className="font-medium text-[#344054]">
                    {row.category}
                  </span>
                </div>
                <div>
                  <span className="text-[#808CA5] block text-[10px]">
                    Case Number
                  </span>
                  <span className="text-[#344054]">{row.case_number}</span>
                </div>
                <div>
                  <span className="text-[#808CA5] block text-[10px]">
                    Court Name
                  </span>
                  <span className="font-medium text-[#344054]">
                    {row.court_name}
                  </span>
                </div>
                <div>
                  <span className="text-[#808CA5] block text-[10px]">Date</span>
                  <span className="font-medium text-[#344054]">{row.date}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => router.push(`/admin/archive-cases/${row.id}`)}
                  className="p-1.5 border border-sky-100 hover:bg-sky-50 text-[#135576] rounded-lg cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(row.id)}
                  className="p-1.5 border border-red-100 hover:bg-red-50 text-[#D92D20] rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination component */}
      {!isDashboard && (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 pb-6 px-6 border-t border-[#E5E7EB] text-sm font-roboto text-[#475467] gap-4">
          <span>
            Showing {cases.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to{" "}
            {Math.min(currentPage * 10, resolvedData?.count ?? 0)} of {resolvedData?.count ?? 0} results
          </span>
          {showPagination && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-xs font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev.</span>
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-all ${
                    currentPage === p
                      ? "bg-[#135576] text-white"
                      : "border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-xs font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
      <DeleteConfirmationDialog
        isOpen={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete Archived Case"
        description="Are you sure you want to delete this archived case record? This action cannot be undone."
        isSubmitting={isDeleting}
        onConfirm={async () => {
          if (deleteId) {
            try {
              await deleteArchiveCase({ id: deleteId }).unwrap();
              toast.success("Archived case record deleted successfully!");
            } catch (err) {
              console.error("Failed to delete archive case:", err);
              toast.error("Failed to delete the archived case. Please try again.");
            }
          }
        }}
      />
    </div>
  );
}
