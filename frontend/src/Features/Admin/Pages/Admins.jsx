import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChatBot from "@/Features/Chatbot/Chatbot";

const Admins = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(i18n.language === "ar");

    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div
      className={`flex min-h-screen bg-[#117C90] dark:bg-[#043B44] ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isRTL={isRTL}
      />

      <div
        className={`my-5 ${isRTL ? "ml-5 mr-0" : "ml-0 mr-5"} flex flex-1 flex-col rounded-lg bg-white shadow-lg`}
      >
        <Navbar setIsSidebarOpen={setIsSidebarOpen} isRTL={isRTL} />
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default Admins;
