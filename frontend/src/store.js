import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Features/Auth/AuthRedux/userSlice";
import studentReducer from "./Features/Admin/components/AdminRedux/studentSlice";
import addstudentReducer from "./Features/Admin/components/AdminRedux/addstudentSlice";
import termReducer from "./Features/Admin/components/AdminRedux/termSlice";
import scheduleReducer from "./Features/Admin/components/AdminRedux/scheduleSlice";
import parentReducer from './Features/Admin/components/AdminRedux/parentSlice';
import addparentReducer from './Features/Admin/components/AdminRedux/addparentSlice';
import adminReducer from './Features/Admin/components/AdminRedux/adminSlice';
import addadminReducer from './Features/Admin/components/AdminRedux/addadminSlice';
import teacherReducer from './Features/Admin/components/AdminRedux/teacherSlice';
import addteacherReducer from './Features/Admin/components/AdminRedux/addteacherSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    addstudent: addstudentReducer,
    parents: parentReducer,
    addparent : addparentReducer,
    admins : adminReducer,
    addadmin : addadminReducer,
    teachers : teacherReducer,
    addteacher : addteacherReducer,
    terms: termReducer,
    schedule: scheduleReducer,
  },
});

export default store;
