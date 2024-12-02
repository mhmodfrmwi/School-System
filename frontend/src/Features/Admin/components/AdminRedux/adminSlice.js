import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch admins
export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async () => {
    const response = await axios.get('/api/admins'); 
    return response.data;
  }
);

// Remove admin
export const removeAdmin = createAsyncThunk(
  'admins/removeAdmin',
  async (id) => {
    const response = await axios.delete(`/api/admins/${id}`); 
    return id;
  }
);

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: [],
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
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload
        );
        state.message = 'Admin deleted successfully';
      })
      .addCase(removeAdmin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearMessage } = adminSlice.actions;

export default adminSlice.reducer;
