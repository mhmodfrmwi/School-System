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

export const fetchStudentsForSubject = createAsyncThunk(
  "studentsforsubject/fetchStudentsForSubjects",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/get-students-for-subject/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.students;
    } catch (error) {
      return rejectWithValue(error.message);
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
      })
      .addCase(fetchStudentsForSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchStudentsForSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentsforsubject = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentsForSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch studentsforsubject";
        state.loading = false;
        if (state.error.includes("NetworkError")) {
        } else {
          toast.error(state.error);
        }
      });
  },
});

export default takeAttendanceSlice.reducer;
