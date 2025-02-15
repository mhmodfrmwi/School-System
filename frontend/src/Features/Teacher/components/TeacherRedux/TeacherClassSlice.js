import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  classTeachers: [],
};

export const fetchClassTeacher = createAsyncThunk(
  "ClassTeachers/fetchClassTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const token =
           sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/semester-class",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();

      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch Material");
    }
  },
);

export const fetchALLClassTeacher = createAsyncThunk(
  "AllClassTeachers/fetchAllClassTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const token =
           sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/class",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();

      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch Material");
    }
  },
);

const TeacherClass = createSlice({
  name: "classTeachers",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchClassTeacher.fulfilled, (state, action) => {
        // console.log("Fetched Data:", action.payload);
        state.status = "succeeded";
        state.classTeachers = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchClassTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch classTeachers";
        state.loading = false;
      })
       .addCase(fetchALLClassTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchALLClassTeacher.fulfilled, (state, action) => {
        // console.log("Fetched Data:", action.payload);
        state.status = "succeeded";
        state.classTeachers = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchALLClassTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch classTeachers";
        state.loading = false;
      });
  },
});

export default TeacherClass.reducer;
