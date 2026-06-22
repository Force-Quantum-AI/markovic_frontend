"use client";

import React from "react";
import Image from "next/image";
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

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  created: string;
  plan:
    | "Basic"
    | "Professional"
    | "Standard"
    | "Premium"
    | "Enterprise"
    | "Ultimate"
    | "Custom"
    | "Limited Edition";
}

import AddUserDialog from "./AddUserDialog";
import AdminButton from "@/components/shared/AdminButton";

interface MyUsersTableProps {
  usersList: UserRow[];
  onAddUser?: (user: {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    role: string;
  }) => void;
}

const planBadgeStyles: Record<UserRow["plan"], string> = {
  Basic: "bg-[#DBEAFE] text-[#1447E6] border border-[#1447E6]/20",
  Professional: "bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]",
  Standard: "bg-[#E8D5FF] text-[#7314E6] border border-[#7314E6]/20",
  Premium: "bg-[#FFF3E0] text-[#E69514] border border-[#E69514]/20",
  Enterprise: "bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]",
  Ultimate: "bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF]",
  Custom: "bg-[#EFF1F4] text-[#667085] border border-[#667085]/20",
  "Limited Edition": "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]",
};

export default function MyUsersTable({
  usersList,
  onAddUser,
}: MyUsersTableProps) {
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);
  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Table Title + Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[#101828] font-roboto text-[20px] font-semibold leading-[28px]">
            All Users
          </h2>
          <p className="text-gray-500 font-roboto text-[14px] font-normal leading-[20px]">
            Manage and monitor all platform users
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminButton
            onClick={() => alert("Exporting database...")}
            label="Export"
            icon={<Download className="w-4 h-4" />}
            variant="secondary"
            className="py-2.5"
          />
          <AdminButton
            onClick={() => setIsAddUserOpen(true)}
            label="Add User"
            icon={<Plus className="w-4 h-4" />}
            className="py-2.5"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-hidden border border-[#BEC4D2] rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E8EEF2] text-[#3C4250] text-[14px] font-roboto font-normal leading-[21px] border-b border-[#BEC4D2]">
                <th className="py-3 px-5 border-r border-[#BEC4D2] font-semibold font-roboto">
                  User name
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-semibold font-roboto">
                  Role
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-semibold font-roboto">
                  Phone Number
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-semibold font-roboto">
                  Account created
                </th>
                <th className="py-3 px-4 border-r border-[#BEC4D2] font-semibold font-roboto">
                  Subscription
                </th>
                <th className="py-3 px-4 font-semibold font-roboto"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEC4D2]/40 text-sm text-gray-700">
              {usersList.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-400 font-roboto"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                usersList.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* User Name + Avatar + Email */}
                    <td className="py-3.5 px-5 border-r border-[#BEC4D2]/40 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={row.avatar}
                          alt={row.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-[#101828] font-roboto text-[14px]">
                          {row.name}
                        </span>
                        <span className="block text-[#475467] font-roboto text-[12px]">
                          {row.email}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#344054]">
                      {row.role}
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#344054]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                        <span>{row.phone}</span>
                      </div>
                    </td>

                    {/* Account Created */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#344054]">
                      {row.created}
                    </td>

                    {/* Subscription badge */}
                    <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40">
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${planBadgeStyles[row.plan]}`}
                      >
                        {row.plan}
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
                          <DropdownMenuItem className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[#344054] rounded-xl hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:text-[#344054] outline-none">
                            <Layers className="w-[18px] h-[18px] text-[#0F5A7F] shrink-0" />
                            <span>Custom Subscription</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[#344054] rounded-xl hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:text-[#344054] outline-none">
                            <UserMinus className="w-[18px] h-[18px] text-[#D97706] shrink-0" />
                            <span>Suspend</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer font-roboto flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[#344054] rounded-xl hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:text-[#344054] outline-none">
                            <Trash2 className="w-[18px] h-[18px] text-[#F04438] shrink-0" />
                            <span>Delete</span>
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

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-sm font-roboto text-[#475467] gap-4">
        <span>Showing 1 to {usersList.length} of 2,847 users</span>

        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-xs font-medium cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F5A7F] text-white text-xs font-medium cursor-pointer">
            1
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium cursor-pointer">
            2
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium cursor-pointer">
            3
          </button>

          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-xs font-medium cursor-pointer">
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
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
