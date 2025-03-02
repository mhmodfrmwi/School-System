import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:4000/api/v1/teacher";
const getToken = () => sessionStorage.getItem("token");

export const getTeacherDailyReward = createAsyncThunk(
  "motivation/getTeacherDailyReward",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/daily-reward`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Unauthorized or Network Error");
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllTeacherReward = createAsyncThunk(
  "motivation/getAllTeacherReward",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/reward`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Unauthorized or Network Error");
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllTeachersReward = createAsyncThunk(
  "motivation/getAllTeachersReward",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/all-teacher-reward`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Unauthorized or Network Error");
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTeacherPointsForTerm = createAsyncThunk(
  "motivation/getTeacherPointsForTerm",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/teacher-points`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Unauthorized or Network Error");
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const motivationTeacherSlice = createSlice({
  name: "motivation",
  initialState: {
    teacherDailyReward: [],
    teacherReward: [],
    allTeachersReward: [],
    teacherPointsForTerm: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Teacher Daily Reward
      .addCase(getTeacherDailyReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherDailyReward.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherDailyReward = action.payload;
      })
      .addCase(getTeacherDailyReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Teacher Reward
      .addCase(getAllTeacherReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeacherReward.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherReward = action.payload;
      })
      .addCase(getAllTeacherReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Teacher Reward
      .addCase(getAllTeachersReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeachersReward.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeachersReward = action.payload;
      })
      .addCase(getAllTeachersReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Teacher Points
      .addCase(getTeacherPointsForTerm.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherPointsForTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherPointsForTerm = action.payload;
      })
      .addCase(getTeacherPointsForTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default motivationTeacherSlice.reducer;
