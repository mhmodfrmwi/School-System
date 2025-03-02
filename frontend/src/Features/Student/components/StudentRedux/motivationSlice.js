import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:4000/api/v1/student";
const getToken = () => sessionStorage.getItem("token");

export const getDailyReward = createAsyncThunk(
  "motivation/getDailyReward",
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

export const getAllReward = createAsyncThunk(
  "motivation/getAllReward",
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

export const getSemesterReward = createAsyncThunk(
  "motivation/getSemesterReward",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/semester-reward`, {
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

export const getStudentWithFriendsReward = createAsyncThunk(
  "motivation/getStudentWithFriendsReward",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/student-with-friends-reward`, {
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

const motivationSlice = createSlice({
  name: "motivation",
  initialState: {
    dailyReward: [],
    reward: [],
    semesterReward: [],
    studentWithFriendsReward: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  Get Daily Reward
      .addCase(getDailyReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyReward.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyReward = action.payload;
      })
      .addCase(getDailyReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get All Rewards
      .addCase(getAllReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReward.fulfilled, (state, action) => {
        state.loading = false;
        state.reward = action.payload;
      })
      .addCase(getAllReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get Semester Reward
      .addCase(getSemesterReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSemesterReward.fulfilled, (state, action) => {
        state.loading = false;
        state.semesterReward = action.payload;
      })
      .addCase(getSemesterReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get Student with Friends Reward
      .addCase(getStudentWithFriendsReward.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentWithFriendsReward.fulfilled, (state, action) => {
        state.loading = false;
        state.studentWithFriendsReward = action.payload;
      })
      .addCase(getStudentWithFriendsReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default motivationSlice.reducer;
