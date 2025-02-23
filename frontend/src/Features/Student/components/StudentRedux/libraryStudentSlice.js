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

// Fetch details of a library item
export const fetchLibraryItemDetails = createAsyncThunk(
  "libraryStudent/fetchLibraryItemDetails",
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
  "libraryStudent/fetchMaterialDetails",
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
  "libraryStudent/viewLibraryItem",
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

const libraryStudentSlice = createSlice({
  name: "libraryStudent",
  initialState: {
    generalItems: [],
    subjects: [],
    materials: [],
    itemDetails: null, 
    materialDetails: null,
    loading: false,
    error: null,
    viewedItems: {},
  },
  reducers: {
    clearLibraryError: (state) => {
      state.error = null;
    },
    clearDetails: (state) => {
      state.itemDetails = null;
      state.materialDetails = null;
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
      })
      
      .addCase(fetchLibraryItemDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibraryItemDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.itemDetails = action.payload;
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
        state.materialDetails = action.payload;
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
        state.viewedItems[library_item_id] = last_view_date;
      })
      .addCase(viewLibraryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLibraryError, clearDetails } = libraryStudentSlice.actions;
export default libraryStudentSlice.reducer;
