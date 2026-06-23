"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "@/layout/AdminHeader";
import AdminSidebar from "@/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <AdminHeader />

        <main className="flex-1 p-2 md:p-3 xl:p-4 bg-slate-50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}