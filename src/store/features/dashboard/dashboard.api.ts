import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAllData : builder.query({
        query: () => ({
            url: "/lawyer-dashboard/overview/",
            method: "GET",
        }),
        providesTags: ["dashboard", "Profile", "case"],
    })
  }),
});

export const {
   useGetDashboardAllDataQuery
} = dashboardApi;
