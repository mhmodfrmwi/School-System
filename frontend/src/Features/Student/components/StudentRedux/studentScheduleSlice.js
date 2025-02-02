import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  studentSchedule: [],
  status: "idle",
  error: null,
  loading: false,
  message: null,
};

export const fetchStudentSchedule = createAsyncThunk(
  "studentSchedule/fetchStudentSchedule",
  async (_, { rejectWithValue }) => {
    try {
      // const token =
      //   localStorage.getItem("token") || sessionStorage.getItem("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWY2ZjliYmNjNzkwYTA1MWYyZTc5YSIsImVtYWlsIjoiYWhtZWR6YWthcmlhQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM4NTAzMjg4LCJleHAiOjE3Mzg1MDQyODh9.-ZG611JXsMSJtmZVnzhOXzp781NyZmKGC1AwTUmNgI4";
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/student/get-schedule",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 401) {
        return rejectWithValue("Session expired. Please log in again.");
      }

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Request failed");
      }

      const data = await response.json();
      return data.schedules;
    } catch (error) {
      return rejectWithValue(
        error.message || "Network error. Please check your connection.",
      );
    }
  },
);

const studentScheduleSlice = createSlice({
  name: "studentSchedule",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentSchedule.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchStudentSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentSchedule = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch studentSchedule";
        state.loading = false;
        if (state.error.includes("NetworkError")) {
        } else {
          toast.error(state.error);
        }
      });
  },
});

export const { clearMessage } = studentScheduleSlice.actions;
export default studentScheduleSlice.reducer;
