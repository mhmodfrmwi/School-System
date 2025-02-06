import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  status: "idle",
  error: null,
  admins: [],
  loading: false,
  message: "",
};

export const postAdmin = createAsyncThunk(
  "admins/postAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/admin/createAdmin",
        {
          method: "POST",
          body: JSON.stringify(adminData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/admin/"
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.admins;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editAdmin = createAsyncThunk(
  "admins/edit",
  async ({ id, updatedAdmin }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/admin/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAdmin),
      });

      if (!response.ok) {
        throw new Error("Failed to update admin");
      }

      const data = await response.json(); // Make sure this matches your API response structure
      return { id, updatedAdmin: data }; // Return updated admin data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeAdmin = createAsyncThunk(
  "admins/removeAdmin",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      dispatch(fetchAdmins());
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAdmin.pending, (state) => {
        state.status = "loading";
        state.error = ""; // Ensure error is not null
      })
      .addCase(postAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins.push(action.payload);
        toast.success("Admin added successfully!");
      })
      .addCase(postAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post admin data"; // Fallback to default error
        toast.error(state.error);
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch admins"; // Fallback to default error
        state.loading = false;
        if (state.error.includes("NetworkError")||state.error.includes("Token is required!")) {
          // Optionally handle network error case
        } else {
          toast.error(state.error); // Show toast with the error message
        }
      })
      .addCase(editAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, updatedAdmin } = action.payload;
  
        const index = state.admins.findIndex((admin) => admin._id === id);
        if (index !== -1) {
          state.admins[index] = { ...state.admins[index], ...updatedAdmin }; // Update specific admin
        }
        toast.success("Admin updated successfully!");
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update admin"; // Fallback to default error
        toast.error(state.error);
      })
      .addCase(removeAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload
        );
        toast.success("Admin deleted successfully!");
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete admin"; // Fallback to default error
        toast.error(state.error); // Show toast with the error message
      });
  }
  
});

export const { clearMessage,addAdmintoServer } = adminSlice.actions;
export default adminSlice.reducer;
