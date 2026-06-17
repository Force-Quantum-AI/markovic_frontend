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
    // case hearing 
    addCaseHearing: builder.mutation({
      query: ({ caseId, data }: {
        caseId: string, 
        data: {
          reason: string,
          status: string,
          time_from: string,
          time_to: string,
          am_pm: string,
          day: number,
          month: number,
          year: number
        }
      }) => {
        return {
          url: `/cases/${caseId}/hearings/`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["case"],
    }),
    addCaseDeadline: builder.mutation({
      query: ({ caseId, data }: {
        caseId: string, 
        data: {
          reason: string,
          status: string,
          time_from: string,
          time_to: string,
          am_pm: string,
          day: number,
          month: number,
          year: number
        }
      }) => {
        return {
          url: `/cases/${caseId}/deadlines/`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["case"],
    }),
    getAllBookmarkedCases: builder.query<any, void>({ 
      query: () => ({
        url: `/cases/bookmarks/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
    toggleBookmarkedCases: builder.mutation({
        query: ({caseId})=>({
            url:`/cases/${caseId}/bookmark/`,
            method: "PATCH"
        }),
        invalidatesTags: ["case"]
    })
  }),
});

export const {
  useGetAllCasesQuery,
  useGetCaseDetailsQuery,
  useCreateCaseMutation,
  useAddCaseHearingMutation,
  useAddCaseDeadlineMutation,
  useGetAllBookmarkedCasesQuery,
  useToggleBookmarkedCasesMutation
} = caseApi;
