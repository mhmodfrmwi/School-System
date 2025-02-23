import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  schoolHubs: [],
};

export const createSchoolHub = createAsyncThunk(
  "schoolHub/createSchoolHub",
  async (schoolHubData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/schoolhub", {
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

export const getSchoolHubs = createAsyncThunk(
  "schoolHub/getSchoolHubs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/schoolhub", {
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

export const updateSchoolHub = createAsyncThunk(
  "schoolHub/updateSchoolHub",
  async ({ schoolHubId, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/manager/school-hub/${schoolHubId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
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

export const deleteSchoolHub = createAsyncThunk(
  "schoolHub/deleteSchoolHub",
  async (schoolHubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/manager/school-hub/${schoolHubId}`, {
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

const schoolHubSlice = createSlice({
  name: "schoolHub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSchoolHub.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createSchoolHub.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(createSchoolHub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create school hub";
        state.loading = false;
      })
      .addCase(getSchoolHubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolHubs.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolHubs = action.payload.schoolHubs || [];
      })
      .addCase(getSchoolHubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch school hubs";
      })
   
      .addCase(updateSchoolHub.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateSchoolHub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        const updatedHub = action.payload;
        const index = state.schoolHubs.findIndex(hub => hub._id === updatedHub._id);
        if (index !== -1) {
          state.schoolHubs[index] = updatedHub;
        }
      })
      .addCase(updateSchoolHub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update school hub";
        state.loading = false;
      })
      .addCase(deleteSchoolHub.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteSchoolHub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.schoolHubs = state.schoolHubs.filter(hub => hub._id !== action.payload);
      })
      .addCase(deleteSchoolHub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete school hub";
        state.loading = false;
      });
  }
});

export default schoolHubSlice.reducer;