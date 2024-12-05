import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/getUsers/teachers",
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();

      return data.teachers;
    } catch (error) {
      console.log(error);
    }
  },
);

export const removeTeacher = createAsyncThunk(
  "teachers/removeTeacher",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/teachers/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }
      dispatch(fetchTeachers());
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    message: "",
  },
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    editTeacher: (state, action) => {
      const index = state.teachers.findIndex(
        (teacher) => teacher.id === action.payload.id,
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
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.status = "failed";
        state.message = "Failed to fetch teachers";
      })

      .addCase(removeTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload,
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
