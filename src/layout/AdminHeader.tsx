"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AdminNotificationDropdown from "@/components/shared/AdminNotificationDropdown";
import { useGetProfileInfoQuery } from "@/store/features/profile/profile.api";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/features/auth/authSlice";
import { useLogoutUserMutation } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { data: profileInfo } = useGetProfileInfoQuery({});

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
    router.replace("/admin-login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 xl:h-20 shrink-0 items-center bg-white px-4 border-b">
      {/* Show only on mobile and tablet (below xl) */}
      <div className="flex xl:hidden items-center ">
        <SidebarTrigger />

        <Separator
          orientation="vertical"
          className="mx-3 h-5"
        />
      </div>

      <div className="flex flex-1 items-center justify-end">
        {/* search  */}
        {/* <div className="hidden lg:flex items-center gap-2 2xl:gap-5 px-3 py-1.5 border bg-gray-100 rounded-full">
          <Search className="h-5 w-5 text-black/60" />
          <input
            className="w-2/3 lg:w-50 2xl:w-96 text-xs xl:text-base outline-none rounded-full p-1 placeholder:text-xs bg-transparent"
            type="text"
            placeholder="Search cases, users, documents..."
          />
        </div> */}

        <div className="flex items-center gap-5">
          {/* Notification */}
          <AdminNotificationDropdown />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 md:gap-3 bg-gray-100 rounded-full p-1 cursor-pointer border">
                {/* <Avatar>
                  <AvatarImage src={profileInfo?.profile_image || "/dummy-user.jpg"} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar> */}

                <div className="hidden md:block text-left pl-2">
                  <p className="text-sm font-medium text-black">
                    {profileInfo?.full_name || "Admin User"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {profileInfo?.email || "admin@markovic.com"}
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

              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}