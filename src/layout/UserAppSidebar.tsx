"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Archive,
  Bot,
  Calendar,
  FileText,
  Gavel,
  House,
  Scale,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "My Cases",
    href: "/cases",
    icon: FileText,
  },
  {
    title: "My Clients",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Hearing & Deadline",
    href: "/hearing",
    icon: Gavel,
  },
  {
    title: "Law & Bylaw",
    href: "/laws",
    icon: Scale,
  },
  {
    title: "Archive Cases",
    href: "/archive",
    icon: Archive,
  },
  {
    title: "AI Court Practice Search",
    href: "/ai-search",
    icon: Bot,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function UserAppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r bg-white"
      collapsible="icon"
    >
      <SidebarHeader className="border-b bg-white">
        <div className="flex items-center gap-3 px-2 py-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
          />

          <span className="text-lg font-semibold text-black">
            Actio.me
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white p-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all
                  
                  ${
                    active
                      ? "bg-[#135576] text-white"
                      : "text-black hover:bg-[#135576]/10 hover:text-[#135576]"
                  }
                `}
              >
                <item.icon className="h-4 w-4" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}