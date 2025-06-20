import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/api/v1/parent";

export const fetchVirtualRooms = createAsyncThunk(
  "virtualRooms/fetchVirtualRooms",
  async (subjectId, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");
    if (!subjectId) return rejectWithValue("Subject ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/virtual-rooms/${subjectId}/${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch virtual rooms");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCompletedRooms = createAsyncThunk(
  "virtualRooms/fetchCompletedRooms",
  async (subjectId, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");
    if (!subjectId) return rejectWithValue("Subject ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/virtual-rooms/${subjectId}/completed/${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch completed rooms");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMissedRooms = createAsyncThunk(
  "virtualRooms/fetchMissedRooms",
  async (subjectId, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");
    if (!subjectId) return rejectWithValue("Subject ID is required");

    try {
      const response = await fetch(
        `${BASE_URL}/virtual-rooms/${subjectId}/missed/${studentId}`,
        {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch missed rooms");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const virtualRoomsSlice = createSlice({
  name: "virtualRoomsParent",
  initialState: {
    virtualRooms: [],
    completedRooms: [],
    missedRooms: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVirtualRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVirtualRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.virtualRooms = action.payload.virtualRooms || [];
      })
      .addCase(fetchVirtualRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchCompletedRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.completedRooms = action.payload.virtualRooms || [];
      })
      .addCase(fetchCompletedRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchMissedRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissedRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.missedRooms = action.payload.virtualRooms || [];
      })
      .addCase(fetchMissedRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default virtualRoomsSlice.reducer;
export const { clearError } = virtualRoomsSlice.actions;