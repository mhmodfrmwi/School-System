import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
// function Students() {
//   return (
//     <div>
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// }

// export default Students;

function Students() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Students;
