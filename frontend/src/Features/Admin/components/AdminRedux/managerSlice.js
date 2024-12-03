import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Fetch bosses
export const fetchBosses = createAsyncThunk(
  'bosses/fetchBosses',
  async () => {
    const response = await fetch("http://localhost:4000/api/v1/getUsers/bosses");
    const data = await response.json();
    return data.bosses;
  }
);

// Remove Bosses
export const removeBosse = createAsyncThunk(
  'bosses/removeBosse',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/getUsers/bosses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete Bosses");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bossesSlice = createSlice({
  name: 'bosses',
  initialState: {
    bosses: [],
    status: 'idle',
    message: '',
    loading: false,
  },
  reducers: {
    addBosse: (state, action) => {
      state.bosses.push(action.payload);
    },
    editBosse: (state, action) => {
      const index = state.bosses.findIndex(
        (bosses) => bosses.id === action.payload.id
      );
      if (index !== -1) {
        state.bosses[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBosses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBosses.fulfilled, (state, action) => {
        state.loading = false;
        state.bosses = action.payload;
      })
      .addCase(fetchBosses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeBosse.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBosse.fulfilled, (state, action) => {
        state.loading = false;
        state.bosses = state.bosses.filter(
          (bosse) => bosse.id !== action.payload
        );
        state.message = 'Bosses deleted successfully';
      })
      .addCase(removeBosse.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearMessage ,addBosse, editBosse} = bossesSlice.actions;

export default bossesSlice.reducer;
