import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
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
    { path: "grades", key: "grades" },
    { path: "grades/assignment", key: "grades/assignment" },
    { path: "grades/exam", key: "grades/exam" },
    { path: "schedule", key: "schedule" },
    { path: "schedule/exam", key: "schedule/exam" },
    { path: "library", key: "library" },
    { path: "motivation", key: "motivation" },
    { path: "activities", key: "activities" },
    { path: "activities/detailes", key: "activities/detailes" },
    { path: "activities/prizes", key: "activities/prizes" },
    { path: "activities/contests", key: "activities/contests" },
    { path: "virtualrooms", key: "virtualrooms" },
    { path: "allcourses", key: "allcourses" },
    { path: "attendance", key: "attendance" },
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
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div
            className={`absolute ${i18n.language === "ar" ? "right-14 lg:right-6" : "left-14 lg:left-6"} top-1/2 z-10 -translate-y-1/2 transform`}
          >
            <FaSearch className="text-lg text-gray-400 dark:text-gray-300" />
          </div>

          <div className="mx-auto w-[75%] max-w-md lg:w-[90%]">
            <input
              type="text"
              placeholder={t("SearchStudentPage")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full rounded-full border bg-gray-100 py-2 dark:bg-gray-700 ${i18n.language === "ar" ? "pl-12 pr-12" : "pl-12 pr-12"} text-center font-poppins text-sm text-gray-800 focus:outline-none dark:text-gray-200 md:text-left md:text-base`}
            />

            {isDropdownOpen && (
              <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-y-scroll rounded-lg border bg-white shadow-md dark:border-gray-600 dark:bg-gray-800">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <li
                      key={route.path}
                      onClick={() => handleSelect(route.path)}
                      className="cursor-pointer px-4 py-2 font-semibold text-[#C459D9] hover:bg-[#d8cbed] dark:text-[#D6BCFA] dark:hover:bg-gray-700"
                    >
                      {t(`routes.${route.key}`)}
                      <p className="mx-auto my-2 w-[98%] border-b-2 border-[#C459D9] dark:border-[#D6BCFA]"></p>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-red-900 dark:text-red-400">
                    {t("NoMatches")}
                  </li>
                )}
              </ul>
            )}
          </div>

          <div
            className={`absolute ${i18n.language === "ar" ? "left-14 lg:left-6" : "right-14 lg:right-7"} top-1/2 -translate-y-1/2 transform`}
          >
            <FontAwesomeIcon
              icon={faSliders}
              className="text-lg text-gray-400 dark:text-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-6">
          <button className="relative p-2 text-gray-500 dark:text-gray-300">
            <FaBell className="text-xl" />
            <span className="absolute right-2 top-1 block h-3.5 w-3.5 rounded-full bg-red-500"></span>
          </button>
          <button className="text-xl text-gray-500 dark:text-gray-300">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-300">
            <ReactSVG src={InfoIcon} className="h-auto w-auto" />
          </button>
          <div dir="ltr">
            <ThemeSwitcher />
          </div>

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

              <div className="ms-20" dir="ltr">
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
