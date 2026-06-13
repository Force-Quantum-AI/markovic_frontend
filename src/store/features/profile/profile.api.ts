import { baseApi } from "../../api/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInfo: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfileInfo: builder.mutation({
      query: (data: { profile_image?: File; data: any }) => ({
        url: "/auth/profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
} = profileApi;
