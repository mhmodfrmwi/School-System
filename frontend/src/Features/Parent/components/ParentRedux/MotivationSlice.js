import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/api/v1/parent";
      
export const getDailyReward = createAsyncThunk(
  "motivation/getDailyReward",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivation.activeStudent?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");

    try {
      const response = await fetch(`${BASE_URL}/daily-reward/${studentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      
      const { data } = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllReward = createAsyncThunk(
  "motivation/getAllReward",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivation.activeStudent?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");

    try {
      const response = await fetch(`${BASE_URL}/reward/${studentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      
      const { data } = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSemesterReward = createAsyncThunk(
  "motivation/getSemesterReward",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivation.activeStudent?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");

    try {
      const response = await fetch(`${BASE_URL}/semester-reward/${studentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      
      const { data } = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getStudentWithFriendsReward = createAsyncThunk(
  "motivation/getStudentWithFriendsReward",
 async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivation.activeStudent?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");

    try {
      const response = await fetch(`${BASE_URL}/student-with-friends-reward/${studentId}`, {
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

// Added reducer to set active student
const motivationSlice = createSlice({
    name: "motivationparent",
  initialState: {
    activeStudent: null,
    dailyReward: { totalDailyPoints: 0, badge: "Green" },
    reward: { totalPoints: 0, badges: "Green" },
    semesterReward: { totalSemesterPoints: 0, badge: "Green" },
    loading: false,
    error: null,
  },
  reducers: {
    setActiveStudent: (state, action) => {
      state.activeStudent = action.payload;
      state.error = null; // Clear previous errors when setting new student
    }
  },
  extraReducers: (builder) => {
    builder
      // Daily Reward
      .addCase(getDailyReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDailyReward.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyReward = action.payload;
      })
      .addCase(getDailyReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // All Rewards
      .addCase(getAllReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReward.fulfilled, (state, action) => {
        state.loading = false;
        state.reward = action.payload;
      })
      .addCase(getAllReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Semester Reward
      .addCase(getSemesterReward.pending, (state) => {
        state.loading = true;
        state.error = null;
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


export const { setActiveStudent } = motivationSlice.actions;
export default motivationSlice.reducer;