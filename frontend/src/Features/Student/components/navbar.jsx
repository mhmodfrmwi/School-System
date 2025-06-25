import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSliders, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import InfoIcon from "../../../assets/icons/InfoS.svg";
import userImage from "../../../assets/user.jpeg"; // الصورة الافتراضية
import languageE from "../../../assets/icons/languageS.svg";
import languageA from "../../../assets/icons/languageA.svg";
import Vector from "../../../assets/icons/Vector.svg";
import logout2 from "../../../assets/icons/logout.svg";
import Logo from "../../../assets/logologin.png";
import Menu from "../../../assets/StudentIcon/Menue.png";
import ThemeSwitcher from "@/ui/ThemeSwitcher";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import { logout } from "../../../Features/Auth/AuthRedux/loginSlice";
import NavbarNotification from "./../../Notification/Notification/NavbarNotification";
import { motion } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
  const [settingToggle, setSettingToggle] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { fullName, profileImage } = useSelector((state) => state.login); // جيبنا profileImage

  const handleUserLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("role");
    navigate("/role");
  };

  const routes = [
    { path: "dashboard" },
    { path: "grades" },
    { path: "grades-for-semester" },
    { path: "grades-for-allyears" },
    { path: "schedule" },
    { path: "library" },
    { path: "librarybooks" },
    { path: "libraryvideos" },
    { path: "motivation" },
    { path: "edit-student-profile" },
    { path: "activities/contests" },
    { path: "activities" },
    { path: "allcourses" },
    { path: "attendance" },
    { path: "get-exam-schedule" },
  ];

  const filteredRoutes = routes.filter((route) => {
    const englishMatch = route.path
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const arabicMatch = t(`routes.${route.key}`).includes(searchTerm);
    return englishMatch || arabicMatch;
  });

  const handleSelect = (path) => {
    setSearchTerm("");
    setIsDropdownOpen(false);
    navigate(path);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const route = routes.find((r) =>
        r.path.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchTerm("");
      setIsDropdownOpen(false);
      if (route) {
        navigate(`/student/${searchTerm}`);
      } else {
        alert("No matches found.");
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const url = window.location.pathname;
  const studentName = url.split("/student/").pop();
  const match = url.match(/\/student\/([^/]+)/);
  const name = match ? match[1] : "";

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingToggle(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="relative z-50">
      <div className="flex h-16 w-full max-w-full items-center justify-between bg-white px-4 shadow-md dark:bg-[#13082F] dark:shadow-[0_4px_15px_rgba(224,170,238,0.3)]">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex rounded-lg p-2"
          >
            <img src={Menu} alt="Menu" className="h-8 w-8" />
          </button>
          <button
            onClick={handleBack}
            className="hidden rounded-lg border-2 border-[#FD813D] bg-[#FFD4AD] p-1 text-[#FD813D] dark:border-[#FFD4AD] dark:bg-[#6B4B3E] dark:text-[#FFD4AD] lg:flex"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <Link to="/student">
            <img
              src={Logo}
              alt="Logo"
              className="h-9 w-9 cursor-pointer object-contain"
            />
          </Link>
          <p
            className="hidden font-inter text-lg font-semibold text-[#3D52A1] dark:text-[#A3BFFA] lg:flex"
            onClick={() => {
              if (name !== "/student") {
                navigate(`/student/${name}`);
              }
            }}
          >
            {studentName === "/student" ? "student" : `${name}`}
          </p>
        </div>

        <div
          className="relative ml-auto hidden max-w-sm sm:flex rtl:ml-0 rtl:mr-auto"
          ref={searchRef}
        >
          <div className="mx-auto w-[75%] max-w-md lg:w-[90%]">
            {!isDropdownOpen && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("SearchStudentPage")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={() => setIsDropdownOpen(true)}
                  className={`w-full rounded-full border bg-gray-100 py-2 pl-12 pr-12 text-center font-poppins text-sm text-gray-800 focus:outline-none dark:bg-gray-700 dark:text-gray-200 md:text-left md:text-base ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  }`}
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                />
                <div
                  className={`absolute ${
                    i18n.language === "ar" ? "right-4" : "left-4"
                  } top-1/2 -translate-y-1/2 transform`}
                >
                  <FaSearch className="text-lg text-gray-400" />
                </div>
              </div>
            )}

            {isDropdownOpen && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
                <div className="z-20 mb-4 w-[60vw]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("SearchStudentPage")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full rounded-full border bg-white py-2 pl-12 pr-12 text-center font-poppins text-sm text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200 md:text-left md:text-base ${
                        i18n.language === "ar" ? "text-left" : "text-left"
                      }`}
                      dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                      <FaSearch className="text-lg text-gray-400" />
                    </div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                      aria-label="Close search"
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      />
                    </button>
                  </div>
                </div>

                <motion.ul
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-20 h-[50vh] max-h-[50vh] w-[60vw] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                  role="listbox"
                >
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route, index) => (
                      <motion.li
                        key={route.path}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(route.path);
                        }}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSelect(route.path)
                        }
                        className={`search-result-item flex cursor-pointer items-center justify-center px-4 py-3 font-medium text-gray-800 transition-colors duration-150 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-700 ${
                          index === 0 ? "rounded-t-lg" : ""
                        } ${
                          index === filteredRoutes.length - 1
                            ? "rounded-b-lg"
                            : ""
                        }`}
                        role="option"
                        tabIndex={0}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent dark:from-[#FD813D] dark:via-[#CF72C0] dark:to-[#BC6FFB] md:text-2xl">
                            {route.path.replace("/student/", "")}
                          </span>
                        </div>
                      </motion.li>
                    ))
                  ) : (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center px-4 py-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center py-4">
                        <svg
                          className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          {t("NoMatches")}
                        </span>
                        <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {t("TryDifferentSearch")}
                        </span>
                      </div>
                    </motion.li>
                  )}
                </motion.ul>
              </div>
            )}
          </div>

          {!isDropdownOpen && (
            <div
              className={`absolute ${
                i18n.language === "ar"
                  ? "left-14 lg:left-6"
                  : "right-14 lg:right-7"
              } top-1/2 -translate-y-1/2 transform`}
            >
              <FontAwesomeIcon
                icon={faSliders}
                className="text-lg text-gray-400"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 md:space-x-6">
          <button className="relative p-2 text-gray-500 dark:text-gray-300">
            <NavbarNotification />
          </button>

          <button
            className="p-2 text-gray-500 dark:text-gray-300"
            onClick={() => navigate("/student")}
          >
            <ReactSVG src={InfoIcon} className="h-auto w-auto" />
          </button>

          <div className="flex items-center">
            <img
              src={
                profileImage && profileImage !== "Unknown"
                  ? profileImage
                  : userImage
              }
              alt="User"
              className="me-5 h-8 w-8 rounded-full md:h-10 md:w-10"
              onError={(e) => {
                e.target.src = userImage; // لو الصورة ماتحملتش، نرجع للصورة الافتراضية
              }}
            />
            <span className="hidden font-poppins text-sm font-semibold text-[#3D52A1] dark:text-[#A3BFFA] md:text-base lg:flex">
              {fullName}
            </span>
          </div>
          <button
            className="p-2 text-2xl text-gray-500 dark:text-gray-300 md:text-3xl"
            onClick={() => setSettingToggle(!settingToggle)}
          >
            <IoSettingsOutline />
          </button>

          {settingToggle && (
            <div
              ref={settingsRef}
              className={`absolute ${i18n.language === "ar" ? "left-5" : "right-5"} top-20 z-20 h-72 w-56 rounded-xl bg-gradient-to-b from-[#D1B5FF] to-[#AB92ED] dark:from-[#4B3D6B] dark:to-[#2D1E4A]`}
            >
              <div>
                <div
                  className="mx-auto ms-7 mt-3 flex cursor-pointer flex-row items-center"
                  onClick={() => navigate("edit-student-profile")}
                >
                  <button className="p-2 text-gray-500 dark:text-gray-300">
                    <ReactSVG src={Vector} className="h-auto w-auto" />
                  </button>
                  <h2 className="font-semibold text-white dark:text-gray-200">
                    {t("EditProfile")}
                  </h2>
                </div>
                <p className="mx-auto my-2 w-40 border-b-2 border-white dark:border-gray-500"></p>
              </div>

              <div className="mx-auto flex items-center justify-center">
                <ThemeSwitcher />
              </div>
              <p className="mx-auto my-2 w-28 border-b-2 border-white dark:border-gray-500"></p>
              <button
                className="mx-auto ms-6 p-2 text-[#C459D9] dark:text-[#D6BCFA]"
                onClick={toggleLanguage}
              >
                <ReactSVG
                  src={i18n.language === "en" ? languageA : languageE}
                  className="h-auto w-auto"
                />
              </button>
              <p className="mx-auto my-2 w-28 border-b-2 border-white dark:border-gray-500"></p>

              <div
                className="mx-auto ms-12 mt-5 flex cursor-pointer flex-row items-center"
                onClick={handleUserLogout}
              >
                <button className="p-2 text-gray-500 dark:text-gray-300">
                  <ReactSVG src={logout2} className="h-auto w-auto" />
                </button>
                <h2 className="font-semibold text-white dark:text-gray-200">
                  {t("Logout")}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-30 backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </>
      )}
    </div>
  );
};

export default Navbar;
