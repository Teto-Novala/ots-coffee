import { createSlice } from "@reduxjs/toolkit";

export const tokenPay = createSlice({
  name: "tokenPay",
  initialState: {
    token: null,
  },
  reducers: {
    Savetoken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { Savetoken } = tokenPay.actions;
