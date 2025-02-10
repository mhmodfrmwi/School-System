import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Features/Auth/ProtectedRoute";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./ui/PageNotFound";
import Loader from "./ui/Loader";
import TakeAttendance from "./Features/Teacher/components/Attendance/takeAttendance";
import Attendancereport from "./Features/Teacher/components/Attendance/attendancereport";
import CurrentCourseForAttendance from "./Features/Teacher/components/Attendance/CurrentCourseForAttendance";
import AllCoursesForAttendance from "./Features/Teacher/components/Attendance/AllCoursesForAttendance";

const Teachers = lazy(() => import("./Features/Teacher/pages/Teacher"));
const Login = lazy(() => import("./Features/Auth/Login"));
const OnBoarding = lazy(() => import("./Features/Auth/OnBoarding"));
const ChooseRole = lazy(() => import("./Features/Auth/ChooseRole"));
const StudentForm = lazy(
  () => import("./Features/Admin/components/Students/studentForm"),
);
const BasicForm = lazy(() => import("./Features/Admin/components/basicForm"));
const DashboardAdmin = lazy(
  () => import("./Features/Admin/Pages/DashboardAdmin"),
);
const Manager = lazy(() => import("./Features/Manager/pages/Manager"));
const DashboardManager = lazy(
  () => import("./Features/Manager/pages/DashboardManager"),
);
const AllStudent = lazy(
  () => import("./Features/Admin/Pages/StudentTablePage"),
);
const ParentForm = lazy(
  () => import("./Features/Admin/components/Parents/parentForm"),
);
const ScheduleForm = lazy(
  () => import("./Features/Admin/components/Schedule/scheduleForm"),
);
const TeacherForm = lazy(
  () => import("./Features/Admin/components/Teachers/teacherForm"),
);
const TeacherInfo = lazy(
  () => import("./Features/Admin/components/Teachers/teacherInfo"),
);
const AdminForm = lazy(
  () => import("./Features/Admin/components/Admins/adminForm"),
);
const ManagerForm = lazy(
  () => import("./Features/Admin/components/Managers/managerForm"),
);
const AllParents = lazy(() => import("./Features/Admin/Pages/ParentTablePage"));
const AllTeachers = lazy(
  () => import("./Features/Admin/pages/TeacherTablePage"),
);
const AllManagers = lazy(
  () => import("./Features/Admin/pages/ManagerTablePage"),
);
const EditManagerForm = lazy(
  () => import("./Features/Admin/components/Managers/editManager"),
);
const AllAdmins = lazy(() => import("./Features/Admin/Pages/AdminTablePage"));
const AllSchedules = lazy(
  () => import("./Features/Admin/Pages/ScheduleTablePage"),
);
const AllTerms = lazy(() => import("./Features/Admin/Pages/TermPage"));
const TermForm = lazy(
  () => import("./Features/Admin/components/Terms/termForm"),
);
const Admins = lazy(() => import("./Features/Admin/Pages/Admins"));
const EditTeacher = lazy(
  () => import("./Features/Admin/components/Teachers/editTeacher"),
);
const AcademicYearForm = lazy(
  () => import("./Features/Admin/components/AcademicYears/academicYearForm"),
);
const EditAcademicYearForm = lazy(
  () =>
    import("./Features/Admin/components/AcademicYears/editAcademicYearForm"),
);
const AllAcademicYears = lazy(
  () => import("./Features/Admin/Pages/AcademicYearPage"),
);
const SubjectDetails = lazy(
  () => import("./Features/Admin/components/Subjects/AllAssignedSubjects"),
);
const SubjectsList = lazy(
  () => import("./Features/Admin/Pages/SubjectTablePage"),
);
const AddSubject = lazy(
  () => import("./Features/Admin/components/Subjects/AddSubjectManagement"),
);
const AllGrades = lazy(() => import("./Features/Admin/Pages/GradePage"));
const GradeForm = lazy(
  () => import("./Features/Admin/components/Grades/GradeForm"),
);
const EditGradeForm = lazy(
  () => import("./Features/Admin/components/Grades/EditGradeForm"),
);
const AssignGrade = lazy(
  () => import("./Features/Admin/components/Grades/AssignGrade"),
);
const Students = lazy(() => import("./Features/Student/pages/Students"));
const DashboardStudent = lazy(
  () => import("./Features/Student/pages/DashboardStudent"),
);
const Grades = lazy(
  () => import("./Features/Student/components/Grades/Grades"),
);
const GradesAssignment = lazy(
  () => import("./Features/Student/components/Grades/GradesAssignment"),
);
const GradesExam = lazy(
  () => import("./Features/Student/components/Grades/GradesExam"),
);
const Schedule = lazy(
  () => import("./Features/Student/components/Schedule/schedule"),
);
const ScheduleExam = lazy(
  () => import("./Features/Student/components/Schedule/scheduleExam"),
);
const LibraryPage = lazy(
  () => import("./Features/Student/components/Library/LibraryPage"),
);
const LibraryBooksEnglish = lazy(
  () => import("./Features/Student/components/Library/LibraryBooksEnglish"),
);
const Parents = lazy(() => import("./Features/Parent/pages/Parents"));
const DashboardParent = lazy(
  () => import("./Features/Parent/pages/DashboardParent"),
);
const EditAdminForm = lazy(
  () => import("./Features/Admin/components/Admins/editAdmin"),
);
const GradesDetails = lazy(
  () => import("./Features/Admin/components/Grades/AllAssignedGrades"),
);
const EditAssignedGrade = lazy(
  () => import("./Features/Admin/components/Grades/EditAssignedGrade"),
);
const AssignSubject = lazy(
  () => import("./Features/Admin/components/Subjects/AssignSubject"),
);
const EditSubject = lazy(
  () => import("./Features/Admin/components/Subjects/EditSubject"),
);
const EditAssignedSubject = lazy(
  () => import("./Features/Admin/components/Subjects/EditAssignedSubject"),
);
const AllClassTeacher = lazy(
  () => import("./Features/Admin/Pages/classTeacherTablePage"),
);
const EditClassTeacher = lazy(
  () => import("./Features/Admin/components/classTeacher/editClassTeacher"),
);
const EditProfilePage = lazy(
  () => import("./Features/Admin/Pages/EditProfilePage"),
);
const EditSchedule = lazy(
  () => import("./Features/Admin/components/Schedule/editScheduleForm"),
);
const EditTermForm = lazy(
  () => import("./Features/Admin/components/Terms/editTermForm"),
);
const EditParentForm = lazy(
  () => import("./Features/Admin/components/Parents/editParent"),
);
const EditStudent = lazy(
  () => import("./Features/Admin/components/Students/editStudentForm"),
);
const MotivationPage = lazy(
  () => import("./Features/Student/pages/MotivationPage"),
);
const EditStudentProfile = lazy(
  () => import("./Features/Student/pages/EditProfilePage"),
);
const DetailesActivity = lazy(
  () => import("./Features/Student/components/Activites/detailesActivity"),
);
const PrizesActivity = lazy(
  () => import("./Features/Student/components/Activites/PrizesActivity"),
);
const Activities = lazy(
  () => import("./Features/Student/components/Activites/Activites"),
);
const Contests = lazy(
  () => import("./Features/Student/components/Activites/Trips"),
);
const VirtualRooms = lazy(
  () => import("./Features/Student/components/Virtual Rooms/VirtualRooms"),
);
const AllCouses = lazy(
  () => import("./Features/Student/components/courses/allcourses"),
);
const StudentCourseDetails = lazy(
  () => import("./Features/Student/components/courses/CourseVideoLectures"),
);
const StudentMaterialDetails = lazy(
  () => import("./Features/Student/components/courses/CourseMaterialPDF"),
);
const AttendancePage = lazy(
  () => import("./Features/Student/components/Attendance/AttendancePage"),
);
const GradesParent = lazy(
  () => import("./Features/Parent/components/Grades/Grades"),
);
const GradesAssignmentParent = lazy(
  () => import("./Features/Parent/components/Grades/GradesAssignment"),
);
const GradesExamParent = lazy(
  () => import("./Features/Parent/components/Grades/GradesExam"),
);
const ScheduleParent = lazy(
  () => import("./Features/Parent/components/Schedule/schedule"),
);
const ScheduleExamParent = lazy(
  () => import("./Features/Parent/components/Schedule/scheduleExam"),
);
const EditTeacherProfile = lazy(
  () => import("./Features/Teacher/pages/EditProfilePage"),
);
const SchoolHubs = lazy(
  () => import("./Features/Teacher/components/Activities/SchoolHubs"),
);
const SchoolHubsDetailes = lazy(
  () => import("./Features/Teacher/components/Activities/SchoolHubsDetailes"),
);
const SchoolHubsPrizes = lazy(
  () => import("./Features/Teacher/components/Activities/SchoolHubsPrizes"),
);
const ActivityContests = lazy(
  () => import("./Features/Teacher/components/Activities/TripsOfTeacher"),
);
const ActivityForm = lazy(
  () => import("./Features/Teacher/components/Activities/AddActivityForm"),
);
const EditActivityForm = lazy(
  () => import("./Features/Teacher/components/Activities/EditActivityForm"),
);
const WeeklySchedule = lazy(
  () => import("./Features/Teacher/components/Schedule/WeekSchedule"),
);

