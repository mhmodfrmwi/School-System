import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch general library items (PDFs)
export const fetchLibraryItems = createAsyncThunk(
  "libraryStudent/fetchLibraryItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/fetch-public-Library-type-pdf", {
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

// Fetch general library items (Videos)
export const fetchLibraryVideoItems = createAsyncThunk(
  "libraryStudent/fetchLibraryVideoItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/fetch-public-Library-type-video", {
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

// Fetch all general + material PDFs
export const fetchAllGeneralAndMaterialPDFs = createAsyncThunk(
  "libraryStudent/fetchAllGeneralAndMaterialPDFs",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/fetch-all-general-and-material-pdf", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch PDFs");
      }
      return {
        allItems: [
          ...(data.LibraryItems || []),
          ...(data.materialsFromLibrary || [])
        ],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all general + material videos
export const fetchAllGeneralAndMaterialVideos = createAsyncThunk(
  "libraryStudent/fetchAllGeneralAndMaterialVideos",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/fetch-all-general-and-material-videos", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch videos");
      }
      return {
        allItems: [
          ...(data.LibraryItems || []),
          ...(data.materialsFromLibrary || [])
        ],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch material of subject that is of type video
export const fetchMaterialOfSubjectTypeVideo = createAsyncThunk(
  "libraryStudent/fetchMaterialOfSubjectTypeVideo",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/general/fetch-material-of-subject-that-of-type-video/${subjectId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch video materials");
      }
      return data.materials;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch material of subject that is of type PDF
export const fetchMaterialOfSubjectTypePDF = createAsyncThunk(
  "libraryStudent/fetchMaterialOfSubjectTypePDF",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/general/fetch-material-of-subject-that-of-type-pdf/${subjectId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch PDF materials");
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

// View Material (Mark as Viewed)
export const viewMaterial = createAsyncThunk(
  "libraryStudent/viewMaterial",
  async (materialId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`http://localhost:4000/api/v1/student/library-material/${materialId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to mark material as viewed");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Fetch subjects that have material type video
export const fetchSubjectsWithVideoMaterial = createAsyncThunk(
  "libraryStudent/fetchSubjectsWithVideoMaterial",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/fetch-subjects-that-have-material-type-video", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch subjects with video materials");
      }
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch subjects that have material type PDF
export const fetchSubjectsWithPDFMaterial = createAsyncThunk(
  "libraryStudent/fetchSubjectsWithPDFMaterial",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch("http://localhost:4000/api/v1/general/fetch-subjects-that-has-material-type-pdf", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch subjects with PDF materials");
      }
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const libraryStudentSlice = createSlice({
  name: "libraryStudent",
  initialState: {
    generalItems: [], // For PDFs
    videoItems: [], // For Videos
    itemDetails: null,
    materialDetails: null,
    videoSubjects: [], // For video subjects
    pdfSubjects: [], // For PDF subjects
    generalPDFs: [], // For all general + material PDFs
    generalVideos: [], // For all general + material videos
    videoMaterials: [], // For video materials of a subject
    pdfMaterials: [], // For PDF materials of a subject
    loading: false,
    error: null,
    viewedItems: {},
    viewedMaterials: {},
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
      // Fetch PDF Items
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

      // Fetch Video Items
      .addCase(fetchLibraryVideoItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibraryVideoItems.fulfilled, (state, action) => {
        state.loading = false;
        state.videoItems = action.payload;
      })
      .addCase(fetchLibraryVideoItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Library Item Details
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

      // Fetch Material Details
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

      // View Library Item
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
      })
      // Fetch all general + material PDFs
      .addCase(fetchAllGeneralAndMaterialPDFs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllGeneralAndMaterialPDFs.fulfilled, (state, action) => {
        state.generalPDFs = Array.isArray(action.payload.allItems)
        ? action.payload.allItems
        : [];
      state.loading = false;
      })
      .addCase(fetchAllGeneralAndMaterialPDFs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all general + material videos
      .addCase(fetchAllGeneralAndMaterialVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllGeneralAndMaterialVideos.fulfilled, (state, action) => {
        state.generalVideos = Array.isArray(action.payload.allItems)
        ? action.payload.allItems
        : [];
        state.loading = false;
      })
      .addCase(fetchAllGeneralAndMaterialVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch material of subject that is of type video
      .addCase(fetchMaterialOfSubjectTypeVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterialOfSubjectTypeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videoMaterials = action.payload;
      })
      .addCase(fetchMaterialOfSubjectTypeVideo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Fetch material of subject that is of type PDF
      .addCase(fetchMaterialOfSubjectTypePDF.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterialOfSubjectTypePDF.fulfilled, (state, action) => {
        state.pdfMaterials = action.payload;
        state.loading = false;
      })
      .addCase(fetchMaterialOfSubjectTypePDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch subjects that have material type video
      .addCase(fetchSubjectsWithVideoMaterial.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectsWithVideoMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.videoSubjects = action.payload;
      })
      .addCase(fetchSubjectsWithVideoMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch subjects that have material type PDF
      .addCase(fetchSubjectsWithPDFMaterial.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectsWithPDFMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfSubjects = action.payload;
      })
      .addCase(fetchSubjectsWithPDFMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //  mark material as viewed
      .addCase(viewMaterial.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedMaterials = action.payload;
      })
      .addCase(viewMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLibraryError, clearDetails } = libraryStudentSlice.actions;
export default libraryStudentSlice.reducer;