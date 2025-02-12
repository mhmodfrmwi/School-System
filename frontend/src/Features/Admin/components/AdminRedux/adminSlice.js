import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/v1/admin";

const getToken = () => sessionStorage.getItem("token");

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
      const response = await fetch(`${BASE_URL}/admin/createAdmin`, {
        method: "POST",
        body: JSON.stringify(adminData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.admins;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editAdmin = createAsyncThunk(
  "admins/edit",
  async ({ id, updatedAdmin }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedAdmin),
      });

      if (!response.ok) {
        throw new Error("Failed to update admin");
      }

      const data = await response.json();
      return { id, updatedAdmin: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeAdmin = createAsyncThunk(
  "admins/removeAdmin",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      dispatch(fetchAdmins());
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
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
        state.error = "";
      })
      .addCase(postAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins.push(action.payload);
        toast.success("Admin added successfully!");
      })
      .addCase(postAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post admin data";
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
        state.error = action.payload || "Failed to fetch admins";
        state.loading = false;
        if (
          !state.error.includes("NetworkError") &&
          !state.error.includes("Token is required!")
        ) {
          toast.error(state.error);
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
          state.admins[index] = { ...state.admins[index], ...updatedAdmin };
        }
        toast.success("Admin updated successfully!");
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update admin";
        toast.error(state.error);
      })
      .addCase(removeAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload,
        );
        toast.success("Admin delete successfully!");
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete admin";
        toast.error(state.error);
      });
  },
});

export const { clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
