import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Login";
import OnBoarding from "./Features/Auth/OnBoarding";
import ChooseRole from "./Features/Auth/ChooseRole";
import Students from "./Features/Admin/Pages/Students";
import StudentForm from "./Features/Admin/components/studentForm";
import BasicForm from "./Features/Admin/components/basicForm";
import AllStudent from "./Features/Admin/components/AllStudent";
import DashboardAdmin from "./Features/Admin/components/DashboardAdmin";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
