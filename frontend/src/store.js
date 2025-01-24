import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Features/Auth/AuthRedux/userSlice";
import studentReducer from "./Features/Admin/components/AdminRedux/studentSlice";
import addstudentReducer from "./Features/Admin/components/AdminRedux/studentSlice";
import termReducer from "./Features/Admin/components/AdminRedux/termSlice";
import scheduleReducer from "./Features/Admin/components/AdminRedux/scheduleSlice";
import parentReducer from "./Features/Admin/components/AdminRedux/parentSlice";
import adminReducer from "./Features/Admin/components/AdminRedux/adminSlice";
import teacherReducer from "./Features/Admin/components/AdminRedux/teacherSlice";
import bossReducer from "./Features/Admin/components/AdminRedux/managerSlice";
// import courseReducer from "./Features/Admin/components/AdminRedux/courseSlice";
import coursesReducer from "./Features/Admin/components/AdminRedux/coursesSlice";
import academicYearReducer from "./Features/Admin/components/AdminRedux/academicYearSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admins: adminReducer,
    bosses: bossReducer,
    parents: parentReducer,
    students: studentReducer,
    addstudent: addstudentReducer,
    teachers: teacherReducer,
    terms: termReducer,
    schedule: scheduleReducer,
    // courses: courseReducer,
    courses: coursesReducer,
    academicYears: academicYearReducer,
  },
});

export default store;
