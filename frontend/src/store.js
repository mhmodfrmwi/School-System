import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Features/Auth/userSlice";
import studentReducer from "./Features/Admin/components/studentSlice";
import addstudentReducer from "./Features/Admin/components/addstudentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    addstudent: addstudentReducer,
  },
});

export default store;
