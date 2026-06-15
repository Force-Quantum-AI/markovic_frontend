import { baseApi } from "../../api/baseApi";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // for active session 
    getActiveSession: builder.query({
      query: () => ({
        url: "/auth/sessions/",
        method: "GET",
      }),
      providesTags: ["active_sessions"]
    }),
    revokeActiveSession: builder.mutation({
      query: (session_id: string) => ({
        url: `/auth/sessions/${session_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["active_sessions"],
    }),
    // for date and language 
    getLanguageAndTimeSetting: builder.query({
      query: () => ({
        url: "/auth/preferences/language/",
        method: "GET",
      }),
      providesTags: ["languageAndTime"],
    }),
    updateLanguageAndTimeSetting: builder.mutation({
      query: (language_and_time_setting: {
        language: string,
        date_format: string,
        time_format: string,
        timezone: string,
      }) => ({
        url: "/auth/preferences/language/",
        method: "PATCH",
        body: language_and_time_setting,
      }),
      invalidatesTags: ["languageAndTime"],
    }),
  }),
});

export const {
  useGetActiveSessionQuery,
  useRevokeActiveSessionMutation,
  useGetLanguageAndTimeSettingQuery,
  useUpdateLanguageAndTimeSettingMutation,
} = settingApi;
