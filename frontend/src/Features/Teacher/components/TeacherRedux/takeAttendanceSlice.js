import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  attendance: [],
  studentsforsubject: [],
  status: "idle",
  error: null,
  loading: false,
};

export const postAttendance = createAsyncThunk(
  "attendance/postAttendance",
  async (attendanceData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/createAttendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            student: attendanceData.studentId,
            class: attendanceData.classId,
            subject: attendanceData.id,
            status: attendanceData.status,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to record attendance");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add attendance");
    }
  },
);

export const fetchStudentsForSubject = createAsyncThunk(
  "attendance/fetchStudentsForSubjects",
  async ({ classId, id }, { rejectWithValue }) => {
    console.log("Fetching students for Class:", classId, "Subject:", id);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/get-students-for-subject/${id}?classId=${classId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch students.");
      }

      const data = await response.json();
      return data.students;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred.");
    }
  },
);

const takeAttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    resetAttendanceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance.push(action.payload);
        toast.success("Attendance recorded successfully");
      })
      .addCase(postAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to record attendance");
      })
      .addCase(fetchStudentsForSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsForSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsforsubject = action.payload;
      })
      .addCase(fetchStudentsForSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch students");
      });
  },
});

export const { resetAttendanceState } = takeAttendanceSlice.actions;
export default takeAttendanceSlice.reducer;
