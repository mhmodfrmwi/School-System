import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  parents: [],
  status: "idle",
  message: "",
};

export const fetchParents = createAsyncThunk(
  "parents/fetchParents",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/v1/getUsers/parents"
    );
    const data = await response.json();
    console.log(data); 
    return data.parents;
  }
);

export const removeParent = createAsyncThunk(
  "parents/removeParent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/parents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete parent");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
        (parent) => parent.id === action.payload.id
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
          (parent) => parent.id !== action.payload
        );
        state.message = "Parent deleted successfully";
      })
      .addCase(removeParent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addParent, editParent, clearMessage } = parentSlice.actions;

export default parentSlice.reducer;