const ExamSchedule = lazy(
  () => import("./Features/Teacher/components/Schedule/ExamSchedule"),
);
const AddMaterial = lazy(
  () => import("./Features/Teacher/components/courses/AddMaterial"),
);
const AllCourses = lazy(
  () => import("./Features/Teacher/components/courses/AllCourses"),
);
const CurrentCourse = lazy(
  () => import("./Features/Teacher/components/courses/CurrentCourses"),
);
const MaterialForm = lazy(
  () => import("./Features/Teacher/components/courses/FormCourse"),
);
const SeeMaterial = lazy(
  () => import("./Features/Teacher/components/courses/SeeMaterial"),
);
const VirtualRoom = lazy(
  () => import("./Features/Teacher/components/Virtual Rooms/virtualRooms"),
);
const AddVirtualRoom = lazy(
  () => import("./Features/Teacher/components/Virtual Rooms/addVirtualRooms"),
);
const EditVirtualRoom = lazy(
  () => import("./Features/Teacher/components/Virtual Rooms/editVirtualRooms"),
);
const MaterialDetails = lazy(
  () => import("./Features/Student/components/courses/MaterialDetails"),
);

function App() {
  const role = useSelector((state) => state.role.role) || localStorage.getItem("role");

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<OnBoarding />} />
          <Route
          path="/login"
          element={role ? <Login /> : <Navigate to="/role" />}
        />
          <Route path="role" element={<ChooseRole />} />
          {/* /////////////////adminpage//////////////////// */}
          <Route path="admin"  element={<ProtectedRoute element={<Admins/>} requiredRole="admin" />} >
            <Route index element={<DashboardAdmin />} />
            <Route path="basicform" element={<BasicForm />} />
            <Route path="studentform" element={<StudentForm />} />
            <Route path="allstudent" element={<AllStudent />} />
            <Route path="edit-student/:id" element={<EditStudent />} />
            <Route path="managerform" element={<ManagerForm />} />
            <Route path="allmanagers" element={<AllManagers />} />
            <Route path="editmanagerform/:id" element={<EditManagerForm />} />
            <Route path="allparents" element={<AllParents />} />
            <Route path="parentform" element={<ParentForm />} />
            <Route path="scheduleform" element={<ScheduleForm />} />
            <Route path="allschedules" element={<AllSchedules />} />
            <Route path="edit-schedule/:id" element={<EditSchedule />} />
            <Route path="allTerms" element={<AllTerms />} />
            <Route path="termform" element={<TermForm />} />
            <Route path="edit-term/:id" element={<EditTermForm />} />
            <Route path="allteachers" element={<AllTeachers />} />
            <Route path="teacherform" element={<TeacherForm />} />
            <Route path="edit-teacher/:id" element={<EditTeacher />} />
            <Route path="teacherinfo" element={<TeacherInfo />} />
            <Route path="allteachers/:id" element={<AllClassTeacher />} />
            <Route
              path="edit-class-teacher/:id"
              element={<EditClassTeacher />}
            />
            <Route path="adminform" element={<AdminForm />} />
            <Route path="alladmins" element={<AllAdmins />} />
            <Route path="allacademicyears" element={<AllAcademicYears />} />
            <Route path="academicyearform" element={<AcademicYearForm />} />
            <Route
              path="editacademicyearform/:id"
              element={<EditAcademicYearForm />}
            />
            <Route path="editadminform/:id" element={<EditAdminForm />} />
            <Route path="allgrades" element={<AllGrades />} />
            <Route path="allgrades/:id" element={<GradesDetails />} />
            <Route path="gradeform" element={<GradeForm />} />
            <Route path="editGradeForm/:id" element={<EditGradeForm />} />
            <Route
              path="editAssignedGrade/:id"
              element={<EditAssignedGrade />}
            />
            <Route path="assigngrade" element={<AssignGrade />} />
            <Route path="allsubjects" element={<SubjectsList />} />
            <Route path="allsubjects/:id" element={<SubjectDetails />} />
            <Route path="addsubject" element={<AddSubject />} />
            <Route path="assignSubject" element={<AssignSubject />} />
            <Route path="edit-subject/:id" element={<EditSubject />} />
            <Route
              path="edit-assigned-subject/:id"
              element={<EditAssignedSubject />}
            />
            <Route path="edit-admin-profile" element={<EditProfilePage />} />
            <Route path="editparentform/:id" element={<EditParentForm />} />
          </Route>
          {/* /////////////////studentpage//////////////////// */}
          <Route path="student" element={<ProtectedRoute element={<Students/>} requiredRole="student" />}>
            <Route index element={<DashboardStudent />} />
            <Route path="grades" element={<Grades />} />
            <Route path="grades/assignment" element={<GradesAssignment />} />
            <Route path="grades/exam" element={<GradesExam />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="schedule/exam" element={<ScheduleExam />} />
            <Route path="library" element={<LibraryPage />} />
            <Route
              path="librarybooksenglish"
              element={<LibraryBooksEnglish />}
            />
            <Route path="motivation" element={<MotivationPage />} />
            <Route
              path="edit-student-profile"
              element={<EditStudentProfile />}
            />
            <Route path="activities/detailes" element={<DetailesActivity />} />
            <Route path="activities/prizes" element={<PrizesActivity />} />
            <Route path="activities/contests" element={<Contests />} />
            <Route path="activities" element={<Activities />} />
            <Route path="virtualrooms" element={<VirtualRooms />} />
            <Route path="allcourses" element={<AllCouses />} />
            <Route
              path="allcourses/videos/:subjectId"
              element={<StudentCourseDetails />}
            />
            <Route
              path="allcourses/materials/:subjectId"
              element={<StudentMaterialDetails />}
            />
            <Route path="/student/material-details/:subjectId/:materialId" element={<MaterialDetails />} />
            <Route path="attendance" element={<AttendancePage />} />
          </Route>
          {/* /////////////////parentpage//////////////////// */}
          <Route path="parent" element={<ProtectedRoute element={<Parents/>} requiredRole="parent" />}>
            <Route index element={<DashboardParent />} />
            <Route path="grades" element={<GradesParent />} />
            <Route
              path="grades/assignment"
              element={<GradesAssignmentParent />}
            />
            <Route path="grades/exam" element={<GradesExamParent />} />
            <Route path="schedule" element={<ScheduleParent />} />
            <Route path="schedule/exam" element={<ScheduleExamParent />} />
          </Route>
          {/* /////////////////teacher pages//////////////////// */}
          <Route path="teacher" element={<ProtectedRoute element={<Teachers/>} requiredRole="teacher" />}>
            <Route
              path="edit-teacher-profile"
              element={<EditTeacherProfile />}
            />
            <Route path="school-hubs" element={<SchoolHubs />} />
            <Route
              path="school-hubs/detailes"
              element={<SchoolHubsDetailes />}
            />
            <Route path="school-hubs/prizes" element={<SchoolHubsPrizes />} />
            <Route path="contests" element={<ActivityContests />} />
            <Route path="contests/activity-form" element={<ActivityForm />} />
            <Route
              path="contests/edit-activity-form/:id"
              element={<EditActivityForm />}
            />
            <Route path="weekly-schedule" element={<WeeklySchedule />} />
            <Route path="exam-schedule" element={<ExamSchedule />} />
            <Route path="currentCourse" element={<CurrentCourse />} />
            <Route path="allcourses" element={<AllCourses />} />
            <Route
              path="currentCourseforattendance"
              element={<CurrentCourseForAttendance />}
            />
            <Route
              path="allcoursesforattendance"
              element={<AllCoursesForAttendance />}
            />
            <Route path="addmaterial" element={<AddMaterial />} />
            <Route path="materialform" element={<MaterialForm />} />
            <Route path="seematerial" element={<SeeMaterial />} />
            <Route path="takeattendance/:id" element={<TakeAttendance />} />
            <Route path="attendancereport" element={<Attendancereport />} />
            <Route path="virtualroom" element={<VirtualRoom />} />
            <Route path="addvirtualroom" element={<AddVirtualRoom />} />
            <Route path="editvirtualroom/:id" element={<EditVirtualRoom />} />
          </Route>
          {/* ///////////////manager pages//////////////////// */}
          <Route path="manager" element={<ProtectedRoute element={<Manager/>} requiredRole="manager"/>}>
            <Route index element={<DashboardManager />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
