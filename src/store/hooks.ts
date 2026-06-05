import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { setUser } from "./features/auth/authSlice";
import { setUserCV } from "./features/cv/cvSlice";
import { setSkills } from "./features/skills/skillsSlice";
import { setSideBarVisible, toggleSideBarVisible } from "./features/ui/uiSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const setUserState = (data: any) => {
    dispatch(setUser(data));
  };

  return { user, setUser: setUserState };
};

export const useUserCV = () => {
  const dispatch = useAppDispatch();
  const userCV = useAppSelector((state) => state.cv.userCV) || {};

  const setUserCVState = (data: any) => {
    dispatch(setUserCV(data));
  };

  return { userCV, setUserCV: setUserCVState };
};

export const useSkillsContext = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.skills.skills);

  const setSkillsState = (data: any) => {
    dispatch(setSkills(data));
  };

  return { skills, setSkills: setSkillsState };
};

export const useSideBarVisible = () => {
  const dispatch = useAppDispatch();
  const isSideBarVisible = useAppSelector((state) => state.ui.isSideBarVisible);

  const setIsSidebarVisible = (value: boolean | ((prev: boolean) => boolean)) => {
    if (typeof value === "function") {
      dispatch(toggleSideBarVisible());
    } else {
      dispatch(setSideBarVisible(value));
    }
  };

  return { isSideBarVisible, setIsSidebarVisible };
};