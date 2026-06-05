import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SkillsState {
  skills: any;
}

const initialState: SkillsState = {
  skills: {},
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<any>) => {
      state.skills = action.payload;
    },
  },
});

export const { setSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
