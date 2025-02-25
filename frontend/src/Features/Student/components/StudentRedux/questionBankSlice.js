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

// Add or remove question from bookmark
export const addToBookmark = createAsyncThunk(
  "studentQuestionBank/addToBookmark",
  async (questionId, { rejectWithValue, getState }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const state = getState();
      const isBookmarked = state.studentQuestionBank.bookmarks.some(
        (bookmark) => bookmark?.question_id?._id === questionId
      );

      const url = isBookmarked
        ? `http://localhost:4000/api/v1/student/remove-question-from-bookmark/${questionId}`
        : `http://localhost:4000/api/v1/student/add-question-to-bookmark/${questionId}`;

      const method = isBookmarked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update bookmark");
      }

      return { questionId, isBookmarked };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch bookmarks
export const fetchBookmarks = createAsyncThunk(
  "studentQuestionBank/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        "http://localhost:4000/api/v1/student/get-question-bookmarks",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookmarks");
      }

      return data.bookmarks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mark question as viewed
export const markQuestionAsViewed = createAsyncThunk(
  "studentQuestionBank/markQuestionAsViewed",
  async (questionId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:4000/api/v1/student/question/${questionId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to mark question as viewed");
      }

      return { questionId, lastViewedAt: data.lastViewedAt };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentQuestionBankSlice = createSlice({
  name: "studentQuestionBank",
  initialState: {
    questions: [],
    bookmarks: [],
    viewedQuestions: {},
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
      // Fetch Questions Reducers
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
      })

      // Add to Bookmark Reducers
      .addCase(addToBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToBookmark.fulfilled, (state, action) => {
        state.loading = false;
        const { questionId, isBookmarked } = action.payload;

        if (isBookmarked) {
          // Remove from bookmarks
          state.bookmarks = state.bookmarks.filter(
            (bookmark) => bookmark.question_id?._id !== questionId
          );
          // Update questions to reflect the removal
          state.questions = state.questions.map((question) =>
            question._id === questionId ? { ...question, isBookmarked: false } : question
          );
        } else {
          // Add to bookmarks
          state.bookmarks.push({ question_id: { _id: questionId } });
          // Update questions to reflect the addition
          state.questions = state.questions.map((question) =>
            question._id === questionId ? { ...question, isBookmarked: true } : question
          );
        }
      })
      .addCase(addToBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Bookmarks Reducers
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark Question as Viewed Reducers
      .addCase(markQuestionAsViewed.pending, (state) => {
        state.loading = true;
      })
      .addCase(markQuestionAsViewed.fulfilled, (state, action) => {
        state.loading = false;
        const { questionId, lastViewedAt } = action.payload;
        state.viewedQuestions[questionId] = { isViewed: true, lastViewedAt };
      })
      .addCase(markQuestionAsViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentQuestionBankSlice.actions;
export default studentQuestionBankSlice.reducer;