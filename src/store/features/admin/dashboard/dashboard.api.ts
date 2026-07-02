import { baseApi } from "@/store/api/baseApi";
import { CaseListResponse, DashboardDataResponse, DataPaginationResponse, UsersResponse } from "./dashboard.type";

const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminDashboardDetails: build.query<DashboardDataResponse, void>({
      query: () => ({
        url: "/admin-dashboard/overview/",
        method: "GET",
      }),
      providesTags: ["Dashboard", "case", "Users"],
    }),
    getAdminDashboardArchieveCase: build.query<CaseListResponse, DataPaginationResponse | void>({
      query: (params) => ({
        url: "/admin-dashboard/archive-cases/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["archive"],
    }),
    getAdminDashboardMyUsers: build.query<UsersResponse, DataPaginationResponse | void>({
      query: (params) => ({
        url: "/admin-dashboard/my-users/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAdminDashboardDetailsQuery, useGetAdminDashboardArchieveCaseQuery, useGetAdminDashboardMyUsersQuery } = adminDashboardApi;
