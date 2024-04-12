import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getJobs } from "@/axios/axios";

const initialState = {
  jobs: {
    data: [],
  },
  loading: false,
  editLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEditLoading: (state, action) => {
      state.editLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle actions from the getJobs async thunk
    builder.addCase(getJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      // Update state.jobs.data with the inner 'data' array from the action payload directly
      state.jobs.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.toString()
        : "Unknown error";
    });
  },
});
export const { setLoading, setEditLoading } = jobSlice.actions;

export default jobSlice.reducer;
