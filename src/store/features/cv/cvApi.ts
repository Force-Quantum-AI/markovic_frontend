import { baseApi } from "../../api/baseApi";
import { setUserCV } from "./cvSlice";

export const cvApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCV: builder.query<any, string>({
      query: (id) => `/fetchUserCvData/${id}`,
      providesTags: ["CV"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.userCV) {
            dispatch(setUserCV(data.userCV));
          }
        } catch (error) {}
      },
    }),
    createCV: builder.mutation<any, void>({
      query: () => ({
        url: "/createUserNewCv",
        method: "POST",
      }),
      invalidatesTags: ["CV"],
    }),
    updateCVTitle: builder.mutation<any, { cvId: string; newTitle: string }>({
      query: (body) => ({
        url: `/updateUserCvTitle`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CV"],
    }),
    deleteCV: builder.mutation<any, string>({
      query: (id) => ({
        url: `/deleteUserCv/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CV"],
    }),
    toggleFavorite: builder.mutation<any, string>({
      query: (id) => ({
        url: `/toggleFavorite/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CV"],
    }),
  }),
});

export const {
  useLazyGetUserCVQuery,
  useGetUserCVQuery,
  useCreateCVMutation,
  useUpdateCVTitleMutation,
  useDeleteCVMutation,
  useToggleFavoriteMutation,
} = cvApi;
