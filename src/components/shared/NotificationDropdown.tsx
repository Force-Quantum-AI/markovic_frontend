"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Bell, Check, Loader2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useGetAllNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationAsReadMutation,
  useDeleteNotificationMutation,
} from "@/store/features/notification/notification.api";
import { NotificationItem } from "@/types/notification";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Relative time label, e.g. "2 hours ago" */
function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return "";
  }
}

/** Returns two uppercase initials from a name string, used when no avatar image exists. */
function initials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ─── Single notification row ──────────────────────────────────────────────────

function NotificationRow({
  item,
  onRead,
  onDelete,
  isDeleting,
}: {
  item: NotificationItem;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  const senderLabel = item.sender_name ?? "System";
  const router = useRouter();

  return (
    <div
      className={`relative flex items-start gap-3 rounded-2xl p-3 transition group ${!item.is_read ? "bg-slate-100" : "hover:bg-slate-50"
        }`}
      onClick={() => {
        if(item?.data?.case_id){
          !item.is_read && onRead(item.id)
          router.push(`/my-cases/${item?.data?.case_id}`);
        }
      }}
    >
      {/* Avatar */}
      <div className="relative h-10 md:h-12 w-10 md:w-12 shrink-0">
        {item.sender_image || item.image ? (
          <Image
            src={(item.sender_image ?? item.image)!}
            alt={senderLabel}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-full bg-[#135576]/10 flex items-center justify-center text-[#135576] text-xs font-bold">
            {initials(senderLabel)}
          </div>
        )}
      </div>

      {/* Content — clicking the content area marks as read */}
      <button
        className="flex-1 text-left"
        onClick={() => !item.is_read && onRead(item.id)}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-xs md:text-sm text-slate-900 leading-tight">
            {item.title}
          </h4>
          <span className="text-[10px] md:text-xs text-slate-400">
            {timeAgo(item.created_at)}
          </span>
        </div>

        {item.sender_name && (
          <p className="font-medium text-[10px] md:text-sm text-slate-700 mt-0.5">
            {item.sender_name}
          </p>
        )}

        <p className="mt-1 text-[10px] md:text-sm text-slate-500 leading-snug">
          {item.body}
        </p>
      </button>

      {/* Actions — visible on hover */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        {/* Unread dot */}
        {!item.is_read && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#135576] mt-1" />
        )}

        {/* Delete button — visible on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 disabled:opacity-30 hover:cursor-pointer hover:scale-105"
          title="Delete notification"
        >
          {isDeleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NotificationDropdown() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const {t} = useTranslation("common")

  const {
    data,
    isLoading,
    isError,
  } = useGetAllNotificationsQuery(undefined, {
    // Poll every 60 seconds so new notifications surface without a page refresh.
    // Remove this if you add WebSocket / SSE real-time push instead.
    pollingInterval: 60_000,
  });

  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllNotificationAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = data?.results ?? [];
  const unreadCount = data?.unread_count ?? 0;

  const displayed = useMemo(
    () =>
      activeTab === "unread"
        ? notifications.filter((n: any) => !n.is_read)
        : notifications,
    [activeTab, notifications]
  );

  const handleMarkOne = async (id: number) => {
    try {
      await markAsRead(id).unwrap();
    } catch {
      // silent — the badge will stay until the next successful poll
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead({}).unwrap();
      // await markAllAsRead().unwrap();
    } catch {
      // silent
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteNotification(id).unwrap();
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-gray-100 rounded-full p-1">
          <div className="bg-white rounded-full">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#135576] text-[10px] font-medium text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] md:w-[520px] rounded-3xl p-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold">{t("notifications")}</h2>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Tab: All */}
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-4 py-2 text-[10px] md:text-sm font-medium transition ${activeTab === "all" ? "bg-slate-100 text-black" : "text-slate-500"
                }`}
            >
              {t("all")}
            </button>

            {/* Tab: Unread */}
            <button
              onClick={() => setActiveTab("unread")}
              className={`rounded-xl px-4 py-2 text-[10px] md:text-sm font-medium transition ${activeTab === "unread" ? "bg-slate-100 text-black" : "text-slate-500"
                }`}
            >
              {t("unread")}
              {unreadCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#135576] text-[9px] text-white font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="my-4 border-b" />

        {/* Mark all as read — only shown when there are unread items */}
        {unreadCount > 0 && (
          <div className="flex justify-end mb-3">
            <button
              onClick={handleMarkAll}
              disabled={isMarkingAll}
              className="flex items-center gap-1.5 text-xs text-[#135576] font-medium hover:underline disabled:opacity-50"
            >
              {isMarkingAll ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Check className="w-3 h-3" />
              )}
              {t("mark_all_as_read")}
            </button>
          </div>
        )}

        {/* Notification list */}
        <div className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#135576]" />
              <p className="text-sm text-slate-400">Loading notifications...</p>
            </div>
          ) : isError ? (
            <p className="text-center text-sm text-red-400 py-10">
              Failed to load notifications.
            </p>
          ) : displayed.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">
                {activeTab === "unread" ? "No unread notifications." : "No notifications yet."}
              </p>
            </div>
          ) : (
            displayed.map((item: any) => (
              <NotificationRow
                key={item.id}
                item={item}
                onRead={handleMarkOne}
                onDelete={handleDelete}
                isDeleting={deletingId === item.id}
              />
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}