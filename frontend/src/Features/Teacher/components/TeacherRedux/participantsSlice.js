import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  message: "",
  teams: [],
};

// جلب الفرق (Teams) الخاصة بمسابقة معينة
export const fetchTeams = createAsyncThunk(
  "participants/fetchTeams",
  async (contestId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return rejectWithValue("Authentication required. Please log in.");

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/contest/${contestId}/teams`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.teams;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teams";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export const { clearMessage } = participantsSlice.actions;
export default participantsSlice.reducer;