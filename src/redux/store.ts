import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import experienceSlice from "./reducers/experienceSlice";
import jobSlice from "./reducers/jobSlice";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    experience : experienceSlice,
    jobs : jobSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
