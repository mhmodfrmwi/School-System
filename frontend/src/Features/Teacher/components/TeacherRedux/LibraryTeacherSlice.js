import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch general library items
export const fetchLibraryItems = createAsyncThunk(
  "libraryTeacher/fetchLibraryItems",
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
  "libraryTeacher/fetchLibrarySubjects",
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
  "libraryTeacher/fetchMaterialsForSubject",
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

// Fetch details of a library item
export const fetchLibraryItemDetails = createAsyncThunk(
  "libraryTeacher/fetchLibraryItemDetails",
  async (itemId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/general/get-library-item/${itemId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch library item details");
      }
      return data.libraryItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch details of a material
export const fetchMaterialDetails = createAsyncThunk(
  "libraryTeacher/fetchMaterialDetails",
  async (materialId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/general/get-material-from-library/${materialId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch material details");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// View Library Item (Mark as Viewed)
export const viewLibraryItem = createAsyncThunk(
  "libraryTeacher/viewLibraryItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/student/library-item-view/${itemId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to mark item as viewed");
      }
      return data.studentLibraryItemView;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const libraryTeacherSlice = createSlice({
  name: "libraryTeacher",
  initialState: {
    teacherGeneralItems: [],
    teacherSubjects: [],
    teacherMaterials: [],
    teacherItemDetails: null,
    teacherMaterialDetails: null,
    loading: false,
    error: null,
    teacherViewedItems: {},
  },
  reducers: {
    clearLibraryError: (state) => {
      state.error = null;
    },
    clearDetails: (state) => {
      state.teacherItemDetails = null;
      state.teacherMaterialDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraryItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibraryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherGeneralItems = action.payload;
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
        state.teacherSubjects = action.payload;
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
        state.teacherMaterials = action.payload;
      })
      .addCase(fetchMaterialsForSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLibraryItemDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibraryItemDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherItemDetails = action.payload;
      })
      .addCase(fetchLibraryItemDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMaterialDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterialDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherMaterialDetails = action.payload;
      })
      .addCase(fetchMaterialDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(viewLibraryItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewLibraryItem.fulfilled, (state, action) => {
        state.loading = false;
        const { library_item_id, last_view_date } = action.payload;
        state.teacherViewedItems[library_item_id] = last_view_date;
      })
      .addCase(viewLibraryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLibraryError, clearDetails } = libraryTeacherSlice.actions;
export default libraryTeacherSlice.reducer;