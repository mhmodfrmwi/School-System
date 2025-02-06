import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  managers: [],
  status: "idle",
  error: null,
  loading: false,
};

// Fetch all managers
export const fetchManagers = createAsyncThunk(
  "managers/fetchManagers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/manager");

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.managers;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch managers");
    }
  }
);

// Add a new manager
export const postManager = createAsyncThunk(
  "managers/postManager",
  async (managerData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/manager/createManager", {
        method: "POST",
        body: JSON.stringify(managerData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.manager;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add manager");
    }
  }
);

// Edit an existing manager
export const editManager = createAsyncThunk(
  "managers/editManager",
  async ({ id, updatedManager }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/manager/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedManager),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.manager;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit manager");
    }
  }
);

// Delete a manager
export const removeManager = createAsyncThunk(
  "managers/removeManager",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/manager/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchManagers());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove manager");
    }
  }
);

const managerSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managers = action.payload;
        state.loading = false;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch managers";
        state.loading = false;
        if(state.error.includes("NetworkError")||state.error.includes("Token is required!")){

        }else{
        toast.error(action.payload || "Failed to fetch managers");}
      })
      .addCase(postManager.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postManager.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managers.push(action.payload);
        toast.success("Manager added successfully");
        state.loading = false;
      })
      .addCase(postManager.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add manager";
        state.loading = false;
        toast.error(action.payload || "Failed to add manager");
      })
      .addCase(editManager.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editManager.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.managers.findIndex(
          (manager) => manager._id === action.payload._id
        );
        if (index !== -1) {
          state.managers[index] = action.payload;
        }
        toast.success("Manager updated successfully");
        state.loading = false;
      })
      .addCase(editManager.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit manager";
        state.loading = false;
        toast.error(action.payload || "Failed to edit manager");
      })
      .addCase(removeManager.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeManager.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managers = state.managers.filter(
          (manager) => manager._id !== action.payload
        );
        toast.success("Manager removed successfully!");
        state.loading = false;
      })
      .addCase(removeManager.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove manager";
        state.loading = false;
        toast.error(action.payload || "Failed to remove manager");
      });
  },
});

export default managerSlice.reducer;
