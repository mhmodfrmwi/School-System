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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("fullName", data[role]?.fullName || "Unknown");

      return {
        email,
        token: data.token,
        fullName: data[role]?.fullName || "Unknown",
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const loginSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    fullName: sessionStorage.getItem("fullName") || "Unknown",
    token: sessionStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.email = "";
      state.fullName = "Unknown";
      state.token = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("fullName");
      toast.info("Logged out successfully!");
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

        toast.success(`Welcome, ${action.payload.fullName}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
