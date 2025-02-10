import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  classTeachers: [],
  status: "idle",
  error: null,
  loading: false,
};

const getToken = () => sessionStorage.getItem("token");

export const fetchClassTeachers = createAsyncThunk(
  "classTeachers/fetchClassTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/classTeacher",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.classTeachers;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch class teachers");
    }
  },
);

export const postClassTeacher = createAsyncThunk(
  "classTeachers/postClassTeacher",
  async (classTeacherData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/classTeacher/createClassTeacher",
        {
          method: "POST",
          body: JSON.stringify(classTeacherData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.classTeacher;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add class teacher");
    }
  },
);

export const editClassTeacher = createAsyncThunk(
  "classTeachers/editClassTeacher",
  async ({ id, updatedClassTeacher }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/classTeacher/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedClassTeacher),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.classTeacher;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit class teacher");
    }
  },
);

export const removeClassTeacher = createAsyncThunk(
  "classTeachers/removeClassTeacher",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/classTeacher/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchClassTeachers());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove class teacher");
    }
  },
);

const classTeacherSlice = createSlice({
  name: "classTeachers",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassTeachers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchClassTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classTeachers = action.payload;
        state.loading = false;
      })
      .addCase(fetchClassTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch class teachers";
        state.loading = false;
        if (
          state.error.includes("NetworkError") ||
          state.error.includes("Token is required!")
        ) {
        } else {
          toast.error(action.payload || "Failed to fetch class teachers");
        }
      })
      .addCase(postClassTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postClassTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classTeachers.push(action.payload);
        toast.success("Class Teacher added successfully");
        state.loading = false;
      })
      .addCase(postClassTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add class teacher";
        state.loading = false;
        toast.error(action.payload || "Failed to add class teacher");
      })
      .addCase(editClassTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editClassTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.classTeachers.findIndex(
          (classTeacher) => classTeacher._id === action.payload._id,
        );
        if (index !== -1) {
          state.classTeachers[index] = action.payload;
        }
        state.loading = false;
        toast.success("Class Teacher updated successfully");
      })
      .addCase(editClassTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit class teacher";
        state.loading = false;
        toast.error(action.payload || "Failed to edit class teacher");
      })
      .addCase(removeClassTeacher.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeClassTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classTeachers = state.classTeachers.filter(
          (classTeacher) => classTeacher._id !== action.payload,
        );
        toast.success("Class Teacher removed successfully");
        state.loading = false;
      })
      .addCase(removeClassTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove class teacher";
        state.loading = false;
        toast.error(action.payload || "Failed to remove class teacher");
      });
  },
});

export default classTeacherSlice.reducer;
