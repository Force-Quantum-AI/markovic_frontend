import { CheckoutResponse, CurrentSubscription, PaymentCancelResponse, PaymentVerificationResponse, SubscriptionPlan } from "@/types/subscription.client";
import { baseApi } from "../../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscriptionList: builder.query<SubscriptionPlan[], void>({
            query: () => ({
                url: `/subscription/plans/`,
                method: "GET",
            }),
            providesTags: ["subscription"],
        }),

        getClientCurrentSubscription: builder.query<CurrentSubscription, void>({
            query: () => ({
                url: `/subscription/my/`,
                method: "GET",
            }),
            providesTags: ["subscription"],
        }),

        contactForCustomSubscription: builder.mutation({
            query: (data: {
                full_name: string,
                email: string,
                phone_number: string,
                message: string
            }) => ({
                url: `/subscription/contact-support/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["subscription"],
        }),

        purchaseSubscriptionPlan: builder.mutation<CheckoutResponse, number>({
            query: (plan_id) => ({
                url: `/subscription/checkout/${plan_id}/`,
                method: "POST",
            }),
            invalidatesTags: ["subscription"],
        }),

        getPaymentVerified: builder.query<PaymentVerificationResponse, string>({
            query: (session_id) => ({
                url: `/subscription/payment/success/?session_id=${encodeURIComponent(session_id)}`,
                method: "GET",
            }),
            providesTags: ["subscription"],
        }),

        cancelSubscription: builder.query<PaymentCancelResponse, string>({
            query: (session_id) => ({
                url: `/subscription/payment/cancel/?session_id=${encodeURIComponent(session_id)}`,
                method: "GET",
            }),
            providesTags: ["subscription"],
        }),
    }),
});

export const {
    useGetAllSubscriptionListQuery,
    useGetClientCurrentSubscriptionQuery,
    useContactForCustomSubscriptionMutation,
    usePurchaseSubscriptionPlanMutation,
    useGetPaymentVerifiedQuery,
    useCancelSubscriptionQuery,
} = subscriptionApi;