import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getToken = () => sessionStorage.getItem("token");

const initialState = {
  status: "idle",
  error: null,
  teacherLibrary: [],
  loading: false,
  message: "",
};

export const postTeacherLibrary = createAsyncThunk(
  "teacherLibrary/postTeacherLibrary",
  async (teacherLibraryData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/library-material/",
        {
          method: "POST",
          body: JSON.stringify(teacherLibraryData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSubjectsInLibrary = createAsyncThunk(
  "teacherLibrary/fetchSubjectsInLibrary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/general/get-subjects-in-library",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMaterialsInLibrary = createAsyncThunk(
  "teacherLibrary/fetchMaterialsInLibrary",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/general/get-material-for-subject-in-library/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.materials;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteMaterialInLibrary = createAsyncThunk(
  "teacherLibrary/deleteMaterialInLibrary",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/library-material/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const teacherLibrarySlice = createSlice({
  name: "teacherLibrary",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTeacherLibrary.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(postTeacherLibrary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherLibrary.push(action.payload);
      })
      .addCase(postTeacherLibrary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post teacherLibrary data";
      })
      .addCase(fetchSubjectsInLibrary.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchSubjectsInLibrary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherLibrary = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubjectsInLibrary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teacherLibrary";
        state.loading = false;
        if (
          !state.error.includes("NetworkError") &&
          !state.error.includes("Token is required!")
        ) {
          toast.error(state.error);
        }
      })

      .addCase(fetchMaterialsInLibrary.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchMaterialsInLibrary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherLibrary = action.payload;
        state.loading = false;
      })
      .addCase(fetchMaterialsInLibrary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teacherLibrary";
        state.loading = false;
        if (
          !state.error.includes("NetworkError") &&
          !state.error.includes("Token is required!")
        ) {
          toast.error(state.error);
        }
      })

      .addCase(deleteMaterialInLibrary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMaterialInLibrary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherLibrary = state.teacherLibrary.filter(
          (admin) => admin._id !== action.payload,
        );
      })
      .addCase(deleteMaterialInLibrary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete libraryMaterials";
      });
  },
});

export const { clearMessage } = teacherLibrarySlice.actions;
export default teacherLibrarySlice.reducer;
