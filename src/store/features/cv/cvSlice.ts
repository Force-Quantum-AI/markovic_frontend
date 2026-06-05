import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CvState {
  userCV: any;
}

const defaultUserCV = {
  _id: "",
  title: "",
  name: "",
  profession: "",
  description: "",
  images: "",
  photo: "",
  emailId: "",
  phoneNumber: "",
  linkedInId: "",
  githubId: "",
  portfolioLink: "",
  address: "",
  skills: {},
  projects: [],
  experience: [],
  education: [],
  achievement: [],
  activities: [],
  otherSection: [],
  reference: [],
};

const normalizeUserCV = (data: any) => ({
  ...defaultUserCV,
  ...data,
  skills: { ...defaultUserCV.skills, ...(data?.skills || {}) },
  projects: data?.projects ?? [],
  experience: data?.experience ?? [],
  education: data?.education ?? [],
  achievement: data?.achievement ?? [],
  activities: data?.activities ?? [],
  otherSection: data?.otherSection ?? [],
  reference: data?.reference ?? [],
});

const getInitialCV = () => {
  try {
    const saved = localStorage.getItem("userCV");
    return saved ? normalizeUserCV(JSON.parse(saved)) : defaultUserCV;
  } catch (e) {
    return defaultUserCV;
  }
};

const initialState: CvState = {
  userCV: getInitialCV(),
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setUserCV: (state, action: PayloadAction<any>) => {
      const normalizedCV = action.payload ? normalizeUserCV(action.payload) : defaultUserCV;
      const nextCV = action.payload ? normalizedCV : defaultUserCV;

      if (JSON.stringify(state.userCV) !== JSON.stringify(nextCV)) {
        state.userCV = nextCV;

        if (action.payload) {
          localStorage.setItem("userCV", JSON.stringify(state.userCV));
        } else {
          localStorage.removeItem("userCV");
        }
      }
    },
  },
});

export const { setUserCV } = cvSlice.actions;
export default cvSlice.reducer;
