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
import CourseForm from "./Features/Admin/components/Course/courseForm";
import CourseTable from "./Features/Admin/components/Course/courseTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./ui/PageNotFound";
import EditTeacher from "./Features/Admin/components/Teachers/editTeacher";
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
          <Route path="editteacher" element={<EditTeacher />} />
          <Route path="teacherinfo" element={<TeacherInfo />} />
          <Route path="adminform" element={<AdminForm />} />
          <Route path="alladmins" element={<AllAdmins />} />
          <Route path="courseform" element={<CourseForm />} />
          <Route path="allcourses" element={<CourseTable />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
