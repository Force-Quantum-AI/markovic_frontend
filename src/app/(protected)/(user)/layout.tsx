
"use client";

import { ChevronDown, Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { UserAppSidebar } from "@/layout/UserAppSidebar";
import AdminNotificationDropdown from "@/components/shared/AdminNotificationDropdown";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/features/auth/authSlice";
import { useLogoutUserMutation } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // Ignore server errors — still log out locally
    }
    dispatch(logout());
    // Clear cookies
    document.cookie = "accessToken=; Max-Age=0; path=/";
    document.cookie = "access=; Max-Age=0; path=/";
    document.cookie = "refresh=; Max-Age=0; path=/";
    router.replace("/login");
  };

  return (
    <SidebarProvider>
      <UserAppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 xl:h-20 shrink-0 items-center bg-white px-4">
          {/* Show only on mobile and tablet (below lg) */}
          <div className="flex xl:hidden items-center">
            <SidebarTrigger />

            <Separator
              orientation="vertical"
              className="mx-3 h-5"
            />
          </div>

          <div className="flex flex-1 items-center justify-end lg:justify-between">
            {/* search  */}
            <div className="hidden  lg:flex items-center gap-2 2xl:gap-5 px-3 py-1.5 border bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-black/60" />
              <input className="w-2/3 lg:w-50 2xl:w-96 text-xs xl:text-base outline-none rounded-full p-1 placeholder:text-xs" type="text" placeholder="Search cases, clients, laws, documents..." />
            </div>

            <div className="flex items-center gap-5">
              {/* Notification */}
              <AdminNotificationDropdown/>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 md:gap-3 bg-gray-100 rounded-full p-1">
                    <Avatar>
                      <AvatarImage src="/dummy-user.jpg" />
                      <AvatarFallback>AH</AvatarFallback>
                    </Avatar>

                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-black">
                        Ahshanul Haquc
                      </p>

                      <p className="text-xs text-muted-foreground">
                       ahshanulhaquc@gmail.com
                      </p>
                    </div>

                    <ChevronDown className="h-4 w-4 mr-1 bg-black rounded-full text-white cursor-pointer" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 p-2 md:p-3 xl:p-4 bg-slate-50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}