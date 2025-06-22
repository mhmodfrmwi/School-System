import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/parent";

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async (subjectId, { getState, rejectWithValue }) => {
    const state = getState();
    const { selectedKid } = state.motivationparent;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    // Validate all required parameters
    if (!token) return rejectWithValue("Authentication required");
    if (!subjectId) return rejectWithValue("Subject ID is required");
    if (!selectedKid?._id) return rejectWithValue("Student ID is required");
    if (!selectedKid?.classId) return rejectWithValue("Class ID is required");
    if (!selectedKid?.semesterId) return rejectWithValue("Semester ID is required");
    if (!selectedKid?.academicYearId) return rejectWithValue("Academic Year ID is required");
    if (!selectedKid?.gradeId) return rejectWithValue("Grade ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/assignments?gradeSubjectSemesterId=${subjectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch assignments");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchAssignmentById = createAsyncThunk(
  "assignments/fetchAssignmentById",
  async (assignmentId, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `${BASE_URL}/Assignment/${assignmentId}?studentId=${studentId}`,
        {
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

export const fetchAllStudentSubmissions = createAsyncThunk(
  "assignments/fetchAllStudentSubmissions",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const studentId = state.motivationparent.selectedKid?._id;

    try {
      const response = await fetch(
        `${BASE_URL}/submissions/student/${studentId}`,
        {
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


export const fetchCompletedAssignments = createAsyncThunk(
  "assignments/fetchCompleted",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `${BASE_URL}/completedAssignments/${studentId}`,
        {
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

export const fetchMissedAssignments = createAsyncThunk(
  "assignments/fetchMissed",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `${BASE_URL}/missedAssignments/${studentId}`,
        {
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


const assignmentsSlice = createSlice({
  name: "assignmentsParent",
  initialState: {
    assignments: [],
    completedAssignments: [],
    missedAssignments: [],
    currentAssignment: null,
    studentSubmissions: [],
    loadingAssignments: false,
    loadingCompleted: false,
    loadingMissed: false,
    loadingAssignmentById: false,
    loadingSubmissions: false,
    loadingSubmit: false,
    error: null,
  },
  reducers: {
setSelectedKid: (state, action) => {
    state.selectedKid = {
        ...action.payload,
        classId: action.payload.classId || action.payload.class_id,
        semesterId: action.payload.semesterId || action.payload.semester_id,
        academicYearId: action.payload.academicYearId || action.payload.academic_year_id,
        gradeId: action.payload.gradeId || action.payload.grade_id
    };
},
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.assignments = [];
      state.completedAssignments = [];
      state.missedAssignments = [];
      state.currentAssignment = null;
      state.studentSubmissions = [];
      state.loadingAssignments = false;
      state.loadingCompleted = false;
      state.loadingMissed = false;
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
      })

      // Fetch Completed Assignments
      .addCase(fetchCompletedAssignments.pending, (state) => {
        state.loadingCompleted = true;
        state.error = null;
      })
      .addCase(fetchCompletedAssignments.fulfilled, (state, action) => {
        state.loadingCompleted = false;
        state.completedAssignments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCompletedAssignments.rejected, (state, action) => {
        state.loadingCompleted = false;
        state.error = action.payload;
      })

      // Fetch Missed Assignments
      .addCase(fetchMissedAssignments.pending, (state) => {
        state.loadingMissed = true;
        state.error = null;
      })
      .addCase(fetchMissedAssignments.fulfilled, (state, action) => {
        state.loadingMissed = false;
        state.missedAssignments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMissedAssignments.rejected, (state, action) => {
        state.loadingMissed = false;
        state.error = action.payload;
      });
  },
});

export default assignmentsSlice.reducer;
export const { clearError, resetState ,setSelectedKid} = assignmentsSlice.actions;