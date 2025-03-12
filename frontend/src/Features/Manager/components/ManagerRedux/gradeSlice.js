import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  gradeResults: null,
  classNames: [],
  gradeNames: [],
  subjectNames: [],
  notFound: false, // حالة جديدة لتتبع إذا كانت النتيجة مش موجودة
};

// Async Thunk لـ Grade Results
export const getGradeResults = createAsyncThunk(
  "gradeManager/getGradeResults",
  async (requestData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const { gradeName, className, subjectName } = requestData;
      const url = `http://localhost:4000/api/v1/manager/class-results/${gradeName}/${className}/${subjectName}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue("No data found for the given criteria.");
        }
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk لـ Class, Grade, and Subject Names
export const getClassGradeSubjectNames = createAsyncThunk(
  "gradeManager/getClassGradeSubjectNames",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/class-grade-subject-names", {
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

const gradeManagerSlice = createSlice({
  name: "gradeManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Grade Results Cases
      .addCase(getGradeResults.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.notFound = false; // إعادة تعيين notFound عند بدء البحث
      })
      .addCase(getGradeResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.gradeResults = action.payload;
        state.notFound = false; // تأكيد أن البيانات موجودة
      })
      .addCase(getGradeResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch grade results";
        state.loading = false;
        state.notFound = true; // تعيين notFound إلى true في حالة 404
      })

      // Class, Grade, and Subject Names Cases
      .addCase(getClassGradeSubjectNames.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getClassGradeSubjectNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.classNames = action.payload.data.classNames;
        state.gradeNames = action.payload.data.gradeNames;
        state.subjectNames = action.payload.data.subjectNames;
      })
      .addCase(getClassGradeSubjectNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch class, grade, and subject names";
        state.loading = false;
      });
  },
});

export default gradeManagerSlice.reducer;