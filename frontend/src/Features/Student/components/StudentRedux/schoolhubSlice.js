import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  schoolHubs: [],
  selectedSchoolHub: null, // لتخزين بيانات الـ School Hub عند جلبه بالـ ID
};


export const createStudentSchoolHub = createAsyncThunk(
  "studentSchoolHub/createStudentSchoolHub",
  async ({ schoolHubId, schoolHubData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/school-hub/${schoolHubId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(schoolHubData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getStudentSchoolHubs = createAsyncThunk(
  "studentSchoolHub/getStudentSchoolHubs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/student/school-hub", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getStudentSchoolHubById = createAsyncThunk(
  "studentSchoolHub/getStudentSchoolHubById",
  async (schoolHubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/school-hub/${schoolHubId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteStudentSchoolHub = createAsyncThunk(
  "studentSchoolHub/deleteStudentSchoolHub",
  async (schoolHubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/school-hub/${schoolHubId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return schoolHubId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSchoolHubSlice = createSlice({
  name: "studentSchoolHub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudentSchoolHub.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createStudentSchoolHub.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(createStudentSchoolHub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create school hub";
        state.loading = false;
      })
      .addCase(getStudentSchoolHubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentSchoolHubs.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolHubs = action.payload.schoolHubs || [];
      })
      .addCase(getStudentSchoolHubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch school hubs";
      })
      .addCase(getStudentSchoolHubById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentSchoolHubById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSchoolHub = action.payload; // تخزين بيانات الـ school hub المحدد
      })
      .addCase(getStudentSchoolHubById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch school hub details";
      })
      .addCase(deleteStudentSchoolHub.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudentSchoolHub.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolHubs = state.schoolHubs.filter(hub => hub._id !== action.payload.schoolHubId);
      })
      .addCase(deleteStudentSchoolHub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete school hub";
      });
  }
});

export default studentSchoolHubSlice.reducer;
