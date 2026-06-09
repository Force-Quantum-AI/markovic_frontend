"use client";

import React from "react";
import Image from "next/image";
import { MoreHorizontal, Phone } from "lucide-react";
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
  plan: "Standard" | "Basic" | "Professional";
}

const users: UserRow[] = [
  {
    id: "1",
    name: "Kristin Watson",
    email: "kristinwatson@gmail.com",
    avatar: "/dummy-user.jpg",
    role: "Attorney",
    phone: "+382 67 567 890",
    created: "12 Jun 2026",
    plan: "Standard",
  },
  {
    id: "2",
    name: "Esther Howard",
    email: "kenzi.lawson@gmail.com",
    avatar: "/dummy-user.jpg",
    role: "Lawyer",
    phone: "+382 67 234 567",
    created: "12 Jun 2026",
    plan: "Basic",
  },
  {
    id: "3",
    name: "Savannah Nguyen",
    email: "jackson.graham@gmail.com",
    avatar: "/dummy-user.jpg",
    role: "Court Staff",
    phone: "+382 67 345 678",
    created: "12 Jun 2026",
    plan: "Professional",
  },
  {
    id: "4",
    name: "John Kollings",
    email: "sara.cruz@example.com",
    avatar: "/dummy-user.jpg",
    role: "Legal Researcher",
    phone: "+382 67 456 789",
    created: "12 Jun 2026",
    plan: "Standard",
  },
];

const planBadgeStyles = {
  Standard: "bg-[#F3E8FF] text-[#8200DB]",
  Basic: "bg-[#F3F4F6] text-[#364153]",
  Professional: "bg-[#DBEAFE] text-[#1447E6]",
};

export default function MyUsersTable() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[#135576] font-roboto text-[16px] font-medium leading-[24px]">
            My Users
          </h2>
          <span className="text-[#427791] font-roboto text-[12px] font-medium leading-[140%] capitalize">
            (4,590 Users)
          </span>
        </div>
        <button className="text-sm font-semibold text-[#135576] hover:underline font-inter">
          View All
        </button>
      </div>

      {/* Table Desktop */}
      <div className="hidden lg:block w-full overflow-x-auto border border-[#BEC4D2] rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8EEF2] text-[#3C4250] text-[14px] font-roboto font-normal leading-[21px] border-b border-[#BEC4D2]">
              <th className="py-3 px-5 border-r border-[#BEC4D2] font-normal font-roboto">User Name</th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto">Role</th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">Phone Number</th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">Account created</th>
              <th className="py-3 px-4 border-r border-[#BEC4D2] font-normal font-roboto text-center">Subscription</th>
              <th className="py-3 px-5 text-right font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#BEC4D2]/50 text-sm text-gray-700">
            {users.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                {/* User Name */}
                <td className="py-3.5 px-5 border-r border-[#BEC4D2]/40 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={row.avatar} alt={row.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="block font-medium text-[#161A20] font-roboto text-[14px]">{row.name}</span>
                    <span className="block text-[#808CA5] font-roboto text-[12px]">{row.email}</span>
                  </div>
                </td>
                
                {/* Role */}
                <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[16px] font-normal text-[#364153]">
                  {row.role}
                </td>

                {/* Phone */}
                <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#364153]">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-[#808CA5] flex-shrink-0" />
                    <span>{row.phone}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 font-roboto text-[14px] font-normal text-[#364153] text-center">
                  {row.created}
                </td>

                {/* Subscription */}
                <td className="py-3.5 px-4 border-r border-[#BEC4D2]/40 text-center">
                  <span className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full ${planBadgeStyles[row.plan]}`}>
                    {row.plan}
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
                      <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 cursor-pointer">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Mobile */}
      <div className="block lg:hidden space-y-4">
        {users.map((row) => (
          <div key={row.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                  <Image src={row.avatar} alt={row.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-[#161A20] text-sm font-roboto">{row.name}</h4>
                  <span className="text-xs text-[#808CA5] block break-all font-roboto">{row.email}</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${planBadgeStyles[row.plan]}`}>
                {row.plan}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Role</span>
                <span className="font-normal text-[#364153] font-roboto">{row.role}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Phone</span>
                <span className="font-normal text-[#364153] font-roboto">{row.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Created</span>
                <span className="font-normal text-[#364153] font-roboto">{row.created}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
