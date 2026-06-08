"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  title: string;
  company: string;
  description: string;
  time: string;
  image: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Hearing Tomorrow",
    company: "Marković / Lovćen Insurance",
    description:
      "Hearing scheduled for 26 May 2026 at 09:00 in Basic Court Podgorica.",
    time: "2hrs ago",
    image: "https://i.pravatar.cc/150?img=12",
    isRead: false,
  },
  {
    id: 2,
    title: "Case Review",
    company: "Petrović Law Firm",
    description:
      "Initial review completed. Next steps: client consultation.",
    time: "3hrs ago",
    image: "https://i.pravatar.cc/150?img=14",
    isRead: false,
  },
  {
    id: 3,
    title: "Annual Financial Review",
    company: "Jovanović & Partners",
    description:
      "Review meeting set for 15 April 2026 at 14:00 in Conference Room B.",
    time: "1hr ago",
    image: "https://i.pravatar.cc/150?img=32",
    isRead: false,
  },
  {
    id: 4,
    title: "Interim Report",
    company: "Stojanović Associates",
    description:
      "Interim findings presented, further analysis required.",
    time: "30min ago",
    image: "https://i.pravatar.cc/150?img=68",
    isRead: true,
  },
  {
    id: 5,
    title: "Mediation Session",
    company: "Kovačević Mediation Services",
    description:
      "Mediation scheduled for 5 June 2026 at 10:00.",
    time: "1d ago",
    image: "https://i.pravatar.cc/150?img=22",
    isRead: true,
  },
  {
    id: 6,
    title: "Compliance Audit",
    company: "Vuković & Co.",
    description:
      "Audit findings indicate several compliance gaps; action plan needed.",
    time: "5hrs ago",
    image: "https://i.pravatar.cc/150?img=51",
    isRead: true,
  },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [activeTab, setActiveTab] = useState<
    "all" | "unread"
  >("all");

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const filteredNotifications = useMemo(() => {
    if (activeTab === "unread") {
      return notifications.filter(
        (item) => !item.isRead
      );
    }

    return notifications;
  }, [activeTab, notifications]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isRead: true }
          : item
      )
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="size-5" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#135576] text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] md:w-[520px] rounded-3xl p-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold">
            Notifications
          </h2>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-4 py-2 text-[10px] md:text-sm font-medium transition
                ${
                  activeTab === "all"
                    ? "bg-slate-100 text-black"
                    : "text-slate-500"
                }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("unread")}
              className={`rounded-xl px-4 py-2 text-[10px] md:text-sm font-medium transition
                ${
                  activeTab === "unread"
                    ? "bg-slate-100 text-black"
                    : "text-slate-500"
                }`}
            >
              Unread
            </button>
          </div>
        </div>

        <div className="my-4 border-b" />

        <div className="max-h-[550px] space-y-3 overflow-y-auto pr-1">
          {filteredNotifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() =>
                markAsRead(notification.id)
              }
              className={`relative flex items-center w-full gap-3 rounded-2xl p-3 text-left transition

              ${
                !notification.isRead
                  ? "bg-slate-100"
                  : "hover:bg-slate-50"
              }`}
            >
            <div className="relative h-10 md:h-16 w-10 md:w-16">
              <Image
                src={notification.image}
                alt={notification.title}
                fill
                className="rounded-full object-cover"
              />
            </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-xs md:text-base text-slate-900">
                    {notification.title}
                  </h4>

                  <span className="text-[10px] md:text-sm text-slate-400">
                    {notification.time}
                  </span>
                </div>

                <p className="font-medium text-[10px] md:text-base text-slate-800">
                  {notification.company}
                </p>

                <p className="mt-1 text-[10px] md:text-base text-slate-500">
                  {notification.description}
                </p>
              </div>

              {!notification.isRead && (
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#135576]" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}