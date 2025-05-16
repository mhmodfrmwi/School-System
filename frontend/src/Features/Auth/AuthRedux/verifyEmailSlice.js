import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const verifyEmail = createAsyncThunk(
  "verifyEmail/verifyEmail",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/general/${userId}/verify/${token}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 410) {
          return rejectWithValue({
            message: data.message || "Failed to verify email. Please try again or contact support.",
            status: "expired",
          });
        }
        throw new Error(data.message || "Failed to verify email");
      }

      return {
        message: data.message || "Email verified successfully!",
        status: "success",
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Failed to verify email. Please try again or contact support.",
        status: "error",
      });
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "verifyEmail/resendVerificationEmail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/general/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification email");
      }

      return {
        message: data.message || "Verification email sent successfully!",
        status: "success",
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Failed to resend verification email",
        status: "error",
      });
    }
  }
);

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState: {
    status: "idle",
    message: "",
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.status = "idle";
      state.message = "";
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.status = "verifying";
        state.message = "Verifying your email...";
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload.message;
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.message = "Sending verification email...";
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload.message;
      });
  },
});

export const { clearError, resetState } = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;