import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = mainSlice.actions;

export default mainSlice.reducer;
