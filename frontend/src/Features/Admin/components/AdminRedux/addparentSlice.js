import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  status: "idle",
  error: null,
};

export const postParent = createAsyncThunk(
  "addparent/postParent",
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
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post parent data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post parent data");
    }
  }
);

const addParentSlice = createSlice({
  name: "addparent",
  initialState,
  reducers: {
    addParenttoserver: {
      prepare(fullName, email, password, phoneNumber ,gender) {
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
      });
  },
});

export const { addParenttoserver } = addParentSlice.actions;

export default addParentSlice.reducer;
