import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Features/Auth/ProtectedRoute";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./ui/PageNotFound";
import TitleUpdater from "./ui/TitleUpdater";
import SeeAllAssignments from "./Features/Teacher/components/courses/AllYearsMaterual/SeeAllAssignments";
import AllSubmissionsForAssignment from "./Features/Teacher/components/courses/AllYearsMaterual/AllSubmissionsForAssignment";
import GetStudentsWithGrades from "./Features/Teacher/components/Grades/GetStudentsWithGrades";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GetAllClasses from "./Features/Manager/components/Attendance/GetAllClasses";
import GetAttendanceClass from "./Features/Manager/components/Attendance/GetAttendanceClass";
import CreateExamSchedule from "./Features/Manager/components/Schedule/CreateExamSchedule";
import GetExamSchedules from "./Features/Manager/components/Schedule/GetExamSchedules";
import GetExamSchedule from "./Features/Manager/components/Schedule/GetExamSchedule";
import UpdateExamSchedule from "./Features/Manager/components/Schedule/UpdateExamSchedule";
import GetExamScheduleForStudent from "./Features/Student/components/Schedule/GetExamScheduleForStudent";
import EditVRManger from "./Features/Manager/components/VR/EditVRManger";
import VirtualRoomsManger from "./Features/Teacher/components/MangerVR/MangerVR";
import GetAllScheduleClasses from "./Features/Manager/components/Schedule/GetAllScheduleClasses";
import WeeklyScheduleForManager from "./Features/Manager/components/Schedule/WeekScheduleForManager";
import ParentKids from "./Features/Parent/pages/ParentKids";
import DashboardParent from "./Features/Parent/pages/ParentKidDashboard";
import EditParentProfile from "./Features/Parent/pages/EditProfilePage";
import "./fonts.css";
import ForgotPassword from "./Features/Auth/ForgotPassword";
import VerifyEmail from "./Features/Auth/VerifyEmail";
import ResendVerification from "./Features/Auth/ResendVerification";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ExamsParent from "./Features/Parent/components/Exams/ExamPage";
import VirtualRoomsParent from "./Features/Parent/components/Courses/VRParent";
import AssignmentsParent from "./Features/Parent/components/Courses/assignmentsPage";
import ThemeInitializer from "./ui/ThemeInitializer ";

/* /////////////////auth imports//////////////////// */

const Login = lazy(() => import("./Features/Auth/Login"));
const OnBoarding = lazy(() => import("./Features/Auth/OnBoarding"));
const ChooseRole = lazy(() => import("./Features/Auth/ChooseRole"));

/* /////////////////admin imports//////////////////// */

