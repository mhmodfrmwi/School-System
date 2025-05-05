import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./Features/Auth/AuthRedux/roleSlice";
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
import contestsReducer from "./Features/Teacher/components/TeacherRedux/ContestSlice";
import teacherVirtualRoomReducer from "./Features/Teacher/components/TeacherRedux/VRSlice";
import classTeachersReducer from "./Features/Teacher/components/TeacherRedux/TeacherClassSlice";
import teacherScheduleReducer from "./Features/Teacher/components/TeacherRedux/teacherScheduleSlice";
import teacherLibraryReducer from "./Features/Teacher/components/TeacherRedux/teacherLibrarySlice";
import studentContestsReducer from "./Features/Student/components/StudentRedux/contestSlice";
import libraryStudentReducer from "./Features/Student/components/StudentRedux/libraryStudentSlice";
import StudentVirtualRooms from "./Features/Student/components/StudentRedux/virtualRoomsSlice";
import teamReducer from "./Features/Student/components/StudentRedux/teamSlice";
import studentcontestReducer from "./Features/Student/components/StudentRedux/studentcontestSlice";
import participantsReducer from "./Features/Teacher/components/TeacherRedux/participantsSlice";
import schoolhubReducer from "./Features/Manager/components/ManagerRedux/schoolhubSlice";
import participantReducer from "./Features/Manager/components/ManagerRedux/participantSlice";
import teacherSchoolHubReducer from "./Features/Teacher/components/TeacherRedux/schoolhubSlice";
import studentSchoolHubReducer from "./Features/Student/components/StudentRedux/schoolhubSlice";
import LibraryTeacherReducer from "./Features/Teacher/components/TeacherRedux/LibraryTeacherSlice";
import generalLibraryReducer from "./Features/Teacher/components/TeacherRedux/generalLibrarySlice";
import questionbankReducer from "./Features/Teacher/components/TeacherRedux/QuestionBankSlice";
import studentQuestionBankReducer from "./Features/Student/components/StudentRedux/questionBankSlice";
import examsReducer from "./Features/Student/components/StudentRedux/examsSlice";
import assignmentsReducer from "./Features/Student/components/StudentRedux/assignmentSlice";
import motivationReducer from "./Features/Student/components/StudentRedux/motivationSlice";
import examReducer from "./Features/Teacher/components/TeacherRedux/ExamSlice";
import motivationTeacherReducer from "./Features/Teacher/components/TeacherRedux/motivationTeacherSlice";
import assignmentsTeacherReducer from "./Features/Teacher/components/TeacherRedux/AssignmentSlice";
import examScoresReducer from "./Features/Teacher/components/TeacherRedux/examScoreSlice";
import gradesStudentReducer from "./Features/Student/components/StudentRedux/gradesStudentSlice";
import managerdashboardReducer from "./Features/Manager/pages/ManagerSlices/dashboardSlice";
import gradeManagerReducer from "./Features/Manager//components/ManagerRedux/gradeSlice";
import virtualRoomsReducer from "./Features/Manager//components/ManagerRedux/VRMangerSlice";
import virtualRoomsmangerReducer from "./Features/Teacher/components/TeacherRedux/VirtualRoomsMangerSlice";
import teacherProfileReducer from "./Features/Teacher/components/TeacherRedux/TeacherEditProfileSlice";
import studentProfileReducer from "./Features/Student/components/StudentRedux/StudentEditProfileSlice";
import managerProfileReducer from "./Features/Manager/components/ManagerRedux/ManagerEditProfileSlice";
import adminProfileReducer from "./Features/Admin/components/AdminRedux/AdminEditProfileSlice";
import parentProfileReducer from "./Features/Parent/components/ParentRedux/ParentEditProfileSlice";
import parentActivityReducer from "./Features/Parent/components/ParentRedux/ActivitySlice";
import parentKidsReducer from './Features/Parent/components/ParentRedux/ParentSlice';

const store = configureStore({
  reducer: {
    role: roleReducer,
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
    contests: contestsReducer,
    teams: teamReducer,
    studentcontest: studentcontestReducer,
    studentContests: studentContestsReducer,
    teacherVirtualRooms: teacherVirtualRoomReducer,
    classTeachers: classTeachersReducer,
    teacherSchedule: teacherScheduleReducer,
    teacherLibrary: teacherLibraryReducer,
    libraryTeacher: LibraryTeacherReducer,
    libraryStudent: libraryStudentReducer,
    StudentvirtualRooms: StudentVirtualRooms,
    participants: participantsReducer,
    schoolhub: schoolhubReducer,
    participant: participantReducer,
    teacherSchoolHub: teacherSchoolHubReducer,
    studentSchoolHub: studentSchoolHubReducer,
    generalLibrary: generalLibraryReducer,
    questionbank: questionbankReducer,
    studentQuestionBank: studentQuestionBankReducer,
    exams: examsReducer,
    exam: examReducer,
    motivation: motivationReducer,
    motivationTeacher: motivationTeacherReducer,
    assignments: assignmentsReducer,
    assignmentsTeacher: assignmentsTeacherReducer,
    examScores: examScoresReducer,
    studentGrades: gradesStudentReducer,
    managerdashboard: managerdashboardReducer,
    gradeManager: gradeManagerReducer,
    virtualRooms: virtualRoomsReducer,
    virtualRoomsmanger:virtualRoomsmangerReducer,
    teacherProfile:teacherProfileReducer,
    studentProfile:studentProfileReducer,
    managerProfile:managerProfileReducer,
    adminProfile:adminProfileReducer,
    parentProfile:parentProfileReducer,
    parentActivity: parentActivityReducer,
    parentKids: parentKidsReducer, 
  },
});

export default store;
