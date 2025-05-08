// parentActivitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/parent";

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
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Authentication required. Please log in.");
    }

    if (!kidId) {
      return rejectWithValue("Kid ID is required");
    }

    try {
      const response = await axios.get(`${BASE_URL}/school-hub/${kidId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("School Hubs Data:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching school hubs:", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchParentContests = createAsyncThunk(
  "parentActivity/fetchContests",
  async (kidId, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Authentication required. Please log in.");
    }

    if (!kidId) {
      return rejectWithValue("Kid ID is required");
    }

    try {
      const response = await axios.get(`${BASE_URL}/get-contests/${kidId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          params: { kidId } 
        },
      });
      console.log("Contests Data:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching contests:", err);
      // return rejectWithValue(err.response?.data?.message || err.message);
      const errorMsg = err.response?.data?.message || 
      err.message || 
      "Failed to fetch contests";
return rejectWithValue(errorMsg);
    }
  }
);

const parentActivitySlice = createSlice({
  name: "parentActivity",
  initialState,
  reducers: {
    setSelectedKid: (state, action) => {
      state.selectedKid = action.payload;
      console.log("Selected Kid:", action.payload);
    },
    clearSelectedKid: (state) => {
      state.selectedKid = null;
      console.log("Cleared selected kid");
    },
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
      console.log("Selected Activity:", action.payload);
    },
    clearSelectedActivity: (state) => {
      state.selectedActivity = null;
      console.log("Cleared selected activity");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentSchoolHubs.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching school hubs...");
      })
      .addCase(fetchParentSchoolHubs.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolHubs = action.payload.schoolHubs || action.payload || [];
        console.log("School hubs fetched successfully:", state.schoolHubs);
      })
      .addCase(fetchParentSchoolHubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Failed to fetch school hubs:", action.payload);
      })
      .addCase(fetchParentContests.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching contests...");
      })
      .addCase(fetchParentContests.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload.contests || action.payload || [];
        state.error = null;
        console.log("Contests fetched successfully:", state.contests);
      })
      .addCase(fetchParentContests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.contests = state.contests || []; 
        console.error("Failed to fetch contests:", action.payload);
      });
  }
});

export const { 
  setSelectedKid, 
  clearSelectedKid,
  setSelectedActivity,
  clearSelectedActivity
} = parentActivitySlice.actions;

export default parentActivitySlice.reducer;