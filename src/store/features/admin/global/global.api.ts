/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";
import { CaseStatusResponse } from "./global.type";

const adminGlobalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCaseStatuses: build.query<CaseStatusResponse, void>({
      query: () => ({
        url: "/cases/statuses/",
        method: "GET",
      }),
      providesTags: ["Status"], 
    }),
  }),
});

export const { useGetAllCaseStatusesQuery } = adminGlobalApi;
