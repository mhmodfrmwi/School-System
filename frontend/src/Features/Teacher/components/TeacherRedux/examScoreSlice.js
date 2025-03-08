import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:4000/api/v1";
const getToken = () => sessionStorage.getItem("token");

export const fetchExamScores = createAsyncThunk(
  "examScores/fetchExamScores",
  async ({ classId, gradeSubjectSemesterId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found, please login again.");

      const response = await fetch(
        `${API_BASE_URL}/teacher/exam-score/${classId}/${gradeSubjectSemesterId}/students`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch exam scores");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const uploadFileGrades = createAsyncThunk(
  "examScores/uploadFileGrades",
  async (
    { classId, gradeSubjectSemesterId, formData },
    { rejectWithValue },
  ) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found, please login again.");

      const response = await fetch(
        `${API_BASE_URL}/teacher/exam-score/${classId}/${gradeSubjectSemesterId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Failed to upload file");

      return { success: true, message: "File uploaded successfully" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// export const removeFile = createAsyncThunk(
//   "examScores/removeFile",
//   async ({ classId, gradeSubjectSemesterId }, { rejectWithValue }) => {
//     try {
//       const token = getToken();
//       if (!token) throw new Error("No token found, please login again.");

//       const response = await fetch(
//         `${API_BASE_URL}/teacher/exam-score/${classId}/${gradeSubjectSemesterId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       if (!response.ok) throw new Error("Failed to remove file");

//       return { success: true, message: "File removed successfully" }; // ✅ Only return success message
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

const examScoreSlice = createSlice({
  name: "examScores",
  initialState: {
    scores: [],
    uploadedFile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchExamScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamScores.fulfilled, (state, action) => {
        state.loading = false;
        state.scores = action.payload;
      })
      .addCase(fetchExamScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadFileGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFileGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFile = action.payload;
        toast.success("File uploaded successfully!");
      })
      .addCase(uploadFileGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });

    // .addCase(removeFile.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(removeFile.fulfilled, (state) => {
    //   state.loading = false;
    //   state.uploadedFile = null;
    //   toast.success("File removed successfully!");
    // })
    // .addCase(removeFile.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   toast.error(state.error);
    // });
  },
});

export const { clearMessage } = examScoreSlice.actions;
export default examScoreSlice.reducer;
