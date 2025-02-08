import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/v1/admin";

const getToken = () => localStorage.getItem("token");

const initialState = {
  assignedGrades: [],
  academicYears: [],
  status: "idle",
  error: null,
  loading: false,
};

export const fetchAssignedGrades = createAsyncThunk(
  "assignGrade/fetchAssignedGrades",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/gradeYear`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.gradeYears || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch assigned grades",
      );
    }
  },
);

export const assignGrade = createAsyncThunk(
  "assignGrade/assignGrade",
  async (gradeData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/gradeYear/createGradeYear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(gradeData),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to assign grade");
      }
      return data.assignedGrade;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to assign grade");
    }
  },
);

export const deleteAssignedGrade = createAsyncThunk(
  "assignGrade/deleteAssignedGrade",
  async (gradeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/gradeYear/${gradeId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      return gradeId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete grade");
    }
  },
);

export const editAssignedGrade = createAsyncThunk(
  "assignGrade/editAssignedGrade",
  async ({ id, updatedGrade }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/gradeYear/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedGrade),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit assigned grade");
    }
  },
);

const assignGradeSlice = createSlice({
  name: "assignGrade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedGrades.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAssignedGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedGrades = action.payload.filter(
          (grade) => grade.gradeId !== null,
        );
        state.loading = false;
      })
      .addCase(fetchAssignedGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch assigned grades";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(assignGrade.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(assignGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedGrades.push(action.payload);
        state.loading = false;
        toast.success("Grade assigned successfully");
      })
      .addCase(assignGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to assign grade";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(deleteAssignedGrade.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteAssignedGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedGrades = state.assignedGrades.filter(
          (grade) => grade._id !== action.payload,
        );
        state.loading = false;
        toast.success("Assigned Grade deleted successfully");
      })
      .addCase(deleteAssignedGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete grade";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(editAssignedGrade.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editAssignedGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.assignedGrades.findIndex(
          (grade) => grade._id === action.payload._id,
        );
        if (index !== -1) {
          state.assignedGrades[index] = action.payload;
        }
        state.loading = false;
        toast.success("Assigned Grade updated successfully");
      })
      .addCase(editAssignedGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit assigned grade";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default assignGradeSlice.reducer;
