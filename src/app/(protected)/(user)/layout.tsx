export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* <UserSidebar /> */}

      <div className="flex-1">
        {/* <UserHeader /> */}

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}