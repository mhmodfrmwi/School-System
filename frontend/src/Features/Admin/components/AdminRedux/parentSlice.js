import { faL } from "@fortawesome/free-solid-svg-icons";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify(parentData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
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
      const response = await fetch(
        "http://localhost:4000/api/v1/getUsers/parents",
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
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
    console.log(updatedParent);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/parents/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedParent),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to edit Parent");
      }

      const data = await response.json();
      return data.newParent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeParent = createAsyncThunk(
  "parents/removeParent",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/parents/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      dispatch(fetchParents());

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
    addParenttoserver: {
      prepare(fullName, email, password, phoneNumber, gender) {
        return {
          payload: {
            fullName,
            email,
            password,
            phoneNumber,
            gender,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.gender = action.payload.gender;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postParent.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(postParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(postParent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
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
      .addCase(fetchParents.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      })

      .addCase(removeParent.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parents = state.parents.filter(
          (parent) => parent.id !== action.payload,
        );
        state.message = "Parent deleted successfully";
        state.loading = false;
      })
      .addCase(removeParent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(editParentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editParentAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedParent = action.payload;
        const index = state.parents.findIndex(
          (Parent) => Parent._id === updatedParent._id,
        );
        if (index !== -1) {
          state.parents[index] = updatedParent;
        }
        state.message = "Parent updated successfully";
      })
      .addCase(editParentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addParent, editParent, clearMessage, addParenttoserver } =
  parentSlice.actions;

export default parentSlice.reducer;
