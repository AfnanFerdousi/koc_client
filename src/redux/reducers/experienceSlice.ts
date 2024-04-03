// experienceSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExperienceState {
  // Define other properties of your state here
  loading: boolean;
  languageLoading : boolean;
  educationLoading : boolean;
  educationEditLoading : boolean;
  projectLoading : boolean;
  infoLoading : boolean;
}

const initialState: ExperienceState = {
  // Define other initial state properties here
  loading: false,
  languageLoading : false,
  educationLoading : false,
  educationEditLoading : false,
  projectLoading : false,
  infoLoading : false,
};

export const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLanguageLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEducationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEducationEditLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProjectLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Define other reducers for your slice here
  },
});

export const { setLoading, setLanguageLoading , setEducationLoading, setProjectLoading, setEducationEditLoading, setInfoLoading} = experienceSlice.actions;

export default experienceSlice.reducer;
