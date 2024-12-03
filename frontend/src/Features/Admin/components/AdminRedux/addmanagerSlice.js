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

export const postManager = createAsyncThunk(
  "addmanager/postManager",
  async (managerData, { rejectWithValue }) => {
    console.log(managerData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify(managerData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to post student data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post student data");
    }
  },
);

const addmanagerSlice = createSlice({
  name: "addmanager",
  initialState,
  reducers: {
    managertoserver: {
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
      .addCase(postManager.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postManager.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postManager.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addmanagertoserver } = addmanagerSlice.actions;
export default addmanagerSlice.reducer;