const StudentForm = lazy(
  () => import("./Features/Admin/components/Students/studentForm"),
);
const BasicForm = lazy(() => import("./Features/Admin/components/basicForm"));
const DashboardAdmin = lazy(
  () => import("./Features/Admin/Pages/DashboardAdmin"),
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

/* /////////////////student imports//////////////////// */

const Students = lazy(() => import("./Features/Student/pages/Students"));
const DashboardStudent = lazy(
  () => import("./Features/Student/pages/DashboardStudent"),
);
const Grades = lazy(
  () => import("./Features/Student/components/Grades/Grades"),
);

const Schedule = lazy(
  () => import("./Features/Student/components/Schedule/schedule"),
);

const LibraryPage = lazy(
  () => import("./Features/Student/components/Library/LibraryPage"),
);
const LibraryVideosPage = lazy(
  () => import("./Features/Student/components/Library/LibraryVideosPage"),
);
const LibraryBooksPage = lazy(
  () => import("./Features/Student/components/Library/LibraryBooksPage"),
);
const LibraryItemDetailsPage = lazy(
  () => import("./Features/Student/components/Library/LibraryItemDetailsPage"),
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
  () => import("./Features/Student/components/Activites/Contests"),
);
const CreateTeam = lazy(
  () => import("./Features/Student/components/Activites/CreateTeam"),
);
const TeamDetails = lazy(
  () => import("./Features/Student/components/Activites/TeamDetails"),
);
const EditTeam = lazy(
  () => import("./Features/Student/components/Activites/EditTeam"),
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
const StudentVirtualRooms = lazy(
  () => import("./Features/Student/components/courses/CoursesVirtualRooms"),
);
const StudentQuestionBank = lazy(
  () => import("./Features/Student/components/courses/CoursesQuestionBank"),
);
const StudentQuestionDetailes = lazy(
  () => import("./Features/Student/components/courses/QuestionsDetailes"),
);
const StudentExams = lazy(
  () => import("./Features/Student/components/courses/CourseExam"),
);
const StudentExamPage = lazy(
  () => import("./Features/Student/components/courses/ExamPage"),
);
const StudentExamResultPage = lazy(
  () => import("./Features/Student/components/courses/StudentExamResultPage"),
);
const StudentAssignments = lazy(
  () => import("./Features/Student/components/courses/CourseAssignment"),
);
const StudentAssignmentPage = lazy(
  () => import("./Features/Student/components/courses/AssignmentView"),
);
const StudentAssignmentSubmittedpage = lazy(
  () =>
    import("./Features/Student/components/courses/AssignmentSubmissionView"),
);
const AttendancePage = lazy(
  () => import("./Features/Student/components/Attendance/AttendancePage"),
);
const MaterialDetails = lazy(
  () => import("./Features/Student/components/courses/MaterialDetails"),
);

/* /////////////////parent imports//////////////////// */

const Parents = lazy(() => import("./Features/Parent/pages/Parents"));
const ParentActivities = lazy(
  () => import("./Features/Parent/components/Activites/Activites"),
);
const ParentContests = lazy(
  () => import("./Features/Parent/components/Activites/Contests"),
);
const AllCoursesParent = lazy(
  () => import("./Features/Parent/components/Courses/CoursesPage"),
);
const DetailesParentActivity = lazy(
  () => import("./Features/Parent/components/Activites/DetailesActivity"),
);
const PrizesParentActivity = lazy(
  () => import("./Features/Parent/components/Activites/PrizesActivity"),
);
const ScheduleParent = lazy(
  () => import("./Features/Parent/components/Schedule/schedule"),
);
const ParentExamSchedule = lazy(
  () => import("./Features/Parent/components/Schedule/examSchedule"),
);
const MotivationParent = lazy(
  () => import("./Features/Parent/pages/MotivationPage"),
);
const GradesForSemesterForChild = lazy(
  () => import("./Features/Parent/components/Grades/GradesForSemester"),
);
const GradesForAllSemestersForChild = lazy(
  () => import("./Features/Parent/components/Grades/GradesForAllSemesters"),
);
const GradesForChild = lazy(
  () => import("./Features/Parent/components/Grades/GradesForChild"),
);

const AttendanceForChild = lazy(
  () => import("./Features/Parent/components/Attendance/Attendance"),
);

/* /////////////////teacher imports//////////////////// */

const SeeVR = lazy(
  () => import("./Features/Teacher/components/courses/VR/SeeVR"),
);
const EditVR = lazy(
  () => import("./Features/Teacher/components/courses/VR/UpdateVR"),
);
const LibraryForm = lazy(
  () => import("./Features/Teacher/components/Library/libraryForm"),
);
const SubjectsInLibrary = lazy(
  () => import("./Features/Teacher/components/Library/subjectsInLibrary"),
);
const MaterialsInLibrary = lazy(
  () => import("./Features/Teacher/components/Library/materialsInLibrary"),
);
const DashboardTeacher = lazy(
  () => import("./Features/Teacher/pages/DashboardTeacher"),
);
const AllMaterialPage = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/AllYearsMaterual/AllMaterialPage"
    ),
);
const SeeAllVR = lazy(
  () =>
    import("./Features/Teacher/components/courses/AllYearsMaterual/SeeAllVR"),
);
const ItemsInLIbrary = lazy(
  () => import("./Features/Teacher/components/Library/itemsInLIbrary"),
);
const ItemInLibrary = lazy(
  () => import("./Features/Teacher/components/Library/itemInLibrary"),
);
const LibraryItemForm = lazy(
  () => import("./Features/Teacher/components/Library/libraryItemForm"),
);
const UpdateItemLIbrary = lazy(
  () => import("./Features/Teacher/components/Library/updateItemLIbrary"),
);
const SeeAllMaterial = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/AllYearsMaterual/SeeAllMaterial"
    ),
);
const QuestionForm = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/QuestionBank/FormQuestionBank"
    ),
);
const SeeMyQuestion = lazy(
  () =>
    import("./Features/Teacher/components/courses/QuestionBank/SeeMyQuestions"),
);
const SeeAllQuestion = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/QuestionBank/SeeAllQuestions"
    ),
);
const EditQuestion = lazy(
  () =>
    import("./Features/Teacher/components/courses/QuestionBank/EditQuestions"),
);
const ExamForm = lazy(
  () => import("./Features/Teacher/components/courses/Exams/ExamForm"),
);
const SeeMyExams = lazy(
  () => import("./Features/Teacher/components/courses/Exams/seeAllExams"),
);
const ExamDetailes = lazy(
  () => import("./Features/Teacher/components/courses/Exams/myExamDetailes"),
);
const Motivation = lazy(
  () => import("./Features/Teacher/components/Motivation/Motivation"),
);
const EditExam = lazy(
  () => import("./Features/Teacher/components/courses/Exams/EditExam"),
);
const TakeAttendance = lazy(
  () => import("./Features/Teacher/components/Attendance/takeAttendance"),
);
const Attendancereport = lazy(
  () => import("./Features/Teacher/components/Attendance/attendancereport"),
);
const CurrentCourseForAttendance = lazy(
  () =>
    import(
      "./Features/Teacher/components/Attendance/CurrentCourseForAttendance"
    ),
);
const AllCoursesForAttendance = lazy(
  () =>
    import("./Features/Teacher/components/Attendance/AllCoursesForAttendance"),
);
const StudentAttendanceDetails = lazy(
  () =>
    import("./Features/Teacher/components/Attendance/StudentAttendanceDetails"),
);
const EditMaterial = lazy(
  () => import("./Features/Teacher/components/courses/UpdateMaterial"),
);
const Teachers = lazy(() => import("./Features/Teacher/pages/Teacher"));
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
  () => import("./Features/Teacher/components/Activities/Contests"),
);
const ParticipantsContests = lazy(
  () => import("./Features/Teacher/components/Activities/Participants"),
);
const ActivityForm = lazy(
  () => import("./Features/Teacher/components/Activities/AddContestForm"),
);
const EditActivityForm = lazy(
  () => import("./Features/Teacher/components/Activities/EditContestForm"),
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
  () =>
    import("./Features/Teacher/components/courses/AllYearsMaterual/AllCourses"),
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
const LibraryTeacherPage = lazy(
  () => import("./Features/Teacher/components/Library/LibraryTeacherPage"),
);
const LibraryItemDetailsPageForTeacher = lazy(
  () =>
    import(
      "./Features/Teacher/components/Library/LibraryItemDetailsPageForTeacher"
    ),
);
const VRForm = lazy(
  () => import("./Features/Teacher/components/courses/VR/FormVR"),
);
const StudentResults = lazy(
  () => import("./Features/Teacher/components/courses/Exams/ExamResults"),
);
const SeeAllExams = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/AllYearsMaterual/SeeAllExams"
    ),
);
const SeeMyAllQuestionAllYears = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/AllYearsMaterual/qBank/SeeMyAllQuestionAllYears"
    ),
);
const SeeAllQuestionAllYears = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/AllYearsMaterual/qBank/SeeAllQuestionsAllYears"
    ),
);
const AssignmentForm = lazy(
  () =>
    import("./Features/Teacher/components/courses/Assignments/AssignmentsForm"),
);
const CurrentCoursesForGrades = lazy(
  () => import("./Features/Teacher/components/Grades/CurrentCoursesForGrades"),
);
const GetStudentsForGrades = lazy(
  () => import("./Features/Teacher/components/Grades/GetStudentsForGrades"),
);
const UploadFileGrades = lazy(
  () => import("./Features/Teacher/components/Grades/UploadFileGrades"),
);
const GradesForSemester = lazy(
  () => import("./Features/Student/components/Grades/GradesForSemester"),
);
const GradesforAllYears = lazy(
  () => import("./Features/Student/components/Grades/GradesforAllYears"),
);
const SeeAssignments = lazy(
  () =>
    import("./Features/Teacher/components/courses/Assignments/SeeAssignments"),
);
const EditAssignment = lazy(
  () =>
    import("./Features/Teacher/components/courses/Assignments/EditAssignments"),
);
const AssignmentSubmissions = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/Assignments/SubmissionsForAssignment"
    ),
);
const SubmissionDetails = lazy(
  () =>
    import(
      "./Features/Teacher/components/courses/Assignments/StudentSubmission"
    ),
);

