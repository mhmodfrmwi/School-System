import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch managers
export const fetchManagers = createAsyncThunk(
  'managers/fetchManagers',
  async () => {
    const response = await axios.get('/api/managers'); // Adjust your API endpoint
    return response.data;
  }
);

// Remove manager
export const removeManager = createAsyncThunk(
  'managers/removeManager',
  async (id) => {
    const response = await axios.delete(`/api/managers/${id}`); // Adjust your API endpoint
    return id;
  }
);

const managerSlice = createSlice({
  name: 'managers',
  initialState: {
    managers: [],
    message: '',
    loading: false,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = action.payload;
      })
      .addCase(fetchManagers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeManager.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeManager.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = state.managers.filter(
          (manager) => manager.id !== action.payload
        );
        state.message = 'Manager deleted successfully';
      })
      .addCase(removeManager.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearMessage } = managerSlice.actions;

export default managerSlice.reducer;
