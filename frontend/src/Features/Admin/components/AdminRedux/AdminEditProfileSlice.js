import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const getToken = () => sessionStorage.getItem('token');

export const updateAdminProfile = createAsyncThunk(
  'admin/updateProfile',
  async (formData, { rejectWithValue }) => { 
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/admin/admin-profile';
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

export const fetchAdminData = createAsyncThunk(
  'admin/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/admin/admin-data';
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
        throw new Error(errorResponse.message || 'Failed to fetch admin data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

const adminProfileSlice = createSlice({
  name: 'adminProfile',
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
      .addCase(fetchAdminData.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        console.error('Fetch Error:', action.payload);
        state.fetchStatus = 'failed';
        state.fetchError = action.payload;
      })
      .addCase(updateAdminProfile.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.profile = action.payload.teacher;
        toast.success("Profile updated successfully");
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update profile');
      });
  },
});

// Export actions and reducer
export const { resetProfileState, setProfileData } = adminProfileSlice.actions;
export default adminProfileSlice.reducer;