/* /////////////////manager imports//////////////////// */

const ManagerVRTable = lazy(
  () => import("./Features/Manager/components/VR/MangerVRTable"),
);
const ManagerVRForm = lazy(
  () => import("./Features/Manager/components/VR/ManagerVRForm"),
);
const Manager = lazy(() => import("./Features/Manager/pages/Manager"));
const DashboardManager = lazy(
  () => import("./Features/Manager/pages/DashboardManager"),
);
const EditManagerProfile = lazy(
  () => import("./Features/Manager/pages/EditProfilePage"),
);
const ManagerSchoolHubs = lazy(
  () => import("./Features/Manager/components/Activites/SchoolHubs"),
);
const ManagerSchoolHubsDetailes = lazy(
  () => import("./Features/Manager/components/Activites/SchoolHubsDetailes"),
);
const ManagerSchoolHubsPrizes = lazy(
  () => import("./Features/Manager/components/Activites/SchoolHubsPrizes"),
);
const ManagerSchoolHubsParticipants = lazy(
  () =>
    import("./Features/Manager/components/Activites/SchoolHubsParticipants"),
);
const ManagerSchoolHubsAdd = lazy(
  () => import("./Features/Manager/components/Activites/AddSchoolHubs"),
);
const ManagerSchoolHubsEdit = lazy(
  () => import("./Features/Manager/components/Activites/EditSchoolHubs"),
);
const ManagerGrade = lazy(
  () => import("./Features/Manager/components/Grades/gradeSearch"),
);

