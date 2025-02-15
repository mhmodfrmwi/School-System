import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    error: null,
    loading: false,
    contests: [],
};

// جلب جميع المسابقات للطلاب فقط
export const fetchStudentContests = createAsyncThunk(
  "studentContests/fetchStudentContests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }
      
      const response = await fetch("http://localhost:4000/api/v1/student/get-contests", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.contests;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentContestSlice = createSlice({
  name: "studentContests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentContests.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchStudentContests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contests = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentContests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch contests";
        state.loading = false;
      });
  }
});

export default studentContestSlice.reducer;
