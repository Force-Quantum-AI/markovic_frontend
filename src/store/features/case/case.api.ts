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
      query: (payload: {
        client_image?: File;
        data: {
          client_name: string;
          client_email?: string;
          client_phone?: string;
          client_address?: string;
          note?: string;
          case_name: string;
          category?: number;
          sub_category?: number;
          status?: number;
          court?: number;
          responsible_lawyer_ids?: string[];
          opposing_parties?: string[];
          hearing_date?: string;
          deadline_date?: string;
        };
      }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload.data));
        if (payload.client_image) {
          formData.append("client_image", payload.client_image);
        }
        return {
          url: "/cases/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["case"],
    }),
  }),
});

export const {
  useGetAllCasesQuery,
  useGetCaseDetailsQuery,
  useCreateCaseMutation,
} = caseApi;
