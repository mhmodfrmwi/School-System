import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  pdfMaterials: [],
};

const getToken = () =>  sessionStorage.getItem("token");

// Fetch Materials
export const fetchMaterials = createAsyncThunk(
  "materials/fetchMaterials",
  async (grade_subject_semester_id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      if (!grade_subject_semester_id) {
        return rejectWithValue("Invalid ID: grade_subject_semester_id is missing.");
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/material/${grade_subject_semester_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      console.log("Fetched materials:", data);
      return data.materiels;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch materials");
    }
  }
);

// Delete Material
export const deleteMaterial = createAsyncThunk(
  "materials/deleteMaterial",
  async (materialId, { rejectWithValue }) => {
    try {
      console.log("Deleting material with ID:", materialId); // Debugging log

      if (!materialId) {
        return rejectWithValue("Invalid material ID");
      }

      const response = await fetch(`http://localhost:4000/api/v1/teacher/material/${materialId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to delete material");
      }

      return materialId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete material");
    }
  }
);

//update
export const updateMaterial = createAsyncThunk(
  "materials/updateMaterial",
  async ({ materialId, formData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return rejectWithValue("Authentication required. Please log in.");

      const response = await fetch(`http://localhost:4000/api/v1/teacher/material/${materialId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      return await response.json();
      
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update material");
    }
  }
);


// Post PDF Material
export const postPdfMaterial = createAsyncThunk(
  "pdfMaterials/postPdfMaterials",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const { class_id, grade_subject_semester_id, ...restFormData } = formData;
      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/material/${grade_subject_semester_id}?classId=${class_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restFormData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add material");
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
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        console.log("Updating state with:", action.payload);
        state.pdfMaterials = action.payload || [];
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch pdfMaterials";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(postPdfMaterial.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postPdfMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pdfMaterials.push(action.payload);
        state.loading = false;
      })
      .addCase(postPdfMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add material";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pdfMaterials = state.pdfMaterials.filter(
          (material) => material.id !== action.payload
        );
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete material";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default PdfMaterial.reducer;
