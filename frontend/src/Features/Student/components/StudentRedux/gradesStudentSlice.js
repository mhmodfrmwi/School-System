import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/api/v1/student";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// export const getDegreesBySubject = createAsyncThunk(
//   "degrees/getBySubject",
//   async (subjectId, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${BASE_URL}/subject-degree/${subjectId}`, {
//         method: "GET",
//         headers: getAuthHeaders(),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

export const getDegreesBySemester = createAsyncThunk(
  "degrees/getBySemester",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/semester-subject-degree`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getDegreesAllYears = createAsyncThunk(
  "degrees/getAllSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/all-subjects-degrees`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const gradesStudentSlice = createSlice({
  name: "degrees",
  initialState: {
    subjectDegrees: [],
    semesterDegrees: [],
    allDegrees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   //  Get Degrees by Subject
      //   .addCase(getDegreesBySubject.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   })
      //   .addCase(getDegreesBySubject.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.subjectDegrees = action.payload;
      //   })
      //   .addCase(getDegreesBySubject.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload;
      //   })

      //  Get Degrees by Semester
      .addCase(getDegreesBySemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDegreesBySemester.fulfilled, (state, action) => {
        state.loading = false;
        state.semesterDegrees = action.payload;
      })
      .addCase(getDegreesBySemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Degrees for All Subjects
      .addCase(getDegreesAllYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDegreesAllYears.fulfilled, (state, action) => {
        state.loading = false;
        state.allDegrees = action.payload;
      })
      .addCase(getDegreesAllYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gradesStudentSlice.reducer;
