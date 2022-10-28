import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userApi } from "../features/users/usersApi";
import { textApi } from "../features/texts/textsApi";

import usersReducer from "../features/users/usersSlice";
import textsReducer from "../features/texts/textsSlice";

import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    texts: textsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [textApi.reducerPath]: textApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, textApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// / Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
