import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getToken = () => sessionStorage.getItem("token");

export const fetchExams = createAsyncThunk(
  "exams/fetchExams",
  async ({ gradeSubjectSemesterId, classId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams?gradeSubjectSemesterId=${gradeSubjectSemesterId}&classId=${classId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch exams");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const startExamSession = createAsyncThunk(
  "exams/startExamSession",
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/sessions/${examId}/start`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to start exam session");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const endExamSession = createAsyncThunk(
  "exams/endExamSession",
  async ({ examId, answers }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/sessions/${examId}/end`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to end exam session");
      }

      // Calculate the score
      const exam = data.exam;
      let score = 0;
      exam.questions.forEach((question) => {
        if (answers[question._id] === question.correct_answer) {
          score += question.marks;
        }
      });

      return { ...data, score };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSessions = createAsyncThunk(
  "exams/fetchSessions",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/sessions`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch sessions");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const examsSlice = createSlice({
  name: "exams",
  initialState: {
    exams: [],
    sessions: [],
    currentSession: null,
    score: null,
    loadingExams: false,
    loadingSessions: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.exams = [];
      state.sessions = [];
      state.currentSession = null;
      state.score = null;
      state.loadingExams = false;
      state.loadingSessions = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loadingExams = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loadingExams = false;
        state.exams = Array.isArray(action.payload) ? action.payload : []; // Ensure exams is always an array
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loadingExams = false;
        state.error = action.payload;
      })
      .addCase(fetchSessions.pending, (state) => {
        state.loadingSessions = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loadingSessions = false;
        state.sessions = Array.isArray(action.payload) ? action.payload : []; // Ensure sessions is always an array
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loadingSessions = false;
        state.error = action.payload;
      })
      .addCase(startExamSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startExamSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload; // Store the started session
      })
      .addCase(startExamSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(endExamSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endExamSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = null; // Clear the current session
        state.score = action.payload.score; // Store the score
      })
      .addCase(endExamSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examsSlice.reducer;
export const { clearError, resetState } = examsSlice.actions;