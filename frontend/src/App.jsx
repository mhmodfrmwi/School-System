import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Login";
import OnBoarding from "./Features/Auth/OnBoarding";
import ChooseRole from "./Features/Auth/ChooseRole";
import Student from "./Features/Admin/Pages/Students";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<OnBoarding />} />
        <Route path="login" element={<Login />} />
        <Route path="role" element={<ChooseRole />} />
        <Route path="students" element={<Student/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
