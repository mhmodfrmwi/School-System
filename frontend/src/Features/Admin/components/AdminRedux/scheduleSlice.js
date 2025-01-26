import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  schedules: [],
  status: "idle",
  error: null,
  message: "",
  loading: false,
};

// Post a new schedule
export const postSchedual = createAsyncThunk(
  "schedules/postSchedual",
  async (schedualData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/schedule/createSchedule",
        {
          method: "POST",
          body: JSON.stringify(schedualData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);  // Toast error message
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      toast.success("Schedule added successfully");
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to post schedule data"); 
      return rejectWithValue(error.message || "Failed to post schedule data");
    }
  }
);

// Fetch all schedules
export const fetchScheduals = createAsyncThunk(
  "schedules/fetchScheduals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/schedule");

      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }

      const data = await response.json();
      return data.schedules;
    } catch (error) {
      toast.error(error.message || "Failed to fetch schedules"); 
      return rejectWithValue(error.message);
    }
  }
);

// Edit an existing schedule
export const editSchedualAsync = createAsyncThunk(
  "schedules/editSchedualAsync",
  async ({ id, updatedSchedual }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/schedule/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedSchedual),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit schedule");
      }

      const data = await response.json();
      toast.success("Schedule updated successfully"); 
      return data.schedule;
    } catch (error) {
      toast.error(error.message || "Failed to edit schedule");
      return rejectWithValue(error.message);
    }
  }
);

// Remove a schedule
export const removeSchedual = createAsyncThunk(
  "schedules/removeSchedual",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/schedule/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to delete schedule");
        return toast.error(error.message);
      }

      dispatch(fetchScheduals());
      toast.success("Schedule deleted successfully");  
      return id;
    } catch (error) {
      toast.error(error.message || "Failed to delete schedule");
      return rejectWithValue(error.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedual: (state, action) => {
      state.schedules.push(action.payload);
    },
    editSchedual: (state, action) => {
      const index = state.schedules.findIndex(
        (schedule) => schedule._id === action.payload._id
      );
      if (index !== -1) {
        state.schedules[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addSchedualToServer: {
      prepare(subjectName, teacher, day, startTime, endTime, className, grade) {
        return {
          payload: {
            subjectName,
            teacher,
            day,
            startTime,
            endTime,
            className,
            grade,
          },
        };
      },
      reducer(state, action) {
        const newSchedual = action.payload;
        state.schedules.push(newSchedual);
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSchedual.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postSchedual.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules.push(action.payload);
      })
      .addCase(postSchedual.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchScheduals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchScheduals.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchScheduals.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeSchedual.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeSchedual.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(
          (schedule) => schedule._id !== action.payload
        );
        state.message = "Schedule deleted successfully";
      })
      .addCase(removeSchedual.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editSchedualAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSchedualAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSchedual = action.payload;
        const index = state.schedules.findIndex(
          (schedule) => schedule._id === updatedSchedual._id
        );
        if (index !== -1) {
          state.schedules[index] = updatedSchedual;
        }
        state.message = "Schedule updated successfully";
      })
      .addCase(editSchedualAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, addSchedual, editSchedual, addSchedualToServer } = scheduleSlice.actions;

export default scheduleSlice.reducer;
