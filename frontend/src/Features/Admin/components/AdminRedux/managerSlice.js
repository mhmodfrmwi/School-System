import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  parents: [],
  status: "idle",
  message: "",
};

export const fetchManagers = createAsyncThunk(
  "managers/fetchManagers",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/v1/getUsers/bosses",
    );
    const data = await response.json();
    const bosses = data.bosses;
    // console.log(parents);

    return bosses;
  },
);

export const removeManager = createAsyncThunk(
  "manangers/removeManager",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/bosses/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete parent");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const managerSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {
    addmanager: (state, action) => {
      state.parents.push(action.payload);
    },
    editmanager: (state, action) => {
      const index = state.managers.findIndex(
        (manager) => manager.id === action.payload.id,
      );
      if (index !== -1) {
        state.managers[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managers = action.payload;
      })
      .addCase(fetchManagers.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(removeManager.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeManager.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managers = state.managers.filter(
          (manager) => manager.id !== action.payload,
        );
        state.message = "Parent deleted successfully";
      })
      .addCase(removeManager.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addmanager, editmanager, clearMessage } = managerSlice.actions;

export default managerSlice.reducer;
