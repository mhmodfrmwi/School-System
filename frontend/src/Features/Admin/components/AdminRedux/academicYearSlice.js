import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/api/v1/admin/academicYear"; // تعديل الرابط الأساسي

const initialState = {
  academicYears: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch all academic years
export const fetchAcademicYears = createAsyncThunk(
  "academicYears/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}`);
      if (!response.ok) throw new Error("Failed to fetch academic years");
      const data = await response.json();
      // console.log("Fetched academic years:", data.academicYears); // تحقق من البيانات هنا
      return data.academicYears; // البيانات المسترجعة
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new academic year
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
      return data.academicYear; // البيانات الجديدة
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Edit an academic year
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
      return { id, ...updatedAcademicYear }; // تحديث البيانات
    } catch (error) {
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
      return id; // ID العنصر المحذوف
    } catch (error) {
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
        // console.log("Updated academic years in Redux:", state.academicYears); // تحقق من البيانات في Redux
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
