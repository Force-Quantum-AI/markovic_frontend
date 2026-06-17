/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/store/api/baseApi";
import { LawsResponse, LawsQueryParams, LawDetails } from "./laws.type";

const lawsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLaw: build.mutation<any, LawDetails>({
      query: (data) => ({
        url: "/laws/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Laws"],
    }),

    getAllLaws: build.query<LawsResponse, LawsQueryParams | void>({
      query: (params) => ({
        url: "/laws/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Laws"],
    }),

    getSingleLaws: build.query<LawDetails & { id: number }, { id: string | number }>({
      query: ({ id }) => ({
        url: `/laws/${id}/`,
        method: "GET",
      }),
      providesTags: ["Laws"],
    }),

    updateLaws: build.mutation<any, { id: string | number; data: LawDetails }>({
      query: ({ id, data }) => ({
        url: `/laws/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Laws"],
    }),

    deleteLaws: build.mutation<any, string | number>({
      query: (id) => ({
        url: `/laws/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Laws"],
    }),
    
  }),
});

export const {
  useCreateLawMutation,
  useGetAllLawsQuery,
  useGetSingleLawsQuery,
  useUpdateLawsMutation,
  useDeleteLawsMutation,
} = lawsApi;

