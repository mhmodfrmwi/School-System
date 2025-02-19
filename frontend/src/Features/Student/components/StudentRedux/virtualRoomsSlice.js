import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => sessionStorage.getItem("token");

export const fetchVirtualRooms = createAsyncThunk(
  "virtualRooms/fetchVirtualRooms",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await axios.get(
        `http://localhost:4000/api/v1/student/virtual-rooms/${subjectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchCompletedRooms = createAsyncThunk(
  "virtualRooms/fetchCompletedRooms",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await axios.get(
        `http://localhost:4000/api/v1/student/virtual-rooms/${subjectId}/completed`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch completed rooms");
    }
  }
);

export const fetchMissedRooms = createAsyncThunk(
  "virtualRooms/fetchMissedRooms",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await axios.get(
        `http://localhost:4000/api/v1/student/virtual-rooms/${subjectId}/missed`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch missed rooms");
    }
  }
);

export const markRoomAsViewed = createAsyncThunk(
  "virtualRooms/markRoomAsViewed",
  async (roomId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      await axios.post(
        `http://localhost:4000/api/v1/student/virtual-rooms/${roomId}/click`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return roomId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark as viewed");
    }
  }
);

const virtualRoomsSlice = createSlice({
  name: "virtualRooms",
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
        state.virtualRooms = action.payload.virtualRooms;
      })
      .addCase(fetchVirtualRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompletedRooms.fulfilled, (state, action) => {
        state.completedRooms = action.payload;
      })
      .addCase(fetchMissedRooms.fulfilled, (state, action) => {
        state.missedRooms = action.payload;
      })
      .addCase(markRoomAsViewed.fulfilled, (state, action) => {
        state.virtualRooms = state.virtualRooms.map((room) =>
          room._id === action.payload ? { ...room, isViewed: true } : room
        );
      });
  },
});

export default virtualRoomsSlice.reducer;
export const { clearError } = virtualRoomsSlice.actions;