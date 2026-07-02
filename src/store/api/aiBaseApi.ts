import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const aiBaseAPI = createApi({
  reducerPath: "aiBaseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AI_API_URL || "http://3.87.115.168:8000",
    credentials: "include",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["aiSearch"],
  endpoints: () => ({}),
});