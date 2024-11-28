import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Features/Auth/userSlice";
import studentReducer from './Features/Admin/studentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
  },
});

export default store;
