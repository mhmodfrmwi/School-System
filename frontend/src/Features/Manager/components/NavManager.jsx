import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import InfoIcon from "../../../assets/icons/Info.svg";
import userImage from "../../../assets/user.jpeg";
import languageE from "../../../assets/icons/languageET.svg";
import languageA from "../../../assets/icons/languageAT.svg";
import Vector from "../../../assets/icons/Vector.svg";
import logout2 from "../../../assets/icons/logout.svg";
import ThemeSwitcher from "@/ui/ThemeSwitcher";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../../Features/Auth/AuthRedux/loginSlice"; // تأكد من المسار الصحيح
import NavbarNotification from "./../../Notification/SendNotifications/NavbarNotification";
import { motion } from "framer-motion";
const NavManager = () => {
  const navigate = useNavigate();
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [settingToggle, setSettingToggle] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { fullName, profileImage } = useSelector((state) => state.login);

  const handleUserLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("role");
    navigate("/role");
  };

  const routes = [
    { path: "dashboard" },
    { path: "edit-manager-profile" },
    { path: "school-hubs" },
    { path: "add-school-hubs" },
    { path: "virtual-room" },
    { path: "virtual-room-form" },
    { path: "grade" },
    { path: "get-all-classes" },
    { path: "create-exam-schedule" },
    { path: "get-exam-schedules" },
    { path: "get-all-schedule-classes" },
  ];

  const filteredRoutes = routes.filter((route) =>
    route.path.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      const count = searchTerm.length;
      setSearchTerm("");
      setIsDropdownOpen(false);

      if (route.path.length === count) {
        navigate(`/manager/${searchTerm}`);
      } else {
        alert("No matching page found.");
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
  const managerName = url.split("/manager/").pop();
  const match = url.match(/\/manager\/([^/]+)/);
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
    <div className="relative">
      <div className="flex h-16 w-full max-w-full items-center justify-between bg-white px-4 shadow-md">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={handleBack}
            className="hidden rounded-lg bg-dashboard-bg p-2 text-white dark:bg-DarkManager lg:flex"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <p className="hidden font-inter text-lg font-semibold text-dashboard-bg dark:text-DarkManager lg:flex">
            {managerName === "/manager" ? "dashboard" : `${name}`}
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
                  placeholder={t("SearchManagerPage")}
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
                      placeholder={t("SearchManagerPage")}
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
                          <span className="flex-1 text-center">
                            {route.path.replace("/manager/", "")}
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
          <button className="relative p-2 text-gray-500">
            <NavbarNotification />
          </button>

          <button
            className="p-2 text-gray-500"
            onClick={() => navigate("/manager")}
          >
            <ReactSVG src={InfoIcon} className="h-auto w-auto" />
          </button>

          {/* تعديل جزء صورة المستخدم */}
          <div className="flex items-center space-x-2">
            <img
              src={
                profileImage && profileImage !== "Unknown"
                  ? profileImage
                  : userImage
              }
              alt="User"
              className="me-5 h-8 w-8 rounded-full md:h-10 md:w-10"
              onError={(e) => {
                e.target.src = userImage;
              }}
            />
            <span className="hidden font-poppins text-sm font-semibold text-dashboard-bg dark:text-DarkManager md:text-base lg:flex">
              {fullName}
            </span>
          </div>
          <button
            className="p-2 text-2xl text-gray-500 md:text-3xl"
            onClick={() => setSettingToggle(!settingToggle)}
          >
            <IoSettingsOutline />
          </button>

          {settingToggle && (
            <div
              ref={settingsRef}
              className={`absolute ${i18n.language === "ar" ? "left-5" : "right-5"} top-20 z-20 h-72 w-56 rounded-xl bg-gradient-to-b from-[#99C7CF] to-[#117C90] dark:to-[#043B44]`}
            >
              <div>
                <div
                  className="mx-auto ms-7 mt-3 flex cursor-pointer flex-row items-center"
                  onClick={() => navigate("edit-manager-profile")}
                >
                  <button className="p-2 text-gray-500">
                    <ReactSVG src={Vector} className="r h-auto w-auto" />
                  </button>
                  <h2 className="font-semibold text-white">Edit Profile</h2>
                </div>
                <p className="mx-auto my-2 w-40 border-b-2 border-white"></p>
              </div>

              <div className="mx-auto flex items-center justify-center">
                <ThemeSwitcher />
              </div>
              <p className="mx-auto my-2 w-28 border-b-2 border-white"></p>
              <button
                className="mx-auto ms-6 p-2 text-gray-500"
                onClick={toggleLanguage}
              >
                <ReactSVG
                  src={i18n.language === "en" ? languageA : languageE}
                  className="h-auto w-auto"
                />
              </button>
              <p className="mx-auto my-2 w-28 border-b-2 border-white"></p>

              {/* تعديل جزء تسجيل الخروج */}
              <div
                className="mx-auto ms-12 mt-5 flex cursor-pointer flex-row items-center"
                onClick={handleUserLogout}
              >
                <button className="p-2 text-gray-500">
                  <ReactSVG src={logout2} className="r h-auto w-auto" />
                </button>
                <h2 className="font-semibold text-white">Logout</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavManager;
