import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  status: "idle",
  message: "",
};

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/v1/getUsers/teachers"
    );
    const data = await response.json();

    return data.teachers;
  }
);

export const removeTeacher = createAsyncThunk(
  "teachers/removeTeacher",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/teachers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete teacher");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    editTeacher: (state, action) => {
      const index = state.teachers.findIndex(
        (teacher) => teacher.id === action.payload.id
      );
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Fetched Teachers:", action.payload); 
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(removeTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        );
        state.message = "Teacher deleted successfully";
      })
      .addCase(removeTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addTeacher, editTeacher, clearMessage } = teacherSlice.actions;

export default teacherSlice.reducer;
