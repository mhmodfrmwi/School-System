import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// البيانات الأولية للمعلم
const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  classes: [],
  subject: "",
  status: "idle",
  error: null,
};

// إرسال بيانات المعلم
export const postTeacher = createAsyncThunk(
  'addteacher/postTeacher',
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register", 
        {
          method: 'POST',
          body: JSON.stringify(teacherData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post teacher data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to post teacher data');
    }
  }
);

const addTeacherSlice = createSlice({
  name: 'addteacher',
  initialState,
  reducers: {
    addTeachertoServer: {
      prepare(fullName, email, password, phoneNumber, gender,classes,subject) {
        return {
          payload: {
            fullName,
            email,
            password,
            phoneNumber,
            gender,
            classes,
            subject,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.gender = action.payload.gender;
        state.classes = action.payload.classes;
        state.subject = action.payload.subject;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTeacher.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(postTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addTeachertoServer } = addTeacherSlice.actions;

export default addTeacherSlice.reducer;
