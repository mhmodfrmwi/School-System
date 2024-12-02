import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  status: "idle",
  message: "",
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await fetch("http://localhost:4000/api/v1/getUsers/students");
    const data = await response.json();

    return data.students;
  },
);

export const removeStudent = createAsyncThunk(
  "students/removeStudent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    editStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id,
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(removeStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter(
          (student) => student.id !== action.payload,
        );
        state.message = "Student deleted successfully";
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addStudent, editStudent, clearMessage } = studentSlice.actions;

export default studentSlice.reducer;
