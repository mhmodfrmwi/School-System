import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
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
import logout from "../../../assets/icons/logout.svg";
import ThemeSwitcher from "@/ui/ThemeSwitcher";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
  const [settingToggle, setSettingToggle] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { fullName } = useSelector((state) => state.login);

  const routes = [
    { path: "basicform" },
    { path: "studentform" },
    { path: "allstudent" },
    { path: "managerform" },
    { path: "allmanagers" },
    { path: "parentform" },
    { path: "allparents" },
    { path: "scheduleform" },
    { path: "allschedules" },
    { path: "allTerms" },
    { path: "termform" },
    { path: "allteachers" },
    { path: "teacherform" },
    { path: "edit-teacher/:id" },
    { path: "teacherinfo" },
    { path: "classteacherform" },
    { path: "allclassteacher" },
    { path: "adminform" },
    { path: "alladmins" },
    { path: "allacademicyears" },
    { path: "academicyearform" },
    { path: "editacademicyearform/:id" },
    { path: "editadminform/:id" },
    { path: "allgrades" },
    { path: "gradeform" },
    { path: "editGradeForm/:id" },
    { path: "assigngrade" },
    { path: "allsubjects" },
    { path: "allsubjects/:id" },
    { path: "addsubject" },
    { path: "assignSubject" },
    { path: "edit-subject/:id" },
    { path: "editmanagerform/:id" },
    { path: "editparentform/:id" },
    { path: "edit-assigned-subject/:id" },
    { path: "allgrades/:id" },
    { path: "edit-student/:id" },
    { path: "edit-schedule/:id" },
    { path: "edit-term/:id" },
    { path: "allteachers/:id" },
    { path: "edit-class-teacher/:id" },
    { path: "edit-admin-profile" },
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
        navigate(`/admin/${searchTerm}`);
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
  const adminName = url.split("/admin/").pop();
  const match = url.match(/\/admin\/([^/]+)/);
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
    <div className="relative" >
      <div className="flex h-16 w-full max-w-full items-center justify-between bg-white px-4 shadow-md">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={handleBack}
            className="hidden rounded-lg bg-dashboard-bg p-2 text-white dark:bg-[#043B44] lg:flex"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <p className="p hidden font-inter text-lg font-semibold text-dashboard-bg dark:text-[#043B44] lg:flex">
            {adminName === "/admin" ? "dashboard" : `${name}`}
          </p>
        </div>

        <div
          className="relative ml-auto hidden max-w-sm sm:flex rtl:mr-auto rtl:ml-0"
          ref={searchRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className={`absolute ${i18n.language === 'ar' ? 'right-14 lg:right-6' : 'left-14 lg:left-6'} top-1/2 z-10 -translate-y-1/2 transform`}>
            <FaSearch className="text-lg text-gray-400" />
          </div>

          <div className="mx-auto w-[75%] max-w-md lg:w-[90%]">
            <input
              type="text"
              placeholder={t("SearchAdminPage")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full rounded-full border bg-gray-100 dark:bg-gray-700 py-2 ${i18n.language === 'ar' ? 'pr-12 pl-12' : 'pl-12 pr-12'} text-center font-poppins text-sm text-gray-800 dark:text-gray-200 focus:outline-none md:text-left md:text-base`}
            />

            {isDropdownOpen && (
              <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-y-scroll rounded-lg border bg-white shadow-md">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <li
                      key={route.path}
                      onClick={() => handleSelect(route.path)}
                      className="cursor-pointer px-4 py-2 font-semibold text-[#117C90] hover:bg-blue-100 dark:text-[#043B44]"
                    >
                      {route.path}
                      <p className="mx-auto my-2 w-[98%] border-b-2 border-[#117C90] dark:border-[#043B44]"></p>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-red-900">{t("NoMatches")}</li>
                )}
              </ul>
            )}
          </div>

          <div className={`absolute ${i18n.language === 'ar' ? 'left-14 lg:left-6' : 'right-14 lg:right-7'} top-1/2 -translate-y-1/2 transform`}>
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
          <ThemeSwitcher />

          <div className="flex items-center space-x-2">
            <img
              src={userImage}
              alt="User"
              className="h-8 w-8 rounded-full md:h-10 md:w-10"
            />
            <span className="hidden font-poppins text-sm font-semibold text-dashboard-bg dark:text-[#043B44] md:text-base lg:flex">
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
              className={`absolute ${i18n.language === 'ar' ? 'left-5' : 'right-5'}  top-20 z-20 h-72 w-56 rounded-xl bg-gradient-to-b from-[#99C7CF] to-[#117C90] dark:to-[#043B44]`}
            >
              <div>
                <div
                  className="mx-auto ms-7 mt-3 flex cursor-pointer flex-row items-center"
                  onClick={() => navigate("edit-admin-profile")}
                >
                  <button className="p-2 text-gray-500">
                    <ReactSVG src={Vector} className="r h-auto w-auto" />
                  </button>
                  <h2 className="font-semibold text-white">
                    {t("EditProfile")}
                  </h2>
                </div>
                <p className="mx-auto my-2 w-40 border-b-2 border-white"></p>
              </div>

              <div className="ms-20">
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

              <div
                className="mx-auto ms-12 mt-5 flex flex-row items-center"
                onClick={() => navigate("/login")}
              >
                <button className="p-2 text-gray-500">
                  <ReactSVG src={logout} className="r h-auto w-auto" />
                </button>
                <h2
                  className="cursor-pointer font-semibold text-white"
                  onClick={() => navigate("/role")}
                >
                  {t("Logout")}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
