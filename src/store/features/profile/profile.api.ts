/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

interface IArchiveParams {
  search?: string,
  client_name?: string,
  date?: string, //example format: '2026-01-15'
  page_size?: number,
  page?: number,
}

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
      query: (data: { profile_image?: any; data: any }) => ({
        url: "/auth/profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    // for client page 
    getAllClients: builder.query<any, IArchiveParams | void>({ 
      query: (params) => ({
        url: `/cases/clients/`,
        method: "GET",
        params: params || undefined
      }),
      providesTags: ["Profile", "dashboard"],
    }),
    getAllLawyers: builder.query({
      query: (email: string) => ({
        url: `/lawyer-dashboard/users/?email=${email}`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getClientCaseDetails: builder.query<any, string>({
      query: (clientPersonalId: string) => ({
        url: `/cases/personal/${clientPersonalId}/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
  }),
});

export const {
  useGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
  useGetAllClientsQuery,
  useLazyGetAllClientsQuery,
  useGetAllLawyersQuery,
  useLazyGetAllLawyersQuery,
  useGetClientCaseDetailsQuery,
  useLazyGetClientCaseDetailsQuery,
} = profileApi;
