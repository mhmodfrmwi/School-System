import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Features/Admin/components/AdminRedux/studentSlice";
import addstudentReducer from "./Features/Admin/components/AdminRedux/studentSlice";
import termReducer from "./Features/Admin/components/AdminRedux/termSlice";
import scheduleReducer from "./Features/Admin/components/AdminRedux/scheduleSlice";
import parentReducer from "./Features/Admin/components/AdminRedux/parentSlice";
import adminReducer from "./Features/Admin/components/AdminRedux/adminSlice";
import teacherReducer from "./Features/Admin/components/AdminRedux/teacherSlice";
import classTeacherReducer from "./Features/Admin/components/AdminRedux/classTeacherSlice";
import managerReducer from "./Features/Admin/components/AdminRedux/managerSlice";
import subjectsReducer from "./Features/Admin/components/AdminRedux/subjectSlice";
import academicYearReducer from "./Features/Admin/components/AdminRedux/academicYearSlice";
import gradeReducer from "./Features/Admin/components/AdminRedux/gradeSlice";
import assignSubjectReducer from "./Features/Admin/components/AdminRedux/AssignSubjectSlice";
import assignGradeReducer from "./Features/Admin/components/AdminRedux/AssignGradeSlice";
import classReducer from "./Features/Admin/components/AdminRedux/classSlice";
import studentAttendanceReducer from "./Features/Student/components/StudentRedux/studentAttendanceSlice";
import studentScheduleReducer from "./Features/Student/components/StudentRedux/studentScheduleSlice";
import loginReducer from "./Features/Auth/AuthRedux/loginSlice";
import attendanceTeacheReducer from "./Features/Teacher/components/TeacherRedux/takeAttendanceSlice";
import allSubjectsStudentReducer from "./Features/Student/components/StudentRedux/allSubjectsStudentSlice";
import pdfMaterialsReducer from "./Features/Teacher/components/TeacherRedux/PdfMaterialSlice";

const store = configureStore({
  reducer: {
    admins: adminReducer,
    managers: managerReducer,
    parents: parentReducer,
    students: studentReducer,
    addstudent: addstudentReducer,
    teachers: teacherReducer,
    classTeacher: classTeacherReducer,
    terms: termReducer,
    schedules: scheduleReducer,
    subject: subjectsReducer,
    assignSubject: assignSubjectReducer,
    academicYears: academicYearReducer,
    grades: gradeReducer,
    assignGrade: assignGradeReducer,
    classes: classReducer,
    studentAttendance: studentAttendanceReducer,
    attendanceTeacher: attendanceTeacheReducer,
    studentSchedule: studentScheduleReducer,
    login: loginReducer,
    allSubjectsStudent: allSubjectsStudentReducer,
    pdfMaterials: pdfMaterialsReducer,
  },
});

export default store;
