import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/v1/admin";

const getToken = () => localStorage.getItem("token");

const initialState = {
  grades: [],
  status: "idle",
  error: null,
  loading: false,
};

export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/grade`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.grades;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch grades");
    }
  },
);

export const postGrade = createAsyncThunk(
  "grades/postGrade",
  async (gradeData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/grade/createGrade`, {
        method: "POST",
        body: JSON.stringify(gradeData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.grade;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add grade");
    }
  },
);

export const editGrade = createAsyncThunk(
  "grades/editGrade",
  async ({ id, updatedGrade }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/grade/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedGrade),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.grade;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit grade");
    }
  },
);

export const removeGrade = createAsyncThunk(
  "grades/removeGrade",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/grade/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchGrades());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove grade");
    }
  },
);

const gradeSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    editGrade: (state, action) => {
      const index = state.grades.findIndex(
        (grade) => grade.id === action.payload.id,
      );
      if (index !== -1) {
        state.grades[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.grades = action.payload;
        state.loading = false;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch grades";
        state.loading = false;
        if (
          state.error.includes("NetworkError") ||
          state.error.includes("Token is required!")
        ) {
        } else {
          toast.error(state.error);
        }
      })
      .addCase(postGrade.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.grades.push(action.payload);
        state.loading = false;
        toast.success("Grade added successfully");
      })
      .addCase(postGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add grade";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(editGrade.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.grades.findIndex(
          (grade) => grade._id === action.payload._id,
        );
        if (index !== -1) {
          state.grades[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit grade";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(removeGrade.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.grades = state.grades.filter(
          (grade) => grade._id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(removeGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove grade";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default gradeSlice.reducer;
