import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  assignedSubjects: [],
  semesters: [],
  status: "idle",
  error: null,
  loading: false,
};

const getAuthToken = () => {
  return localStorage.getItem("token") || "";
};

export const fetchAssignedSubjects = createAsyncThunk(
  "assignSubject/fetchAssignedSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/gradeSubjectSemester",
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.gradeSubjectSemesters || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch assigned subjects",
      );
    }
  },
);

export const assignSubject = createAsyncThunk(
  "assignSubject/assignSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/gradeSubjectSemester/createGradeSubjectSemester",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(subjectData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to assign subject");
      }

      toast.success(data.message || "Subject assigned successfully");
      return data.gradeSubjectSemester;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to assign subject");
    }
  },
);

export const fetchSemesters = createAsyncThunk(
  "assignSubject/fetchSemesters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/semester",
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.semesters || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch semesters");
    }
  },
);

export const deleteAssignedSubject = createAsyncThunk(
  "assignSubject/deleteAssignedSubject",
  async (gradeSubjectSemesterId, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/gradeSubjectSemester/${gradeSubjectSemesterId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      toast.success(
        data.message || "GradeSubjectSemester deleted successfully",
      );
      return gradeSubjectSemesterId;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to delete GradeSubjectSemester",
      );
    }
  },
);

export const updateAssignedSubject = createAsyncThunk(
  "assignSubject/updateAssignedSubject",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/gradeSubjectSemester/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update subject");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update subject");
    }
  },
);

const assignSubjectSlice = createSlice({
  name: "assignSubject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedSubjects.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAssignedSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedSubjects = action.payload
          .filter(
            (subject) =>
              subject.grade_subject_id &&
              subject.grade_subject_id.subjectId !== null,
          )
          .map((subject) => ({
            _id: subject._id,
            subjectId: subject.grade_subject_id?.subjectId?._id,
            subject:
              subject.grade_subject_id?.subjectId?.subjectName || "Unknown",
            grade: subject.grade_subject_id?.gradeId,
            term: subject.semester_id?.semesterName || "Unknown",
          }));
        state.loading = false;
      })
      .addCase(fetchAssignedSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch assigned subjects";
        state.loading = false;
        if (
          state.error.includes("NetworkError") ||
          state.error.includes("Token is required!")
        ) {
        } else {
          toast.error(state.error);
        }
      })
      .addCase(fetchSemesters.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.semesters = action.payload;
        state.loading = false;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch semesters";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(assignSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(assignSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedSubjects.push(action.payload);
        state.loading = false;
      })
      .addCase(assignSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to assign subject";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(deleteAssignedSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteAssignedSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedSubjects = state.assignedSubjects.filter(
          (subject) => subject._id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(deleteAssignedSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete subject";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(updateAssignedSubject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateAssignedSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedSubjectIndex = state.assignedSubjects.findIndex(
          (subject) => subject._id === action.payload._id,
        );
        if (updatedSubjectIndex !== -1) {
          state.assignedSubjects[updatedSubjectIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateAssignedSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update subject";
        state.loading = false;
        toast.error(state.error);
      });
  },
});

export default assignSubjectSlice.reducer;
