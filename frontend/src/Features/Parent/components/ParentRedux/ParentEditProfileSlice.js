import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { updateUserData } from '../../../Auth/AuthRedux/loginSlice'; // استيراد الـ action

const getToken = () => sessionStorage.getItem('token');

export const updateParentProfile = createAsyncThunk(
  'parent/updateProfile',
  async (formData, { rejectWithValue, dispatch }) => { 
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/parent/parent-profile';
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

      const data = await response.json();

      // تحديث sessionStorage بالبيانات الجديدة
      if (data.parent?.fullName) {
        sessionStorage.setItem('fullName', data.parent.fullName);
      }
      if (data.parent?.profileImage) {
        sessionStorage.setItem('profileImage', data.parent.profileImage);
      }
      if (data.parent?._id) {
        sessionStorage.setItem('_id', data.parent._id);
      }

      // عمل dispatch لتحديث الـ state بتاع loginSlice
      dispatch(updateUserData({
        fullName: data.parent?.fullName,
        profileImage: data.parent?.profileImage,
        _id: data.parent?._id,
      }));

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

export const fetchParentData = createAsyncThunk(
  'parent/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = 'http://localhost:4000/api/v1/parent/parent-data';
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
        throw new Error(errorResponse.message || 'Failed to fetch parent data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

const parentProfileSlice = createSlice({
  name: 'parentProfile',
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
      .addCase(fetchParentData.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchParentData.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchParentData.rejected, (state, action) => {
        console.error('Fetch Error:', action.payload);
        state.fetchStatus = 'failed';
        state.fetchError = action.payload;
      })
      .addCase(updateParentProfile.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParentProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.profile = action.payload;
        toast.success("Profile updated successfully");
      })
      .addCase(updateParentProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update profile');
      });
  },
});

export const { resetProfileState, setProfileData } = parentProfileSlice.actions;
export default parentProfileSlice.reducer;