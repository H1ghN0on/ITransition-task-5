import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./slices";

const rootReducer = combineReducers({
  tokenSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppStore = ReturnType<typeof configureStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
