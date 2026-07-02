"use client";

import Link from "next/link";
import { MoreHorizontal, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UsersResponse } from "@/store/features/admin/my-users/my-users.type";
import { MyUsersDashboardTableSkeleton } from "@/components/admin/admin-skeletons";

interface MyUsersTableProps {
  usersData?: UsersResponse;
  isLoading?: boolean;
}

const getPlanBadgeStyle = (plan: string | null) => {
  const normPlan = (plan || "").trim().toLowerCase();
  if (normPlan === "standard") return "bg-[#E8D5FF] text-[#7314E6]";
  if (normPlan === "premium")  return "bg-[#FFF3E0] text-[#E69514]";
  // basic or no subscription → blue badge
  return "bg-[#DBEAFE] text-[#1447E6]";
};

export default function MyUsersDashboardTable({
  usersData,
  isLoading,
}: MyUsersTableProps) {
  const allUsers: User[] = usersData?.results?.users || [];
  
  const users = allUsers.slice(0, 5);
  console.log("fasdfasdfds fadsf", users);
  

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

  if (isLoading) {
    return <MyUsersDashboardTableSkeleton />;
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[#135576] font-roboto text-[16px] font-medium leading-[24px]">
            My Users
          </h2>
          <span className="text-[#427791] font-roboto text-[12px] font-medium leading-[140%] capitalize">
            ({usersData?.count ?? 0} Users)
          </span>
        </div>
        {usersData && (
          <Link
            href="/admin/my-users"
            className="text-sm font-semibold text-[#135576] hover:underline font-inter"
          >
            View All
          </Link>
        )}
      </div>

      {/* Table Desktop */}
      <div className="hidden lg:block w-full overflow-x-auto border border-[#BEC4D2] rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8EEF2] text-[#3C4250] text-[14px] font-roboto font-normal leading-[21px] border-b border-[#BEC4D2]">
              <th className="py-3 px-5 border-r border-[#BEC4D2] font-normal font-roboto">
                User Name
              </th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto">
                Role
              </th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">
                Phone Number
              </th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">
                Account created
              </th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">
                Subscription
              </th>
              <th className="py-3 px-5 text-right font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#BEC4D2]/50 text-sm text-gray-700">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-gray-400 font-roboto"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((row) => (
                <tr
                  key={row.unique_id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* User Name */}
                  <td className="py-3.5 px-5 border-r border-[#BEC4D2]/40 flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={row.profile_image || "/dummy-user.jpg"}
                        alt={row.full_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-[#161A20] font-roboto text-[14px]">
                        {row.full_name}
                      </span>
                      <span className="block text-[#808CA5] font-roboto text-[12px]">
                        {row.email}
                      </span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[16px] font-normal text-[#364153]">
                    User
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#364153]">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                      <span>{row.number || "N/A"}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#364153] text-center">
                    {formatDate(row.account_created)}
                  </td>

                  {/* Subscription */}
                  <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 text-center">
                    <span
                      className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full ${getPlanBadgeStyle(row.subscription || null)}`}
                    >
                      {row.subscription || "Basic"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all focus:outline-none cursor-pointer">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem className="cursor-pointer">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 cursor-pointer">
                          Deactivate
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

      {/* Table Mobile */}
      <div className="block lg:hidden space-y-4">
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-400 font-roboto">
            No users found.
          </div>
        ) : (
          users.map((row) => (
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
                    <span className="text-xs text-[#808CA5] block break-all font-roboto">
                      {row.email}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full ${getPlanBadgeStyle(row.subscription || null)}`}
                >
                  {row.subscription || "Basic"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">Role</span>
                  <span className="font-normal text-[#364153] font-roboto">
                    User
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Phone</span>
                  <span className="font-normal text-[#364153] font-roboto">
                    {row.number || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">
                    Created
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
    </div>
  );
}
