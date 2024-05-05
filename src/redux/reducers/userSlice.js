import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: undefined,
  loading: false, // Initialize loading state to false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload.data;
      state.loading = false; // Set loading to false when data is fetched
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state
    },
  },
});

export const { setUserData, setLoading } = userSlice.actions;

export default userSlice.reducer;
