import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch subjects
export const fetchSubjects = createAsyncThunk(
  "allSubjectsStudent/fetchSubjects",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");

    try {
      const response = await fetch("http://localhost:4000/api/v1/student/get-subjects", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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

// Fetch materials by subjectId
export const fetchMaterials = createAsyncThunk(
  "allSubjectsStudent/fetchMaterials",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/student/materiel/${subjectId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch materials");
      }
      return data.materiels;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add to bookmark
export const addToBookmark = createAsyncThunk(
  "allSubjectsStudent/addToBookmark",
  async (materialId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/student/add-to-bookmark/${materialId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add to bookmark");
      }

      return materialId; // Return ID to update local state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch bookmarks
export const fetchBookmarks = createAsyncThunk(
  "allSubjectsStudent/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/student/get-bookmarks", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

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

const allSubjectsStudentSlice = createSlice({
  name: "allSubjectsStudent",
  initialState: {
    subjects: [],
    materials: [],
    bookmarks: [],
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
      // Subjects Reducers
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Materials Reducers
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Bookmark Reducers
      .addCase(addToBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks.push({ material_id: { _id: action.payload } }); // Add to bookmarks state
        state.materials = state.materials.map(material =>
          material._id === action.payload ? { ...material, isBookmarked: true } : material
        );
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
      });
  },
});
export const { clearError } = allSubjectsStudentSlice.actions;
export default allSubjectsStudentSlice.reducer;