import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      return { email, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.email = "";
      state.token = null;
      localStorage.removeItem("token"); 
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
