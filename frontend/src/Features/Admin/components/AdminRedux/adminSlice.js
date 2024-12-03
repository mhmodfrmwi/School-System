import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch admins
export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async () => {
    const response = await fetch("http://localhost:4000/api/v1/getUsers/admins");
    const data = await response.json();
    return data.admins;
  }
);

// Remove admin
export const removeAdmin = createAsyncThunk(
  'admins/removeAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/getUsers/admins/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: [],
    status: 'idle',
    message: '',
  },
  reducers: {
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
    editAdmin: (state, action) => {
      const index = state.admins.findIndex(
        (admin) => admin.id === action.payload.id
      );
      if (index !== -1) {
        state.admins[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
      })

      .addCase(removeAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload
        );
        state.message = 'Admin deleted successfully';
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
      });
  },
});

export const { addAdmin, editAdmin, clearMessage } = adminSlice.actions;

export default adminSlice.reducer;
