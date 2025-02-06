import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
  loading: false,
};

// Fetch all teachers
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/teacher");

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.teachers;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch teachers");
    }
  }
);

// Add a new teacher
export const postTeacher = createAsyncThunk(
  "teachers/postTeacher",
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/teacher/createTeacher", {
        method: "POST",
        body: JSON.stringify(teacherData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.teacher;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add teacher");
    }
  }
);

// Edit an existing teacher
export const editTeacher = createAsyncThunk(
  "teachers/editTeacher",
  async ({ id, updatedTeacher }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/teacher/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTeacher),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.teacher;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit teacher");
    }
  }
);

// Delete a teacher
export const removeTeacher = createAsyncThunk(
  "teachers/removeTeacher",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/teacher/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchTeachers());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove teacher");
    }
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teachers";
        state.loading = false;
        if(state.error.includes("NetworkError")||state.error.includes("Token is required!")){

        }else{
        toast.error(action.payload || "Failed to fetch teachers");}
      })
      .addCase(postTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers.push(action.payload);
        toast.success("Teacher added successfully");
        state.loading = false;
      })
      .addCase(postTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add teacher";
        state.loading = false;
        toast.error(action.payload || "Failed to add teacher");
      })
      .addCase(editTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === action.payload._id
        );
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
        toast.success("Teacher updated successfully");
        state.loading = false;
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit teacher";
        state.loading = false;
        toast.error(action.payload || "Failed to edit teacher");
      })
      .addCase(removeTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload
        );
        toast.success("Teacher removed successfully");
        state.loading = false;
      })
      .addCase(removeTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove teacher";
        state.loading = false;
        toast.error(action.payload || "Failed to remove teacher"); 
      });
  },
});

export default teacherSlice.reducer;
