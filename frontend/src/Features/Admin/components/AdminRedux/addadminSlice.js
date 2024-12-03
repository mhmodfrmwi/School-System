import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// البيانات الأولية للمسؤول
const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  status: "idle",
  error: null,
};

// إرسال بيانات المسؤول
export const postAdmin = createAsyncThunk(
  'addadmin/postAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register", // تعديل المسار حسب API الخاص بك
        {
          method: 'POST',
          body: JSON.stringify(adminData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post admin data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to post admin data');
    }
  }
);

const addAdminSlice = createSlice({
  name: 'addadmin',
  initialState,
  reducers: {
    addAdmintoServer: {
      prepare(fullName, email, password, phoneNumber, gender) {
        return {
          payload: {
            fullName,
            email,
            password,
            phoneNumber,
            gender,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.gender = action.payload.gender;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(postAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addAdmintoServer } = addAdminSlice.actions;

export default addAdminSlice.reducer;
