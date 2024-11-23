import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: {
      prepare(email, password) {
        return {
          payload: { email, password },
        };
      },
      reducer(state, action) {
        state.email = action.payload.email;
        state.password = action.payload.password;
      },
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
