import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Admins = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // تحقق من اتجاه اللغة الحالية عند التحميل وعند تغيير اللغة
    setIsRTL(i18n.language === "ar");
    
    // تغيير اتجاه الصفحة في وسم HTML
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
        className={`my-5 ${isRTL ? "mr-0 ml-5" : "ml-0 mr-5"} flex flex-1 flex-col rounded-lg bg-white shadow-lg`}
      >
        <Navbar 
          setIsSidebarOpen={setIsSidebarOpen} 
          isRTL={isRTL} 
        />
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admins;