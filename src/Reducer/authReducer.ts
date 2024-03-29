import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
