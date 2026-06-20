// import { baseApi } from "../../api/baseApi";

// export const subscriptionClientApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllSubscriptionList: builder.query<any[], void>({
//             query: () => ({
//                 url: `/subscription/plans/`,
//                 method: "GET",
//             }),
//             providesTags: ["subscription"],
//         }),
//         getClientCurrentSubscription: builder.query<any, void>({
//             query: () => ({
//                 url: `/subscription/my/`,
//                 method: "GET",
//             }),
//             providesTags: ["subscription"],
//         }),
//         contactForCustomSubscription: builder.mutation({
//             query: (data: {
//                 full_name: string,
//                 email: string,
//                 phone_number: string,
//                 message: string
//             }) => ({
//                 url: `/subscription/contact-support/`,
//                 method: "POST",
//                 body: data,
//             }),
//             invalidatesTags: ["subscription"],
//         }),
//         purchaseSubscriptionPlan: builder.mutation({
//             query: (plan_id: number) => ({
//                 url: `/subscription/checkout/${plan_id}/`,
//                 method: "POST",
//             }),
//             invalidatesTags: ["subscription"],
//         }),
//         getPaymentVerified: builder.query({
//             query: (session_id: string) => ({
//                 url: `/subscription/payment/success/`,
//                 method: "GET",
//                 body: {
//                     session_id: session_id
//                 },
//             }),
//             providesTags: ["subscription"],
//         }),
//         cancelSubscription: builder.query({
//             query: (session_id: string) => ({
//                 url: `/subscription/payment/cancel/`,
//                 method: "GET",
//                 body: {
//                     session_id: session_id
//                 },
//             }),
//             providesTags: ["subscription"],
//         }),
//     })
// });

// export const {
//     useGetAllSubscriptionListQuery,   
//     useGetClientCurrentSubscriptionQuery,
//     useContactForCustomSubscriptionMutation,
//     usePurchaseSubscriptionPlanMutation,
//     useGetPaymentVerifiedQuery,
//     useCancelSubscriptionQuery
// } = subscriptionClientApi;


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

        // NOTE: GET requests cannot carry a request body — `fetch`/most HTTP
        // clients drop it, and several proxies reject it outright. The session_id
        // is sent as a URL query parameter instead, which is also how Stripe
        // hands it back to us on redirect (`?session_id=...`), so this is the
        // natural place for it to live.
        getPaymentVerified: builder.query<PaymentVerificationResponse, string>({
            query: (session_id) => ({
                url: `/subscription/payment/success/?session_id=${encodeURIComponent(session_id)}`,
                method: "GET",
            }),
            providesTags: ["subscription"],
        }),

        // Same fix as above — also corrected to a `query` (it was already typed
        // as one despite being named like a mutation-ish cancel action; since the
        // backend route is a GET, `query` is the right RTK Query primitive here).
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