"use client";

import React from "react";
import Image from "next/image";
import { MoreHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface Client {
  id?: string;
  client_name: string;
  client_image?: string | null;
  phone_number?: string | null;
  email?: string | null;
  created_date?: string | null;
  total_cases: number;
}

interface UsersTableProps {
  clients: Client[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isError: boolean;
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function UsersTable({
  clients,
  totalCount,
  currentPage,
  itemsPerPage,
  onPageChange,
  isLoading,
  isError,
}: UsersTableProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = totalCount > 0 ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = Math.min(startIndex + clients.length, totalCount);

  const handleView = (user: Client) => {
    if (user.id) {
      router.push(`/my-cases/${user.id}`);
      return;
    }
    alert(`Viewing client details for: ${user.client_name}`);
  };

  const handleDelete = (clientName: string) => {
    alert(`Delete client "${clientName}" is not implemented yet.`);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 space-y-4 bg-white rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Clients</h2>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-12 rounded-2xl bg-gray-100 animate-pulse" />
          <div className="h-12 rounded-2xl bg-gray-100 animate-pulse" />
          <div className="h-12 rounded-2xl bg-gray-100 animate-pulse" />
        </div>
      ) : (
        <>
          <div className="hidden lg:block w-full overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e9eff2] text-gray-600 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3.5 px-5">Name</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4">Total Cases</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {clients.map((user) => (
                  <tr key={user.id ?? user.client_name} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-5 flex items-center gap-2">
                      <div className="h-8 w-8 relative rounded-full overflow-hidden">
                        <Image
                          src={user.client_image || "/dummy-user.jpg"}
                          alt={user.client_name}
                          fill
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="block font-bold text-gray-900">{user.client_name}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.phone_number ?? "-"}</td>
                    <td className="py-4 px-4 text-gray-500">{user.email ?? "-"}</td>
                    <td className="py-4 px-4 font-medium text-gray-600">{formatDate(user.created_date)}</td>
                    <td className="py-4 px-4 flex items-center gap-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="inline-flex items-center justify-center w-7 h-7 text-sm font-semibold">
                        {user.total_cases}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all focus:outline-none">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36 bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                          <DropdownMenuItem onClick={() => handleView(user)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors focus:bg-gray-50 focus:outline-none">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user.client_name)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:outline-none">
                            <Trash2 className="w-4 h-4 text-red-400" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block lg:hidden space-y-4">
            {clients.map((user) => (
              <div key={user.id ?? user.client_name} className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{user.client_name}</h4>
                    <span className="text-xs text-gray-400">{user.phone_number ?? "-"}</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded-full border border-gray-100 bg-gray-50 text-gray-400 focus:outline-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32 bg-white rounded-xl shadow-md border p-1">
                      <DropdownMenuItem onClick={() => handleView(user)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(user.client_name)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Email</span>
                  <p className="text-xs font-medium text-gray-700 break-all">{user.email ?? "-"}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Created Date</span>
                    <span className="font-medium text-gray-700">{formatDate(user.created_date)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Total Cases</span>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#eefbf2] text-[#22c55e] text-xs font-semibold">
                      {user.total_cases}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {clients.length > 0 ? (
            <div className="flex items-center justify-center md:justify-between gap-3 flex-wrap pt-2">
              <p className="text-[#427791] text-xs md:text-base">
                Showing {startIndex + 1} to {endIndex} of {totalCount} clients
              </p>
              {totalPages > 1 && (
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex h-9 w-fit px-2 items-center gap-2 justify-center rounded-full transition-all ${currentPage === 1 ? "cursor-not-allowed border-gray-200 text-gray-300" : "border-gray-300 text-[#427791] hover:border-[#135576] hover:bg-[#135576]/5 hover:text-[#135576]"}`}
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page ? "bg-[#135576] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex h-9 w-fit px-2 items-center gap-2 justify-center rounded-full transition-all ${currentPage === totalPages ? "cursor-not-allowed border-gray-200 text-gray-300" : "border-gray-300 text-[#427791] hover:border-[#135576] hover:bg-[#135576]/5 hover:text-[#135576]"}`}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{isError ? "Could not load clients." : "No clients found matching the criteria."}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
