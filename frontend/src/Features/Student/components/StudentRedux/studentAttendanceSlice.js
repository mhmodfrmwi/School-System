import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  studentAttendance: [],
  status: "idle",
  error: null,
  loading: false,
  message: null,
};

export const fetchStudentAttendance = createAsyncThunk(
  "studentAttendance/fetchStudentAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTE4ODI2NjIyYjQ2Y2U5ZTM0NzJmYyIsImVtYWlsIjoiQWhtZWRoYWJpYkBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTczODYzOTQwOCwiZXhwIjoxNzM4NzI1ODA4fQ.Ns_-QYUmtWRNiKLT_NgqNTuTBhdMDBErnEnWZcO4T4s";
        
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/student/get-attendance",
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
      return data.studentAttendance;
    } catch (error) {
      return rejectWithValue(
        error.message || "Network error. Please check your connection.",
      );
    }
  },
);

const studentAttendanceSlice = createSlice({
  name: "studentAttendance",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentAttendance.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchStudentAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentAttendance = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch studentAttendance";
        state.loading = false;
        if (state.error.includes("NetworkError")) {
        } else {
          toast.error(state.error);
        }
      });
  },
});

export const { clearMessage } = studentAttendanceSlice.actions;
export default studentAttendanceSlice.reducer;
