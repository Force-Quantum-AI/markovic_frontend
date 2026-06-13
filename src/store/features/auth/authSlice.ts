import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: "lawyer" | "admin";
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  role: "lawyer",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Called after a successful login — backend returns { access, refresh }
    setCredentials: (
      state,
      action: PayloadAction<{ access: string; refresh: string; role: string }>
    ) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
      state.role = action.payload.role as "lawyer" | "admin" || "lawyer";
    },

    setAccessToken: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role as "lawyer" | "admin" || "lawyer";
    },

    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  setAccessToken,
  setRefreshToken,
  logout,
} = authSlice.actions;

export default authSlice.reducer;