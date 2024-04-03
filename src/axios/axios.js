import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import toast from "react-hot-toast";

// Base URL

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios.interceptors.request.use(
//   (config) => {
//     if (!config.headers.Authorization) {
//       const token = localStorage.getItem("accessToken");
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Authenticated config with Authorization header
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

// Config with Content-Type header
const configCT = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Async thunk action to handle registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/user/register`,
        userData,
        configCT
      );
      toast.success(response?.data?.message || "Registered Successfully!");

      // Check if response status is 200 or 201
      if (response.status === 200 || response.status === 201) {
        console.log(response);

        return response.data; // Return response data if status is success
      } else {
        // If status is not 200 or 201, reject with appropriate message
        return rejectWithValue("Invalid response status: " + response.status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(
        error?.response?.data || error?.message || "Something went wrong!"
      );
    }
  }
);

// Async thunk action to handle login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/login`,
        userData,
        configCT
      );
      toast.success("Logged In Successfully!");
      console.log(response);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      // localStorage.setItem("userId", response.data.data._id);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle forget Password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseURL}/auth/forgetPassword/${email}`,
        configCT
      );
      toast.success(
        response?.data?.message || "Password reset link sent to your email!"
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk action to handle reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, passwordData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseURL}/auth/resetPassword/${token}`,
        passwordData,
        configCT
      );
      toast.success(
        response?.data?.message || "Your password was changed successfully!"
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle resend email
export const resendEmail = createAsyncThunk(
  "auth/resendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/resendEmail/${email}`,
        configCT
      );
      toast.success(response?.data?.message || "Email sent successfully!");
      console.log("done", response);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk action to handle verify email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseURL}/auth/verifyEmail/${token}`,
        configCT
      );
      console.log("done", response);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle get user details
export const getProfile = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/auth/me`, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk action to handle update user details
export const updateProfile = createAsyncThunk(
  "user/updateUserData",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseURL}/user/profile`,
        userData,
        config
      );
      toast.success(response?.data?.message || "Profile Updated Successfully!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
