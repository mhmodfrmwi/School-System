// dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/api/v1/parent";

export const fetchParentDashboard = createAsyncThunk(
  "dashboard/fetchParentDashboard",
  async (studentId, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Student ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/dashboard/${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
           cache: 'force-cache'
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch dashboard data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "parentDashboard",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchParentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
export const { clearDashboardError } = dashboardSlice.actions;