import { baseApi } from "../../api/baseApi";
import { setUser } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
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
      invalidatesTags: ["Auth"],
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
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user || data.userInfo) {
            dispatch(setUser(data.user || data.userInfo));
          }
        } catch (error) {}
      },
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
      invalidatesTags: ["Auth"],
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
  useRegisterUserMutation,
  useGetMeQuery,
  useLoginUserMutation,
  useGoogleLoginUserMutation,
  useAdminSignupMutation,
  useLogoutUserMutation,
  useForgotPasswordRequestMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
