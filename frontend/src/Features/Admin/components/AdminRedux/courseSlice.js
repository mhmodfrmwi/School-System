import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  courseName: "",
  grade: "",
  term: "",
  courses: [],
  status: "idle",
  error: null,
  message: "",
  loading: false,
};

export const postCourse = createAsyncThunk(
  "course/postCourse",
  async (courseData, { rejectWithValue }) => {
    console.log(courseData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/addCourse",
        {
          method: "POST",
          body: JSON.stringify(courseData),
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
      return rejectWithValue(error.message || "Failed to post course data");
    }
  },
);

export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/courses",
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data.courses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const removeCourse = createAsyncThunk(
  "course/removeCourse",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/courses/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }
      dispatch(fetchCourses());
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    editCourse: (state, action) => {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id,
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addCoursetoServer: {
      prepare(courseName, grade, term) {
        return {
          payload: {
            courseName,
            grade,
            term,
          },
        };
      },
      reducer(state, action) {
        state.courseName = action.payload.courseName;
        state.grade = action.payload.grade;
        state.term = action.payload.term;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      .addCase(removeCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload,
        );
        state.message = "Admin deleted successfully";
      })
      .addCase(removeCourse.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addAdmin, editAdmin, clearMessage, addCoursetoServer } =
  courseSlice.actions;

export default courseSlice.reducer;
