import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/parent";

// Fetch all assignments
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async ({ gradeSubjectSemesterId }, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const classId = state.motivationparent.selectedKid?.classId;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");
    if (!gradeSubjectSemesterId) return rejectWithValue("Subject ID is required");
    if (!classId) return rejectWithValue("Class ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/Assignment/?gradeSubjectSemesterId=${gradeSubjectSemesterId}&classId=${classId}&studentId=${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch assignments");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch assignment by ID
export const fetchAssignmentById = createAsyncThunk(
  "assignments/fetchAssignmentById",
  async (assignmentId, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");
    if (!assignmentId) return rejectWithValue("Assignment ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/Assignment/${assignmentId}?studentId=${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch assignment by ID");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all student submissions
export const fetchAllStudentSubmissions = createAsyncThunk(
  "assignments/fetchAllStudentSubmissions",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/submissions/student/${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch student submissions");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const assignmentsSlice = createSlice({
  name: "assignmentsParent",
  initialState: {
    assignments: [],
    currentAssignment: null,
    studentSubmissions: [],
    loadingAssignments: false,
    loadingAssignmentById: false,
    loadingSubmissions: false,
    loadingSubmit: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.assignments = [];
      state.currentAssignment = null;
      state.studentSubmissions = [];
      state.loadingAssignments = false;
      state.loadingSubmissions = false;
      state.loadingSubmit = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loadingAssignments = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loadingAssignments = false;
        state.assignments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loadingAssignments = false;
        state.error = action.payload;
      })
      // Fetch Assignment By ID
      .addCase(fetchAssignmentById.pending, (state) => {
        state.loadingAssignmentById = true;
        state.error = null;
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loadingAssignmentById = false;
        state.currentAssignment = action.payload;
      })
      .addCase(fetchAssignmentById.rejected, (state, action) => {
        state.loadingAssignmentById = false;
        state.error = action.payload;
      })
      // Fetch All Student Submissions
      .addCase(fetchAllStudentSubmissions.pending, (state) => {
        state.loadingSubmissions = true;
        state.error = null;
      })
      .addCase(fetchAllStudentSubmissions.fulfilled, (state, action) => {
        state.loadingSubmissions = false;
        state.studentSubmissions = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllStudentSubmissions.rejected, (state, action) => {
        state.loadingSubmissions = false;
        state.error = action.payload;
      });
  },
});

export default assignmentsSlice.reducer;
export const { clearError, resetState } = assignmentsSlice.actions;