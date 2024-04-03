import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of auth slice
interface AuthState {
  data: any;
  // Add any other properties if present in your auth slice
}

// Extend RootState to include auth slice
interface RootState {
  auth: AuthState;
  // Add other slices as needed
}

interface UserDataState {
  data: any;
  loading: boolean; // Add loading state
}

const initialState: UserDataState = {
  data: undefined,
  loading: false, // Initialize loading state to false
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthState>) => {
      state.data = action.payload.data;
      state.loading = false; // Set loading to false when data is fetched
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // Set loading state
    },
  },
});

export const { setUserData, setLoading } = userDataSlice.actions;

export default userDataSlice.reducer;
