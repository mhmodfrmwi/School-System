import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue, getState }) => {
    try {
      const role = getState().role.role;
      if (!role)
        throw new Error("No role selected! Please choose a role first.");

      const response = await fetch(
        `http://localhost:4000/api/v1/${role}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("fullName", data[role]?.fullName || "Unknown");
      sessionStorage.setItem("profileImage", data[role]?.profileImage || "Unknown");
      sessionStorage.setItem("role", role || "Unknown");
      sessionStorage.setItem("_id", data[role]?._id || "Unknown");

      return {
        email,
        token: data.token,
        fullName: data[role]?.fullName || "Unknown",
        profileImage: data[role]?.profileImage || "Unknown",
        role: role || "Unknown",
        _id: data[role]?._id || "Unknown",
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    fullName: sessionStorage.getItem("fullName") || "Unknown",
    profileImage: sessionStorage.getItem("profileImage") || "Unknown",
    token: sessionStorage.getItem("token") || null,
    role: sessionStorage.getItem("role") || "Unknown",
    _id: sessionStorage.getItem("_id") || "Unknown",
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.email = "";
      state.fullName = "Unknown";
      state.profileImage = "Unknown";
      state.role = "Unknown";
      state._id = "Unknown";
      state.token = null;

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("fullName");
      sessionStorage.removeItem("profileImage");
      sessionStorage.removeItem("_id");
      toast.info("Logged out successfully!");
    },
    updateUserData: (state, action) => {
      state.fullName = action.payload.fullName || state.fullName;
      state.profileImage = action.payload.profileImage || state.profileImage;
      state._id = action.payload._id || state._id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.fullName = action.payload.fullName;
        state.profileImage = action.payload.profileImage;
        state.role = action.payload.role;
        state._id = action.payload._id;

        toast.success(`Welcome, ${action.payload.fullName}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      });
  },
});

export const { logout, updateUserData } = loginSlice.actions;
export default loginSlice.reducer;