import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  id?: string;
  displayName?: string;
  username?: string;
  isPremium?: boolean;
  walletAddress?: string;
  pfpUrl?: string;
};

const initialState: initialStateType = {};

const timerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: { type: string; payload: initialStateType }) {
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
      state.username = action.payload.username;
      state.isPremium = action.payload.isPremium;
      state.walletAddress = action.payload.walletAddress;
      state.pfpUrl = action.payload.pfpUrl;
    },
    resetUser(state) {
      state.id = undefined;
      state.displayName = undefined;
      state.username = undefined;
      state.isPremium = undefined;
      state.walletAddress = undefined;
      state.pfpUrl = undefined;
    },
  },
});

export const { setUser, resetUser } = timerSlice.actions;
export default timerSlice.reducer;
