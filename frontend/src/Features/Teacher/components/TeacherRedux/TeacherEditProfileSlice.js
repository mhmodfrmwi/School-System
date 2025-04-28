// teacherProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const getToken = () => sessionStorage.getItem('token');

export const updateTeacherProfile = createAsyncThunk(
  'teacher/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/teacher/teacher-profile';
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: profileData,
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

export const fetchTeacherData = createAsyncThunk(
  'teacher/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/teacher/teacher-data';
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
        throw new Error(errorResponse.message || 'Failed to fetch teacher data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);
const teacherProfileSlice = createSlice({
  name: 'teacherProfile',
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
    .addCase(fetchTeacherData.pending, (state) => {
      state.fetchStatus = 'loading';
      state.fetchError = null;
    })
    .addCase(fetchTeacherData.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.profile = action.payload;
    })
    .addCase(fetchTeacherData.rejected, (state, action) => {
      console.error('Fetch Error:', action.payload);
      state.fetchStatus = 'failed';
      state.fetchError = action.payload;
    })
      .addCase(updateTeacherProfile.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacherProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload; 
        
      })
      .addCase(updateTeacherProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update profile');
      });
  },
});

// Export actions and reducer
export const { resetProfileState, setProfileData } = teacherProfileSlice.actions;
export default teacherProfileSlice.reducer;