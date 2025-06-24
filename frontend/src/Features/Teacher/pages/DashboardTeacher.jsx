import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {  BookOpen, Clock } from "lucide-react";
import { FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarAlt,
  faClipboardList,
  faGraduationCap,
  faRunning,
  faUserClock
} from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";
import { fetchClassTeacher } from "../components/TeacherRedux/TeacherClassSlice";
import { getTeacherPointsForTerm } from "../components/TeacherRedux/motivationTeacherSlice";
import { useTranslation } from 'react-i18next';

const DashboardTeacher = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  const { teacherPointsForTerm } = useSelector(
    (state) => state.motivationTeacher,
  );

  const { fullName } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchClassTeacher());
    dispatch(getTeacherPointsForTerm());
  }, [dispatch]);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [categories] = useState([
    { name: t("Courses"), icon: faBook, link: '/teacher/currentcourse' },
    { name: t("Absence"), icon: faUserClock, link: '/teacher/currentcourseforattendance' },
    { name: t("Schedule"), icon: faCalendarAlt, link: '/teacher/weekly-schedule' },
    { name: t("GradeManagements"), icon: faClipboardList, link: '/teacher/current-courses-for-grades' },
    { name: t("Activities"), icon: faRunning, link: '/teacher/school-hubs' },
    { name: t("Library"), icon: faGraduationCap, link: '/teacher/teacher-library' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-poppins p-4  md:p-6">
      {/* Welcome and Stats Section */}
      <div className="mb-9  grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Welcome Card */}
        <div className="rounded-xl bg-gradient-to-r from-[#117C90] to-[#0f6b7c] p-6 shadow-lg dark:bg-DarkManager dark:to-[#4b6584]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{t('dashboardteacher.Welcome')},</h2>
              <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">{fullName}</h1>
              <p className="mt-2 flex items-center text-sm text-white">
                <Clock className="mr-2 h-4 w-4" />
                {currentTime}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-2xl text-white"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Points Card */}
        <div className="rounded-xl bg-gradient-to-r from-[#117C90] to-[#0f6b7c] p-6 shadow-lg dark:bg-DarkManager dark:to-[#4b6584]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white dark:text-white">{t('dashboard.yourScore')}</h2>
              <div className="mt-4 flex items-center">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full border-4 ${teacherPointsForTerm.badge === "Green" ? "border-green-500 bg-green-500" :
                  teacherPointsForTerm.badge === "Diamond" ? "border-[#6a6969] bg-[#6a6969]" :
                    teacherPointsForTerm.badge === "Gold" ? "border-yellow-500 bg-yellow-500" :
                      "border-gray-300 bg-gray-300"
                  }`}>
                  <span className="text-xl font-bold text-white">
                    {teacherPointsForTerm.totalPoints}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-white dark:text-gray-300">{t('points.semesterPoints')}</p>
                  <p className="text-lg font-bold text-white dark:text-white">
                    {teacherPointsForTerm.badge} Level
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => navigate('/teacher/motivation')}
                className="rounded-lg border border-[#117C90] bg-white px-3 py-1 text-xs font-medium text-[#117C90] transition-colors hover:bg-[#117C90] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#117C90] focus:ring-offset-2 dark:border-[#4b6584] dark:bg-gray-800 dark:text-white dark:hover:bg-[#4b6584] dark:hover:text-white"
              >
                {t('ViewDetails')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto">
        {/* Courses Section */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-lg dark:bg-DarkManager dark:to-[#4b6584]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#244856] dark:text-white">{t('Courses')}</h2>
              <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856]"></div>
            </div>
            <button className="rounded-lg bg-[#117C90] px-3 py-1 text-sm text-white hover:bg-[#0f6b7c] dark:bg-[#4b6584]"
              onClick={() => navigate('/teacher/currentcourse')}>
              {t('ViewAll')}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            {classTeachers.length > 0 ? (
              classTeachers.map((classteacher, index) => (
                <div
                  key={classteacher?.classId || index}
                  className="flex items-center rounded-lg border cursor-pointer border-gray-200 p-4 transition-all hover:shadow-md dark:border-gray-700"
                  onClick={() => {
                    const classId = classteacher.classId._id;
                    const gradeSubjectSemesterId = classteacher.id;
                    navigate(
                      `/teacher/addmaterial/${classId}/${gradeSubjectSemesterId}`,
                    );
                  }}
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#117C90] text-white dark:bg-[#4b6584]">
                    <FaChalkboardTeacher className="text-xl" />
                  </div>
                  <div className="ml-2 mr-2">
                    <h3 className="font-semibold dark:text-white">{classteacher?.subjectName || "N/A"}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {classteacher.gradeName || "N/A"} • {classteacher.className || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('Semester')}: {classteacher.semesterName || "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center rounded-lg bg-gray-100 py-10 dark:bg-gray-700">
                <BookOpen className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-300" />
                <p className="mb-2 text-lg font-semibold text-gray-600 dark:text-white">No Classes Assigned</p>
                <p className="text-center text-gray-500 dark:text-gray-300">
                  You don't have any classes assigned yet. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>
        {/* Upcoming Events */}
        <section className="rounded-xl mb-6 bg-white p-6 shadow-lg dark:bg-DarkManager ">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#244856] dark:text-white"> Staf Meetings</h2>
              <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856]"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start rounded-lg border transition-all hover:shadow-md border-gray-200 p-4 dark:border-gray-700">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaCalendarAlt className="text-lg" />
              </div>
              <div className="flex-1 m-2">
                <h3 className="font-semibold dark:text-white">{t("sidebart.GeneralVirtualRooms")}</h3>
              </div>
              <button
                onClick={() => navigate('/teacher/vr-manger')}
                className="rounded-lg m-2 bg-[#117C90] px-3 py-1 text-sm text-white hover:bg-[#0f6b7c] dark:bg-[#4b6584]"
              >
                {t('Details')}
              </button>
            </div>
          </div>
        </section>
        {/* mainCategories Section */}
        <section className="rounded-xl bg-white p-6 shadow-lg dark:bg-DarkManager">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#244856] dark:text-white">{t('dashboardteacher.mainCategories')}</h2>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856]"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="flex flex-col items-center rounded-lg bg-gray-100 p-4 text-center transition-all hover:bg-gray-200 dark:bg-[#184b5f] dark:hover:bg-gray-600"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#117C90] dark:bg-[#224a5a] dark:text-white">
                  <FontAwesomeIcon icon={category.icon} className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium dark:text-white">{category.name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};



export default DashboardTeacher;