import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getToken = () => sessionStorage.getItem("token");

export const fetchExams = createAsyncThunk(
  "exams/fetchExams",
  async ({ gradeSubjectSemesterId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams?gradeSubjectSemesterId=${gradeSubjectSemesterId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch exams");
      }

      return data.exams;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchExamById = createAsyncThunk(
  "exams/fetchExamById",
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams/${examId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch exam by ID");
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
      return { 
        ...data, 
        sessionId: data.session._id,
        formattedAvailableTime: data.session.available_time 
      }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const submitExam = createAsyncThunk(
  "exams/submitExam",
  async ({ sessionId, answers }, { rejectWithValue, getState }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/sessions/${sessionId}/answers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }), // Ensure the payload matches server expectations
        }
      );
      console.log("answers in slice : ",answers);

      const data = await response.json();
      console.log("data in slice : ", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit exam");
      }

      // Calculate score on the client side if the server does not provide it
      const state = getState();
      const currentExam = state.exams.currentExam;

      if (!currentExam || !currentExam.exam || !currentExam.exam.exam_questions) {
        throw new Error("Exam data is missing or invalid");
      }

      let score = 0;
      currentExam.exam.exam_questions.forEach((question) => {
        const userAnswer = answers.find(
          (answer) => answer.question_id === question._id
        );

        if (userAnswer && userAnswer.selected_answer.trim() === question.correct_answer.trim()) {
          score += question.marks;
        }
      });

      return { ...data, score: score || 0 };
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

      const response = await fetch(`http://localhost:3000/sessions`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

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

export const fetchUpcomingExams = createAsyncThunk(
  "exams/fetchUpcomingExams",
  async ({ gradeSubjectSemesterId, classId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams?gradeSubjectSemesterId=${gradeSubjectSemesterId}&upcoming=true`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch upcoming exams");
      }

      return data.exams;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMissedExams = createAsyncThunk(
  "exams/fetchMissedExams",
  async ({ gradeSubjectSemesterId, classId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams/student/missed?gradeSubjectSemesterId=${gradeSubjectSemesterId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch missed exams");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCompletedExams = createAsyncThunk(
  "exams/fetchCompletedExams",
  async ({ gradeSubjectSemesterId, classId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams/student/completed?gradeSubjectSemesterId=${gradeSubjectSemesterId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch completed exams");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchExamResult = createAsyncThunk(
  "exams/fetchExamResult",
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:3000/exams/student/exam/${examId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch exam result");
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
    completedExams: [], 
    missedExams: [],
    upcomingExams: [],
    sessions: [],
    currentSession: null,
    currentExam: null,
    score: null,
    formattedAvailableTime: null,
    loadingExams: false,
    loadingSessions: false,
    loadingExamById: false,
    loading: false,
    error: null,
    examResult: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.exams = [];
      state.completedExams = [];
      state.missedExams = [];
      state.upcomingExams = [];
      state.sessions = [];
      state.currentSession = null;
      state.currentExam = null;
      state.score = null;
      state.formattedAvailableTime = null;
      state.loadingExams = false;
      state.loadingSessions = false;
      state.loadingExamById = false;
      state.loading = false;
      state.error = null;
      state.examResult = null;
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
        state.exams = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loadingExams = false;
        state.error = action.payload;
      })
      .addCase(fetchExamById.pending, (state) => {
        state.loadingExamById = true;
        state.error = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loadingExamById = false;
        state.currentExam = action.payload; 
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loadingExamById = false;
        state.error = action.payload;
      })
      .addCase(fetchSessions.pending, (state) => {
        state.loadingSessions = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loadingSessions = false;
        state.sessions = Array.isArray(action.payload) ? action.payload : [];
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
        state.currentSession = action.payload;
        state.formattedAvailableTime = action.payload.formattedAvailableTime;
      })
      .addCase(startExamSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = null;
        state.score = action.payload.score;
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUpcomingExams.pending, (state) => {
        state.loadingExams = true;
        state.error = null;
      })
      .addCase(fetchUpcomingExams.fulfilled, (state, action) => {
        state.loadingExams = false;
        state.upcomingExams = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUpcomingExams.rejected, (state, action) => {
        state.loadingExams = false;
        state.error = action.payload;
      })
      .addCase(fetchMissedExams.pending, (state) => {
        state.loadingExams = true;
        state.error = null;
      })
      .addCase(fetchMissedExams.fulfilled, (state, action) => {
        state.loadingExams = false;
        state.missedExams = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMissedExams.rejected, (state, action) => {
        state.loadingExams = false;
        state.error = action.payload;
      })
      .addCase(fetchCompletedExams.pending, (state) => {
        state.loadingExams = true;
        state.error = null;
      })
      .addCase(fetchCompletedExams.fulfilled, (state, action) => {
        state.loadingExams = false;
        state.completedExams = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCompletedExams.rejected, (state, action) => {
        state.loadingExams = false;
        state.error = action.payload;
      }).addCase(fetchExamResult.pending, (state) => {
        state.loadingResult = true;
        state.error = null;
      })
      .addCase(fetchExamResult.fulfilled, (state, action) => {
        state.loadingResult = false;
        state.examResult = action.payload;
      })
      .addCase(fetchExamResult.rejected, (state, action) => {
        state.loadingResult = false;
        state.error = action.payload;
      });
  },
});

export default examsSlice.reducer;
export const { clearError, resetState } = examsSlice.actions;