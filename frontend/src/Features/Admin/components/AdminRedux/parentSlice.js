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
      })
      .addCase(postParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postParent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchParents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parents = action.payload;
      })
      .addCase(fetchParents.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(removeParent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parents = state.parents.filter(
          (parent) => parent.id !== action.payload,
        );
        state.message = "Parent deleted successfully";
      })
      .addCase(removeParent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addParent, editParent, clearMessage, addParenttoserver } =
  parentSlice.actions;

export default parentSlice.reducer;
