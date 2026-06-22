/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";
import { ArchiveCasesQueryParams, ArchiveCasesResponse } from "./archive.type";

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
    deleteArchiveCase: build.mutation<any, {id: string | number}>({
      query: ({id}) => ({
        url: `/admin-dashboard/archive-cases/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["archive"],
    }),
  }),
});

export const { useGetArchiveCasesListQuery, useDeleteArchiveCaseMutation } = adminArchiveApi;
