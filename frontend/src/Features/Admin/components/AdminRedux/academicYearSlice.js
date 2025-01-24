import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/v1/admin/academicYear";

const initialState = {
  academicYears: [],
  status: "idle", 
  error: null,
};


export const fetchAcademicYears = createAsyncThunk(
  "academicYears/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}`);
      if (!response.ok) throw new Error("Failed to fetch academic years");
      const data = await response.json();

      
      return data.academicYears; 
    } catch (error) {
    
      return rejectWithValue(error.message);
    }
  }
);


export const addAcademicYear = createAsyncThunk(
  "academicYears/add",
  async (newAcademicYear, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/createAcademicYear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcademicYear),
      });
      if (!response.ok) throw new Error("Failed to add academic year");
      const data = await response.json();

      toast.success("Academic year added successfully!");
      return data.academicYear; 
    } catch (error) {
      toast.error(error.message || "Failed to add academic year");
      return rejectWithValue(error.message);
    }
  }
);

export const editAcademicYear = createAsyncThunk(
  "academicYears/edit",
  async ({ id, updatedAcademicYear }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAcademicYear),
      });
      if (!response.ok) throw new Error("Failed to update academic year");

      toast.success("Academic year updated successfully!");
      return { id, ...updatedAcademicYear };  
    } catch (error) {
      toast.error(error.message || "Failed to update academic year");
      return rejectWithValue(error.message);
    }
  }
);


// Delete an academic year
export const removeAcademicYear = createAsyncThunk(
  "academicYears/remove",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete academic year");

      toast.success("Academic year deleted successfully!");
      return id; 
    } catch (error) {
      toast.error(error.message || "Failed to delete academic year");
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const academicYearSlice = createSlice({
  name: "academicYears",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAcademicYears.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = action.payload;
        // console.log("Updated academic years in Redux:", state.academicYears); 
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add
      .addCase(addAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears.push(action.payload);
      })
      .addCase(addAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Edit
      .addCase(editAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.academicYears.findIndex(
          (item) => item._id === action.payload.id
        );
        if (index !== -1) {
          state.academicYears[index] = { ...state.academicYears[index], ...action.payload };
        }
      })
      .addCase(editAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove
      .addCase(removeAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = state.academicYears.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = academicYearSlice.actions;

export default academicYearSlice.reducer;
