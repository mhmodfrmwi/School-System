import React, { useEffect } from "react";
import userImage from "../../../assets/Girl.png";
import trueIcon from "../../../assets/true icon.png";
import awardIcon from "../../../assets/Award.png";
import GradeIcon from "../../../assets/StudentIcon/Grade.png";
// import ChatIcon from "../../../assets/StudentIcon/Chat.png";
import AwardIcon from "../../../assets/StudentIcon/Awards.png";
import ActivityIcon from "../../../assets/StudentIcon/Activites.png";
// import VirtualIcon from "../../../assets/StudentIcon/Virtual.png";
import ScheduleIcon from "../../../assets/StudentIcon/Schedule.png";
// import QuestionsIcon from "../../../assets/StudentIcon/Questions.png";
import LibraryIcon from "../../../assets/StudentIcon/Library.png";
import CourseIcon from "../../../assets/StudentIcon/Course.png";
import AbsenceIcon from "../../../assets/StudentIcon/Absence.png";

import VirtualI from "../../../assets/StudentIcon/VirtualRoomsIcon.png";
import VectorI from "../../../assets/StudentIcon/Vector.png";
import learningI from "../../../assets/StudentIcon/learning.png";
import GroupI from "../../../assets/StudentIcon/Group.png";
import EmailI from "../../../assets/StudentIcon/Email.png";
import editI from "../../../assets/StudentIcon/edit.png";
import CourseI from "../../../assets/StudentIcon/CourseIcon.png";
import annonI from "../../../assets/StudentIcon/annon.png";
import ActivitesI from "../../../assets/StudentIcon/ActivitesIcon.png";
import AbsenceI from "../../../assets/StudentIcon/AbsenceIcon.png";

