import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getJobs } from '@/axios/axios';

// Define the type for the inner 'data' array
interface InnerData {
  // Define the structure of the inner 'data' array elements
  // Adjust these properties according to the actual structure of your 'data' objects
 data: any[]
  // Add other properties as needed
}

// Define the type for the outer 'data' array
interface OuterData {
  data: any[]; // Use the defined type for the inner 'data' array
}

// Define the type for the 'jobs' object
interface JobState {
  jobs: OuterData; // Use the defined type for the outer 'data' array
  loading: boolean;
  editLoading : boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: {
    data: [],
  },
  loading: false,
  editLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: { 
    setLoading: (state, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
  },
    setEditLoading: (state, action: PayloadAction<boolean>) => {
    state.editLoading = action.payload;
  },
},
  extraReducers: (builder) => {
    // Handle actions from the getJobs async thunk
    builder.addCase(getJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getJobs.fulfilled, (state, action: PayloadAction<any>) => {
      // Update state.jobs.data with the inner 'data' array from the action payload directly
      state.jobs.data = action.payload.data; 
      state.loading = false;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.toString() : 'Unknown error';
    });
  },
});
export const { setLoading, setEditLoading} = jobSlice.actions;

export default jobSlice.reducer;
