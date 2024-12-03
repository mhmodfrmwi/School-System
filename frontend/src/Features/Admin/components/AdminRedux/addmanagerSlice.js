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
export const postBosse = createAsyncThunk(
  'addbosse/postBosse',
  async (bossesData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register", // تعديل المسار حسب API الخاص بك
        {
          method: 'POST',
          body: JSON.stringify(bossesData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );


      if (!response.ok) {
        throw new Error('Failed to post bosse data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to post bosse data');
    }
  }
);

const addBosseSlice = createSlice({
  name: 'addbosse',
  initialState,
  reducers: {
    addBossetoServer: {
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
      .addCase(postBosse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postBosse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(postBosse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addBossetoServer } = addBosseSlice.actions;

export default addBosseSlice.reducer;
