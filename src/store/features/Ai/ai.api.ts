import { aiBaseAPI } from "@/store/api/aiBaseApi";

export const aiApi = aiBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        aiSearch: builder.mutation<any, {
            user_id: string;
            case_scenario: string;
            file?: File | null;
        }>({
            query: (body) => {
                const formData = new FormData();
                formData.append("user_id", body.user_id);
                formData.append("case_scenario", body.case_scenario);
                if (body.file) {
                    formData.append("file", body.file);
                }
                return {
                    url: '/api/ai-cases/search',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ["aiSearch"],
        }),
        getAiSearchHistory: builder.query<any, { user_id: string }>({
            query: ({ user_id }) => ({
                url: `/api/ai-cases/search-history/ids`,
                method: 'GET',
                params: { user_id },
            }),
            providesTags: ["aiSearch"],
        }),
        getAiCaseDetails: builder.query<any, {
            user_id: string;
            search_history_id: number;
        }>({
            query: ({ user_id, search_history_id }) => ({
                url: `/api/ai-cases/search-history/result`,
                method: 'GET',
                params: { user_id, search_history_id },
            }),
            providesTags: ["aiSearch"],
        }),
        deleteAnAiCaseHistory: builder.mutation<any, {
            user_id: string;
            search_history_id: number;
        }>({
            query: ({ user_id, search_history_id }) => ({
                url: `/api/ai-cases/delete`,
                method: 'DELETE',
                params: { user_id, search_history_id },
            }),
            invalidatesTags: ["aiSearch"],
        }),
    }),
});

export const {
    useAiSearchMutation,
    useGetAiSearchHistoryQuery,
    useGetAiCaseDetailsQuery,
    useDeleteAnAiCaseHistoryMutation
} = aiApi;
