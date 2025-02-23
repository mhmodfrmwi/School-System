import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  schoolHubs: [],
};

export const getTeacherSchoolHubs = createAsyncThunk(
  "teacherSchoolHub/getSchoolHubs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/teacher/school-hub", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teacherSchoolHubSlice = createSlice({
  name: "teacherSchoolHub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherSchoolHubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherSchoolHubs.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolHubs = action.payload.schoolHubs || [];
      })
      .addCase(getTeacherSchoolHubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch school hubs";
      });
  },
});

export default teacherSchoolHubSlice.reducer;