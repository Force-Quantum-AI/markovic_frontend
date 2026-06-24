import { baseApi } from "../../api/baseApi";

export const lawAndBylawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLawAndBylaw: builder.query<any, { page?: number; search?: string; category?: number } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) {
            queryParams.append("page", params.page.toString());
          }
          if (params.search) {
            queryParams.append("search", params.search);
          }
          if (params.category) {
            queryParams.append(
              "category",
              params.category.toString()
            );
          }
        }
        return {
          url: "/laws/",
          method: "GET",
          params: queryParams,
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
    getAllBookmarkedLaws: builder.query<any, void>({
      query: () => ({
        url: `/laws/bookmarks/`,
        method: "GET",
      }),
      providesTags: ["lawAndBylaw"],
    }),
    toggleBookmarkedLaws: builder.mutation({
      query: ({ id }) => ({
        url: `/laws/${id}/bookmark/`,
        method: "PATCH"
      }),
      invalidatesTags: ["lawAndBylaw"]
    }),
    getAutomaticLawAndBylaw: builder.query<any, {search?: string, category?: number}>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.search) {
            queryParams.append("search", params.search);
          }
          if (params.category) {
            queryParams.append(
              "category",
              params.category.toString()
            );
          }
        }
        return {
          url: `/laws/rss/`,
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["lawAndBylaw"],
    }),
    syncAutomaticLawAndBylaw: builder.mutation({
      query: () => ({
        url: `/laws/rss/sync/`,
        method: "POST",
      }),
      invalidatesTags: ["lawAndBylaw"]
    })
  }),
});

export const {
  useGetAllLawAndBylawQuery,
  useGetLawBylawDetailsQuery,
  useGetAllBookmarkedLawsQuery,
  useToggleBookmarkedLawsMutation,
  useGetAutomaticLawAndBylawQuery,
  useSyncAutomaticLawAndBylawMutation
} = lawAndBylawApi;
