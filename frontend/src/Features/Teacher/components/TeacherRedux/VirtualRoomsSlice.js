import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  teacherVirtualRooms: [],
  status: "idle",
  error: null,
  loading: false,
  message: null,
};

// 🟢 إنشاء جلسة افتراضية للمعلم (POST)
export const createTeacherVirtualRoom = createAsyncThunk(
  "teacherVirtualRooms/createTeacherVirtualRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/virtualRoom",
        {
          method: "POST",
          body: JSON.stringify(roomData),
          headers: {
            "Content-Type": "application/json",
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

// 🔵 جلب جميع الجلسات الافتراضية للمعلم (GET)
export const fetchTeacherVirtualRooms = createAsyncThunk(
  "teacherVirtualRooms/fetchTeacherVirtualRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/teacher/virtualRoom"
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.virtualRooms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟠 تحديث جلسة افتراضية للمعلم (PATCH)
export const updateTeacherVirtualRoom = createAsyncThunk(
  "teacherVirtualRooms/updateTeacherVirtualRoom",
  async ({ id, updatedRoom }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/virtualRoom/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRoom),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update teacher virtual room");
      }

      const data = await response.json();
      return { id, updatedRoom: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔴 حذف جلسة افتراضية للمعلم (DELETE)
export const deleteTeacherVirtualRoom = createAsyncThunk(
  "teacherVirtualRooms/deleteTeacherVirtualRoom",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/virtualRoom/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      dispatch(fetchTeacherVirtualRooms()); // تحديث القائمة بعد الحذف
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟣 إنشاء Slice
const teacherVirtualRoomSlice = createSlice({
  name: "teacherVirtualRooms",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeacherVirtualRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTeacherVirtualRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherVirtualRooms.push(action.payload);
        toast.success("Teacher virtual room created successfully!");
      })
      .addCase(createTeacherVirtualRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create teacher virtual room";
        toast.error(state.error);
      })
      .addCase(fetchTeacherVirtualRooms.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTeacherVirtualRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherVirtualRooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeacherVirtualRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch teacher virtual rooms";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(updateTeacherVirtualRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeacherVirtualRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, updatedRoom } = action.payload;

        const index = state.teacherVirtualRooms.findIndex(
          (room) => room._id === id
        );
        if (index !== -1) {
          state.teacherVirtualRooms[index] = {
            ...state.teacherVirtualRooms[index],
            ...updatedRoom,
          };
        }
        toast.success("Teacher virtual room updated successfully!");
      })
      .addCase(updateTeacherVirtualRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Failed to update teacher virtual room";
        toast.error(state.error);
      })
      .addCase(deleteTeacherVirtualRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeacherVirtualRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teacherVirtualRooms = state.teacherVirtualRooms.filter(
          (room) => room._id !== action.payload
        );
        toast.success("Teacher virtual room deleted successfully!");
      })
      .addCase(deleteTeacherVirtualRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Failed to delete teacher virtual room";
        toast.error(state.error);
      });
  },
});

export const { clearMessage } = teacherVirtualRoomSlice.actions;
export default teacherVirtualRoomSlice.reducer;
