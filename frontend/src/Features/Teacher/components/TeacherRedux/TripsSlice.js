import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    error: null,
    loading: false,
    message: "",
    trips: [], // Add this line
  };

export const postTrips = createAsyncThunk(
  "trips/postTrips",
  async (tripData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/trip",
        {
          method: "POST",
          body: JSON.stringify(tripData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrips = createAsyncThunk(
  "trips/fetchTripss",
  async (_, { rejectWithValue }) => {
    try {
        const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
       if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }
      const response = await fetch(
        "http://localhost:4000/api/v1/student/trip"
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.trips;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const TripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTrips.pending, (state) => {
        state.status = "loading";
        state.error = ""; 
      })
      .addCase(postTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trips.push(action.payload);
        toast.success("Admin added successfully!");
      })
      .addCase(postTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post trip data"; 
        toast.error(state.error);
      })
      .addCase(fetchTrips.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trips = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch trips"; 
        state.loading = false;
        if (state.error.includes("NetworkError")) {
        } else {
          toast.error(state.error); 
        }
      })
     
  }
  
});

export const { clearMessage,addAdmintoServer } = TripsSlice.actions;
export default TripsSlice.reducer;
