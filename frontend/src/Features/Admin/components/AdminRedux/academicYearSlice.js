import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  academicYears: [],
  status: "idle",
  message: "",
};

// Fetch all academic years
export const fetchAcademicYears = createAsyncThunk(
  "academicYears/fetchAcademicYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/academicYears");
      if (!response.ok) {
        throw new Error("Failed to fetch academic years");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new academic year
export const addAcademicYear = createAsyncThunk(
  "academicYears/addAcademicYear",
  async (newAcademicYear, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/academicYears", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAcademicYear),
      });

      if (!response.ok) {
        throw new Error("Failed to add academic year");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit an academic year
export const editAcademicYear = createAsyncThunk(
  "academicYears/editAcademicYear",
  async ({ id, updatedAcademicYear }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/academicYears/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAcademicYear),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit academic year: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove an academic year
export const removeAcademicYear = createAsyncThunk(
  "academicYears/removeAcademicYear",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/academicYears/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete academic year");
      }

      return id; // Return the id of the deleted academic year
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const academicYearSlice = createSlice({
  name: "academicYears",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Academic Years
      .addCase(fetchAcademicYears.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = action.payload;
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Add Academic Year
      .addCase(addAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears.push(action.payload);
        state.message = "Academic year added successfully";
      })
      .addCase(addAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Edit Academic Year
      .addCase(editAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.academicYears.findIndex(
          (academicYear) => academicYear.id === action.payload.id
        );
        if (index !== -1) {
          state.academicYears[index] = action.payload;
        }
        state.message = "Academic year updated successfully";
      })
      .addCase(editAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Delete Academic Year
      .addCase(removeAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = state.academicYears.filter(
          (academicYear) => academicYear.id !== action.payload
        );
        state.message = "Academic year deleted successfully";
      })
      .addCase(removeAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = academicYearSlice.actions;

export default academicYearSlice.reducer;
