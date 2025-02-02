import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  classes: [],
  status: "idle",
  error: null,
  loading: false,
};

// Fetch all classes
export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/class");

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.classes;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch classes");
    }
  }
);

// Add a new class
export const postClass = createAsyncThunk(
  "classes/postClass",
  async (classData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/class/createClass", {
        method: "POST",
        body: JSON.stringify(classData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.class;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add class");
    }
  }
);

// Edit an existing class
export const editClass = createAsyncThunk(
  "classes/editClass",
  async ({ id, updatedClass }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/class/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedClass),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.class;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit class");
    }
  }
);

// Delete a class
export const removeClass = createAsyncThunk(
  "classes/removeClass",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/class/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchClasses());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove class");
    }
  }
);

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload;
        state.loading = false;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch classes";
        state.loading = false;
        if(state.error.includes("NetworkError")){

        }else{
        toast.error(state.error);}
      })
      .addCase(postClass.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes.push(action.payload);
        state.loading = false;
      })
      .addCase(postClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add class";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(editClass.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.classes.findIndex(
          (classItem) => classItem._id === action.payload._id
        );
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit class";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(removeClass.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = state.classes.filter(
          (classItem) => classItem._id !== action.payload
        );
        toast.success("Class removed successfully!");
        state.loading = false;
      })
      .addCase(removeClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove class";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default classSlice.reducer;
