import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getToken = () => sessionStorage.getItem("token");

// Fetch all assignments
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async ({ gradeSubjectSemesterId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:3000/assignments?gradeSubjectSemesterId=${gradeSubjectSemesterId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch assignments");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch assignment by ID
export const fetchAssignmentById = createAsyncThunk(
  "assignments/fetchAssignmentById",
  async (assignmentId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/assignments/${assignmentId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch assignment by ID");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Submit assignment
export const submitAssignment = createAsyncThunk(
  "assignments/submitAssignment",
  async ({ assignmentId, submissionData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/assignments/submit-assignment/${assignmentId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit assignment");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all student submissions
export const fetchAllStudentSubmissions = createAsyncThunk(
  "assignments/fetchAllStudentSubmissions",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        "http://localhost:3000/assignments/submissions/student",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch student submissions");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
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
      state.loadingAssignmentById = false;
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
        state.assignments = action.payload;
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
      // Submit Assignment
      .addCase(submitAssignment.pending, (state) => {
        state.loadingSubmit = true;
        state.error = null;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.loadingSubmit = false;
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.loadingSubmit = false;
        state.error = action.payload;
      })
      // Fetch All Student Submissions
      .addCase(fetchAllStudentSubmissions.pending, (state) => {
        state.loadingSubmissions = true;
        state.error = null;
      })
      .addCase(fetchAllStudentSubmissions.fulfilled, (state, action) => {
        state.loadingSubmissions = false;
         state.studentSubmissions = action.payload;
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