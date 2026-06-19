import { HearingAndDeadlinePageDataParamsType, updateClientProfileInfoType } from "@/types/case.types";
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
    // get case details for left  side
    getLeftSideCaseDetails: builder.query<any, string>({
      query: (caseId: string) => ({
        url: `/cases/${caseId}/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
    updateClientProfileInfo: builder.mutation<any, { caseId: string, data: updateClientProfileInfoType }>({
      query: ({ caseId, data }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data.data));
        if (data.client_image) {
          formData.append("client_image", data.client_image);
        }
        return {
          url: `/cases/${caseId}/update/client/`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["case"],
    }),
    updateClientNote: builder.mutation<any, { caseId: string, data: { note: string } }>({
      query: ({ caseId, data }) => ({
        url: `/cases/${caseId}/update/note/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["case"],
    }),
    // get case details for right side
    getRightSideCaseDetails: builder.query<any, { leftCaseId: string, rightCaseId: string }>({
      query: ({ leftCaseId, rightCaseId }) => ({
        url: `/cases/${leftCaseId}/client-case/${rightCaseId}/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
    updateOverviewInfoOfCase: builder.mutation<any, {
      caseId: string,
      data: {
        client_name: string,
        case_name: string,
        category: number,
        sub_category: number,
        status: number,
        court: number,
        responsible_lawyer_ids: string[],
        opposing_parties: string[]
      }
    }>({
      query: ({ caseId, data }) => ({
        url: `/cases/${caseId}/update/overview/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["case"],
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
    // case hearing & deadline
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
    getHearingAndDeadlinePageData: builder.query<any, HearingAndDeadlinePageDataParamsType>({
      query: (params) => ({
        url: `/cases/schedules/`,
        method: "GET",
        params
      }),
      providesTags: ["case"],
    }),
    // bookmarked cases
    getAllBookmarkedCases: builder.query<any, void>({
      query: () => ({
        url: `/cases/bookmarks/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
    toggleBookmarkedCases: builder.mutation({
      query: ({ caseId }) => ({
        url: `/cases/${caseId}/bookmark/`,
        method: "PATCH"
      }),
      invalidatesTags: ["case"]
    })
  }),
});

export const {
  useGetAllCasesQuery,
  // case details page 
  // left side 
  useGetLeftSideCaseDetailsQuery,
  useUpdateClientProfileInfoMutation,
  useUpdateClientNoteMutation,
  // right side 
  useLazyGetRightSideCaseDetailsQuery,
  useUpdateOverviewInfoOfCaseMutation,
  useCreateCaseMutation,
  // case hearing & deadline
  useAddCaseHearingMutation,
  useAddCaseDeadlineMutation,
  useGetHearingAndDeadlinePageDataQuery,
  // bookmarked cases
  useGetAllBookmarkedCasesQuery,
  useToggleBookmarkedCasesMutation
} = caseApi;
