import { baseApi } from "../../api/baseApi";

export const lawAndBylawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLawAndBylaw: builder.query<any, { page?: number; search?: string; category?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) {
            queryParams.append("page", params.page.toString());
          }
          if (params.search) {
            queryParams.append("search", params.search);
          }
          if (params.category && params.category !== "All") {
            queryParams.append("category", params.category);
          }
        }
        const queryString = queryParams.toString();
        return {
          url: "/laws/",
        //   i will use this query params when backend is ready 
        //   url: queryString ? `/laws/?${queryString}` : "/laws/",
          method: "GET",
        };
      },
      providesTags: ["lawAndBylaw"],
    }),
    getLawBylawDetails: builder.query<any, { id: string }>({ 
      query: ({ id }) => ({
        url: `/laws/${id}/`,
        method: "GET",
      }),
      providesTags: ["lawAndBylaw"],
    }),
  }),
});

export const {
    useGetAllLawAndBylawQuery,
    useGetLawBylawDetailsQuery
} = lawAndBylawApi;
