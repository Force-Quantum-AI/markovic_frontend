
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
import { useGetProfileInfoQuery } from "@/store/features/profile/profile.api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useGetClientCurrentSubscriptionQuery } from "@/store/features/subscription/subscription.client.api";
import { useEffect, useState } from "react";
import { setCurrentSubscription } from "@/store/features/subscription/subscription.slice";
import { PlanActiveNotifier } from "@/components/user/PlanActiveNotifier";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SubscriptionEndModal from "@/components/modals/SubscriptionEndModal";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: profileInfo, isLoading: isLoadingProfileInfo } = useGetProfileInfoQuery({});
  const {data : currentSubscription} = useGetClientCurrentSubscriptionQuery();
  const [logoutUser] = useLogoutUserMutation();

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    if (currentSubscription) {
      dispatch(setCurrentSubscription(currentSubscription));
    }
  },[currentSubscription])

  const myCurrentSubscription = useSelector((state: RootState) => state.subscriptionState.current);

  useEffect(() => {
    if(!myCurrentSubscription){
      return;
    }
    if (myCurrentSubscription.status !== "trial" && myCurrentSubscription.status !== "active") {
      setIsModalOpen(true);
    }
  }, [myCurrentSubscription]);

  const handleSearch = (value: string) => { 
    setTimeout(() => {
      toast.info("This feature will be implement later!")
    }, 2000); 
  };

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
        <header className="sticky top-0 z-50 flex h-16 xl:h-20 shrink-0 items-center bg-white  px-4">
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
            <div className="hidden  lg:flex items-center gap-2 2xl:gap-5 px-3 py-1.5 bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-black/60" />
              <input onChange={(e) => handleSearch(e.target.value)} className="w-2/3 lg:w-50 2xl:w-96 text-xs xl:text-base outline-none rounded-full p-1 placeholder:text-xs text-black" type="text" placeholder="Search cases, clients, laws, documents..." />
            </div>

            <div className="flex items-center gap-5">
              {/* Notification */}
              <AdminNotificationDropdown/>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {isLoadingProfileInfo ? (
                    <div className="flex items-center gap-1 md:gap-2 bg-gray-100 rounded-full p-1">
                      <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                      <div className="flex flex-col gap-2 mr-2">
                        <Skeleton className="h-4 w-40 bg-gray-300" />
                        <Skeleton className="h-3 w-20 bg-gray-300" />
                      </div>
                    </div>
                  ) : (
                  <button className="flex items-center gap-1 md:gap-3 bg-gray-100 rounded-full p-1">
                    <Avatar>
                      <AvatarImage src={profileInfo?.profile_image}/>
                      <AvatarFallback>AH</AvatarFallback>
                    </Avatar>

                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-black">
                        {profileInfo?.full_name ? profileInfo?.full_name : "Mr/Mrs User"}
                      </p>

                      <p className="text-xs text-muted-foreground text-gray-400">
                        {profileInfo?.email ? profileInfo?.email : "me@gmail.com"}
                      </p>
                    </div>

                    <ChevronDown className="h-4 w-4 mr-1 bg-black rounded-full text-white cursor-pointer" />
                  </button>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="bg-white text-black">
                  <DropdownMenuItem  onClick={() => router.push("/settings")}>
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem  onClick={() => router.push("/settings")}>
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

        <main className="flex-1 p-2 md:p-3 xl:p-4 bg-slate-50 text-black">
          {myCurrentSubscription?.status ==="trial" && <PlanActiveNotifier/>}
          {children}
        </main>
      </SidebarInset>
      <SubscriptionEndModal open={isModalOpen} onOpenChange={() => setIsModalOpen(false)} onClick={() => {router.push("/subscription")}}/>
    </SidebarProvider>
  );
}