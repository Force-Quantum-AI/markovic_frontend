import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/",
    credentials: "include",

    prepareHeaders: (
      headers,
      { getState }
    ) => {
      let token : any =
        (getState() as RootState).auth.accessToken;

      if (!token && typeof document !== "undefined") {
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken=") || row.startsWith("access="));
        token = match?.split("=")[1];
      }

      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      return headers;
    },
  }),
  tagTypes: ["Auth","dashboard","Profile","active_sessions", "notification", "languageAndTime","cookiePreference","case","lawAndBylaw", "archive", "subscription", "dropdownOptions"],
  endpoints: () => ({}),
});