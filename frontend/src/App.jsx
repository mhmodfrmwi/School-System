import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Features/Auth/Login";
// import OnBoarding from "./Features/Auth/OnBoarding";
// import ChooseRole from "./Features/Auth/ChooseRole";
import Navbar from "./Features/Admin/components/navbar";
import FullBG from "./Features/Admin/components/FullBG";


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //   <Route index element={<OnBoarding />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="role" element={<ChooseRole />} />
    //   </Routes>
    // </BrowserRouter>
    <FullBG/>

  );
}

export default App;
