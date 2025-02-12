import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  teacherSchedule: [],
  status: "idle",
  error: null,
  loading: false,
  message: null,
};

export const fetchTeacherSchedule = createAsyncThunk(
  "teacherSchedule/fetchTeacherSchedule",
  async (_, { rejectWithValue }) => {
    try {
      const token =
         sessionStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/get-schedule",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
        error.message || "Network error. Please check your connection."
      );
    }
  }
);

const teacherScheduleSlice = createSlice({
  name: "teacherSchedule",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherSchedule.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTeacherSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherSchedule = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeacherSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teacherSchedule";
        state.loading = false;
        if (!state.error.includes("NetworkError")) {
          // toast.error(state.error);
        }
      });
  },
});

export const { clearMessage } = teacherScheduleSlice.actions;
export default teacherScheduleSlice.reducer;