import video1 from "../../../assets/StudentIcon/video11.png";
import video2 from "../../../assets/StudentIcon/video21.png";
import book1 from "../../../assets/StudentIcon/book11.png";
import book2 from "../../../assets/StudentIcon/book21.png";
import book3 from "../../../assets/StudentIcon/book31.png";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSemesterReward } from "../components/StudentRedux/motivationSlice";
import { useTranslation } from 'react-i18next';
function DashboardStudent() {
  const { t , i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { semesterReward } = useSelector((state) => state.motivation);
  const { fullName } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getSemesterReward());
  }, [dispatch]);

  const mainCategories = [
    { label: t('dashboard.onlineAssignments'), icon: editI, progress: "100%" },
    { label: t('dashboard.exams'), icon: learningI, progress: "90%" },
    { label: t('dashboard.courseMaterials'), icon: CourseI, progress: "80%" },
    { label: t('dashboard.reportCards'), icon: VectorI, progress: "60%" },
    { label: t('dashboard.mailbox'), icon: EmailI, progress: "50%" },
    { label: t('dashboard.assessments'), icon: AbsenceI, progress: "70%" },
    { label: t('dashboard.activities'), icon: ActivitesI, progress: "20%" },
    { label: t('dashboard.virtualClassroom'), icon: VirtualI, progress: "10%" },
    { label: t('dashboard.announcements'), icon: annonI, progress: "40%" },
    { label: t('dashboard.videoLectures'), icon: GroupI, progress: "100%" },
  ];

  const readingList = [
    {
      title: t('subjects.english'),
      description: "Spelling - Learn How To Spell Letters",
      link: book1,
    },
    {
      title: t('subjects.arabic'),
      description: "Lesson 1 - How to Grow and Take Care of Your Farm",
      link: book2,
    },
    {
      title: t('subjects.science'),
      description: "Adaptation - About Bears Life",
      link: book3,
    },
  ];

  const recommendedList = [
    { title: t('dashboard.atomVideo'), type: t('subjects.science'), link: video1 },
    { title: t('dashboard.spellingVideo'), type: t('subjects.english'), link: video2 },
    { title: t('dashboard.atomVideo'), type: t('subjects.science'), link: video1 },
  ];

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/*Header */}

      <div className="flex items-center justify-between bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-6 shadow-md">
        {/*User */}
        <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-6 pr-10' : 'space-x-6 pl-10'}`}>
          <img
            src={userImage}
            alt={t('dashboard.profileImageAlt')}
            className="h-40 w-40 rounded-full border-4 border-white bg-[#CA9C9C] shadow-lg"
          />
          <div className="space-y-2">
            <h2 className="font-poppins text-2xl font-bold text-[#62413A]">
              {fullName}
            </h2>
            <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <img src={trueIcon} alt={t('dashboard.presentIconAlt')} className="h-6 w-6" />
              <p className="font-poppins font-medium text-[#62413A]">
                {t('dashboard.presentToday')}
              </p>
            </div>
          </div>
        </div>
        {/*Cards */}
        <div className={`hidden flex-wrap ${i18n.language === 'ar' ? 'space-x-reverse space-x-8 pl-10' : 'space-x-8 pr-10'} lg:flex`}>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 shadow-md">
              <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <FaCalendarAlt className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-semibold text-gray-600">
                  {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
                <p
                  className={`font-poppins text-lg font-semibold ${semesterReward.badge === "Green"
                      ? "text-green-600"
                      : semesterReward.badge === "Diamond"
                        ? "text-gray-500"
                        : semesterReward.badge === "Gold"
                          ? "text-yellow-500"
                          : "text-green-700"
                    }`}
                >
                  {semesterReward.badge === "Green"
                    ? t('dashboard.greenLevel')
                    : semesterReward.badge === "Diamond"
                      ? t('dashboard.diamondLevel')
                      : semesterReward.badge === "Gold"
                        ? t('dashboard.goldLevel')
                        : t('dashboard.greenLevel')}
                </p>
                <img src={awardIcon} alt={t('dashboard.awardIconAlt')} className="h-10 w-10" />
              </div>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
              <p className="font-poppins text-xs font-medium text-gray-500">
                {t('dashboard.learningStreak')}
              </p>
              <div className={`mt-2 flex ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-1`}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full border text-center font-bold ${index < 3
                        ? "bg-[#FD813D] text-white"
                        : "bg-gray-200 text-gray-400"
                      }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="mt-1 font-poppins text-sm font-medium text-gray-600">
                3{t('dashboard.days')} 🔥
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
            <p className="font-poppins text-lg font-semibold text-gray-600">
              {t('dashboard.yourScore')}
            </p>

            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="fill-none stroke-gray-200"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="fill-none"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="100"
                  style={{
                    strokeLinecap: "round",
                    stroke:
                      semesterReward.badge === "Green"
                        ? "url(#greenGradient)"
                        : semesterReward.badge === "Diamond"
                          ? "url(#diamondGradient)"
                          : semesterReward.badge === "Gold"
                            ? "url(#goldGradient)"
                            : "url(#greenGradient)",
                  }}
                />
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#0D6A04", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#19D009", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="diamondGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#6a6969", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#a3a0a0", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="goldGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#FFD700", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#FFCC00", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="defaultGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#B0B0B0", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#D3D3D3", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              <p
                className={`text-xl font-bold ${semesterReward.badge === "Green"
                    ? "text-green-600"
                    : semesterReward.badge === "Diamond"
                      ? "text-gray-500"
                      : semesterReward.badge === "Gold"
                        ? "text-yellow-500"
                        : "text-green-700"
                  }`}
              >
                {semesterReward.totalSemesterPoints}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="mx-auto w-[95%] rounded-lg bg-white px-4 py-8">
        <div className="flex items-center py-4">
          <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
            {t('dashboard.quickMenu')}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {[
            { label: t('menu.motivation'), icon: AwardIcon, path: "/student/motivation" },
            { label: t('menu.courses'), icon: CourseIcon, path: "/student/allcourses" },
            { label: t('menu.absence'), icon: AbsenceIcon, path: "/student/attendance" },
            { label: t('menu.schedule'), icon: ScheduleIcon, path: "/student/schedule" },
            { label: t('menu.grades'), icon: GradeIcon, path: "/student/grades" },
            { label: t('menu.activities'), icon: ActivityIcon, path: "/student/activities" },
            { label: t('menu.library'), icon: LibraryIcon, path: "/student/library" },
            // { label: "Question Bank", icon: QuestionsIcon },
            // { label: "Virtual Rooms", icon: VirtualIcon },
            // { label: "Chats", icon: ChatIcon },
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
          <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
            {t('dashboard.mainCategories')}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {mainCategories.map((category, index) => (
            <div
              key={index}
              className="hover:scale-102 flex transform flex-col items-center rounded-2xl border-4 bg-[#F5F5F5] p-4 shadow-md transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-[#F1F1F1] hover:shadow-xl"
              style={{
                border: "4px",
                borderImage:
                  "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
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

      {/* Diffrent Categories */}

      <div className="mx-auto mt-8 grid w-[95%] grid-cols-1 gap-6 px-8 md:grid-cols-2">
        {/* Continue Reading Section */}
        <div
          className="rounded-lg border-4 border-transparent p-4 shadow-md"
          style={{
            borderImage:
              "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
          }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-bold text-transparent">
            {t('dashboard.continueReading')}
          </h2>
          <ul className="space-y-6">
            {readingList.map((item, index) => (
              <li key={index} className="mb-6 flex h-60 items-center space-x-4">
                <img
                  src={item.link}
                  alt={item.title}
                  className="h-50 w-40 rounded-lg object-cover shadow-md"
                />
                <div>
                  <p className="font-poppins text-lg font-semibold">
                    {item.title}
                  </p>
                  <p className="font-poppins text-gray-600">
                    {item.description}
                  </p>
                  <a
                    href="https://placehold.co/600x400"
                    className="mt-2 block font-poppins font-semibold text-purple-500"
                  >
                    {t('dashboard.continueButton')}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended to Watch Section */}
        <div
          className="rounded-lg border-4 border-transparent p-4 shadow-md"
          style={{
            borderImage:
              "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
          }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-bold text-transparent">
            {t('dashboard.recommendedToWatch')}
          </h2>
          <ul className="space-y-6">
            {recommendedList.map((item, index) => (
              <li key={index} className="flex flex-col items-center space-y-4">
                <img
                  src={item.link}
                  alt={item.title}
                  className="h-28 w-full rounded-lg object-cover shadow-md"
                />
                <div className="text-center">
                  <p className="font-poppins text-lg font-semibold">
                    {item.title}
                  </p>
                  <p className="font-poppins text-gray-600">
                    {t('dashboard.type')}: {item.type}
                  </p>
                  <a
                    href="https://placehold.co/600x400"
                    className="mt-2 block font-poppins font-semibold text-purple-500"
                  >
                    {t('dashboard.watchNow')}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardStudent;
