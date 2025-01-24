import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { toast } from "react-toastify";

const initialState = {
  gradeName: "",
  status: "idle",
  error: null,
  grade: [],
  message: "",
  loading: false,
};

export const postGrades = createAsyncThunk(
  "grades/postGrade",
  async (gradesData, { rejectWithValue }) => {
    console.log(gradesData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/grade/createGrade",
        {
          method: "POST",
          body: JSON.stringify(gradesData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to create grade");
        return toast.error(error.message);
      }

      const data = await response.json();
      toast.success("Grade created successfully");
      return data;
    } catch (error) {
      toast.error("Something went wrong while creating the grade");
      console.log(error);
    }
  },
);

export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/grade/",
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editGradeAsync = createAsyncThunk(
  "grades/editGradeAsync",
  async ({ id, updatedGrade}, { rejectWithValue }) => {
    console.log(updatedGrade);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/grade/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedGrade),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to edit grade");
      }

      const data = await response.json();
      toast.success("Grade updated successfully");
      return data.grade;
    } catch (error) {
      toast.error("Failed to update grade");
      return rejectWithValue(error.message);
    }
  },
);

export const removeGrade = createAsyncThunk(
  "grades/removeGrade",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/grade/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to delete grade");
        return toast.error(error.message);
      }

      dispatch(fetchGrades());
      toast.success("Grade deleted successfully");
      return id;
    } catch (error) {
      toast.error("Failed to delete grade");
      return rejectWithValue(error.message);
    }
  },
);

const gradeSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    addGrade: (state, action) => {
      state.grade.push(action.payload);
    },
    editGrade: (state, action) => {
      const index = state.grade.findIndex(
        (grade) => grade.id === action.payload.id,
      );
      if (index !== -1) {
        state.grade[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addGradetoServer: {
      prepare(gradeName) {
        return {
          payload: {
            gradeName,
          },
        };
      },
      reducer(state, action) {
        state.gradeName = action.payload.gradeName;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postGrades.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(postGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(postGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        // Use the 'grades' array from the API response
        state.grade = action.payload.grades || [];
      })
      .addCase(fetchGrades.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grade = state.grade.filter(
          (grade) => grade.id !== action.payload,
        );
        state.message = "grade deleted successfully";
      })
      .addCase(removeGrade.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editGradeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editGradeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGrade = action.payload;
        const index = state.grade.findIndex(
          (grade) => grade._id === updatedGrade._id,
        );
        if (index !== -1) {
          state.grade[index] = updatedGrade;
        }
        state.message = "grade updated successfully";
      })
      .addCase(editGradeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, addGrade, editGrade, addGradetoServer } =
gradeSlice.actions;

export default gradeSlice.reducer;
