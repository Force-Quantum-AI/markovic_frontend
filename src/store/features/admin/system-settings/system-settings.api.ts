import { baseApi } from "@/store/api/baseApi";
import { PlatformSettingsResponse } from "./system-settings.type";

const adminSystemSettinsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSystemSettings: build.query<PlatformSettingsResponse, void>({
      query: () => ({
        url: "/admin-dashboard/settings/",
        method: "GET",
      }),
      providesTags: ["sytem_settings"],
    }),
    updateSystemSettings: build.mutation< PlatformSettingsResponse, Partial<PlatformSettingsResponse>>({
      query: (data) => ({
        url: "/admin-dashboard/settings/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["sytem_settings"],
    }),
  }),
});

export const { useGetSystemSettingsQuery, useUpdateSystemSettingsMutation } = adminSystemSettinsApi;
