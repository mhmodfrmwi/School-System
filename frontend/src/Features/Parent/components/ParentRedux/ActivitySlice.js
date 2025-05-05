// parentActivitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  selectedKid: null,
  error: null,
  loading: false,
  schoolHubs: [],
  contests: [],
  selectedActivity: null,
};

export const fetchParentSchoolHubs = createAsyncThunk(
  "parentActivity/fetchSchoolHubs",
  async (kidId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/v1/parent/school-hub?kidId=${kidId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchParentContests = createAsyncThunk(
  "parentActivity/fetchContests",
  async (kidId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/v1/parent/contests?kidId=${kidId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const parentActivitySlice = createSlice({
  name: "parentActivity",
  initialState,
  reducers: { setSelectedKid: (state, action) => {
    state.selectedKid = action.payload;
  },
  clearSelectedKid: (state) => {
    state.selectedKid = null;
  }},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentSchoolHubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParentSchoolHubs.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolHubs = action.payload.schoolHubs || [];
      })
      .addCase(fetchParentSchoolHubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchParentContests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParentContests.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload.contests || [];
      })
      .addCase(fetchParentContests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedKid, clearSelectedKid } = parentActivitySlice.actions;
export default parentActivitySlice.reducer;