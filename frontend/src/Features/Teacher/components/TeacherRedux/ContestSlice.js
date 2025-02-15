import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    error: null,
    loading: false,
    message: "",
    contests: [],
};

// إضافة مسابقة جديدة
export const postContest = createAsyncThunk(
  "contests/postContest",
  async (contestData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return rejectWithValue("Authentication required. Please log in.");

      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/contest",
        {
          method: "POST",
          body: JSON.stringify(contestData),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
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
  }
);


// جلب جميع المسابقات
export const fetchContests = createAsyncThunk(
  "contests/fetchContests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }
      const response = await fetch("http://localhost:4000/api/v1/teacher/contest", {
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

// تحديث مسابقة
export const updateContest = createAsyncThunk(
  "contests/updateContest",
  async ({ contestId, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return rejectWithValue("Authentication required. Please log in.");

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/contest/${contestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update contest");
    }
  }
);

// حذف مسابقة
export const deleteContest = createAsyncThunk(
  "contests/deleteContest",
  async (contestId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return rejectWithValue("Authentication required. Please log in.");

      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/contest/${contestId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return contestId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete contest");
    }
  }
);

const contestSlice = createSlice({
  name: "contests",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postContest.pending, (state) => {
        state.status = "loading";
        state.error = ""; 
      })
      .addCase(postContest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contests.push(action.payload);
        toast.success("Contest added successfully!");
      })
      .addCase(postContest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post contest data"; 
        toast.error(state.error);
      })
      .addCase(fetchContests.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contests = action.payload;
        state.loading = false;
      })
      .addCase(fetchContests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch contests"; 
        state.loading = false;
        if (!state.error.includes("NetworkError")) {
          toast.error(state.error); 
        }
      })
      .addCase(updateContest.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.contests.findIndex(contest => contest.id === action.payload.id);
        if (index !== -1) {
          state.contests[index] = action.payload;
        }
        toast.success("Contest updated successfully!");
      })
      .addCase(updateContest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update contest";
        toast.error(state.error);
      })
      .addCase(deleteContest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contests = state.contests.filter(contest => contest.id !== action.payload);
        toast.success("Contest deleted successfully!");
      })
      .addCase(deleteContest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete contest";
        toast.error(state.error);
      });
  }
});

export const { clearMessage } = contestSlice.actions;
export default contestSlice.reducer;
