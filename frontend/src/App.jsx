import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Login";
import OnBoarding from "./Features/Auth/OnBoarding";
import ChooseRole from "./Features/Auth/ChooseRole";
import StudentForm from "./Features/Admin/components/Students/studentForm";
import BasicForm from "./Features/Admin/components/basicForm";
import DashboardAdmin from "./Features/Admin/Pages/DashboardAdmin";
import AllStudent from "./Features/Admin/Pages/StudentTablePage";
import ParentForm from "./Features/Admin/components/Parents/parentForm";
import ScheduleForm from "./Features/Admin/components/Schedule/scheduleForm";
import TeacherForm from "./Features/Admin/components/Teachers/teacherForm";
import TeacherInfo from "./Features/Admin/components/Teachers/teacherInfo";
import AdminForm from "./Features/Admin/components/Admins/adminForm";
import ManagerForm from "./Features/Admin/components/Managers/managerForm";
import AllParents from "./Features/Admin/Pages/ParentTablePage";
import AllTeachers from "./Features/Admin/pages/TeacherTablePage";
import AllManagers from "./Features/Admin/pages/ManagerTablePage";
import AllAdmins from "./Features/Admin/Pages/AdminTablePage";
import AllSchedules from "./Features/Admin/Pages/ScheduleTablePage";
import AllTerms from "./Features/Admin/Pages/TermPage";
import TermForm from "./Features/Admin/components/Terms/termForm";
import Admins from "./Features/Admin/Pages/Admins";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./ui/PageNotFound";
import EditTeacher from "./Features/Admin/components/Teachers/editTeacher";
import AcademicYearForm from "./Features/Admin/components/AcademicYears/academicYearForm";
import EditAcademicYearForm from "./Features/Admin/components/AcademicYears/editAcademicYearForm";
import AllAcademicYears from "./Features/Admin/Pages/AcademicYearPage";
import SubjectDetails from "./Features/Admin/components/Subjects/AllAssignedSubjects";
import SubjectsList from "./Features/Admin/components/Subjects/AllSubjects";
import AddSubject from "./Features/Admin/components/Subjects/AddSubjectManagement";
import AllGrades from "./Features/Admin/Pages/GradePage";
import GradeForm from "./Features/Admin/components/Grades/GradeForm";
import EditGradeForm from "./Features/Admin/components/Grades/EditGradeForm";
import AssignGrade from "./Features/Admin/components/Grades/AssignGrade";
import Students from "./Features/Student/pages/Students";
import DashboardStudent from "./Features/Student/pages/DashboardStudent";
import Grades from "./Features/Student/components/Grades/Grades";
import GradesAssignment from "./Features/Student/components/Grades/GradesAssignment";
import GradesExam from "./Features/Student/components/Grades/GradesExam";
import Schedule from "./Features/Student/components/Schedule/schedule";
import ScheduleExam from "./Features/Student/components/Schedule/scheduleExam";
import LibraryBooksEnglish from "./Features/Student/components/Library/LibraryBooksEnglish";
import Parents from "./Features/Parent/pages/Parents";
import DashboardParent from "./Features/Parent/pages/DashboardParent";
import EditAdminForm from "./Features/Admin/components/Admins/editAdmin";

import AssignSubject from "./Features/Admin/components/Subjects/AssignSubject";
import EditSubject from "./Features/Admin/components/Subjects/EditSubject";
import EditAssignedSubject from "./Features/Admin/components/Subjects/EditAssignedSubject";
import ClassTeacherForm from "./Features/Admin/components/ClassTeacher.jsx/classTeacherForm";
import AllClassTeacher from "./Features/Admin/Pages/classTeacherTablePage";
function App() {
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
      <Routes>
        <Route index element={<OnBoarding />} />
        <Route path="login" element={<Login />} />
        <Route path="role" element={<ChooseRole />} />
        {/* /////////////////adminpage//////////////////// */}
        <Route path="admin" element={<Admins />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="basicform" element={<BasicForm />} />
          <Route path="studentform" element={<StudentForm />} />
          <Route path="allstudent" element={<AllStudent />} />
          <Route path="managerform" element={<ManagerForm />} />
          <Route path="allmanagers" element={<AllManagers />} />
          <Route path="allparents" element={<AllParents />} />
          <Route path="parentform" element={<ParentForm />} />
          <Route path="scheduleform" element={<ScheduleForm />} />
          <Route path="allschedules" element={<AllSchedules />} />
          <Route path="allTerms" element={<AllTerms />} />
          <Route path="termform" element={<TermForm />} />
          <Route path="allteachers" element={<AllTeachers />} />
          <Route path="teacherform" element={<TeacherForm />} />
          <Route path="editteacher/:id" element={<EditTeacher />} />
          <Route path="teacherinfo" element={<TeacherInfo />} />
          <Route path="classteacherform" element={<ClassTeacherForm />} />
          <Route path="allclassteacher" element={<AllClassTeacher />} />
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
          <Route path="gradeform" element={<GradeForm />} />
          <Route path="editGradeForm/:id" element={<EditGradeForm />} />
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
        </Route>
        {/* /////////////////studentpage//////////////////// */}
        <Route path="student" element={<Students />}>
          <Route index element={<DashboardStudent />} />
          <Route path="grades" element={<Grades />} />
          <Route path="grades/assignment" element={<GradesAssignment />} />
          <Route path="grades/exam" element={<GradesExam />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="schedule/exam" element={<ScheduleExam />} />
          <Route path="librarybooksenglish" element={<LibraryBooksEnglish />} />
        </Route>
        {/* /////////////////parentpage//////////////////// */}
        <Route path="parent" element={<Parents />}>
          <Route index element={<DashboardParent />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
