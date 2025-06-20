import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubjects = createAsyncThunk(
  "allSubjectsParent/fetchSubjects",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const studentId = state.motivationparent.selectedKid?._id;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("Authentication required");
    if (!studentId) return rejectWithValue("Kid ID is required");

    try {
      const response = await fetch(`http://localhost:4000/api/v1/parent/get-subjects/${studentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch subjects");
      }

      const data = await response.json();
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const allSubjectsStudentSlice = createSlice({
  name: "allSubjectsParent",
  initialState: {
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = allSubjectsStudentSlice.actions;
export default allSubjectsStudentSlice.reducer;