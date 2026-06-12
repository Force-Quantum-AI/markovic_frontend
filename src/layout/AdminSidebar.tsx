"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Grid2x2Check,
  Users,
  Archive,
  Megaphone,
  SlidersHorizontal,
  CreditCard,
  ChartColumn,
  Gavel,
  LayoutGrid,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

interface SubItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Grid2x2Check,
  },
  {
    title: "My Users",
    href: "/admin/my-users",
    icon: Users,
  },
  {
    title: "Subscription",
    icon: CreditCard,
    children: [
      { title: "Packages", href: "/admin/subscription/packages" },
      { title: "Requests", href: "/admin/subscription/requests" },
    ],
  },
  {
    title: "Report",
    href: "/admin/report",
    icon: ChartColumn,
  },
  {
    title: "Laws Database",
    href: "/admin/law-database",
    icon: Gavel,
  },
  {
    title: "Archive Cases",
    href: "/admin/archive-cases",
    icon: Archive,
  },
  {
    title: "Anouncement",
    href: "/admin/anouncement",
    icon: Megaphone,
  },
  {
    title: "Categories & Sub-Category",
    href: "/admin/categories",
    icon: LayoutGrid,
  },
  {
    title: "System Settings",
    href: "/admin/system-settings",
    icon: SlidersHorizontal,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Track which parent items are open
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: NavItem) => {
    const isParentActive = item.children?.some((child) => pathname.startsWith(child.href)) ?? false;
    const isOpen = openItems[item.title] ?? isParentActive;
    
    // Toggle the open state
    setOpenItems((prev) => ({ ...prev, [item.title]: !isOpen }));

    // If opening the accordion, navigate to its first child route
    if (!isOpen && item.children && item.children.length > 0) {
      router.push(item.children[0].href);
    }
  };

  return (
    <Sidebar
      className="border-r bg-white p-2"
      collapsible="offcanvas"
    >
      <SidebarHeader className="bg-white">
        <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Image
            src="/brandLogo.png"
            alt="logo"
            width={148}
            height={42}
            priority
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white p-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            // Item with children (nested)
            if (item.children) {
              const isParentActive = item.children.some((child) =>
                pathname.startsWith(child.href)
              );
              // It is open if the user explicitly toggled it, OR if it has never been toggled but is active
              const isOpen = openItems[item.title] ?? isParentActive;

              return (
                <div key={item.title}>
                  {/* Parent toggle button */}
                  <button
                    onClick={() => toggleItem(item)}
                    className={`w-full flex items-center gap-3 rounded-full px-3 py-2 lg:py-3 2xl:py-4 text-sm font-medium transition-all cursor-pointer
                      ${
                        isParentActive
                          ? "bg-[#135576] text-white"
                          : "text-black/70 hover:bg-[#135576]/10 hover:text-[#135576]"
                      }
                    `}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-data-[collapsible=icon]:hidden ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Sub-items */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-4 pl-3 border-l border-[#BEC4D2]/50 space-y-0.5 group-data-[collapsible=icon]:hidden">
                        {item.children.map((child) => {
                          const childActive = pathname.startsWith(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center rounded-full px-3 py-2 text-sm font-medium transition-all
                                ${
                                  childActive
                                    ? "bg-[#E8EEF2] text-[#135576] font-semibold"
                                    : "text-black/60 hover:bg-[#135576]/10 hover:text-[#135576]"
                                }
                              `}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Regular item (no children)
            const active = item.href ? pathname === item.href : false;

            return (
              <Link
                key={item.title}
                href={item.href!}
                className={`flex items-center gap-3 rounded-full px-3 py-2 lg:py-3 2xl:py-4 text-sm font-medium transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0
                  ${
                    active
                      ? "bg-[#135576] text-white"
                      : "text-black/70 hover:bg-[#135576]/10 hover:text-[#135576]"
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}