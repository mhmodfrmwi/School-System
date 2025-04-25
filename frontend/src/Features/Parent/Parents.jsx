import { Outlet } from "react-router-dom";
import ChatBot from "../Chatbot/Chatbot";

function Parents() {
  return (
    <div>
      <Outlet />
      <ChatBot />
    </div>
  );
}

export default Parents;
