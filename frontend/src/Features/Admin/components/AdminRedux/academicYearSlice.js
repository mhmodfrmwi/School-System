import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/v1/admin/academicYear";

const initialState = {
  academicYears: [],
  status: "idle",
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const fetchAcademicYears = createAsyncThunk(
  "academicYears/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.academicYears;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addAcademicYear = createAsyncThunk(
  "academicYears/add",
  async (newAcademicYear, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/createAcademicYear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newAcademicYear),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.academicYear;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editAcademicYear = createAsyncThunk(
  "academicYears/edit",
  async ({ id, updatedAcademicYear }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedAcademicYear),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      return { id, ...updatedAcademicYear };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeAcademicYear = createAsyncThunk(
  "academicYears/remove",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete academic year");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
      .addCase(fetchAcademicYears.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = action.payload;
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        if (
          !state.error.includes("NetworkError") &&
          !state.error.includes("Token is required!")
        ) {
          toast.error(action.payload || "Failed to fetch academic years");
        }
      })
      .addCase(addAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears.push(action.payload);
        toast.success("Academic year added successfully!");
      })
      .addCase(addAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to add academic year");
      })
      .addCase(editAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.academicYears.findIndex(
          (item) => item._id === action.payload.id,
        );
        if (index !== -1) {
          state.academicYears[index] = {
            ...state.academicYears[index],
            ...action.payload,
          };
        }
        toast.success("Academic year updated successfully!");
      })
      .addCase(editAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to update academic year");
      })
      .addCase(removeAcademicYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAcademicYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = state.academicYears.filter(
          (item) => item._id !== action.payload,
        );
        toast.success("Academic year deleted successfully!");
      })
      .addCase(removeAcademicYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to delete academic year");
      });
  },
});

export const { clearError } = academicYearSlice.actions;
export default academicYearSlice.reducer;
