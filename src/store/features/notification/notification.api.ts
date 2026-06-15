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
  }),
});

export const {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = notificationApi;
