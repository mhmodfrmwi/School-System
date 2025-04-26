import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const getToken = () => sessionStorage.getItem('token');

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


      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create exam');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

// export const fetchExamsForTeacher = createAsyncThunk(
//   'exam/fetchExamsForTeacher',
//   async (gradeSubjectSemesterId, { rejectWithValue }) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         return rejectWithValue("Authentication required. Please log in.");
//       }

//       if (!gradeSubjectSemesterId) {
//         return rejectWithValue("Invalid ID: gradeSubjectSemesterId is missing.");
//       }

//       // Construct the URL with the query parameter
//       const url = `http://localhost:3000/exams/teacher-exams?grade_subject_semester_id=${gradeSubjectSemesterId}`;

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.message);
//       }

//       const data = await response.json();
//       console.log("Fetched exams:", data);
//       return data.exams; // Ensure the backend returns `exams` in the response
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to fetch exams");
//     }
//   }
// );
export const fetchExamsForTeacher = createAsyncThunk(
  'exam/fetchExamsForTeacher',
  async (gradeSubjectSemesterId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      if (!gradeSubjectSemesterId) {
        return rejectWithValue("Invalid ID: gradeSubjectSemesterId is missing.");
      }

      const response = await fetch(
        `http://localhost:3000/exams/teacher-exams?gradeSubjectSemesterId=${gradeSubjectSemesterId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      console.log("Fetched exams:", data);
      return data.exams ||data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch exams");
    }
  }
);

export const deleteExam = createAsyncThunk(
  'exam/deleteExam',
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = `http://localhost:3000/exams/${examId}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to delete exam');
      }

      return examId;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

export const fetchExamResults = createAsyncThunk(
  'exam/fetchExamResults',
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = `http://localhost:3000/exams/${examId}/results`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch exam results');
      }

      const data = await response.json();
      return { examId, results: data };
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

export const updateExam = createAsyncThunk(
  'exam/updateExam',
  async ({ examId, examData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('Authentication required. Please log in.');
      }

      const url = `http://localhost:3000/exams/${examId}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to update exam');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server Error');
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    exams: [],
    examResults: {},
    status: 'idle',
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExam.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams.push(action.payload);
        state.loading = false;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add exam';
        state.loading = false;
      })
      .addCase(fetchExamsForTeacher.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchExamsForTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams = action.payload;
        state.loading = false;
      })
      .addCase(fetchExamsForTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch exams';
        state.loading = false;
      })
      .addCase(deleteExam.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams = state.exams.filter(exam => exam._id !== action.payload);
        toast.success("Exam deleted successfully");
        state.loading = false;
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete exam';
        state.loading = false;
      })
      .addCase(updateExam.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedExams = state.exams.map(exam =>
          exam._id === action.payload._id ? action.payload : exam
        );
        state.exams = updatedExams;
        toast.success("Exam updated successfully");
        state.loading = false;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update exam';
        state.loading = false;
      })
      // Existing cases...
      .addCase(fetchExamResults.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchExamResults.fulfilled, (state, action) => {
        console.log("Fetched Results:", action.payload); 
        state.examResults[action.payload.examId] = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchExamResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch exam results';
        state.loading = false;
      });
  },
});

export default examSlice.reducer;