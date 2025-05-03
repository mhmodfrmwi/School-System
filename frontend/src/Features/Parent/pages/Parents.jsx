import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ChatBot from "../../Chatbot/Chatbot";

function Parents() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar role="parent" />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default Parents;