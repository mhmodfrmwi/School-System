import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  pdfMaterials: [],
};

export const fetchPdfMaterial = createAsyncThunk(
  "pdfMaterials/fetchPdfMaterial",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTA4NjNjY2YyYWExYWMwYjBlOTYxMiIsImVtYWlsIjoic2hpbWFhMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM4NjE1MzkyLCJleHAiOjE3Mzg3MDE3OTJ9.FaaxQrUE8AzKMEHccOeKvK5YmB7sSoqwMbDppNZAhXE";
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }
      const response = await fetch("http://localhost:4000/api/v1/student/materiel/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.pdfMaterials;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch Material");
    }
  }
);

export const postPdfMaterial = createAsyncThunk(
  "pdfMaterials/postPdfMaterials",
  async (pdfMaterialsData, { rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTA4NjNjY2YyYWExYWMwYjBlOTYxMiIsImVtYWlsIjoic2hpbWFhMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM4NjE1MzkyLCJleHAiOjE3Mzg3MDE3OTJ9.FaaxQrUE8AzKMEHccOeKvK5YmB7sSoqwMbDppNZAhXE";
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }
      const response = await fetch("http://localhost:4000/api/v1/teacher/material", {
        method: "POST",
        body: JSON.stringify(pdfMaterialsData),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.pdfMaterials;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add pdfMaterialsData");
    }
  }
);

const PdfMaterial = createSlice({
  name: "pdfMaterials",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPdfMaterial.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchPdfMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pdfMaterials = action.payload;
        state.loading = false;
      })
      .addCase(fetchPdfMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch pdfMaterials";
        state.loading = false;
        if (state.error.includes("NetworkError")) {
        } else {
          toast.error(state.error);
        }
      })
      .addCase(postPdfMaterial.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postPdfMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pdfMaterials.push(action.payload);
        state.loading = false;
        toast.success("Materials added successfully", { autoClose: 3000 }); // عرض الرسالة لمدة 3 ثواني
      })
      .addCase(postPdfMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add pdfMaterials";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default PdfMaterial.reducer;