// teacherProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const getToken = () => sessionStorage.getItem('token');

// Async thunk for updating teacher profile
export const updateManagerProfile = createAsyncThunk(
  'manager/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/manager/manager-profile';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to update profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

// Slice definition
const managerProfileSlice = createSlice({
  name: 'managerProfile',
  initialState: {
    profile: null,
    status: 'idle', 
    error: null,
    loading: false,
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
      .addCase(updateManagerProfile.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManagerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.profile = action.payload.teacher;
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

// Export actions and reducer
export const { resetProfileState, setProfileData } = managerProfileSlice.actions;
export default managerProfileSlice.reducer;