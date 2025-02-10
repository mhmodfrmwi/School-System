import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  attendance: [],
  studentsforsubject: [],
  attendanceRecords: [],
  status: "idle",
  error: null,
  loading: false,
};

export const postAttendance = createAsyncThunk(
  "attendance/postAttendance",
  async (attendanceData, { rejectWithValue }) => {
    try {
      console.log("Submitting attendance:", attendanceData);

      const token = sessionStorage.getItem("token");
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
          body: JSON.stringify(attendanceData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to record attendance",
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error?.message || "Network error. Failed to add attendance.",
      );
    }
  },
);

export const fetchStudentsForSubject = createAsyncThunk(
  "attendance/fetchStudentsForSubjects",
  async ({ classId, id }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/get-students-for-subject/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classId,
          }),
        },
      );

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

export const fetchClassAttendance = createAsyncThunk(
  "attendance/fetchClassAttendance",
  async ({ attendanceData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }
      const formatDate = (date) => {
        if (typeof date === "string") {
          const [year, month, day] = date.split("-");
          return `${day} ${month} ${year}`;
        }
        if (date instanceof Date) {
          return `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
        }
        const newDate = new Date(date);
        return `${newDate.getDate()} ${newDate.getMonth() + 1} ${newDate.getFullYear()}`;
      };

      const requestBody = {
        classId: attendanceData.classId,
        startDate: formatDate(attendanceData.startDate),
        endDate: formatDate(attendanceData.endDate),
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/get-class-attendance-in-period",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to fetch attendance data",
        );
      }
      const data = await response.json();
      console.log("Attendance Data:", data.attendances);

      return data.attendances;
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  },
);

const takeAttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    // resetAttendanceState: () => initialState,
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
      })
      .addCase(postAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(fetchClassAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchClassAttendance.fulfilled, (state, action) => {
        state.attendanceRecords = action.payload;
        state.loading = false;
        toast.success("Attendance data retrieved successfully!");
      })

      .addCase(fetchClassAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAttendanceState } = takeAttendanceSlice.actions;
export default takeAttendanceSlice.reducer;
