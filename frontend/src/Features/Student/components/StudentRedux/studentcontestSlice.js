// studentcontestSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  students: [], // الطلاب المتاحين
  loading: false,
  error: null,
};

// جلب الطلاب المتاحين
export const getTeammates = createAsyncThunk(
  "studentcontest/getTeammates",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/get-teammates`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentcontestSlice = createSlice({
  name: "studentcontest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeammates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeammates.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data || [];
      })
      .addCase(getTeammates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch teammates";
      });
  },
});

export default studentcontestSlice.reducer;