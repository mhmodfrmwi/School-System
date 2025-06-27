import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/parent";

// Fetch all assignments for student by subject
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async (gradeSubjectSemesterId, { rejectWithValue }) => {
    const studentId = localStorage.getItem('selectedStudentId');
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Student ID is required");
    if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/assignments/${gradeSubjectSemesterId}/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch assignments");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch completed assignments (submissions) for student
export const fetchCompletedAssignments = createAsyncThunk(
  "assignments/fetchCompletedAssignments",
  async (_, { rejectWithValue }) => {
    const studentId = localStorage.getItem('selectedStudentId');
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Student ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/submissions/student/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch completed assignments");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingAssignments = createAsyncThunk(
  "assignments/fetchPendingAssignments",
  async (gradeSubjectSemesterId, { rejectWithValue }) => {
    const studentId = localStorage.getItem('selectedStudentId');
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Student ID is required");
    if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/notSubmittedNotEndedAssignments/${gradeSubjectSemesterId}/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch pending assignments");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch missed assignments for student by subject
export const fetchMissedAssignments = createAsyncThunk(
  "assignments/fetchMissedAssignments",
  async (gradeSubjectSemesterId, { rejectWithValue }) => {
    const studentId = localStorage.getItem('selectedStudentId');
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Student ID is required");
    if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/missedAssignments/${gradeSubjectSemesterId}/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch missed assignments");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch assignment by ID
export const fetchAssignmentById = createAsyncThunk(
  "assignments/fetchAssignmentById",
  async (assignmentId, { rejectWithValue }) => {
    const studentId = localStorage.getItem('selectedStudentId');
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Student ID is required");
    if (!assignmentId) return rejectWithValue("Assignment ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/Assignment/${assignmentId}?studentId=${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch assignment");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allAssignments: [],
  completedAssignments: [],
  missedAssignments: [],
  pendingAssignments: [], 
  currentAssignment: null,
  loading: false,
  loadingAll: false,
  loadingCompleted: false,
  loadingMissed: false,
  loadingPending: false, 
  loadingById: false,
  error: null
};

const assignmentsSlice = createSlice({
  name: "assignmentsParent",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.allAssignments = [];
      state.completedAssignments = [];
      state.missedAssignments = [];
      state.pendingAssignments = []; 
      state.currentAssignment = null;
      state.loading = false;
      state.loadingAll = false;
      state.loadingCompleted = false;
      state.loadingMissed = false;
      state.loadingPending = false; 
      state.loadingById = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        // console.log('All assignments payload:', action.payload);
        state.loadingAll = false;
        state.allAssignments = action.payload.assignments || action.payload || [];
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action.payload;
      })

      // Fetch completed assignments (submissions)
      .addCase(fetchCompletedAssignments.pending, (state) => {
        state.loadingCompleted = true;
        state.error = null;
      })
      .addCase(fetchCompletedAssignments.fulfilled, (state, action) => {
        // console.log('Completed assignments payload:', action.payload);
        state.loadingCompleted = false;
        state.completedAssignments = action.payload.submissions || action.payload || [];
      })
      .addCase(fetchCompletedAssignments.rejected, (state, action) => {
        state.loadingCompleted = false;
        state.error = action.payload;
      })
      // Fetch pending assignments
        .addCase(fetchPendingAssignments.pending, (state) => {
        state.loadingPending = true;
        state.error = null;
      })
      .addCase(fetchPendingAssignments.fulfilled, (state, action) => {
        // console.log('Pending assignments payload:', action.payload);
        state.loadingPending = false;
        state.pendingAssignments = action.payload.assignments || action.payload || [];
      })
      .addCase(fetchPendingAssignments.rejected, (state, action) => {
        state.loadingPending = false;
        state.error = action.payload;
      })

      // Fetch missed assignments
      .addCase(fetchMissedAssignments.pending, (state) => {
        state.loadingMissed = true;
        state.error = null;
      })
      .addCase(fetchMissedAssignments.fulfilled, (state, action) => {
        // console.log('Missed assignments payload:', action.payload);
        state.loadingMissed = false;
        state.missedAssignments = action.payload.assignments || action.payload || [];
      })
      .addCase(fetchMissedAssignments.rejected, (state, action) => {
        state.loadingMissed = false;
        state.error = action.payload;
      })

      // Fetch assignment by ID
      .addCase(fetchAssignmentById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.currentAssignment = action.payload;
      })
      .addCase(fetchAssignmentById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload;
      });
  }
});

export default assignmentsSlice.reducer;
export const { clearError, resetState } = assignmentsSlice.actions;