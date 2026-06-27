/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";
import { ArchiveCasesQueryParams, ArchiveCasesResponse, CaseDetailsResponse } from "./archive.type";

const adminArchiveApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArchiveCasesList: build.query<ArchiveCasesResponse, ArchiveCasesQueryParams | void>({
      query: (params) => ({
        url: "/admin-dashboard/archive-cases/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["archive"],
    }),
    getArchiveCasesDetails: build.query<CaseDetailsResponse, {id: string}>({
      query: ({id}) => ({
        url: `/admin-dashboard/archive-cases/${id}/`,
        method: "GET",
      }),
      providesTags: ["archive"],
    }),
    deleteArchiveCase: build.mutation<any, {id: string | number}>({
      query: ({id}) => ({
        url: `/admin-dashboard/archive-cases/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["archive"],
    }),
  }),
});

export const { useGetArchiveCasesListQuery, useGetArchiveCasesDetailsQuery, useDeleteArchiveCaseMutation } = adminArchiveApi;
