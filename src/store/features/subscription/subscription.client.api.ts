import { baseApi } from "../../api/baseApi";

export const subscriptionClientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscriptionList: builder.query<any[], void>({
            query: () => ({
                url: `/subscription/plans/`,
                method: "GET",
            }),
            providesTags: ["subscription"],
        }),
        getClientCurrentSubscription: builder.query<any, void>({
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
        purchaseSubscriptionPlan: builder.mutation({
            query: (plan_id: number) => ({
                url: `/subscription/checkout/${plan_id}/`,
                method: "GET",
            }),
            invalidatesTags: ["subscription"],
        }),
    }),
});

export const {
    useGetAllSubscriptionListQuery,
    useGetClientCurrentSubscriptionQuery,
    useContactForCustomSubscriptionMutation,
    usePurchaseSubscriptionPlanMutation
} = subscriptionClientApi;