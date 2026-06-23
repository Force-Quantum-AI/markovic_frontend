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
    // Manual setter — handy for optimistic updates or for the success page
    // to push a freshly-verified status into the slice immediately, without
    // waiting for a refetch of `getClientCurrentSubscription`.
    setCurrentSubscription: (state, action: PayloadAction<CurrentSubscription | null>) => {
      state.current = action.payload;
    },
    clearCurrentSubscription: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    // Whenever the `getClientCurrentSubscription` query resolves anywhere in
    // the app, mirror its payload into this slice automatically. This keeps
    // the slice as a read-mostly cache that other components can subscribe
    // to via `useSelector` without importing the RTK Query hook themselves.
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