import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  schedules: [],
  status: "idle",
  message: "",
};

// Fetch all schedules
export const fetchSchedules = createAsyncThunk(
  "schedules/fetchSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/schedules");
      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }
      const data = await response.json();
      console.log(data);
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new schedule
export const addScheduleAsync = createAsyncThunk(
  "schedules/addSchedule",
  async (newSchedule, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchedule),
      });

      if (!response.ok) {
        throw new Error("Failed to add schedule");
      }

      const data = await response.json();
      return data; // Assuming it returns the created schedule
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit a schedule
export const editScheduleAsync = createAsyncThunk(
  "schedules/editSchedule",
  async ({ id, updatedSchedule }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/schedules/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSchedule),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit schedule: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Return the updated schedule
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove a schedule
export const removeSchedule = createAsyncThunk(
  "schedules/removeSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/schedules/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }

      return id; // Return the id of the deleted schedule
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Schedules
      .addCase(fetchSchedules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Add Schedule
      .addCase(addScheduleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addScheduleAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules.push(action.payload);
        state.message = "Schedule added successfully";
      })
      .addCase(addScheduleAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Edit Schedule
      .addCase(editScheduleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editScheduleAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.schedules.findIndex((schedule) => schedule.id === action.payload.id);
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
        state.message = "Schedule updated successfully";
      })
      .addCase(editScheduleAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Delete Schedule
      .addCase(removeSchedule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules = state.schedules.filter((schedule) => schedule.id !== action.payload);
        state.message = "Schedule deleted successfully";
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = scheduleSlice.actions;

export default scheduleSlice.reducer;
