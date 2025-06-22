import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  classTeachers: [],
  selectedClassTeacher: null,
  status: "idle",
  error: null,
  loading: false,
};

const getToken = () => sessionStorage.getItem("token");

export const fetchClassTeacherById = createAsyncThunk(
  "classTeachers/fetchClassTeacherById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id || id === "undefined") {
        return rejectWithValue("Invalid class teacher ID");
      }
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/classTeacher/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to fetch class teacher");
      }

      const data = await response.json();
      return data.classTeacher;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch class teacher");
    }
  },
);

export const fetchClassTeachers = createAsyncThunk(
  "classTeachers/fetchClassTeachers",
  async (id, { rejectWithValue }) => {
    try {
      if (!id || id === "undefined") {
        return rejectWithValue("Invalid teacher ID");
      }
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/currentTeacherClasses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to fetch class teachers");
      }

      const data = await response.json();
      return data.data || []; // Ensure empty array if no data
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
  async (id, { rejectWithValue }) => {
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
    clearClassTeachers: (state) => {
      state.classTeachers = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassTeacherById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchClassTeacherById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedClassTeacher = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchClassTeacherById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch class teacher";
        state.loading = false;
         toast.error(action.payload || "Failed to fetch class teacher");
      })
      .addCase(fetchClassTeachers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.classTeachers = []; // Clear classTeachers on new fetch
      })
      .addCase(fetchClassTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classTeachers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchClassTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch class teachers";
        state.loading = false;
        state.classTeachers = []; // Clear on error
        toast.error(action.payload || "Failed to fetch class teachers");
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
          (classTeacher) => classTeacher.classTeacherId === action.payload.classTeacherId,
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
          (classTeacher) => classTeacher.classTeacherId !== action.payload,
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

export const { clearMessage, clearClassTeachers } = classTeacherSlice.actions;
export default classTeacherSlice.reducer;