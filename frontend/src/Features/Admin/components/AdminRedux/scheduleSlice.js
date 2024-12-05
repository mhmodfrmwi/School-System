import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  scheduals: [],
  status: "idle",
  error: null,
  message: "",
  loading: false,
};

// Post a new schedule
export const postSchedual = createAsyncThunk(
  "scheduals/postSchedual",
  async (schedualData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/addSchedual",
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
        return toast.error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post schedule data");
    }
  }
);

// Fetch all schedules
export const fetchScheduals = createAsyncThunk(
  "scheduals/fetchScheduals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/scheduals");

      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }

      const data = await response.json();
      return data.scheduals;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit an existing schedule
export const editSchedualAsync = createAsyncThunk(
  "scheduals/editSchedualAsync",
  async ({ id, updatedSchedual }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/scheduals/${id}`,
        {
          method: "PUT",
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
      return data.schedual;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove a schedule
export const removeSchedual = createAsyncThunk(
  "scheduals/removeSchedual",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/scheduals/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      dispatch(fetchScheduals());

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: "scheduals",
  initialState,
  reducers: {
    addSchedual: (state, action) => {
      state.scheduals.push(action.payload);
    },
    editSchedual: (state, action) => {
      const index = state.scheduals.findIndex(
        (schedual) => schedual._id === action.payload._id
      );
      if (index !== -1) {
        state.scheduals[index] = action.payload;
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
        state.scheduals.push(newSchedual);
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
        state.scheduals.push(action.payload);
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
        state.scheduals = action.payload;
      })
      .addCase(fetchScheduals.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeSchedual.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeSchedual.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduals = state.scheduals.filter(
          (schedual) => schedual._id !== action.payload
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
        const index = state.scheduals.findIndex(
          (schedual) => schedual._id === updatedSchedual._id
        );
        if (index !== -1) {
          state.scheduals[index] = updatedSchedual;
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
