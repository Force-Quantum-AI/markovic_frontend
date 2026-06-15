import { baseApi } from "../../api/baseApi";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveSession: builder.query({
      query: () => ({
        url: "/auth/sessions/",
        method: "GET",
      }),
      providesTags:["active_sessions"]
    }),
    revokeActiveSession: builder.mutation({
      query: (session_id: string) => ({
        url: `/auth/sessions/${session_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["active_sessions"],
    }),
  }),
});

export const {
  useGetActiveSessionQuery,
  useRevokeActiveSessionMutation,
} = settingApi;
