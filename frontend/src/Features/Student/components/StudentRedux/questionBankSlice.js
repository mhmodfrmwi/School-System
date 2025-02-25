import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch questions
export const fetchQuestions = createAsyncThunk(
  "studentQuestionBank/fetchQuestions",
  async (subjectId, { rejectWithValue }) => { 
    const token = sessionStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/student/questionBank/${subjectId}`, 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch questions");
      }

      return data.questions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentQuestionBankSlice = createSlice({
  name: "studentQuestionBank",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentQuestionBankSlice.actions;
export default studentQuestionBankSlice.reducer;