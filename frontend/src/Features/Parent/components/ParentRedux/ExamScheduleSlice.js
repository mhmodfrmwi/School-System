// parentExamScheduleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/parent";

const initialState = {
  status: "idle",
  selectedKid: null,
  error: null,
  loading: false,
  exams: [],
  currentExams: [],
  gradeSemesterExams: []
};

export const fetchParentExams = createAsyncThunk(
  "parentExamSchedule/fetchParentExams",
  async (scheduleId, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Authentication required. Please log in.");
    }

    try {
      const response = await axios.get(`${BASE_URL}/${scheduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

export const fetchCurrentExams = createAsyncThunk(
  "parentExamSchedule/fetchCurrentExams",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/schedules/current`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

export const fetchGradeSemesterExams = createAsyncThunk(
  "parentExamSchedule/fetchGradeSemesterExams",
  async ({ gradeId, semesterId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BASE_URL}/grade/${gradeId}/semester/${semesterId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

const handleError = (err, rejectWithValue) => {
  const errorMsg = err.response?.data?.message || err.message || "Request failed";
  return rejectWithValue(errorMsg);
};

const parentExamScheduleSlice = createSlice({
  name: "parentExamSchedule",
  initialState,
  reducers: {
    setSelectedKid: (state, action) => {
      state.selectedKid = action.payload;
    },
    clearExams: (state) => {
      state.exams = [];
      state.currentExams = [];
      state.gradeSemesterExams = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
          if (action.type.includes('fetchParentExams')) {
            state.exams = action.payload.subjects || [];
          } else if (action.type.includes('fetchCurrentExams')) {
            state.currentExams = extractExamsFromCurrent(action.payload);
          } else if (action.type.includes('fetchGradeSemesterExams')) {
            state.gradeSemesterExams = action.payload.exams || [];
          }
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

const extractExamsFromCurrent = (data) => {
  let allExams = [];
  data.grades.forEach(grade => {
    grade.schedules.forEach(schedule => {
      if (schedule.exams) {
        allExams = [...allExams, ...schedule.exams];
      }
    });
  });
  return allExams;
};

export const { setSelectedKid, clearExams } = parentExamScheduleSlice.actions;
export default parentExamScheduleSlice.reducer;