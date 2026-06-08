"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Archive,
  Bot,
  Calendar,
  Gavel,
  Grid2x2Check,
  Scale,
  Users,
  ScrollText,
  SlidersHorizontal
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
    href: "/",
    icon: Grid2x2Check,
  },
  {
    title: "My Cases",
    href: "/cases",
    icon: Scale,
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
    icon: ScrollText,
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
    icon: SlidersHorizontal,
  },
];

export function UserAppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r bg-white p-2"
      collapsible="offcanvas"
    >
      <SidebarHeader className=" bg-white">
        <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Image
            src="/brandLogo.png"
            alt="logo"
            width={148}
            height={42}
          />
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
                className={`flex items-center gap-3 rounded-full px-3 py-2 lg:py-3 2xl:py-4 text-sm font-medium transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0
                  
                  ${
                    active
                      ? "bg-[#135576] text-white"
                      : "text-black/70 hover:bg-[#135576]/10 hover:text-[#135576]"
                  }
                `}
              >
                <item.icon className="h-4 w-4" />

                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}