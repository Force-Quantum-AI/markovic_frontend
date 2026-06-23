import { baseApi } from "@/store/api/baseApi";
import { CaseListResponse, DashboardDataResponse, DataPaginationResponse, UsersResponse } from "./dashboard.type";

const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminDashboardDetails: build.query<DashboardDataResponse, void>({
      query: () => ({
        url: "/admin-dashboard/overview/",
        method: "GET",
      }),
      providesTags: ["Laws"],
    }),
    getAdminDashboardArchieveCase: build.query<CaseListResponse, DataPaginationResponse | void>({
      query: (params) => ({
        url: "/admin-dashboard/archive-cases/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Dashboard", "archive"],
    }),
    getAdminDashboardMyUsers: build.query<UsersResponse, DataPaginationResponse | void>({
      query: (params) => ({
        url: "/admin-dashboard/my-users/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Auth", "Profile"],
    }),
  }),
});

export const { useGetAdminDashboardDetailsQuery, useGetAdminDashboardArchieveCaseQuery, useGetAdminDashboardMyUsersQuery } = adminDashboardApi;
