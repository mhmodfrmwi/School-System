import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  loading: false,
  teammates: [], // إضافة حالة للزملاء
};

// إنشاء الفريق
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async ({ contestId, teamData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/get-contests/${contestId}/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(teamData),
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

// جلب الزملاء في الفريق بناءً على contestId
export const getTeammatesByContestId = createAsyncThunk(
  "teams/getTeammatesByContestId",
  async (contestId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/get-contests/${contestId}/team`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

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

// حذف الفريق
// حذف الفريق
export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      // استخدام teamId بشكل صحيح
      const response = await fetch(`http://localhost:4000/api/v1/student/get-contests/${teamId}/team`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return teamId; // إرجاع معرف الفريق المحذوف
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// تحديث الفريق
export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/api/v1/student/get-contests/${teamId}/team`, {
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

      return await response.json(); // إرجاع البيانات المحدثة
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // إنشاء الفريق
      .addCase(createTeam.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create team";
        state.loading = false;
      })
      

      // جلب الزملاء في الفريق بناءً على contestId
      .addCase(getTeammatesByContestId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeammatesByContestId.fulfilled, (state, action) => {
        state.loading = false;
        state.teammates = action.payload.data || [];
      })
      .addCase(getTeammatesByContestId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch teammates by contestId";
      })

       // حذف الفريق
       .addCase(deleteTeam.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.teammates = state.teammates.filter(team => team._id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete team";
        state.loading = false;
      })

      // تحديث الفريق
      .addCase(updateTeam.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        const updatedTeam = action.payload;
        const index = state.teammates.findIndex(team => team._id === updatedTeam._id);
        if (index !== -1) {
          state.teammates[index] = updatedTeam; // تحديث بيانات الفريق في القائمة
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update team";
        state.loading = false;
      });
  }
});

export default teamSlice.reducer;
