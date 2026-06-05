import { baseApi } from "../../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSubscription: builder.query<any, void>({
        query: () => "/subscription/get-current-subscription",
        providesTags: ["Subscription","CV"],
    }),
    createCheckoutSession: builder.mutation<any, { plan: string }>({  
        query: (body) => ({
            url: "/subscription/create-checkout-session",
            method: "POST",
            body,
        }),
        invalidatesTags: ["Subscription"],
    }),
    paymentSuccess: builder.query<any, string>({  
        query: (plan) => `/subscription/payment-success?plan=${plan}`,
        providesTags: ["Subscription","CV"],
    }),

  }),
});

export const { 
    useGetCurrentSubscriptionQuery,
    useCreateCheckoutSessionMutation,
    usePaymentSuccessQuery,
} = subscriptionApi;
