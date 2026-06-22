import { NotificationSettings } from "@/types/settingPageTabs";
import { baseApi } from "../../api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationSettings: builder.query<NotificationSettings, void>({
      query: () => ({
        url: "/auth/preferences/notifications/",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    updateNotificationSettings: builder.mutation({
      query: (data: NotificationSettings) => ({
        url: "/auth/preferences/notifications/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    // for notification modal 
    registerDeviceToken: builder.mutation({
      query: (data: { token: string, device_type: string }) => ({
        url: "/notifications/fcm-token/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    getAllNotifications: builder.query<any, void>({
      query: () => ({
        url: "/notifications/",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    markNotificationAsRead: builder.mutation({
      query: (id: number) => ({
        url: `/notifications/${id}/read/`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    markAllNotificationAsRead: builder.mutation({
      query: () => ({
        url: `/notifications/read-all/`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id: number) => ({
        url: `/notifications/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useRegisterDeviceTokenMutation,
  useGetAllNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
