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
import ScheduleForm from "./Features/Admin/components/Schedule/scheduleForm";
import TeacherForm from "./Features/Admin/components/Teachers/teacherForm";
import AdminForm from "./Features/Admin/components/Admins/adminForm";
import ManagerForm from "./Features/Admin/components/Managers/managerForm";
import AllParents from "./Features/Admin/Pages/ParentTablePage";
import AllTeachers from "./Features/Admin/pages/TeacherTablePage";
import AllManagers from "./Features/Admin/pages/ManagerTablePage";
import AllAdmins from "./Features/Admin/Pages/AdminTablePage";
import AllSchedules from "./Features/Admin/Pages/ScheduleTablePage";
import AllTerms from "./Features/Admin/Pages/TermPage";
import TermForm from "./Features/Admin/components/Terms/termForm";
import Managers from "./Features/Admin/Pages/Managers";
import Parents from "./Features/Admin/Pages/Parents";
import Schedules from "./Features/Admin/Pages/Schedules";
import Terms from "./Features/Admin/Pages/Terms";

import Teachers from "./Features/Admin/Pages/Teachers";
import Admins from "./Features/Admin/Pages/Admins";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<OnBoarding />} />
        <Route path="login" element={<Login />} />
        <Route path="role" element={<ChooseRole />} />
        <Route path="admin" element={<Admins />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="basicform" element={<BasicForm />} />
          <Route path="students">
            <Route path="studentform" element={<StudentForm />} />
            <Route path="allstudent" element={<AllStudent />} />
          </Route>
          <Route path="managers">
            <Route path="managerform" element={<ManagerForm />} />
            <Route path="allmanagers" element={<AllManagers />} />
          </Route>
          <Route path="parents">
            <Route path="allparents" element={<AllParents />} />
            <Route path="parentform" element={<ParentForm />} />
          </Route>
          <Route path="schedules">
            <Route path="scheduleform" element={<ScheduleForm />} />
            <Route path="allschedules" element={<AllSchedules />} />
          </Route>
          <Route path="terms">
            <Route path="allTerms" element={<AllTerms />} />
            <Route path="termform" element={<TermForm />} />
          </Route>
          <Route path="teachers">
            <Route path="allteachers" element={<AllTeachers />} />
            <Route path="teacherform" element={<TeacherForm />} />
          </Route>
          <Route path="admins">
            <Route path="adminform" element={<AdminForm />} />
            <Route path="alladmins" element={<AllAdmins />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
