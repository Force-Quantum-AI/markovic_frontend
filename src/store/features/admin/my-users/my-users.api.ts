/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";
import { PaginationQueryParams, UsersResponse } from "./my-users.type";

const adminUsersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation<any, any>({
      query: (data) => ({
        url: "/admin-dashboard/users/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),
    getAllUsers: build.query<UsersResponse, PaginationQueryParams | void>({
      query: (params) => ({
        url: "/admin-dashboard/users/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Auth", "Profile"],
    }),
    deleteUser: build.mutation<any, { id: string | number }>({
      query: ({ id }) => ({
        url: `/admin-dashboard/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation } = adminUsersApi;
