import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    language: string;
} = {
    language: "en",
};

const languageClientSlice = createSlice({
  name: "clientLanguage",
  initialState,

  reducers: {
    setClientSideLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {
  setClientSideLanguage,
} = languageClientSlice.actions;

export default languageClientSlice.reducer;