import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tokenSlice, profileSlice, messageSlice } from "./slices";

const rootReducer = combineReducers({
  tokenSlice,
  profileSlice,
  messageSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppStore = ReturnType<typeof configureStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
