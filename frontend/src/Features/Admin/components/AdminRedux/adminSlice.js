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
      toast.success("Admin added successfully!"); // Notify success
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to post admin data");
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
      toast.error(error.message || "Failed to fetch admins");
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
      toast.success("Admin updated successfully!");
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
      toast.success("Admin deleted successfully!"); 
      return id;
    } catch (error) {
      toast.error(error.message || "Failed to delete admin");
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
        state.error = null;
      })
      .addCase(postAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins.push(action.payload);
      })
      .addCase(postAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
        state.message = action.payload;
        state.loading = false;
      })
      // Edit
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
        state.message = "Admin updated successfully!";
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(removeAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload
        );
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { clearMessage,addAdmintoServer } = adminSlice.actions;
export default adminSlice.reducer;
