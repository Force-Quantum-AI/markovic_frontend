import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, { favoriteOnly?: boolean } | void>({
      query: (arg:any = {}) =>
        arg.favoriteOnly ? "/fetchFavoriteCVsOnly" : "/fetchUserDashboardData",
      providesTags: ["CV"],
    }),
    getCurrentWorkingCV: builder.query<any, string>({
      query: (cvId) => `/fetchCurrentWorkingCV/${cvId}`,
      providesTags: ["CV"],
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({ url: "/userLogout", method: "GET" }),
    }),
    updateUserProfile: builder.mutation<any, FormData>({
      query: (body) => ({ url: "/updateUserProfile", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserContact: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserContact", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserDescription: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserDescription", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserActivities: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserActivities", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserEducation: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserEducation", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserProjects: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserProjects", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserExperience: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserExperience", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserReference: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserReference", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    updateUserAchievement: builder.mutation<any, any>({
      query: (body) => ({ url: "/updateUserAcheivement", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    addNewSection: builder.mutation<any, any>({
      query: (body) => ({ url: "/addNewSection", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    deleteSection: builder.mutation<any, any>({
      query: (body) => ({ url: "/deleteSection", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    addSectionValue: builder.mutation<any, any>({
      query: (body) => ({ url: "/addSectionValue", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    deleteSectionValue: builder.mutation<any, any>({
      query: (body) => ({ url: "/deleteSectionValue", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    deleteMainSectionContentInside: builder.mutation<any, any>({
      query: (body) => ({ url: "/deleteMainSectionContentInside", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    deleteItems: builder.mutation<any, any>({
      query: (body) => ({ url: "/deleteItems", method: "POST", body }),
      invalidatesTags: ["CV"],
    }),
    // Admin APIs
    adminDeleteUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/admin/deleteUser/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    adminBlockUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/admin/blockUser/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    adminUnblockUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/admin/unblockUser/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    adminGetDashboard: builder.query<any, void>({
      query: () => "/admin/dashboard",
      providesTags: ["User"],
    }),
    adminManageUsers: builder.query<any, void>({
      query: () => "/admin/manageUsers",
      providesTags: ["User"],
    }),
    adminUpdateUser: builder.mutation<any, { userId: string; formData: any }>({
      query: ({ userId, formData }) => ({
        url: `/admin/updateUser/${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetCurrentWorkingCVQuery,
  useLogoutUserMutation,
  useUpdateUserProfileMutation,
  useUpdateUserContactMutation,
  useUpdateUserDescriptionMutation,
  useUpdateUserActivitiesMutation,
  useUpdateUserEducationMutation,
  useUpdateUserProjectsMutation,
  useUpdateUserExperienceMutation,
  useUpdateUserReferenceMutation,
  useUpdateUserAchievementMutation,
  useAddNewSectionMutation,
  useDeleteSectionMutation,
  useAddSectionValueMutation,
  useDeleteSectionValueMutation,
  useDeleteMainSectionContentInsideMutation,
  useDeleteItemsMutation,
  useAdminDeleteUserMutation,
  useAdminBlockUserMutation,
  useAdminUnblockUserMutation,
  useAdminGetDashboardQuery,
  useAdminManageUsersQuery,
  useAdminUpdateUserMutation,
} = dashboardApi;
