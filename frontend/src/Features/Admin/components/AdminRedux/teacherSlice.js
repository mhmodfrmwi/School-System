import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  classes: [],
  teachers: [],
  subject: "",
  status: "idle",
  error: null,
  loading: false,
  message: "",
};

export const postTeacher = createAsyncThunk(
  "teachers/postTeacher",
  async (teacherData, { rejectWithValue }) => {
    // console.log(teacherData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/teacher/createTeacher",
        {
          method: "POST",
          body: JSON.stringify(teacherData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post teacher data");
    }
  },
);

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/teacher/",
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

export const editTeacherAsync = createAsyncThunk(
  "teachers/editTeacherAsync",
  async ({ id, updatedTeacher }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/teacher/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedTeacher),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data.teacher;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit teacher data");
    }
  },
);

export const removeTeacher = createAsyncThunk(
  "teachers/removeTeacher",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/teacher/${id}`,
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
  initialState,
  reducers: {
    addTeachertoServer: {
      prepare(
        fullName,
        email,
        password,
        phoneNumber,
        gender,
        classes,
        subject,
      ) {
        return {
          payload: {
            fullName,
            email,
            password,
            phoneNumber,
            gender,
            classes,
            subject,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.gender = action.payload.gender;
        state.classes = action.payload.classes;
        state.subject = action.payload.subject;
      },
    },

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
      .addCase(postTeacher.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(postTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(postTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      });
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
      .addCase(fetchTeachers.rejected, (state) => {
        state.status = "failed";
        state.message = "Failed to fetch teachers";
        state.loading = false;
      })

      .addCase(editTeacherAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(editTeacherAsync.fulfilled, (state, action) => {
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === updatedTeacher._id,
        );
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
        state.message = "Term updated successfully";
        state.loading = false;
      })
      .addCase(editTeacherAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload,
        );
        state.message = "Teacher deleted successfully";
        state.loading = false;
      })
      .addCase(removeTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { addTeacher, editTeacher, clearMessage, addTeachertoServer } =
  teacherSlice.actions;

export default teacherSlice.reducer;
