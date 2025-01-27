import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  assignedGrades: [],
  academicYears: [],
  status: "idle",
  error: null,
  loading: false,
};

// Fetch assigned grades
export const fetchAssignedGrades = createAsyncThunk(
  "assignGrade/fetchAssignedGrades",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/gradeSubjectSemester",
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.assignedGrades || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch assigned grades",
      );
    }
  },
);

// Assign a grade
export const assignGrade = createAsyncThunk(
  "assignGrade/assignGrade",
  async (gradeData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/gradeYear/createGradeYear",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gradeData),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to assign grade");
      }

      toast.success(data.message || "Grade assigned successfully");
      return data.assignedGrade;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to assign grade");
    }
  },
);

// Fetch academic years
export const fetchAcademicYears = createAsyncThunk(
  "assignGrade/fetchAcademicYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/academicYear",
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.academicYears || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch academic years");
    }
  },
);

// Delete assigned grade
export const deleteAssignedGrade = createAsyncThunk(
  "assignGrade/deleteAssignedGrade",
  async (gradeId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/gradeSubjectSemester/${gradeId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      toast.success(data.message || "Grade deleted successfully");
      return gradeId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete grade");
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
        state.assignedGrades = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssignedGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch assigned grades";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(fetchAcademicYears.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.academicYears = action.payload;
        state.loading = false;
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch academic years";
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
      })
      .addCase(deleteAssignedGrade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete grade";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default assignGradeSlice.reducer;
