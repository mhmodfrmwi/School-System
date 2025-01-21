import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch courses from the API
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/courses');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch courses');
    }
  }
);

// Async thunk to fetch a specific course by ID from the API
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/courses/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch course');
    }
  }
);

// Async thunk to add a course to the API
export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (newCourse, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/courses', newCourse);
      return response.data; // Return the newly added course
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add course');
    }
  }
);

// Async thunk to edit a course in the API
export const editCourse = createAsyncThunk(
  'courses/editCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/courses/${courseData.id}`, courseData);
      return response.data; // Return the updated course
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit course');
    }
  }
);

// Async thunk to delete a course from the API
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/courses/${courseId}`);
      return courseId; // Return the ID of the deleted course
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete course');
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    course: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle add course
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle edit course
      .addCase(editCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default coursesSlice.reducer;
