import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch general library items
export const fetchLibraryItems = createAsyncThunk(
  "libraryStudent/fetchLibraryItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/get-library-items", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch library items");
      }
      return data.libraryItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch subjects in the library
export const fetchLibrarySubjects = createAsyncThunk(
  "libraryStudent/fetchLibrarySubjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/get-general-subjects-in-library", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch subjects");
      }
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch materials for a subject
export const fetchMaterialsForSubject = createAsyncThunk(
  "libraryStudent/fetchMaterialsForSubject",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/general/get-material-for-general-subject-in-library/${subjectId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch materials");
      }
      return data.materials;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const libraryStudentSlice = createSlice({
  name: "libraryStudent",
  initialState: {
    generalItems: [],
    subjects: [],
    materials: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLibraryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraryItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibraryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.generalItems = action.payload;
      })
      .addCase(fetchLibraryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLibrarySubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibrarySubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchLibrarySubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMaterialsForSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterialsForSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(fetchMaterialsForSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLibraryError } = libraryStudentSlice.actions;
export default libraryStudentSlice.reducer;
