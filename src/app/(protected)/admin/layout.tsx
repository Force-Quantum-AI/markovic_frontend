import AdminHeader from "@/layout/AdminHeader";
import AdminSidebar from "@/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}