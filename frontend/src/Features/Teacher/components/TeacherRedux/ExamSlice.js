import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const getToken = () => sessionStorage.getItem("token");

export const createExam = createAsyncThunk(
  'exam/create',
  async ({ formData, classId, gradeSubjectSemesterId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = `http://localhost:3000/exams/create-exam/${gradeSubjectSemesterId}?classId=${classId}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      console.log('Payload being sent:', JSON.stringify(formData, null, 2));
      console.log('Request URL:', url);
      console.log('Request headers:', headers);

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Backend error response:', errorResponse);
        throw new Error(errorResponse.message || 'Failed to create exam');
      }

      const data = await response.json();
      console.log('Exam created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in createExam:', error);
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    exams: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExam.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams.push(action.payload);
        toast("Exam Added Successfully");
        state.loading = false;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add exam";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default examSlice.reducer;
