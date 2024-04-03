import { setLoading, setUserData } from "@/redux/reducers/authReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import toast from "react-hot-toast";

// Define all types as 'any'
const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;

const axios: any = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config: any) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("accessToken");
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

const config: any = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const configCT: any = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser: any = createAsyncThunk(
  "auth/registerUser",
  async (userData: any, { rejectWithValue }: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/user/register`,
        userData,
        configCT
      );
      toast.success(response?.data?.message || "Registered Successfully!");

      if (response.status === 200 || response.status === 201) {
        console.log(response);
        return response.data;
      } else {
        return rejectWithValue("Invalid response status: " + response.status);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(
        error?.response?.data || error?.message || "Something went wrong!"
      );
    }
  }
);

export const loginUser: any = createAsyncThunk(
  "auth/loginUser",
  async (userData: any, { rejectWithValue }: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/auth/login`,
        userData,
        configCT
      );
      toast.success("Logged In Successfully!");
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("userId", response.data.data.user_id);
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle forget Password
export const forgetPassword: any = createAsyncThunk(
  "auth/forgetPassword",
  async (email: any, { rejectWithValue }: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/auth/forgetPassword/${email}`,
        configCT
      );
      toast.success(
        response?.data?.message || "Password reset link sent to your email!"
      );
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle reset Password
export const resetPassword: any = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, passwordData }: any, { rejectWithValue }: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/auth/resetPassword/${token}`,
        passwordData,
        configCT
      );
      toast.success(
        response?.data?.message || "Your password was changed successfully!"
      );
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle resend email
export const resendEmail: any = createAsyncThunk(
  "auth/resendEmail",
  async (email: any, { rejectWithValue }: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/auth/resendEmail/${email}`,
        configCT
      );
      toast.success(response?.data?.message || "Email sent successfully!");
      console.log("done", response);
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle verify email
export const verifyEmail: any = createAsyncThunk(
  "auth/verifyEmail",
  async (token: any, { rejectWithValue }: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/auth/verifyEmail/${token}`,
        configCT
      );
      console.log("done", response);
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle get user details
export const getProfile: any = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(setLoading(true)); // Dispatch setLoading action to indicate loading state

      const userId: any = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response: any = await Axios.get(`${baseURL}/profile/${userId}`, config);

      thunkAPI.dispatch(setUserData(response.data));

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk action to handle get a profile
export const getProfileById: any = createAsyncThunk(
  "profile/fetchProfileData",
  async (userId: any, thunkAPI: any) => {
    try {
      const response: any = await Axios.get(`${baseURL}/profile/${userId}`, config);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk action to handle  experience
export const addExperience: any = createAsyncThunk(
  "user/addExperienceData",
  async ({ userId, experienceData }: { userId: any; experienceData: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/profile/addExperience/${userId}`,
        experienceData,
        config
      );
      toast.success(response?.data?.message || "Experience Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editExperience: any = createAsyncThunk(
  "user/editExperienceData",
  async ({ userId,experienceId, experienceData }: { userId: any;experienceId: any; experienceData: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/profile/editExperience/${userId}/${experienceId}`,
        experienceData,
        config
      );
      toast.success(response?.data?.message || "Experience Edited Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteExperience: any = createAsyncThunk(
  "user/deleteExperienceData",
  async ({ userId,experienceId }: { userId: any;experienceId: any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.delete(
        `${baseURL}/profile/removeExperience/${userId}/${experienceId}`,
        config
      );
      toast.success(response?.data?.message || "Experience Deleted Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLanguage: any = createAsyncThunk(
  "user/addLanguageData",
  async ({ userId, languageData }: { userId: any; languageData: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/profile/addLanguage/${userId}`,
        languageData,
        config
      );
      toast.success(response?.data?.message || "Language Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addEducation: any = createAsyncThunk(
  "user/addEducationData",
  async ({ userId, educationData }: { userId: any; educationData: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/profile/addEducation/${userId}`,
        educationData,
        config
      );
      toast.success(response?.data?.message || "Education Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addProject: any = createAsyncThunk(
  "user/addProjectData",
  async ({ userId, projectData }: { userId: any; projectData: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/profile/addProject/${userId}`,
        projectData,
        config
      );
      toast.success(response?.data?.message || "Project Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteLanguage: any = createAsyncThunk(
  "user/deletelanguageData",
  async ({ userId,languageId }: { userId: any;languageId: any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.delete(
        `${baseURL}/profile/removeLanguage/${userId}/${languageId}`,
        config
      );
      toast.success(response?.data?.message || "language Deleted Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editLanguage: any = createAsyncThunk(
  "user/editlanguageData",
  async ({ userId,languageId,  languageData}: { userId: any;languageId: any;languageData : any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/profile/editLanguage/${userId}/${languageId}`,
        languageData,
        config
      );
      toast.success(response?.data?.message || "language Edited Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editProject: any = createAsyncThunk(
  "user/editprojectData",
  async ({ userId,projectId,  projectData}: { userId: any;projectId: any;projectData : any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/profile/editProject/${userId}/${projectId}`,
        projectData,
        config
      );
      toast.success(response?.data?.message || "project Edited Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editInfo: any = createAsyncThunk(
  "user/editInfoData",
  async ({ userId,  userData}: { userId: any;userData : any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/profile/${userId}`,
        userData,
        config
      );
      toast.success(response?.data?.message || "Info Edited Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editProfile: any = createAsyncThunk(
  "user/editInfoData",
  async ({ userId,  userData}: { userId: any;userData : any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/user/${userId}`,
        userData,
        config
      );
      toast.success(response?.data?.message || "Info Edited Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editEducation: any = createAsyncThunk(
  "user/editeducationData",
  async ({ userId,educationId,  educationData}: { userId: any;educationId: any;educationData : any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/profile/editEducation/${userId}/${educationId}`,
        educationData,
        config
      );
      toast.success(response?.data?.message || "education Edited Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteProject: any = createAsyncThunk(
  "user/deleteProjectData",
  async ({ userId,projectId }: { userId: any;projectId: any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.delete(
        `${baseURL}/profile/removeProject/${userId}/${projectId}`,
        config
      );
      toast.success(response?.data?.message || "Project Deleted Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteEducation: any = createAsyncThunk(
  "user/deleteEducationData",
  async ({ userId,educationId }: { userId: any;educationId: any; }, thunkAPI: any) => {
    try {
      const response: any = await axios.delete(
        `${baseURL}/profile/removeEducation/${userId}/${educationId}`,
        config
      );
      toast.success(response?.data?.message || "Education Deleted Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);






// Async thunk action to handle get all jobs
export const getJobs: any = createAsyncThunk(
  "job/fetchJobData",
  async (search : any, thunkAPI: any) => {
    try {
      const response: any = await Axios.get(`${baseURL}/offer?searchTerm=${search}`, config);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk action to handle get a job
export const getJobById: any = createAsyncThunk(
  "job/fetchJobById",
  async (jobId : any, thunkAPI: any) => {
    try {
      const response: any = await Axios.get(`${baseURL}/offer/${jobId}`, config);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addJob: any = createAsyncThunk(
  "user/addJobData",
  async ({ jobData }: {  jobData: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/offer/create`,
        jobData,
        config
      );
      toast.success(response?.data?.message || "Job Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editJob: any = createAsyncThunk(
  "user/editJobData",
  async ({ jobData, jobId }: {  jobData: any; jobId : any }, thunkAPI: any) => {
    try {
      const response: any = await axios.patch(
        `${baseURL}/offer/${jobId}`,
        jobData,
        config
      );
      toast.success(response?.data?.message || "Job Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteJob: any = createAsyncThunk(
  "user/deleteJobData",
  async ({ jobId }: {  jobId: any }, thunkAPI: any) => {
    try {
      const response: any = await axios.delete(
        `${baseURL}/offer/${jobId}`,
        config
      );
      toast.success(response?.data?.message || "Job Added Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);