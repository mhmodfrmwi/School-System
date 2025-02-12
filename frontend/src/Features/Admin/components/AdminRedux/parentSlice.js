import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getToken = () => sessionStorage.getItem("token");

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  parents: [],
  status: "idle",
  error: null,
  message: "",
  loading: false,
};

export const postParent = createAsyncThunk(
  "parents/postParent",
  async (parentData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/parent/createParent",
        {
          method: "POST",
          body: JSON.stringify(parentData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("Unauthorized, please log in again.");
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchParents = createAsyncThunk(
  "parents/fetchParents",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/parent/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("Unauthorized, please log in again.");
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.parents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editParentAsync = createAsyncThunk(
  "parents/editParentAsync",
  async ({ id, updatedParent }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/parent/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedParent),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("Unauthorized, please log in again.");
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.parent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeParent = createAsyncThunk(
  "parents/removeParent",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/parent/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("Unauthorized, please log in again.");
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchParents()); // Refresh parent list after deletion
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const parentSlice = createSlice({
  name: "parents",
  initialState,
  reducers: {
    addParent: (state, action) => {
      state.parents.push(action.payload);
    },
    editParent: (state, action) => {
      const index = state.parents.findIndex(
        (parent) => parent.id === action.payload.id,
      );
      if (index !== -1) {
        state.parents[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(postParent.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.loading = true;
      })
      .addCase(postParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parents.push(action.payload);
        state.loading = false;
        toast.success("Parent added successfully!");
      })
      .addCase(postParent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post parent";
        state.loading = false;
        toast.error(state.error);
      })

      .addCase(fetchParents.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parents = action.payload;
        state.loading = false;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch parents";
        state.loading = false;

        if (state.error === "Unauthorized, please log in again.") {
          toast.error("Session expired, please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          toast.error(state.error);
        }
      })

      .addCase(removeParent.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parents = state.parents.filter(
          (parent) => parent._id !== action.payload,
        );
        state.message = "Parent deleted successfully";
        state.loading = false;
        toast.success("Parent deleted successfully");
      })
      .addCase(removeParent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete parent";
        state.loading = false;
        toast.error(state.error);
      })

      .addCase(editParentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editParentAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedParent = action.payload;
        const index = state.parents.findIndex(
          (parent) => parent._id === updatedParent._id,
        );
        if (index !== -1) {
          state.parents[index] = updatedParent;
        }
        state.message = "Parent updated successfully";
        toast.success("Parent updated successfully");
      })
      .addCase(editParentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update parent";
        toast.error(state.error);
      });
  },
});

export const { addParent, editParent, clearMessage } = parentSlice.actions;
export default parentSlice.reducer;
