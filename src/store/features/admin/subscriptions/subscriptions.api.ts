/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/store/api/baseApi";
import {
  CreateSubscriptionPlan,
  SubscriptionPlansResponse,
  SubscriptionPlan,
  UpdatePlanPayload,
  CreateCustomSubscriptionType,
  SubscriptionRequestResponse,
} from "./subscriptions.type";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubscription: build.mutation<any, CreateSubscriptionPlan>({
      query: (data) => ({
        url: "/subscription/plans/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    getAllSubscription: build.query<SubscriptionPlansResponse, void>({
      query: () => ({
        url: "/subscription/plans/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    updateSubscription: build.mutation<any, { id: string | number; data: UpdatePlanPayload }>({
      query: ({ id, data }) => ({
        url: `/subscription/plans/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    getSingleSubscription: build.query<SubscriptionPlan, { id: string | number }>({
      query: ({ id }) => ({
        url: `/subscription/plans/${id}/`,
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    deletePackage: build.mutation<any, { id: string | number }>({
      query: ({ id }) => ({
        url: `/subscription/plans/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),

    // subscription request api 

    createCustomSubscription: build.mutation<any, CreateCustomSubscriptionType>({
      query: (data) => ({
        url: "/subscription/custom/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    getAllSubscriptionRequest: build.query<SubscriptionRequestResponse, void>({
      query: () => ({
        url: "/subscription/requests/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    updateSubscriptionRequest: build.mutation<any, { id: number | string; data: { action: "approved" | "decline" } }>({
      query: ({ id, data }) => ({
        url: `/subscription/requests/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ---------------------------
  }),
});

export const {
  useCreateSubscriptionMutation,
  useCreateCustomSubscriptionMutation,
  useGetAllSubscriptionQuery,
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useDeletePackageMutation,
  useGetAllSubscriptionRequestQuery,
  useUpdateSubscriptionRequestMutation,
} = subscriptionsApi;
