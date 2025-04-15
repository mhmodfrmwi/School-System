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
import Icon8 from "../../../assets/StudentIcon/Icon8.png";
import Icon12 from "../../../assets/StudentIcon/Icon12.png";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { logout } from "../../../Features/Auth/AuthRedux/loginSlice";

const Sidebar = ({ closeSidebar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName } = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("role");
    navigate("/role");
    closeSidebar();
  };

  const menuItems = [
    { label: t('Home'), icon: Icon1, path: "/student" },
    { label: t('Motivation'), icon: Icon2, path: "/student/motivation" },
    { label: t('Courses'), icon: Icon3, path: "/student/allcourses" },
    { label: t('Absence'), icon: Icon4, path: "/student/attendance" },
    { label: t('Schedule'), icon: Icon5, path: "/student/schedule" },
    { label: t('GradeManagements'), icon: Icon6, path: "/student/grades" },
    { label: t('Activities'), icon: Icon7, path: "/student/activities" },
    { label: t('Library'), icon: Icon8, path: "/student/library" },
    { 
      label: t('Logout'), 
      icon: Icon12, 
      onClick: handleLogout 
    },
  ];

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-72 transform bg-white dark:bg-[#281459] shadow-lg dark:shadow-gray-900 transition-transform duration-300 ease-in-out">
      <div className="relative bg-[#EEE8F6] dark:bg-[#2D0C77] p-6 text-[#043B44] dark:text-white">
        <button
          onClick={closeSidebar}
          className="absolute right-1 top-2 text-2xl text-[#043B44] dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
        >
          <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#c0cce6] dark:bg-[#5A4A7B] font-poppins">
            <FontAwesomeIcon icon={faTimes} className="mx-4 h-4 w-4" />
          </div>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-lg font-bold">{t('KhatabSchool')}</h2>
            <p className="font-poppins text-sm text-gray-400 dark:text-gray-300">
              Term1 2025-2026
            </p>
          </div>
          <img src={SidebarImg} alt="Logo" className="h-20 w-20" />
        </div>
      </div>

      <div className="flex items-center p-4">
        <img src={userImage} alt="User" className="h-10 w-10 rounded-full" />
        <div className="ml-2">
          <p className="font-poppins font-semibold text-[#043B44] dark:text-white">{fullName}</p>
          <p className="font-poppins text-sm text-gray-400 dark:text-gray-300">G/3 Student</p>
        </div>
      </div>

      <nav className="mt-4 h-[calc(100vh-200px)] overflow-y-auto">
        <ul>
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
              className="flex cursor-pointer items-center p-2 font-poppins text-[#043B44] dark:text-white transition-transform duration-200 hover:bg-gray-100 dark:hover:bg-[#5A4A7B] hover:shadow-sm"
            >
              <img
                src={item.icon}
                alt={`${item.label} icon`}
                className="mr-2 h-6 w-6"
              />
              {item.label}
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