import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  statistics: null,
  absenceStatistics: null,
  gradeStatistics: null,
  studentsRanks: null, 
  teachersRanks: null,
};

// General Statistics
export const getGeneralStatistics = createAsyncThunk(
  "dashboard/getGeneralStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/statistics", {
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

// Absence Statistics
export const getAbsenceStatistics = createAsyncThunk(
  "dashboard/getAbsenceStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/absence-statistics", {
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

// Grade Statistics
export const getGradeStatistics = createAsyncThunk(
  "dashboard/getGradeStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/grade-statistics", {
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

// Students Ranks
export const getStudentsRanks = createAsyncThunk(
  "dashboard/getStudentsRanks",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/students-ranks", {
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

// Teachers Ranks
export const getTeachersRanks = createAsyncThunk(
  "dashboard/getTeachersRanks",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/teachers-ranks", {
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

const dashboardSlice = createSlice({
  name: "managerdashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // General Statistics Cases
      .addCase(getGeneralStatistics.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getGeneralStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(getGeneralStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch general statistics";
        state.loading = false;
      })

      // Absence Statistics Cases
      .addCase(getAbsenceStatistics.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAbsenceStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.absenceStatistics = action.payload;
      })
      .addCase(getAbsenceStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch absence statistics";
        state.loading = false;
      })

      // Grade Statistics Cases
      .addCase(getGradeStatistics.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getGradeStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.gradeStatistics = action.payload;
      })
      .addCase(getGradeStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch grade statistics";
        state.loading = false;
      })

      // Students Ranks Cases
      .addCase(getStudentsRanks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getStudentsRanks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.studentsRanks = action.payload;
      })
      .addCase(getStudentsRanks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch students ranks";
        state.loading = false;
      })

      // Teachers Ranks Cases
      .addCase(getTeachersRanks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getTeachersRanks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.teachersRanks = action.payload;
      })
      .addCase(getTeachersRanks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teachers ranks";
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;