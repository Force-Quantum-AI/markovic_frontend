import { baseApi } from "../../api/baseApi";
import { setSkills } from "./skillsSlice";

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSkills: builder.query<any, void>({
      query: () => "/fetchUserSkills",
      providesTags: ["Skills"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.skills) {
             dispatch(setSkills(data.skills));
          }
        } catch (error) {}
      },
    }),
    updateUserSkills: builder.mutation<any, any>({
      query: (body) => ({
        url: "/updateUserSkills",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Skills", "CV"],
    }),
  }),
});

export const { useGetUserSkillsQuery, useUpdateUserSkillsMutation } = skillsApi;
