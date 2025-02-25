import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch subjects
export const fetchSubjects = createAsyncThunk(
  "allSubjectsStudent/fetchSubjects",
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
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
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/student/materiel/${subjectId}`, {
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

export const addToBookmark = createAsyncThunk(
  "allSubjectsStudent/addToBookmark",
  async (materialId, { rejectWithValue, getState }) => {
    console.log(materialId);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const state = getState();
      
      const isBookmarked = state.allSubjectsStudent.bookmarks.some(
        (bookmark) => bookmark?.material_id?._id === materialId
      );
      const url = isBookmarked
        ? `http://localhost:4000/api/v1/student/remove-from-bookmark/${materialId}`
        : `http://localhost:4000/api/v1/student/add-to-bookmark/${materialId}`;

      const method = isBookmarked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update bookmark");
      }

      return { materialId, isBookmarked };
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
      const token = sessionStorage.getItem("token");
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

export const fetchMaterialDetails = createAsyncThunk(
  "allSubjectsStudent/fetchMaterialDetails",
  async ({ subjectId, materialId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");
      const response = await fetch(`http://localhost:4000/api/v1/student/materiel/${subjectId}/${materialId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch material details");
      }
      return data.materiel;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mark material as viewed
export const markMaterialAsViewed = createAsyncThunk(
  "allSubjectsStudent/markMaterialAsViewed",
  async (materialId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:4000/api/v1/student/material/${materialId}`,
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
        throw new Error(data.message || "Failed to mark material as viewed");
      }

      return { materialId, lastViewedAt: data.lastViewedAt };
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
    materialDetails: {},
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
      const { materialId, isBookmarked } = action.payload;

      if (isBookmarked) {
        // Remove from bookmarks
        state.bookmarks = state.bookmarks.filter(
          (bookmark) => bookmark.material_id?._id !== materialId
        );
        // Update materials to reflect the removal
        state.materials = state.materials.map((material) =>
          material._id === materialId ? { ...material, isBookmarked: false } : material
        );
      } else {
        // Add to bookmarks
        state.bookmarks.push({ material_id: { _id: materialId } });
        // Update materials to reflect the addition
        state.materials = state.materials.map((material) =>
          material._id === materialId ? { ...material, isBookmarked: true } : material
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
      .addCase(fetchMaterialDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.materialDetails = {};
      })
      .addCase(fetchMaterialDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.materialDetails = action.payload || {};
      })
      .addCase(fetchMaterialDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.materialDetails = {};
      })
      // Mark material as viewed
      .addCase(markMaterialAsViewed.pending, (state) => {
        state.loading = true;
      })
      .addCase(markMaterialAsViewed.fulfilled, (state, action) => {
        state.loading = false;
        const { materialId, lastViewedAt } = action.payload;
        state.viewedMaterials[materialId] = { isViewed: true, lastViewedAt };
      })
      .addCase(markMaterialAsViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError } = allSubjectsStudentSlice.actions;
export default allSubjectsStudentSlice.reducer;