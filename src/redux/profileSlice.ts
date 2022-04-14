import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  activeFragment: "incoming" | "sended" | "write";
}

const initialState = {
  activeFragment: "incoming",
} as ProfileState;

const profileSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setActiveFragment(
      state,
      action: PayloadAction<"incoming" | "sended" | "write">
    ) {
      state.activeFragment = action.payload;
    },
  },
});

export const { setActiveFragment } = profileSlice.actions;
export default profileSlice.reducer;
