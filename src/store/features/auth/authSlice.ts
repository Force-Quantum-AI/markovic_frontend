import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null | undefined;
}

const initialState: AuthState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
