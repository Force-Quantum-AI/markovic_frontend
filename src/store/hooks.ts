import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
// import { setSideBarVisible, toggleSideBarVisible } from "./features/ui/uiSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useAuthUser = () => {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.auth.user);

//   const setUserState = (data: any) => {
//     dispatch(setUser(data));
//   };

//   return { user, setUser: setUserState };
// };