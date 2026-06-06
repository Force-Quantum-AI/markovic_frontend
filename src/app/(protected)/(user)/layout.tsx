import { Bell, ChevronDown, Search } from "lucide-react";
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
import NotificationDropdown from "@/components/shared/NotificationDropdown";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserAppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center bg-white px-4">
          {/* Show only on mobile and tablet (below lg) */}
          <div className="flex xl:hidden items-center">
            <SidebarTrigger />

            <Separator
              orientation="vertical"
              className="mx-3 h-5"
            />
          </div>

          <div className="flex flex-1 items-center justify-between">
            {/* search  */}
            <div className="flex items-center gap-5 border">
              <Search className="h-5 w-5 text-black" />
              <input className="border outline-none" type="text" placeholder="Search" />
            </div>

            <div className="flex items-center gap-5">
              {/* Notification */}
              <NotificationDropdown/>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                    <Avatar>
                      <AvatarImage src="/dummy-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div className=" text-left">
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

                  <DropdownMenuItem className="text-red-500">
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