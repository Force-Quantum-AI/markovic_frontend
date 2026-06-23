/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";
import { AdminNotificationsResponse } from "./admin-notification.type";

const adminNotificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNotification: build.mutation<any, { title: string; body: string }>({
      query: (data) => ({
        url: "/notifications/admin/broadcast/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),

    getAdminNotifications: build.query<AdminNotificationsResponse, void>({
      query: () => ({
        url: "/notifications/admin/all/",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useCreateNotificationMutation, useGetAdminNotificationsQuery } = adminNotificationApi;
