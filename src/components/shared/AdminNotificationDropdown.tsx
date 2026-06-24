"use client";

import Image from "next/image";
import { Bell, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useGetAdminNotificationsQuery } from "@/store/features/admin/adminNotification/admin-notification.api";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminNotificationDropdown() {
  const { data: apiNotifications, isLoading } = useGetAdminNotificationsQuery(undefined);
  
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5 cursor-pointer" />

          {apiNotifications && apiNotifications.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#135576] text-[10px] font-medium text-white">
              {apiNotifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] md:w-[480px] rounded-2xl p-5 shadow-xl border border-slate-100 bg-white"
      >
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
            Notifications
            {apiNotifications && apiNotifications.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#135576]/10 text-xs font-semibold text-[#135576]">
                {apiNotifications.length}
              </span>
            )}
          </h2>
          
          <button
            onClick={() => setOpen(false)}
            className="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 p-1.5 rounded-full transform transition-all duration-300 hover:rotate-90 cursor-pointer shrink-0"
            title="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="my-3 border-b border-slate-100" />

        <div className="max-h-[480px] space-y-2.5 overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-[#135576]"></div>
            </div>
          ) : !apiNotifications || apiNotifications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-medium text-slate-500">
                No notifications yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                We&apos;ll notify you when something happens.
              </p>
            </div>
          ) : (
            apiNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative flex items-start w-full gap-3 rounded-xl p-3.5 text-left transition-all duration-200 border
                ${
                  !notification.is_read
                    ? "bg-[#135576]/5 border-[#135576]/10 hover:bg-[#135576]/8"
                    : "bg-white border-slate-100/60 hover:bg-slate-50/80 hover:border-slate-200"
                }`}
              >
                <div className="relative h-10 w-10 md:h-11 md:w-11 shrink-0">
                  <Image
                    src={notification.sender_image || "/dummy-user.jpg"}
                    alt={notification.title}
                    fill
                    className="rounded-full object-cover border border-slate-100"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-xs md:text-sm text-slate-900 truncate">
                      {notification.title}
                    </h4>

                    <span className="text-[9px] md:text-xs text-slate-400 shrink-0">
                      {notification.created_at
                        ? formatDistanceToNow(
                            new Date(notification.created_at),
                            { addSuffix: true },
                          )
                        : ""}
                    </span>
                  </div>

                  <p className="font-semibold text-[10px] md:text-xs text-[#135576] mt-0.5">
                    {notification.sender_name || "System"}
                  </p>

                  <p className="mt-1 text-[11px] md:text-sm text-slate-600 leading-relaxed wrap-break-word">
                    {notification.body}
                  </p>
                </div>

                {!notification.is_read && (
                  <span className="h-2 w-2 rounded-full bg-[#135576] shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
