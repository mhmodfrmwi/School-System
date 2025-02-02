import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  subjects: [],
  status: "idle",
  error: null,
  loading: false,
};

// Fetch all subjects
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/subject");

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch subjects");
    }
  }
);

// Add a new subject
export const postSubject = createAsyncThunk(
  "subjects/postSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/subject/createSubject", {
        method: "POST",
        body: JSON.stringify(subjectData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.subject;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add subject");
    }
  }
);

// Edit an existing subject
export const editSubject = createAsyncThunk(
  "subjects/editSubject",
  async ({ id, updatedSubject }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/subject/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedSubject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.subject;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to edit subject");
    }
  }
);

// Delete a subject
export const removeSubject = createAsyncThunk(
  "subjects/removeSubject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/subject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchSubjects());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove subject");
    }
  }
);

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    editSubject: (state, action) => {
      const index = state.subjects.findIndex(
        (subject) => subject.id === action.payload.id
      );
      if (index !== -1) {
        state.subjects[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch subjects";
        state.loading = false;
        if(state.error.includes("NetworkError")){

        }else{
        toast.error(state.error);} // هنا فقط
      })
      .addCase(postSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects.push(action.payload);
        state.loading = false;
      })
      .addCase(postSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add subject";
        state.loading = false;
        toast.error(state.error); // هنا فقط
      })
      .addCase(editSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(editSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.subjects.findIndex(
          (subject) => subject._id === action.payload._id
        );
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit subject";
        state.loading = false;
        toast.error(state.error); // هنا فقط
      })
      .addCase(removeSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = state.subjects.filter(
          (subject) => subject._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(removeSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove subject";
        state.loading = false;
        toast.error(state.error); // هنا فقط
      });
  },
});

export default subjectSlice.reducer;
