import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  attendance: [],
  status: "idle",
  error: null,
  loading: false,
};

export const postAttendance = createAsyncThunk(
  "attendance/postAttendance",
  async (attendanceData, { rejectWithValue }) => {
    console.log(attendanceData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/createAttendance",
        {
          method: "POST",
          body: JSON.stringify(attendanceData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();

      return data.attendance;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add attendence");
    }
  },
);

const takeAttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAttendance.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attendance.push(action.payload);

        state.loading = false;
      })
      .addCase(postAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add attendance";
        state.loading = false;
        toast.error(action.payload || "Failed to add attendance");
      });
  },
});

export default takeAttendanceSlice.reducer;
