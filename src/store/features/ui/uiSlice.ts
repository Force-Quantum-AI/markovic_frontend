import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isSideBarVisible: boolean;
}

const initialState: UiState = {
  isSideBarVisible: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSideBarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSideBarVisible = action.payload;
    },
    toggleSideBarVisible: (state) => {
      state.isSideBarVisible = !state.isSideBarVisible;
    },
  },
});

export const { setSideBarVisible, toggleSideBarVisible } = uiSlice.actions;
export default uiSlice.reducer;
