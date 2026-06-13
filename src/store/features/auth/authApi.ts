import { baseApi } from "../../api/baseApi";
import { setCredentials, logout as logoutAction } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/register/",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<
      { access: string; refresh: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      // After a successful login, save the tokens in Redux store
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              access: data.access,
              refresh: data.refresh,
            })
          );
        } catch {
          // login failed — leave state unchanged
        }
      },
    }),

    adminSignup: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/admin/signup",
        method: "POST",
        body: userData,
      }),
    }),

    // Reset password APIs
    forgotPasswordRequest: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data, // { email }
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email/",
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

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          // Even if server logout fails, clear local state
        } finally {
          dispatch(logoutAction());
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useAdminSignupMutation,
  useForgotPasswordRequestMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
} = authApi;
