import { HearingAndDeadlineApiPayloadType, HearingAndDeadlinePageDataParamsType, updateClientProfileInfoType } from "@/types/case.types";
import { baseApi } from "../../api/baseApi";

export const caseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCases: builder.query<any, {
       search?: string;
      status?: string;
      category?: number;
      sub_category?: number;
      hearing_day?: number;
      hearing_month?: number;
      hearing_year?: number;
      deadline_day?: number;
      deadline_month?: number;
      deadline_year?: number;
    }>({
      query: (params) => ({
        url: "/cases/",
        method: "GET",
        params
      }),
      providesTags: ["case"],
    }),
    getCaseHearingAndDeadlineAllDateForCalendar: builder.query<any, string>({
      query: (date?: string) => ({
        url: `/lawyer-dashboard/calendar/`,
        method: "GET",
        params: {
          date: date,
        }
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
    makeCompleteCase: builder.mutation({
      query: ({ caseId, description }: {
        caseId: string,
        description: string
      }) => {
        return {
          url: `/cases/${caseId}/close/`,
          method: "PATCH",
          body: { description }
        }
      },
      invalidatesTags: ["case"],
    }),
    asignLowerInCase: builder.mutation({
      query: ({ caseId, email }: {
        caseId: string,
        email: string
      }) => {
        return {
          url: `/cases/${caseId}/lawyers/`,
          method: "POST",
          body: {email: email},
        }
      },
      invalidatesTags: ["case"],
    }),
    deleteAssignedLower: builder.mutation({
      query: ({ caseId, lawyerId }: {
        caseId: string,
        lawyerId: string
      }) => {
        return {
          url: `/cases/${caseId}/lawyers/${lawyerId}/`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["case"],
    }),
    addHearingInCase: builder.mutation({
      query: ({ caseId, data }: {
        caseId: string,
        data: HearingAndDeadlineApiPayloadType
      }) => {
        return {
          url: `/cases/${caseId}/hearings/`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["case"],
    }),
    updateHearingInCase: builder.mutation({
      query: ({ caseId, hearingId, data }: {
        caseId: string,
        hearingId: string,
        data: HearingAndDeadlineApiPayloadType
      }) => {
        return {
          url: `/cases/${caseId}/hearings/${hearingId}/`,
          method: "PATCH",
          body: data,
        }
      },
      invalidatesTags: ["case"],
    }),
    addDeadlineInCase: builder.mutation({
      query: ({ caseId, data }: {
        caseId: string,
        data: HearingAndDeadlineApiPayloadType
      }) => {
        return {
          url: `/cases/${caseId}/deadlines/`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["case"],
    }),
    updateDeadlineInCase: builder.mutation({
      query: ({ caseId, deadlineId, data }: {
        caseId: string,
        deadlineId: string,
        data: HearingAndDeadlineApiPayloadType
      }) => {
        return {
          url: `/cases/${caseId}/deadlines/${deadlineId}/`,
          method: "PATCH",
          body: data,
        }
      },
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
    }),
    // for select dropdown options 
    getCategoryDropdownOptions: builder.query<{
        id: number,
        name: string,
        created_at: string
    }[], void>({
      query: () => ({
        url: `/cases/categories/`,
        method: "GET",
      }),
      providesTags: ["dropdownOptions"],
    }),
    getSubCategoryDropdownOptions: builder.query<{
        id: number,
        category: number,
        category_name: string,
        name: string,
        created_at: string
    }[], number>({
      query: (category: number) => ({
        url: `/cases/sub-categories/`,
        method: "GET",
        params: { category },
      }),
      providesTags: ["dropdownOptions"],
    }),
    getSelectDropdownOptions: builder.query<{
        id: number,
        name: string,
        created_at: string
    }[], number>({
      query: () => ({
        url: `/cases/statuses/`,
        method: "GET",
      }),
      providesTags: ["dropdownOptions"],
    }),
  }),
});

export const {
  useGetAllCasesQuery,
  useGetCaseHearingAndDeadlineAllDateForCalendarQuery,

  // case details page 
  // left side 
  useGetLeftSideCaseDetailsQuery,
  useUpdateClientProfileInfoMutation,
  useUpdateClientNoteMutation,
  // right side 
  useLazyGetRightSideCaseDetailsQuery,
  useUpdateOverviewInfoOfCaseMutation,
  useMakeCompleteCaseMutation,
  useAsignLowerInCaseMutation,
  useDeleteAssignedLowerMutation,
  useAddHearingInCaseMutation,
  useUpdateHearingInCaseMutation,
  useAddDeadlineInCaseMutation,
  useUpdateDeadlineInCaseMutation,
  useCreateCaseMutation,
  // case hearing & deadline
  useAddCaseHearingMutation,
  useAddCaseDeadlineMutation,
  useGetHearingAndDeadlinePageDataQuery,
  // bookmarked cases
  useGetAllBookmarkedCasesQuery,
  useToggleBookmarkedCasesMutation,
  // for select dropdown options 
  useGetCategoryDropdownOptionsQuery,
  useLazyGetCategoryDropdownOptionsQuery,
  useGetSubCategoryDropdownOptionsQuery,
  useLazyGetSubCategoryDropdownOptionsQuery,
  useGetSelectDropdownOptionsQuery,
  useLazyGetSelectDropdownOptionsQuery,
} = caseApi;
