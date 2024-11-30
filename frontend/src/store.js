import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Features/Auth/AuthRedux/userSlice";
import studentReducer from "./Features/Admin/components/AdminRedux/studentSlice";
import addstudentReducer from "./Features/Admin/components/AdminRedux/addstudentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    addstudent: addstudentReducer,
  },
});

export default store;
