import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  students: [],
  status: "idle",
  error: null,
  loading: false,
  message: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",

  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/student",
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.students;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch students");
    }
  },
);

export const postStudent = createAsyncThunk(
  "students/postStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/student/createStudent",
        {
          method: "POST",
          body: JSON.stringify(studentData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.student;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add student");
    }
  },
);

export const editStudent = createAsyncThunk(
  "students/editStudent",

  async ({ id, updatedStudent }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/student/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedStudent),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();

      return data.updatedStudent;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit student");
    }
  },
);

export const removeStudent = createAsyncThunk(
  "students/removeStudent",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/student/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchStudents());
      toast.success("Student removed successfully!");
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove student");
    }
  },
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch students";
        state.loading = false;
        if(state.error.includes("NetworkError")){
          
        }else{
        toast.error(state.error);}
      })
      .addCase(postStudent.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload);
        state.message = "Student added successfully!";
        state.loading = false;
      })
      .addCase(postStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add student";
        state.loading = false;
      })
      .addCase(editStudent.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id,
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.message = "Student updated successfully!";
        state.loading = false;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit student";
        state.loading = false;
      })
      .addCase(removeStudent.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter(
          (student) => student._id !== action.payload,
        );
        state.message = "Student removed successfully!";
        state.loading = false;
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove student";
        state.loading = false;
      });
  },
});

export const { clearMessage } = studentsSlice.actions;
export default studentsSlice.reducer;
