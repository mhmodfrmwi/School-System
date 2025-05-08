// parentScheduleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/parent";

const initialState = {
  status: "idle",
  selectedKid: null,
  error: null,
  loading: false,
  schedule: [],
  selectedEvent: null,
};

export const fetchParentSchedule = createAsyncThunk(
  "parentSchedule/fetchSchedule",
  async (kidId, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Authentication required. Please log in.");
    }

    if (!kidId) {
      return rejectWithValue("Kid ID is required");
    }

    try {
      const response = await axios.get(`${BASE_URL}/get-schedule/${kidId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Schedule Data:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching schedule:", err);
      const errorMsg = err.response?.data?.message || 
                       err.message || 
                       "Failed to fetch schedule";
      return rejectWithValue(errorMsg);
    }
  }
);

const parentScheduleSlice = createSlice({
  name: "parentSchedule",
  initialState,
  reducers: {
    setSelectedKid: (state, action) => {
      state.selectedKid = action.payload;
      console.log("Selected Kid:", action.payload);
    },
    clearSelectedKid: (state) => {
      state.selectedKid = null;
      console.log("Cleared selected kid");
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      console.log("Selected Event:", action.payload);
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      console.log("Cleared selected event");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching schedule...");
      })
      .addCase(fetchParentSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.schedules || action.payload.schedule || action.payload || [];
 
        console.log("Schedule fetched successfully:", state.schedule);
      })
      .addCase(fetchParentSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Failed to fetch schedule:", action.payload);
      });
  }
});

export const { 
  setSelectedKid, 
  clearSelectedKid,
  setSelectedEvent,
  clearSelectedEvent
} = parentScheduleSlice.actions;

export default parentScheduleSlice.reducer;