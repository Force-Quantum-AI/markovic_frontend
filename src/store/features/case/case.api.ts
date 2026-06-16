import { baseApi } from "../../api/baseApi";

export const caseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCases: builder.query<any, void>({
      query: () => ({
        url: "/cases/",
        method: "GET",
      }),
      providesTags: ["case"],
    }),
    getCaseDetails: builder.query<any, string>({
      query: (case_id: string) => ({
        url: `/cases/${case_id}/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
    createCase: builder.mutation({
      query: (data: any) => ({
        url: "/cases/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["case"],
    }),
  }),
});

export const {
  useGetAllCasesQuery,
  useGetCaseDetailsQuery,
  useCreateCaseMutation,
} = caseApi;
