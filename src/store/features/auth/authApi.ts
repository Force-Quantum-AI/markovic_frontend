import { baseApi } from "../../api/baseApi";
import { setUser } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.userInfo || data.user || null));
        } catch (error) {
          dispatch(setUser(null));
        }
      },
      
    }),
    loginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/userLogin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User", "CV", "Skills"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user || data.userInfo) {
            dispatch(setUser(data.user || data.userInfo));
          }
        } catch (error) {}
      },
    }),
    googleLoginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/googleLogin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User", "CV", "Skills"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user || data.userInfo) {
            dispatch(setUser(data.user || data.userInfo));
          }
        } catch (error) {}
      },
    }),
    signupUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/userSignup",
        method: "POST",
        body: userData,
      }),
    }),
    adminSignup: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/admin/signup",
        method: "POST",
        body: userData,
      }),
    }),
    // reset password Api
    forgotPasswordRequest: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data, // { email }
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data, // { email, otp }
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data, // { email, otp, password }
      }),
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/userLogout",
        method: "GET",
      }),
      invalidatesTags: ["Auth", "User", "CV", "Skills"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginUserMutation,
  useGoogleLoginUserMutation,
  useSignupUserMutation,
  useAdminSignupMutation,
  useLogoutUserMutation,
  useForgotPasswordRequestMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
