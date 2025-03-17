import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getToken = () => sessionStorage.getItem("token");

export const fetchVirtualRooms = createAsyncThunk(
    "virtualRooms/fetchVirtualRooms",
    async (_, { rejectWithValue }) => { 
      try {
        const token = getToken();
        if (!token) return rejectWithValue("No token found");
  
        const response = await fetch(
          `http://localhost:4000/api/v1/teacher/virtual-rooms`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch virtual rooms");
        }
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchCompletedRooms = createAsyncThunk(
    "virtualRooms/fetchCompletedRooms",
    async (_, { rejectWithValue }) => { 
      try {
        const token = getToken();
        if (!token) return rejectWithValue("No token found");
  
        const response = await fetch(
          `http://localhost:4000/api/v1/teacher/virtual-rooms/completed`, 
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch completed rooms");
        }
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchMissedRooms = createAsyncThunk(
    "virtualRooms/fetchMissedRooms",
    async (_, { rejectWithValue }) => { 
      try {
        const token = getToken();
        if (!token) return rejectWithValue("No token found");
  
        const response = await fetch(
          `http://localhost:4000/api/v1/teacher/virtual-rooms/missed`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch missed rooms");
        }
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const markRoomAsViewed = createAsyncThunk(
  "virtualRooms/markRoomAsViewed",
  async (roomId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/virtual-rooms/${roomId}/click`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to mark room as viewed");
      }

      return roomId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const virtualRoomsSlice = createSlice({
  name: "virtualRoomsmanger",
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
        state.virtualRooms = action.payload.virtualRooms?.length > 0 ? action.payload.virtualRooms : [];
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
        state.completedRooms = action.payload.virtualRooms?.length > 0 ? action.payload.virtualRooms : [];
        state.loading = false;
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
        state.missedRooms = action.payload.virtualRooms?.length > 0 ? action.payload.virtualRooms : [];
        state.loading = false;
      })
      .addCase(fetchMissedRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markRoomAsViewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markRoomAsViewed.fulfilled, (state, action) => {
        state.virtualRooms = state.virtualRooms.map((room) =>
          room._id === action.payload ? { ...room, isViewed: true } : room
        );
        state.loading = false;
      })
      .addCase(markRoomAsViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default virtualRoomsSlice.reducer;
export const { clearError } = virtualRoomsSlice.actions;
