import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import userImage from "../../../assets/user.jpeg";
import SidebarImg from "../../../assets/footerOnboarding.png";
import Icon1 from "../../../assets/StudentIcon/Icon1.png";
import Icon2 from "../../../assets/StudentIcon/Icon2.png";
import Icon3 from "../../../assets/StudentIcon/Icon3.png";
import Icon4 from "../../../assets/StudentIcon/Icon4.png";
import Icon5 from "../../../assets/StudentIcon/Icon5.png";
import Icon6 from "../../../assets/StudentIcon/Icon6.png";
import Icon7 from "../../../assets/StudentIcon/Icon7.png";
// import Icon8 from "../../../assets/StudentIcon/Icon8.png";
import Icon12 from "../../../assets/StudentIcon/Icon12.png";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../../Features/Auth/AuthRedux/loginSlice";

const Sidebar = ({ kid = null, closeSidebar, setSelectedKid }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, profileImage } = useSelector((state) => state.login);
  const selectedKid = JSON.parse(localStorage.getItem("selectedKid"));
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("role");
    navigate("/role");
    closeSidebar();
  };

  const handleHomeClick = () => {
    if (kid) {
      navigate("/parent/dashboard", { state: { selectedKid: kid } });
    } else {
      navigate("/parent");
    }
    closeSidebar();
  };
  const menuItems = [
    { label: t("Home"), icon: Icon1, onClick: handleHomeClick },
    { label: t("parentKids.title"), icon: Icon2, path: "/parent/parent-kids" },
    { label: t("Motivation"), icon: Icon2, path: "/parent/motivation" },
    { label: t("Courses"), icon: Icon3, path: "/parent/exams" },
    { label: t("Absence"), icon: Icon4, path: "/parent/attendance" },
    { label: t("Schedule"), icon: Icon5, path: "/parent/schedule" },
    {
      label: t("GradeManagements"),
      icon: Icon6,
      path: "/parent/grades-for-child",
    },
    { label: t("Activities"), icon: Icon7, path: "/parent/activities" },
    // { label: t("Library"), icon: Icon8, path: "/parent/library" },
    {
      label: t("Logout"),
      icon: Icon12,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className={`fixed top-0 z-50 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-[#281459] dark:shadow-gray-900 ${i18n.language === "ar" ? "right-0" : "left-0"}`}
    >
      <div className="relative bg-[#EEE8F6] p-6 text-[#043B44] dark:bg-[#2D0C77] dark:text-white">
        <button
          onClick={closeSidebar}
          className={`absolute top-2 text-2xl text-[#043B44] hover:text-gray-600 dark:text-white dark:hover:text-gray-300 ${i18n.language === "ar" ? "left-1" : "right-1"}`}
        >
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-[#c0cce6] font-poppins dark:bg-[#5A4A7B] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}
          >
            <FontAwesomeIcon icon={faTimes} className="mx-4 h-4 w-4" />
          </div>
        </button>
        <div className="flex items-center justify-between">
          <div
            className={`${i18n.language === "ar" ? "text-right" : "text-left"}`}
          >
            <h2 className="font-poppins text-lg font-bold">
              {t("KhatabSchool")}
            </h2>
            <p className="font-poppins text-sm text-gray-400 dark:text-gray-300">
              Term1 2025-2026
            </p>
          </div>
          <img src={SidebarImg} alt="Logo" className="h-20 w-20" />
        </div>
      </div>

      <div className={`flex items-center p-4`}>
        <img
          src={
            profileImage && profileImage !== "Unknown"
              ? profileImage
              : userImage
          }
          alt="User"
          className="h-8 w-8 rounded-full md:h-10 md:w-10"
          onError={(e) => {
            e.target.src = userImage;
          }}
        />
        <div
          className={
            i18n.language === "ar" ? "mr-2 text-right" : "ml-2 text-left"
          }
        >
          <p className="font-poppins font-semibold text-[#043B44] dark:text-white">
            {fullName}
          </p>
          <p className="font-poppins text-sm text-gray-400 dark:text-gray-300">
            {t("Parent")}
          </p>

          {/* {selectedKid && (
                        <>
                            <p className="font-poppins font-semibold text-[#043B44] dark:text-white mt-1">
                                {selectedKid.fullName}
                            </p>
                            <p className="font-poppins text-xs text-gray-400 dark:text-gray-300">
                                {t('Selected Child')}
                            </p>
                        </>
                    )} */}
        </div>
      </div>

      <nav className="mt-4 h-[calc(100vh-200px)] overflow-y-auto">
        <ul className={`${i18n.language === "ar" ? "pr-2" : "pl-2"}`}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  navigate(item.path);
                  closeSidebar();
                }
              }}
              className={`flex cursor-pointer items-center p-2 font-poppins text-[#043B44] transition-transform duration-200 hover:bg-gray-100 hover:shadow-sm dark:text-white dark:hover:bg-[#5A4A7B] ${i18n.language === "ar" ? "justify-start" : "justify-start"}`}
            >
              <div className={`flex items-center`}>
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="h-6 w-6"
                />
                <span className={`${i18n.language === "ar" ? "mr-2" : "ml-2"}`}>
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none;
        }
        nav {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
