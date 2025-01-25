import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  className: "",
  subjectName: "",
  teacherName: "",
  academicYear: "",
  status: "idle",
  classesTeacher: "",
  error: null,
  grade: [],
  message: "",
  loading: false,
};

export const postClassTeacher = createAsyncThunk(
  "classTeacher/postClassTeacher",
  async (classTeacherData, { rejectWithValue }) => {
    console.log(classTeacherData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/classTeacher/createClassTeacher",
        {
          method: "POST",
          body: JSON.stringify(classTeacherData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to create class teacher ");
        return toast.error(error.message);
      }

      const data = await response.json();
      toast.success("Class Teacher created successfully");
      return data;
    } catch (error) {
      toast.error("Something went wrong while creating the class Teacher");
      console.log(error);
    }
  },
);

export const fetchClassTeacher = createAsyncThunk(
  "classTeacher/fetchClassTeacher",

  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/classTeacher/",
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data.classTeachers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editClassTeacherAsync = createAsyncThunk(
  "classTeacher/editClassTeacherAsync",
  async ({ id, updatedClassTeacher }, { rejectWithValue }) => {
    console.log(updatedClassTeacher);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/classTeacher/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedClassTeacher),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to edit class Teacher");
      }

      const data = await response.json();
      toast.success("class Teacher updated successfully");
      return data.classTeacher;
    } catch (error) {
      toast.error("Failed to update class Teacher");
      return rejectWithValue(error.message);
    }
  },
);

export const removeClassTeacher = createAsyncThunk(
  "classTeacher/removeClassTeacher",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/classTeacher/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to delete class Teacher");
        return toast.error(error.message);
      }

      dispatch(fetchClassTeacher());
      toast.success("class Teacher deleted successfully");
      return id;
    } catch (error) {
      toast.error("Failed to delete class teacher ");
      return rejectWithValue(error.message);
    }
  },
);

const classTeacherSlice = createSlice({
  name: "classTeacher",
  initialState,
  reducers: {
    addClassTeacher: (state, action) => {
      state.classesTeacher.push(action.payload);
    },
    editClassTeacher: (state, action) => {
      const index = state.classesTeacher.findIndex(
        (classTeacher) => classTeacher.id === action.payload.id,
      );
      if (index !== -1) {
        state.classesTeacher[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addClassTeachertoServer: {
      prepare(className, subjectName, teacherName, academicYear) {
        return {
          payload: {
            className,
            subjectName,
            teacherName,
            academicYear,
          },
        };
      },
      reducer(state, action) {
        state.className = action.payload.className;
        state.subjectName = action.payload.subjectName;
        state.teacherName = action.payload.teacherName;
        state.academicYear = action.payload.academicYear;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postClassTeacher.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(postClassTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(postClassTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchClassTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.classesTeacher = action.payload;
      })
      .addCase(fetchClassTeacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeClassTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeClassTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.bosses = state.bosses.filter(
          (bosse) => bosse.id !== action.payload,
        );
        state.message = "classTeacher deleted successfully";
      })
      .addCase(removeClassTeacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editClassTeacherAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editClassTeacherAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedClassTeacher = action.payload;
        const index = state.classesTeacher.findIndex(
          (classTeacher) => classTeacher._id === updatedClassTeacher._id,
        );
        if (index !== -1) {
          state.bosses[index] = updatedClassTeacher;
        }
        state.message = "classTeacher updated successfully";
      })
      .addCase(editClassTeacherAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearMessage,
  addClassTeacher,
  editClassTeacher,
  addClassTeachertoServer,
} = classTeacherSlice.actions;

export default classTeacherSlice.reducer;
