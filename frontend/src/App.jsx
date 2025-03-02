import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Features/Auth/ProtectedRoute";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./ui/PageNotFound";

import SeeVR from "./Features/Teacher/components/courses/VR/SeeVR";
import EditVR from "./Features/Teacher/components/courses/VR/UpdateVR";
import LibraryForm from "./Features/Teacher/components/Library/libraryForm";
import SubjectsInLibrary from "./Features/Teacher/components/Library/subjectsInLibrary";
import MaterialsInLibrary from "./Features/Teacher/components/Library/materialsInLibrary";
import SchedualTable from "./Features/Manager/components/Schedule/ScheduleTable";
import FormShedule from "./Features/Manager/components/Schedule/ScheduleForm";
import ManagerVRTable from "./Features/Manager/components/VR/MangerVRTable";
import ManagerVRForm from "./Features/Manager/components/VR/ManagerVRForm";
import DashboardTeacher from "./Features/Teacher/pages/DashboardTeacher";
import TitleUpdater from "./ui/TitleUpdater";
import AllMaterialPage from "./Features/Teacher/components/courses/AllYearsMaterual/AllMaterialPage";
import SeeAllVR from "./Features/Teacher/components/courses/AllYearsMaterual/SeeAllVR";

import ItemsInLIbrary from "./Features/Teacher/components/Library/itemsInLIbrary";
import ItemInLibrary from "./Features/Teacher/components/Library/itemInLibrary";
import LibraryItemForm from "./Features/Teacher/components/Library/libraryItemForm";
import UpdateItemLIbrary from "./Features/Teacher/components/Library/updateItemLIbrary";
import SeeAllMaterial from "./Features/Teacher/components/courses/AllYearsMaterual/SeeAllMaterial";
import QuestionForm from "./Features/Teacher/components/courses/QuestionBank/FormQuestionBank";
import SeeMyQuestion from "./Features/Teacher/components/courses/QuestionBank/SeeMyQuestions";
import SeeAllQuestion from "./Features/Teacher/components/courses/QuestionBank/SeeAllQuestions";
import EditQuestion from "./Features/Teacher/components/courses/QuestionBank/EditQuestions";
import ExamForm from "./Features/Teacher/components/courses/Exams/ExamForm";
import Motivation from "./Features/Teacher/components/Motivation/Motivation";
import Loader from "./ui/Loader";

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
const LibraryVideosPage = lazy(
  () => import("./Features/Student/components/Library/LibraryVideosPage"),
);
const LibraryBooksPage = lazy(
  () => import("./Features/Student/components/Library/LibraryBooksPage"),
);
const LibraryItemDetailsPage = lazy(
  () => import("./Features/Student/components/Library/LibraryItemDetailsPage"),
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
const AttendancePage = lazy(
  () => import("./Features/Student/components/Attendance/AttendancePage"),
);
const GradesParent = lazy(
  () => import("./Features/Parent/components/Grades/Grades"),
);
const EditParentProfile = lazy(
  () => import("./Features/Parent/pages/EditProfilePage"),
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
const MaterialDetails = lazy(
  () => import("./Features/Student/components/courses/MaterialDetails"),
);
const VRForm = lazy(
  () => import("./Features/Teacher/components/courses/VR/FormVR"),
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

function App() {
  const role =
    useSelector((state) => state.role.role) || localStorage.getItem("role");

  return (
    <BrowserRouter>
      <TitleUpdater />
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

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Navigate replace to="onboarding" />} />
          <Route path="onboarding" element={<OnBoarding />} />
          <Route
            path="/login"
            element={role ? <Login /> : <Navigate to="/role" />}
          />
          <Route path="role" element={<ChooseRole />} />
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
            <Route path="grades/assignment" element={<GradesAssignment />} />
            <Route path="grades/exam" element={<GradesExam />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="schedule/exam" element={<ScheduleExam />} />
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
            <Route path="activities/prizes/:id" element={<PrizesActivity />} />
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
              path="allcourses/exams/:gradeSubjectSemesterId/:classId"
              element={<StudentExams />}
            />
            <Route
              path="allcourses/exams/:subjectId/:examId"
              element={<StudentExamPage />}
            />
            <Route path="attendance" element={<AttendancePage />} />
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
            <Route path="grades" element={<GradesParent />} />
            <Route path="edit-parent-profile" element={<EditParentProfile />} />
            <Route
              path="grades/assignment"
              element={<GradesAssignmentParent />}
            />
            <Route path="grades/exam" element={<GradesExamParent />} />
            <Route path="schedule" element={<ScheduleParent />} />
            <Route path="schedule/exam" element={<ScheduleExamParent />} />
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
              path="/teacher/edit-question/:questionId"
              element={<EditQuestion />}
            />
            <Route
              path="/teacher/exam-form/:classId/:gradeSubjectSemesterId"
              element={<ExamForm />}
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
            <Route path="attendancereport/:id" element={<Attendancereport />} />
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
            <Route path="add-school-hubs" element={<ManagerSchoolHubsAdd />} />
            <Route
              path="edit-school-hubs/:id"
              element={<ManagerSchoolHubsEdit />}
            />
            <Route path="schedule-table" element={<SchedualTable />} />
            <Route path="schedule-form" element={<FormShedule />} />
            <Route path="virtual-room" element={<ManagerVRTable />} />
            <Route path="virtual-room-form" element={<ManagerVRForm />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
