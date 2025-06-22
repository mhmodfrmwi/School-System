import React, { useState, useEffect } from "react";
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
import backgroundWaves from "../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../assets/StudentIcon/bg-color1.png";
import { Card, CardContent } from "@/components/ui/card";
import { fetchParentKids } from "../../Parent/components/services/apiKids";



function DashboardParent() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, profileImage } = useSelector((state) => state.login);

  const [selectedKid, setSelectedKid] = useState(() => {
    return location.state?.selectedKid ||
      JSON.parse(localStorage.getItem('selectedKid')) ||
      null;
  });

  const [kids, setKids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKids = async () => {
      try {
        const kidsData = await fetchParentKids();
        setKids(kidsData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading kids data:", error);
        setLoading(false);
      }
    };

    loadKids();
  }, []);

  const handleKidSelect = (kid) => {
    setSelectedKid(kid.student_id);
    localStorage.setItem('selectedKid', JSON.stringify(kid.student_id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const mainCategories = [
    { label: t("dashboardparent.grades"), icon: GradeIcon, progress: "100%" },
    { label: t("dashboardparent.attendance"), icon: AbsenceIcon, progress: "90%" },
    { label: t("dashboardparent.schedule"), icon: ScheduleIcon, progress: "80%" },
    { label: t("dashboardparent.courses"), icon: CourseIcon, progress: "60%" },
    { label: t("dashboardparent.activities"), icon: ActivityIcon, progress: "50%" },
  ];

  if (selectedKid) {
    return (
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white dark:bg-[#13082F] relative"
      >
        {/* Background Elements */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{ backgroundImage: `url(${backgroundStars})` }}
        ></div>
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{ backgroundImage: `url(${backgroundWaves})` }}
        ></div>

        <div className="relative z-10">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] p-6 shadow-md">
            <div className="flex items-center">
              <div className={`flex items-center ${i18n.language === "ar" ? "space-x-6 space-x-reverse" : "space-x-6"}`}>
                <img
                  src={selectedKid.profileImage || userImage}
                  alt={t("dashboardparent.profileImageAlt")}
                  className="h-40 w-40 rounded-full border-4 border-white bg-[#CA9C9C] shadow-lg"
                  onError={(e) => {
                    e.target.src = userImage;
                  }}
                />
                <div className="space-y-2">
                  <h2 className="font-poppins text-2xl font-bold text-[#62413A] dark:text-gray-300">
                    {selectedKid.fullName}
                  </h2>
                  <div className={`flex items-center ${i18n.language === "ar" ? "space-x-2 space-x-reverse" : "space-x-2"}`}>
                    <img
                      src={trueIcon}
                      alt={t("dashboardparent.presentIconAlt")}
                      className="h-6 w-6"
                    />
                    <p className="font-poppins font-medium text-[#62413A] dark:text-gray-300">
                      {t("parent.studentInfo")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Info Cards */}
            <div className={`hidden flex-wrap ${i18n.language === "ar" ? "space-x-8 space-x-reverse" : "space-x-8"} lg:flex`}>
              <div className="flex flex-col items-center space-y-2">
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-lg shadow-md dark:bg-[#281459]">
                  <CardContent className="p-4">
                    <div className={`flex items-center ${i18n.language === "ar" ? "space-x-2 space-x-reverse" : "space-x-2"}`}>
                      <FaCalendarAlt className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        {new Date().toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US")} |{" "}
                        {new Date().toLocaleTimeString(i18n.language === "ar" ? "ar-EG" : "en-US")}
                      </p>
                    </div>
                    <div className={`flex items-center ${i18n.language === "ar" ? "space-x-8 space-x-reverse" : "space-x-8"}`}>
                      <p className="font-poppins text-lg font-semibold text-gray-600 dark:text-gray-300">
                        {t("parent.academicNumber")}: {selectedKid.academic_number}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-lg shadow-md dark:bg-[#281459]">
                  <CardContent className="p-4">
                    <p className="font-poppins text-xs font-medium text-gray-500 dark:text-gray-300">
                      {t("dashboardparent.classInfo")}
                    </p>
                    <p className="mt-2 font-poppins text-lg font-semibold dark:text-gray-300">
                      {selectedKid.gradeId?.gradeName || 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="mx-auto w-[95%] rounded-lg px-4 py-8">
            <div className="flex items-center py-4">
              <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}></p>
              <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
                {t("parent.studentData")}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[
                {
                  label: t("menuparent.grades"),
                  icon: GradeIcon,
                  path: `/parent/grades-for-child?kidId=${selectedKid._id}`,
                },
                {
                  label: t("menuparent.attendance"),
                  icon: AbsenceIcon,
                  path: `/parent/attendance?kidId=${selectedKid._id}`,
                },
                {
                  label: t("menuparent.schedule"),
                  icon: ScheduleIcon,
                  path: `/parent/schedule?kidId=${selectedKid._id}`,
                },
                {
                  label: t("menuparent.courses"),
                  icon: CourseIcon,
                  path: `/parent/allcourses?kidId=${selectedKid._id}`,
                },
                {
                  label: t("menuparent.activities"),
                  icon: ActivityIcon,
                  path: `/parent/activities?kidId=${selectedKid._id}`,
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="flex h-36 w-full transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] dark:bg-[#281459] font-poppins font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md border border-gray-200 dark:border-[#E0AAEE]"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#BC6FFB] dark:bg-[#C459D9] transition-all duration-300 ease-in-out">
                      <img src={item.icon} alt={item.label} className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Categories */}
          <div className="mx-auto mt-8 w-[95%] rounded-lg p-4">
            <div className="flex items-center">
              <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}></p>
              <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
                {t("parent.studentProgress")}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {mainCategories.map((category, index) => (
                <Card
                  key={index}
                  className="hover:scale-102 flex transform flex-col items-center rounded-2xl border-4 bg-[#F5F5F5] dark:bg-[#281459] p-4 shadow-md transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-[#F1F1F1] dark:hover:bg-[#1A0C3D] hover:shadow-xl border-gray-200 dark:border-[#E0AAEE]"
                >
                  <CardContent className="flex flex-col items-center">
                    <img
                      src={category.icon}
                      alt={category.label}
                      className="mb-4 h-12 w-12 object-contain"
                    />
                    <h3 className="mt-2 font-poppins text-lg text-gray-700 dark:text-gray-300">
                      {category.label}
                    </h3>
                    <div className="mt-4 h-2 w-full rounded-full bg-gray-200 dark:bg-[#4B3B7A]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                        style={{ width: category.progress }}
                      ></div>
                    </div>
                    <p className="mt-2 font-poppins text-gray-600 dark:text-gray-300">
                      {category.progress}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Student Summary */}
          <div className="mx-auto mt-8 w-[95%] rounded-lg p-6">
            <h2 className="mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text font-poppins text-2xl font-bold text-transparent">
              {t("parent.studentSummary")}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Personal Info Card */}
              <Card className="rounded-lg bg-gray-50 dark:bg-[#281459] p-4 shadow-sm border border-gray-200 dark:border-[#E0AAEE]">
                <CardContent>
                  <h3 className="font-poppins text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t("parent.personalInfo")}
                  </h3>
                  <div className="mt-4 space-y-2">
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.email")}:</span> {selectedKid.email}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.phone")}:</span> {selectedKid.phone}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.gender")}:</span> {selectedKid.gender === "M" ? t("generalparent.male") : t("generalparent.female")}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.address")}:</span> {selectedKid.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Info Card */}
              <Card className="rounded-lg bg-gray-50 dark:bg-[#281459] p-4 shadow-sm border border-gray-200 dark:border-[#E0AAEE]">
                <CardContent>
                  <h3 className="font-poppins text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t("parent.academicInfo")}
                  </h3>
                  <div className="mt-4 space-y-2">
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.academicNumber")}:</span> {selectedKid.academic_number}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.admissionDate")}:</span> {formatDate(selectedKid.admission_date)}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.grade")}:</span> {selectedKid.gradeId?.gradeName || t("parent.noGradeAssigned")}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.class")}:</span> {selectedKid.classId?.className || t("parent.noClassAssigned")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card className="rounded-lg bg-gray-50 dark:bg-[#281459] p-4 shadow-sm border border-gray-200 dark:border-[#E0AAEE]">
                <CardContent>
                  <h3 className="font-poppins text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t("parent.additionalInfo")}
                  </h3>
                  <div className="mt-4 space-y-2">
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.dateOfBirth")}:</span> {formatDate(selectedKid.dateOfBirth)}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.age")}:</span> {calculateAge(selectedKid.dateOfBirth)} {t("parent.years")}
                    </p>
                    <p className="font-poppins text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t("parent.accountStatus")}:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${selectedKid.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {selectedKid.isVerified ? t("parent.verified") : t("parent.pendingVerification")}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Parent Dashboard if no child is selected
  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white dark:bg-[#13082F] relative"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundStars})` }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>

      <div className="relative z-10">
        <div className="mx-auto w-[95%] rounded-lg px-4 py-8">
          <div className="flex items-center py-4">
            <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === "ar" ? "ml-2" : "mr-2"}`}></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
              {t("dashboardparent.title")}
            </button>
          </div>

          {/* Parent Profile Header */}
          <Card className="flex items-center gap-6 mb-8 p-4 bg-gray-50 dark:bg-[#281459] rounded-xl border border-gray-200 dark:border-[#E0AAEE]">
            <CardContent className="flex items-center gap-6 w-full">
              <img
                src={profileImage || userImage}
                alt="Parent"
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src = userImage;
                }}
              />
              <div>
                <h2 className="font-poppins text-2xl font-bold text-[#62413A] dark:text-gray-300">
                  {fullName}
                </h2>
                <p className="font-poppins text-gray-600 dark:text-gray-300">
                  {t("parent.role")}
                </p>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600 dark:text-gray-300">{t("parent.loading")}</p>
            </div>
          ) : kids.length > 0 ? (
            <>
              <h3 className="mb-4 font-poppins text-xl font-semibold text-gray-700 dark:text-gray-300">
                {t("parent.selectChildToView")}
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kids.map((kid, index) => (
                  <Card
                    key={index}
                    onClick={() => handleKidSelect(kid)}
                    className="flex transform flex-col rounded-xl bg-[#F3F4F6] dark:bg-[#281459] p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md border border-gray-200 dark:border-[#E0AAEE]"
                  >
                    <CardContent className="flex items-center gap-4">
                      <img
                        src={kid.student_id.profileImage || userImage}
                        alt={kid.student_id.fullName}
                        className="h-16 w-16 rounded-full border-2 border-white"
                        onError={(e) => {
                          e.target.src = userImage;
                        }}
                      />
                      <div>
                        <h4 className="font-poppins font-semibold text-gray-700 dark:text-gray-300">
                          {kid.student_id.fullName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {t("parent.academicNumber")}: {kid.student_id.academic_number}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {t("parent.grade")}: {kid.student_id.gradeId?.name || 'N/A'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                {t("parent.noKidsRegistered")}
              </p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Edit Profile Card */}
            <Card
              onClick={() => navigate("/parent/edit-parent-profile")}
              className="flex h-48 transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] dark:bg-[#281459] font-poppins font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md border border-gray-200 dark:border-[#E0AAEE]"
            >
              <CardContent className="flex flex-col items-center p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#BC6FFB] dark:bg-[#C459D9] transition-all duration-300 ease-in-out">
                  <FiEdit className="h-8 w-8 text-white" />
                </div>
                <p className="text-lg font-medium">{t("parent.editProfile")}</p>
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-300">
                  {t("parent.editProfileDesc")}
                </p>
              </CardContent>
            </Card>

            {/* Help/Support Card */}
            <Card
              onClick={() => navigate("/parent/support")}
              className="flex h-48 transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] dark:bg-[#281459] font-poppins font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md border border-gray-200 dark:border-[#E0AAEE]"
            >
              <CardContent className="flex flex-col items-center p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#BC6FFB] dark:bg-[#C459D9] transition-all duration-300 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5v-2" />
                  </svg>
                </div>
                <p className="text-lg font-medium">{t("parent.helpSupport")}</p>
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-300">
                  {t("parent.helpSupportDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardParent;