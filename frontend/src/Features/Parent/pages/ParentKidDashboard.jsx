import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import userImage from "../../../assets/Girl.png";
import trueIcon from "../../../assets/true icon.png";
import GradeIcon from "../../../assets/StudentIcon/Grade.png";
import ActivityIcon from "../../../assets/StudentIcon/Activites.png";
import ScheduleIcon from "../../../assets/StudentIcon/Schedule.png";
import CourseIcon from "../../../assets/StudentIcon/Course.png";
import AbsenceIcon from "../../../assets/StudentIcon/Absence.png";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

function DashboardParent() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, profileImage } = useSelector((state) => state.login);

  const [selectedKid, setSelectedKid] = useState(location.state?.selectedKid || null);

  const mainCategories = [
    { label: t("dashboardparent.grades"), icon: GradeIcon, progress: "100%" },
    { label: t("dashboardparent.attendance"), icon: AbsenceIcon, progress: "90%" },
    { label: t("dashboardparent.schedule"), icon: ScheduleIcon, progress: "80%" },
    { label: t("dashboardparent.courses"), icon: CourseIcon, progress: "60%" },
    { label: t("dashboardparent.activities"), icon: ActivityIcon, progress: "50%" },
  ];


  if (selectedKid) {
    return (
      <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        {/* Header with Back Button */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-6 shadow-md">
          <div className="flex items-center">


            <div className={`flex items-center ${i18n.language === "ar" ? "space-x-6 space-x-reverse" : "space-x-6"}`}>
              <img
                src={userImage}
                alt={t("dashboardparent.profileImageAlt")}
                className="h-40 w-40 rounded-full border-4 border-white bg-[#CA9C9C] shadow-lg"
              />
              <div className="space-y-2">
                <h2 className="font-poppins text-2xl font-bold text-[#62413A]">
                  {selectedKid.fullName}
                </h2>
                <div className={`flex items-center ${i18n.language === "ar" ? "space-x-2 space-x-reverse" : "space-x-2"}`}>
                  <img
                    src={trueIcon}
                    alt={t("dashboardparent.presentIconAlt")}
                    className="h-6 w-6"
                  />
                  <p className="font-poppins font-medium text-[#62413A]">
                    {t("parent.studentInfo")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Info Cards */}
          <div className={`hidden flex-wrap ${i18n.language === "ar" ? "space-x-8 space-x-reverse" : "space-x-8"} lg:flex`}>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 shadow-md">
                <div className={`flex items-center ${i18n.language === "ar" ? "space-x-2 space-x-reverse" : "space-x-2"}`}>
                  <FaCalendarAlt className="h-4 w-4 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-600">
                    {new Date().toLocaleDateString()} |{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className={`flex items-center ${i18n.language === "ar" ? "space-x-8 space-x-reverse" : "space-x-8"}`}>
                  <p className="font-poppins text-lg font-semibold text-gray-600">
                    {t("parent.academicNumber")}: {selectedKid.academic_number}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
                <p className="font-poppins text-xs font-medium text-gray-500">
                  {t("dashboardparent.classInfo")}
                </p>
                <p className="mt-2 font-poppins text-lg font-semibold">
                  {selectedKid.classId?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Quick Menu */}
        <div className="mx-auto w-[95%] rounded-lg bg-white px-4 py-8">
          <div className="flex items-center py-4">
            <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
              {t("parent.studentData")}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[
              {
                label: t("menuparent.grades"),
                icon: GradeIcon,
                path: `/student/grades?kidId=${selectedKid._id}`,
              },
              {
                label: t("menuparent.attendance"),
                icon: AbsenceIcon,
                path: `/student/attendance?kidId=${selectedKid._id}`,
              },
              {
                label: t("menuparent.schedule"),
                icon: ScheduleIcon,
                path: `/student/schedule?kidId=${selectedKid._id}`,
              },
              {
                label: t("menuparent.courses"),
                icon: CourseIcon,
                path: `/student/allcourses?kidId=${selectedKid._id}`,
              },
              {
                label: t("menuparent.activities"),
                icon: ActivityIcon,
                path: `/student/activities?kidId=${selectedKid._id}`,
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="flex h-36 w-full transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] font-poppins font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#BC6FFB] transition-all duration-300 ease-in-out">
                  <img src={item.icon} alt={item.label} className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Categories */}
        <div className="mx-auto mt-8 w-[95%] rounded-lg bg-white p-4">
          <div className="flex items-center">
            <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
              {t("parent.studentProgress")}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {mainCategories.map((category, index) => (
              <div
                key={index}
                className="hover:scale-102 flex transform flex-col items-center rounded-2xl border-4 bg-[#F5F5F5] p-4 shadow-md transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-[#F1F1F1] hover:shadow-xl"
                style={{
                  border: "4px",
                  borderImage: "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                }}
              >
                <img
                  src={category.icon}
                  alt={category.label}
                  className="mb-4 h-12 w-12 object-contain"
                />
                <h3 className="mt-2 font-poppins text-lg text-gray-700">
                  {category.label}
                </h3>
                <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"
                    style={{ width: category.progress }}
                  ></div>
                </div>
                <p className="mt-2 font-poppins text-gray-600">
                  {category.progress}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Summary */}
        <div className="mx-auto mt-8 w-[95%] rounded-lg bg-white p-6">
          <h2 className="mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-bold text-transparent">
            {t("parent.studentSummary")}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
              <h3 className="font-poppins text-lg font-semibold text-gray-700">
                {t("parent.personalInfo")}
              </h3>
              <div className="mt-4 space-y-2">
                <p className="font-poppins text-gray-600">
                  <span className="font-semibold">{t("parent.email")}:</span> {selectedKid.email}
                </p>
                <p className="font-poppins text-gray-600">
                  <span className="font-semibold">{t("parent.gender")}:</span> {selectedKid.gender === "M" ? t("generalparent.male") : t("generalparent.female")}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
              <h3 className="font-poppins text-lg font-semibold text-gray-700">
                {t("parent.academicInfo")}
              </h3>
              <div className="mt-4 space-y-2">
                <p className="font-poppins text-gray-600">
                  <span className="font-semibold">{t("parent.class")}:</span> {selectedKid.classId?.name || 'N/A'}
                </p>
                <p className="font-poppins text-gray-600">
                  <span className="font-semibold">{t("parent.academicNumber")}:</span> {selectedKid.academic_number}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // عرض لوحة تحكم الوالد الافتراضية إذا لم يكن هناك طفل محدد
  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto w-[95%] rounded-lg bg-white px-4 py-8">
        <div className="flex items-center py-4">
          <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
            Parent Dashboard
          </button>
        </div>

        {/* Parent Profile Header */}
        <div className="flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
          <img
            src={profileImage || userImage}
            alt="Parent"
            className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
            onError={(e) => {
              e.target.src = userImage;
            }}
          />
          <div>
            <h2 className="font-poppins text-2xl font-bold text-[#62413A]">
              {fullName}
            </h2>
            <p className="font-poppins text-gray-600">
              {t("parent.role")}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"> {/* Changed to 2 columns */}
          {/* 1. Select Child Card */}
          <div
            onClick={() => navigate("/parent/parent-kids")}
            className="flex h-48 transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] p-6 font-poppins font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#BC6FFB] transition-all duration-300 ease-in-out">
              <FaChild className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg font-medium">{t("parent.selectChild")}</p>
            <p className="mt-2 text-center text-sm text-gray-500">
              {t("parent.selectChildDesc")}
            </p>
          </div>

          {/* 2. Edit Profile Card */}
          <div
            onClick={() => navigate("/parent/edit-profile")}
            className="flex h-48 transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] p-6 font-poppins font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#BC6FFB] transition-all duration-300 ease-in-out">
              <FiEdit className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg font-medium">{t("parent.editProfile")}</p>
            <p className="mt-2 text-center text-sm text-gray-500">
              {t("parent.editProfileDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardParent;