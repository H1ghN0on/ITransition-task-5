import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  user: { username: string; email: string };
  token: string;
  isBlocked: boolean;
}

const initialState = {
  token: "",
} as TokenState;

const tokenSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
