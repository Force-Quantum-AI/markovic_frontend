import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import subscriptionReducer from "./features/subscription/subscription.slice";
import { aiBaseAPI } from "./api/aiBaseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptionState: subscriptionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [aiBaseAPI.reducerPath]: aiBaseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, aiBaseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;