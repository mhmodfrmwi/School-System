import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import InfoIcon from "../../../assets/icons/Info.svg";
import userImage from "../../../assets/user.jpeg";
import languageE from "../../../assets/icons/languageET.svg";
import languageA from "../../../assets/icons/languageAT.svg";
import Vector from "../../../assets/icons/Vector.svg";
import logout2 from "../../../assets/icons/logout.svg";
import ThemeSwitcher from "@/ui/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { logout } from "../../../Features/Auth/AuthRedux/loginSlice";

const NavTeacher = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
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
    { path: "edit-teacher-profile" },
    { path: "school-hubs" },
    { path: "school-hubs/detailes" },
    { path: "school-hubs/prizes" },
    { path: "contests" },
    { path: "contests/participants/:contestId" },
    { path: "contests/activity-form" },
    { path: "contests/edit-activity-form/:id" },
    { path: "weekly-schedule" },
    { path: "exam-schedule" },
    { path: "currentCourse" },
    { path: "allcourses" },
    { path: "currentCourseforattendance" },
    { path: "allcoursesforattendance" },
    { path: "student-attendance-details/:id" },
    { path: "materialform" },
    { path: "/teacher/addmaterial/:classId/:gradeSubjectSemesterId" },
    { path: "/teacher/materialform/:classId/:gradeSubjectSemesterId" },
    { path: "/teacher/see-material/:grade_subject_semester_id" },
    { path: "update-material/:materialId" },
    { path: "takeattendance/:id" },
    { path: "attendancereport/:id" },
    { path: "/teacher/virtual-room/:grade_subject_semester_id" },
    { path: "/teacher/VR-form/:classId/:gradeSubjectSemesterId" },
    { path: "edit-vr/:id" },
    { path: "library-form" },
    { path: "all-subjects-library" },
    { path: "all-materials-library/:id" },
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
      const count = searchTerm.length;
      setSearchTerm("");
      setIsDropdownOpen(false);

      if (route.path.length === count) {
        navigate(`/teacher/${searchTerm}`);
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
  const teacherName = url.split("/teacher/").pop();
  const match = url.match(/\/teacher\/([^/]+)/);
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
            {teacherName === "/teacher" ? "dashboard" : `${name}`}
          </p>
        </div>

        <div
          className="relative ml-auto hidden max-w-sm sm:flex rtl:ml-0"
          ref={searchRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div
            className={`absolute ${i18n.language === "ar" ? "right-14 lg:right-6" : "left-14 lg:left-6"} top-1/2 z-10 -translate-y-1/2 transform`}
          >
            <FaSearch className="text-lg text-gray-400" />
          </div>

          <div className="mx-auto w-[75%] max-w-md lg:w-[90%]">
            <input
              type="text"
              placeholder={t("SearchTeacherPage")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full rounded-full border bg-gray-100 py-2 dark:bg-gray-700 ${i18n.language === "ar" ? "pl-12 pr-12" : "pl-12 pr-12"} text-center font-poppins text-sm text-gray-800 focus:outline-none dark:text-gray-200 md:text-left md:text-base`}
            />

            {isDropdownOpen && (
              <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-y-scroll rounded-lg border bg-white shadow-md">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <li
                      key={route.path}
                      onClick={() => handleSelect(route.path)}
                      className="cursor-pointer px-4 py-2 font-semibold text-[#117C90] hover:bg-blue-100 dark:text-DarkManager"
                    >
                      {route.path}
                      <p className="mx-auto my-2 w-[98%] border-b-2 border-[#117C90] dark:border-DarkManager"></p>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-red-900">{t("NoMatches")}</li>
                )}
              </ul>
            )}
          </div>

          <div
            className={`absolute ${i18n.language === "ar" ? "left-14 lg:left-6" : "right-14 lg:right-7"} top-1/2 -translate-y-1/2 transform`}
          >
            <FontAwesomeIcon
              icon={faSliders}
              className="text-lg text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-6">
          <button className="relative p-2 text-gray-500">
            <FaBell className="text-xl" />
            <span className="absolute right-2 top-1 block h-3.5 w-3.5 rounded-full bg-red-500"></span>
          </button>
          <button className="text-xl text-gray-500">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
          </button>
          <button className="p-2 text-gray-500">
            <ReactSVG src={InfoIcon} className="h-auto w-auto" />
          </button>
          <div dir="ltr">
            <ThemeSwitcher />
          </div>

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
                  onClick={() => navigate("edit-teacher-profile")}
                >
                  <button className="p-2 text-gray-500">
                    <ReactSVG src={Vector} className="h-auto w-auto" />
                  </button>
                  <h2 className="font-semibold text-white">
                    {t("EditProfile")}
                  </h2>
                </div>
                <p className="mx-auto my-2 w-40 border-b-2 border-white"></p>
              </div>

              <div dir="ltr" className="ms-20">
                <ThemeSwitcher />
              </div>
              <p className="mx-auto my-2 w-28 border-b-2 border-white"></p>
              <button
                className="mx-auto ms-6 p-2 text-[#C459D9]"
                onClick={toggleLanguage}
              >
                <ReactSVG
                  src={i18n.language === "en" ? languageA : languageE}
                  className="h-auto w-auto"
                />
              </button>
              <p className="mx-auto my-2 w-28 border-b-2 border-white"></p>

              <div
                className="mx-auto ms-12 mt-5 flex cursor-pointer flex-row items-center"
                onClick={handleUserLogout}
              >
                <button className="p-2 text-gray-500">
                  <ReactSVG src={logout2} className="h-auto w-auto" />
                </button>
                <h2 className="font-semibold text-white">{t("Logout")}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavTeacher;
