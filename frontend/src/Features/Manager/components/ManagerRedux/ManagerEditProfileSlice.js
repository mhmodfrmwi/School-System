import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const getToken = () => sessionStorage.getItem('token');

export const updateManagerProfile = createAsyncThunk(
  'manager/updateProfile',
  async (formData, { rejectWithValue }) => { 
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/manager/manager-profile';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData 
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

export const fetchManagerData = createAsyncThunk(
  'manager/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/manager/manager-data';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch manager data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

const managerProfileSlice = createSlice({
  name: 'managerProfile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
    loading: false,
    fetchStatus: 'idle',
    fetchError: null,
  },
  reducers: {
    resetProfileState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.loading = false;
    },
    setProfileData: (state, action) => {
      state.profile = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagerData.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchManagerData.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchManagerData.rejected, (state, action) => {
        console.error('Fetch Error:', action.payload);
        state.fetchStatus = 'failed';
        state.fetchError = action.payload;
      })
      .addCase(updateManagerProfile.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManagerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.profile = action.payload;
        toast.success("Profile updated successfully");
      })
      .addCase(updateManagerProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update profile');
      });
  },
});

export const { resetProfileState, setProfileData } = managerProfileSlice.actions;
export default managerProfileSlice.reducer;