/* //////////////////////////////////////////////// */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});
function App() {
  const role =
    useSelector((state) => state.role.role) || localStorage.getItem("role");

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <TitleUpdater />
        <ThemeInitializer />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Suspense fallback>
          <Routes>
            <Route index element={<Navigate replace to="onboarding" />} />
            <Route path="onboarding" element={<OnBoarding />} />
            <Route path="role" element={<ChooseRole />} />
            <Route
              path="/login"
              element={role ? <Login /> : <Navigate to="/role" />}
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="/users/:userId/verify/:token"
              element={<VerifyEmail />}
            />
            <Route
              path="/resend-verification"
              element={<ResendVerification />}
            />
            {/* /////////////////adminpage//////////////////// */}
            <Route
              path="admin"
              element={
                <ProtectedRoute element={<Admins />} requiredRole="admin" />
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardAdmin />} />
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
            <Route
              path="student"
              element={
                <ProtectedRoute element={<Students />} requiredRole="student" />
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardStudent />} />
              <Route path="grades" element={<Grades />} />

              <Route
                path="grades-for-semester"
                element={<GradesForSemester />}
              />
              <Route
                path="grades-for-allyears"
                element={<GradesforAllYears />}
              />
              <Route path="schedule" element={<Schedule />} />
              <Route path="library" element={<LibraryPage />} />

              <Route path="librarybooks" element={<LibraryBooksPage />} />
              <Route path="libraryvideos" element={<LibraryVideosPage />} />
              <Route
                path="library/:type/:itemId"
                element={<LibraryItemDetailsPage />}
              />
              <Route path="motivation" element={<MotivationPage />} />
              <Route
                path="edit-student-profile"
                element={<EditStudentProfile />}
              />
              <Route
                path="activities/detailes/:id"
                element={<DetailesActivity />}
              />
              <Route
                path="activities/prizes/:id"
                element={<PrizesActivity />}
              />
              <Route path="activities/contests" element={<Contests />} />
              <Route
                path="activities/contests/createteam/:contestId"
                element={<CreateTeam />}
              />
              <Route
                path="activities/contests/teamdetails/:teamId"
                element={<TeamDetails />}
              />
              <Route
                path="activities/contests/edit-team/:teamId"
                element={<EditTeam />}
              />
              <Route path="activities" element={<Activities />} />
              <Route path="allcourses" element={<AllCouses />} />
              <Route
                path="allcourses/videos/:subjectId"
                element={<StudentCourseDetails />}
              />
              <Route
                path="allcourses/materials/:subjectId"
                element={<StudentMaterialDetails />}
              />
              <Route
                path="/student/material-details/:subjectId/:materialId"
                element={<MaterialDetails />}
              />
              <Route
                path="allcourses/virtualrooms/:subjectId"
                element={<StudentVirtualRooms />}
              />
              <Route
                path="allcourses/questionbank/:subjectId"
                element={<StudentQuestionBank />}
              />
              <Route
                path="/student/question-details/:subjectId/:questionId"
                element={<StudentQuestionDetailes />}
              />
              <Route
                path="allcourses/exams/:gradeSubjectSemesterId"
                element={<StudentExams />}
              />
              <Route
                path="allcourses/exams/:gradeSubjectSemesterId/:examId"
                element={<StudentExamPage />}
              />
              <Route
                path="allcourses/exams/:gradeSubjectSemesterId/result/:examId"
                element={<StudentExamResultPage />}
              />
              <Route
                path="allcourses/assignments/:gradeSubjectSemesterId"
                element={<StudentAssignments />}
              />
              <Route
                path="allcourses/assignments/:gradeSubjectSemesterId/:assignmentId"
                element={<StudentAssignmentPage />}
              />
              <Route
                path="allcourses/assignments/:gradeSubjectSemesterId/submission/:assignmentId"
                element={<StudentAssignmentSubmittedpage />}
              />
              <Route path="attendance" element={<AttendancePage />} />
              <Route
                path="get-exam-schedule"
                element={<GetExamScheduleForStudent />}
              />
            </Route>
            {/* /////////////////parentpage//////////////////// */}

            <Route
              path="parent"
              element={
                <ProtectedRoute element={<Parents />} requiredRole="parent" />
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardParent />} />
              <Route path="parent-kids" element={<ParentKids />} />
              <Route
                path="edit-parent-profile"
                element={<EditParentProfile />}
              />
              <Route
                path="all-subjects/assignments/:subjectId"
                element={<AssignmentsParent />}
              />
              <Route
                path="activities"
                element={
                  <ProtectedRoute
                    element={<ParentActivities />}
                    requiredRole="parent"
                    requiresKid={true}
                  />
                }
              />
              <Route
                path="activities/detailes/:id"
                element={<DetailesParentActivity />}
              />
              <Route
                path="activities/prizes/:id"
                element={<PrizesParentActivity />}
              />
              <Route path="activities/contests" element={<ParentContests />} />
              <Route path="schedule" element={<ScheduleParent />} />
              <Route path="exam-schedule" element={<ParentExamSchedule />} />
              <Route path="motivation" element={<MotivationParent />} />
              <Route path="grades-for-child" element={<GradesForChild />} />
              <Route
                path="grades-for-semester"
                element={<GradesForSemesterForChild />}
              />
              <Route path="all-subjects" element={<AllCoursesParent />} />
              <Route
                path="all-subjects/virtualrooms/:subjectId"
                element={<VirtualRoomsParent />}
              />
              <Route
                path="grades-for-all-semesters"
                element={<GradesForAllSemestersForChild />}
              />

              <Route path="attendance" element={<AttendanceForChild />} />
              <Route
                path="all-subjects/exams/:subjectId"
                element={<ExamsParent />}
              />
            </Route>
            {/* /////////////////teacher pages//////////////////// */}
            <Route
              path="teacher"
              element={
                <ProtectedRoute element={<Teachers />} requiredRole="teacher" />
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardTeacher />} />
              <Route
                path="edit-teacher-profile"
                element={<EditTeacherProfile />}
              />
              <Route path="school-hubs" element={<SchoolHubs />} />
              <Route
                path="school-hubs/detailes/:id"
                element={<SchoolHubsDetailes />}
              />
              <Route
                path="school-hubs/prizes/:id"
                element={<SchoolHubsPrizes />}
              />
              <Route path="contests" element={<ActivityContests />} />
              <Route
                path="contests/participants/:contestId"
                element={<ParticipantsContests />}
              />
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
                path="currentcourseforattendance"
                element={<CurrentCourseForAttendance />}
              />
              <Route
                path="allcoursesforattendance"
                element={<AllCoursesForAttendance />}
              />
              <Route
                path="student-attendance-details/:id"
                element={<StudentAttendanceDetails />}
              />
              <Route path="materialform" element={<MaterialForm />} />
              <Route
                path="/teacher/addmaterial/:classId/:gradeSubjectSemesterId"
                element={<AddMaterial />}
              />
              <Route
                path="question-bank-form/:gradeSubjectSemesterId"
                element={<QuestionForm />}
              />
              <Route
                path="my-question-bank/:gradeSubjectSemesterId/my-questions"
                element={<SeeMyQuestion />}
              />
              <Route
                path="all-question-bank/:gradeSubjectSemesterId/all-questions"
                element={<SeeAllQuestion />}
              />
              <Route
                path="/teacher/my-all-question-bank/:gradeSubjectSemesterId/my-questions"
                element={<SeeMyAllQuestionAllYears />}
              />
              <Route
                path="/teacher/all-question-bank-allyears/:gradeSubjectSemesterId/all-questions"
                element={<SeeAllQuestionAllYears />}
              />
              <Route
                path="/teacher/edit-question/:questionId"
                element={<EditQuestion />}
              />
              <Route
                path="/teacher/exam-form/:classId/:gradeSubjectSemesterId"
                element={<ExamForm />}
              />
              <Route
                path="/teacher/my-exams/:gradeSubjectSemesterId"
                element={<SeeMyExams />}
              />

              <Route path="/teacher/exams/:examId" element={<EditExam />} />
              <Route
                path="/teacher/exam-details/:examId"
                element={<ExamDetailes />}
              />
              <Route
                path="/teacher/exam-results/:examId"
                element={<StudentResults />}
              />
              <Route
                path="/teacher/see-all-exams/:gradeSubjectSemesterId"
                element={<SeeAllExams />}
              />
              <Route
                path="/teacher/assignment-form/:classId/:gradeSubjectSemesterId"
                element={<AssignmentForm />}
              />
              <Route
                path="/teacher/all-assignment/:gradeSubjectSemesterId"
                element={<SeeAssignments />}
              />
              <Route
                path="/teacher/assignment-submissions/:assignmentId"
                element={<AssignmentSubmissions />}
              />

              <Route
                path="/teacher/edit-assignment/:assignmentId"
                element={<EditAssignment />}
              />
              <Route
                path="/teacher/submission-details/:submissionId"
                element={<SubmissionDetails />}
              />
              <Route
                path="/teacher/see-all-assignments-allYears/:gradeSubjectSemesterId"
                element={<SeeAllAssignments />}
              />
              <Route
                path="/teacher/all-assignment-submissions/:assignmentId"
                element={<AllSubmissionsForAssignment />}
              />
              <Route
                path="/teacher/allmaterial/:classId/:gradeSubjectSemesterId"
                element={<AllMaterialPage />}
              />
              <Route
                path="/teacher/materialform/:classId/:gradeSubjectSemesterId"
                element={<MaterialForm />}
              />
              <Route
                path="/teacher/see-material/:grade_subject_semester_id"
                element={<SeeMaterial />}
              />
              <Route
                path="/teacher/see-all-material/:grade_subject_semester_id"
                element={<SeeAllMaterial />}
              />
              <Route
                path="update-material/:materialId"
                element={<EditMaterial />}
              />
              <Route path="takeattendance/:id" element={<TakeAttendance />} />
              <Route
                path="attendancereport/:id"
                element={<Attendancereport />}
              />
              <Route
                path="/teacher/virtual-room/:grade_subject_semester_id"
                element={<SeeVR />}
              />
              <Route
                path="/teacher/all-virtual-room/:grade_subject_semester_id"
                element={<SeeAllVR />}
              />
              <Route
                path="/teacher/VR-form/:classId/:gradeSubjectSemesterId"
                element={<VRForm />}
              />
              <Route
                path="/teacher/vr-manger"
                element={<VirtualRoomsManger />}
              />
              <Route path="edit-vr/:id" element={<EditVR />} />
              <Route path="library-form" element={<LibraryForm />} />
              <Route
                path="all-subjects-library"
                element={<SubjectsInLibrary />}
              />
              <Route
                path="all-materials-library/:id"
                element={<MaterialsInLibrary />}
              />

              <Route path="library-item-form" element={<LibraryItemForm />} />

              <Route path="items-in-library" element={<ItemsInLIbrary />} />

              <Route path="item-in-library/:id" element={<ItemInLibrary />} />
              <Route
                path="update-item-library/:id"
                element={<UpdateItemLIbrary />}
              />

              <Route path="teacher-library" element={<LibraryTeacherPage />} />
              <Route
                path="library/:type/:itemId"
                element={<LibraryItemDetailsPageForTeacher />}
              />
              <Route path="motivation" element={<Motivation />} />
              <Route
                path="current-courses-for-grades"
                element={<CurrentCoursesForGrades />}
              />

              <Route
                path="exam-score/:classId/:gradeSubjectSemesterId/students"
                element={<GetStudentsForGrades />}
              />

              <Route
                path="exam-score/upload/:classId/:gradeSubjectSemesterId"
                element={<UploadFileGrades />}
              />

              <Route
                path="exam-results/:classId/:gradeSubjectSemesterId/:type"
                element={<GetStudentsWithGrades />}
              />
            </Route>

            {/* ///////////////manager pages//////////////////// */}
            <Route
              path="manager"
              element={
                <ProtectedRoute element={<Manager />} requiredRole="manager" />
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardManager />} />
              <Route
                path="edit-manager-profile"
                element={<EditManagerProfile />}
              />
              <Route path="school-hubs" element={<ManagerSchoolHubs />} />
              <Route
                path="school-hubs/detailes/:id"
                element={<ManagerSchoolHubsDetailes />}
              />
              <Route
                path="school-hubs/prizes/:id"
                element={<ManagerSchoolHubsPrizes />}
              />
              <Route
                path="school-hubs/participants/:schoolHubId"
                element={<ManagerSchoolHubsParticipants />}
              />
              <Route
                path="add-school-hubs"
                element={<ManagerSchoolHubsAdd />}
              />
              <Route
                path="edit-school-hubs/:id"
                element={<ManagerSchoolHubsEdit />}
              />
              <Route path="virtual-room" element={<ManagerVRTable />} />
              <Route path="virtual-room-form" element={<ManagerVRForm />} />
              <Route
                path="/manager/edit-virtual-room/:id"
                element={<EditVRManger />}
              />
              <Route path="grade" element={<ManagerGrade />} />

              <Route path="get-all-classes" element={<GetAllClasses />} />
              <Route
                path="get-attendance-class/:id"
                element={<GetAttendanceClass />}
              />
              <Route
                path="create-exam-schedule"
                element={<CreateExamSchedule />}
              />
              <Route path="get-exam-schedules" element={<GetExamSchedules />} />
              <Route
                path="get-exam-schedule/:id"
                element={<GetExamSchedule />}
              />

              <Route
                path="update-exam-schedule/:id"
                element={<UpdateExamSchedule />}
              />

              <Route
                path="get-all-schedule-classes"
                element={<GetAllScheduleClasses />}
              />
              <Route
                path="get-weekly-schedule/:id"
                element={<WeeklyScheduleForManager />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
