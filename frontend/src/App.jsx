import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Login";
import OnBoarding from "./Features/Auth/OnBoarding";
import ChooseRole from "./Features/Auth/ChooseRole";
import Students from "./Features/Admin/Pages/Students";
import StudentForm from "./Features/Admin/components/Students/studentForm";
import BasicForm from "./Features/Admin/components/basicForm";
import DashboardAdmin from "./Features/Admin/Pages/DashboardAdmin";
import AllStudent from "./Features/Admin/Pages/StudentTablePage";
import ParentForm from "./Features/Admin/components/Parents/parentForm";
import TeacherForm from "./Features/Admin/components/Teachers/teacherForm";
import AdminForm from "./Features/Admin/components/Admins/adminForm";
import ManagerForm from "./Features/Admin/components/Managers/managerForm";
import AllParents from "./Features/Admin/Pages/ParentTablePage";
import AllTeachers from "./Features/Admin/pages/TeacherTablePage";
import AllManagers from "./Features/Admin/pages/ManagerTablePage";
import AllAdmins from "./Features/Admin/Pages/AdminTablePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<OnBoarding />} />
        <Route path="login" element={<Login />} />
        <Route path="role" element={<ChooseRole />} />
        <Route path="students" element={<Students />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="basicform" element={<BasicForm />} />
          <Route path="studentform" element={<StudentForm />} />
          <Route path="allstudent" element={<AllStudent />} />
          <Route path="parentform" element={<ParentForm />} />
          <Route path="teacherform" element={<TeacherForm />} />
          <Route path="adminform" element={<AdminForm />} />
          <Route path="managerform" element={<ManagerForm />} />
          <Route path="allparents" element={<AllParents />} />
          <Route path="allteachers" element={<AllTeachers />} />
          <Route path="allmanagers" element={<AllManagers />} />
          <Route path="alladmins" element={<AllAdmins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
