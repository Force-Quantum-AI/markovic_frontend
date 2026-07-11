"use client";

import React from "react";
import {
  Download,
  Plus,
  Phone,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Layers,
  UserMinus,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

import AddUserDialog from "./AddUserDialog";
import AdminButton from "@/components/shared/AdminButton";
import { MyUsersTableSkeleton } from "@/components/admin/admin-skeletons";

interface UserRow {
  unique_id: string;
  profile_image: string | null;
  full_name: string;
  email: string;
  number: string | null;
  account_created: string;
  subscription: string | null;
}

interface MyUsersTableProps {
  usersList: UserRow[];
  onAddUser?: (user: {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    role: string;
  }) => void;
  onDeleteUser?: (id: string | number) => void;
  onSuspendUser?: (id: string | number) => void;
  onCustomSubscription?: (id: string | number, email: string) => void;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

const getPlanBadgeStyle = (plan: string | null) => {
  const normPlan = (plan || "").trim().toLowerCase();
  if (normPlan === "standard") return "bg-[#E8D5FF] text-[#7314E6]";
  if (normPlan === "premium")  return "bg-[#FFF3E0] text-[#E69514]";
  if (normPlan === "professional") return "bg-[#DCFCE7] text-[#15803D]";
  if (normPlan === "custom")   return "bg-[#EFF1F4] text-[#667085]";
  // basic, trial, null, or any other → blue badge
  return "bg-[#DBEAFE] text-[#1447E6]";
};

const getDisplayPlan = (plan: string | null): string => {
  if (!plan) return "Basic";
  const trimmed = plan.trim();
  if (!trimmed) return "Basic";
  // Capitalize first letter
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export default function MyUsersTable({
  usersList,
  onAddUser,
  onDeleteUser,
  onSuspendUser,
  onCustomSubscription,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading,
}: MyUsersTableProps) {
  const { t } = useTranslation("adminMyUsers");
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);

  const perPage = totalCount > 0 && totalPages > 0 ? Math.ceil(totalCount / totalPages) : 10;
  const startItem = usersList.length > 0 ? (currentPage - 1) * perPage + 1 : 0;
  const endItem = Math.min(currentPage * perPage, totalCount);

  if (isLoading) {
    return <MyUsersTableSkeleton />;
  }

  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Table Title + Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[28px]">
            {t("all_users")}
          </h2>
          <p className="text-gray-500 font-roboto text-[14px] font-normal leading-[20px]">
            {t("manage_and_monitor_users")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminButton
            onClick={() => alert("Exporting database...")}
            label={t("export")}
            icon={<Download className="w-4 h-4" />}
            variant="secondary"
            className="py-2.5"
          />
          <AdminButton
            onClick={() => setIsAddUserOpen(true)}
            label={t("add_user")}
            icon={<Plus className="w-4 h-4" />}
            className="py-2.5"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block w-full overflow-hidden border border-[#BEC4D2] rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E8EEF2] text-[#3C4250] text-[14px] font-roboto font-normal leading-[21px] border-b border-[#BEC4D2]">
                <th className="py-3 px-5 border-r border-[#BEC4D2] font-normal font-roboto">
                  {t("user_name")}
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto">
                  {t("email")}
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">
                  {t("phone_number")}
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">
                  {t("account_created")}
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">
                  {t("subscription")}
                </th>
                <th className="py-3 px-4 font-normal font-roboto"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEC4D2]/40 text-sm text-gray-700">
              {usersList.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-400 font-roboto"
                  >
                    {t("no_users_found")}
                  </td>
                </tr>
              ) : (
                usersList.map((row) => (
                  <tr
                    key={row.unique_id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* User Name + ID */}
                    <td className="py-3.5 px-5 border-r border-[#BEC4D2]/40">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={row.profile_image || "/dummy-user.jpg"}
                            alt={row.full_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-medium text-[#161A20] font-roboto text-[14px]">
                            {row.full_name}
                          </span>
                          <span className="block text-[#808CA5] font-roboto text-[11px] truncate">
                            id: {row.unique_id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2] font-roboto text-[14px] font-normal text-[#364153]">
                      {row.email}
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2] font-roboto text-[14px] font-normal text-[#364153]">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                        <span>{row.number || "N/A"}</span>
                      </div>
                    </td>

                    {/* Account Created */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2] font-roboto text-[14px] font-normal text-[#364153] text-center">
                      {formatDate(row.account_created)}
                    </td>

                    {/* Subscription badge */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2] text-center">
                      <span
                        className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full ${getPlanBadgeStyle(row.subscription)}`}
                      >
                        {getDisplayPlan(row.subscription)}
                      </span>
                    </td>

                    {/* Actions dropdown */}
                    <td className="py-3.5 px-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-all focus:outline-none cursor-pointer">
                            <MoreHorizontal className="w-5 h-5 text-[#101828]" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[210px] bg-white border border-[#E4E7EC] rounded-2xl shadow-xl p-2 z-50"
                        >
                          <DropdownMenuItem
                            onClick={() => onCustomSubscription && onCustomSubscription(row.unique_id, row.email)}
                            className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[#344054] rounded-xl hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:text-[#344054] outline-none"
                          >
                            <Layers className="w-[18px] h-[18px] text-[#0F5A7F] shrink-0" />
                            <span>{t("custom_subscription")}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onSuspendUser && onSuspendUser(row.unique_id)}
                            className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[#344054] rounded-xl hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:text-[#344054] outline-none"
                          >
                            <UserMinus className="w-[18px] h-[18px] text-[#D97706] shrink-0" />
                            <span>{t("suspend")}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteUser && onDeleteUser(row.unique_id)}
                            className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[#344054] rounded-xl hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:text-[#344054] outline-none"
                          >
                            <Trash2 className="w-[18px] h-[18px] text-[#F04438] shrink-0" />
                            <span>{t("delete")}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden space-y-4">
        {usersList.length === 0 ? (
          <div className="text-center py-8 text-gray-400 font-roboto">
            {t("no_users_found")}
          </div>
        ) : (
          usersList.map((row) => (
            <div
              key={row.unique_id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={row.profile_image || "/dummy-user.jpg"}
                      alt={row.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#161A20] text-sm font-roboto">
                      {row.full_name}
                    </h4>
                    <span className="text-[11px] text-[#808CA5] block font-roboto">
                      id: {row.unique_id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full ${getPlanBadgeStyle(row.subscription)}`}
                  >
                    {getDisplayPlan(row.subscription)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-gray-100 transition-all focus:outline-none cursor-pointer">
                        <MoreHorizontal className="w-4 h-4 text-[#101828]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[200px] bg-white border border-[#E4E7EC] rounded-2xl shadow-xl p-2 z-50"
                    >
                      <DropdownMenuItem
                        onClick={() => onCustomSubscription && onCustomSubscription(row.unique_id, row.email)}
                        className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[#344054] rounded-xl"
                      >
                        <Layers className="w-4 h-4 text-[#0F5A7F] shrink-0" />
                        <span>{t("custom_subscription")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSuspendUser && onSuspendUser(row.unique_id)}
                        className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[#344054] rounded-xl"
                      >
                        <UserMinus className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span>{t("suspend")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteUser && onDeleteUser(row.unique_id)}
                        className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[#344054] rounded-xl"
                      >
                        <Trash2 className="w-4 h-4 text-[#F04438] shrink-0" />
                        <span>{t("delete")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">{t("email")}</span>
                  <span className="font-normal text-[#364153] font-roboto break-all">
                    {row.email}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">{t("phone_number")}</span>
                  <span className="font-normal text-[#364153] font-roboto">
                    {row.number || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">
                    {t("account_created")}
                  </span>
                  <span className="font-normal text-[#364153] font-roboto">
                    {formatDate(row.account_created)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-sm font-roboto text-[#475467] gap-4">
        <span>
          {t("showing")} {startItem} {t("to") || "to"} {endItem} {t("of")} {totalCount} {t("users")}
        </span>

        {totalPages > 1 && onPageChange && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-xs font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("previous")}</span>
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-all ${
                  currentPage === p
                    ? "bg-[#0F5A7F] text-white"
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
              <span>{t("next")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
      {onAddUser && (
        <AddUserDialog
          isOpen={isAddUserOpen}
          onOpenChange={setIsAddUserOpen}
          onAddUser={onAddUser}
        />
      )}
    </div>
  );
}
