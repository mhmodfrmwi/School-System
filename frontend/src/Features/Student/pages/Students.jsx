import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentPerformanceModal from "./studentModal";
import ChatBot from "@/Features/Chatbot/Chatbot";

function Students() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <StudentPerformanceModal />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default Students;
