import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { subscriptionApi } from "@/store/features/subscription/subscription.client.api";
import { CurrentSubscription } from "@/types/subscription.client";

interface SubscriptionState {
  current: CurrentSubscription | null;
}

const initialState: SubscriptionState = {
  current: null,
};

const subscriptionSlice = createSlice({
  name: "subscriptionState",
  initialState,
  reducers: {
    setCurrentSubscription: (state, action: PayloadAction<CurrentSubscription | null>) => {
      state.current = action.payload;
    },
    clearCurrentSubscription: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      subscriptionApi.endpoints.getClientCurrentSubscription.matchFulfilled,
      (state, action) => {
        state.current = action.payload;
      }
    );
  },
});

export const { setCurrentSubscription, clearCurrentSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectCurrentSubscription = (state: { subscriptionState: SubscriptionState }) =>
  state.subscriptionState.current;

export const selectIsTrialing = (state: { subscriptionState: SubscriptionState }) =>
  state.subscriptionState.current?.status === "trial";

export const selectIsActive = (state: { subscriptionState: SubscriptionState }) =>
  state.subscriptionState.current?.status === "active";

export const selectHasPaidPlan = (state: { subscriptionState: SubscriptionState }) =>
  Boolean(state.subscriptionState.current?.plan);