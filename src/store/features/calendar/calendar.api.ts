import { baseApi } from "@/store/api/baseApi";
import {
  CaseDetailsResponseType,
  DashboardScheduleResponseType,
} from "./calendar.type";

const calendarApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCaseCalenderEvents: build.query<DashboardScheduleResponseType, void>({
      query: () => ({
        url: "/lawyer-dashboard/calendar/",
        method: "GET",
      }),
      providesTags: ["case", "lawAndBylaw"],
    }),
    getCalendarEvents: build.query<DashboardScheduleResponseType, void>({
      query: () => ({
        url: "/lawyer-dashboard/calendar/",
        method: "GET",
      }),
      providesTags: ["case", "lawAndBylaw"],
    }),
    getCasesDetails: build.query<CaseDetailsResponseType, { caseId: string }>({
      query: ({ caseId }) => ({
        url: `/cases/${caseId}/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),
  }),
});

export const {
  useGetCaseCalenderEventsQuery,
  useGetCalendarEventsQuery,
  useGetCasesDetailsQuery,
} = calendarApi;
