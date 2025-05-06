import React, { useEffect, useState } from "react";
import userImage from "../../../assets/Girl.png";
import trueIcon from "../../../assets/true icon.png";
import awardIcon from "../../../assets/Award.png";
import GradeIcon from "../../../assets/StudentIcon/Grade.png";
import AwardIcon from "../../../assets/StudentIcon/Awards.png";
import ActivityIcon from "../../../assets/StudentIcon/Activites.png";
import ScheduleIcon from "../../../assets/StudentIcon/Schedule.png";
import LibraryIcon from "../../../assets/StudentIcon/Library.png";
import CourseIcon from "../../../assets/StudentIcon/Course.png";
import AbsenceIcon from "../../../assets/StudentIcon/Absence.png";
import VirtualI from "../../../assets/StudentIcon/VirtualRoomsIcon.png";
import VectorI from "../../../assets/StudentIcon/Vector.png";
import learningI from "../../../assets/StudentIcon/learning.png";
import editI from "../../../assets/StudentIcon/edit.png";
import CourseI from "../../../assets/StudentIcon/CourseIcon.png";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSemesterReward } from "../components/StudentRedux/motivationSlice";
import { fetchDashboardData } from "../components/StudentRedux/dashboardSlice";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card"; 
import Loader from "@/ui/Loader"; 
import Swal from "sweetalert2";
import backgroundWaves from "../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../assets/StudentIcon/bg-color1.png";
import { Button } from "@headlessui/react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2"; 

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardStudent() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { semesterReward } = useSelector((state) => state.motivation);
  const { data: dashboardData, loading, error } = useSelector(
    (state) => state.dashboardStudent
  );
  const { fullName } = useSelector((state) => state.login);
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    dispatch(getSemesterReward());
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashboardData) {
      const updatedCategories = [
        {
          label: t("dashboard.onlineAssignments"),
          icon: editI,
          progress: `${100 - dashboardData.dashboardMetrics.assignments.totalMissed * 50}%`,
        },
        {
          label: t("dashboard.exams"),
          icon: learningI,
          progress: `${dashboardData.dashboardMetrics.exams.summary.examCompletionRate}%`,
        },
        {
          label: t("dashboard.courseMaterials"),
          icon: CourseI,
          progress: `${dashboardData.materialsStates.viewedPercentage}%`,
        },
        {
          label: t("dashboard.reportCards"),
          icon: VectorI,
          progress: `${dashboardData.dashboardMetrics.grades.predictedFinalGrade}%`,
        },
        {
          label: t("dashboard.virtualClassroom"),
          icon: VirtualI,
          progress: `${dashboardData.virtualRoomsStates.attendancePercentage.toFixed(2)}%`,
        },
        {
          label: t("dashboard.attendance"),
          icon: AbsenceIcon,
          progress: `${dashboardData.dashboardMetrics.attendance.attendanceRate}%`,
        },
        {
          label: t("dashboard.examPassRate"),
          icon: learningI,
          progress: `${dashboardData.dashboardMetrics.exams.summary.examPassRate}%`,
        },
      ];
      setMainCategories(updatedCategories);
    }
  }, [dashboardData, t]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-white dark:bg-[#13082F]"
      >
        <Loader role={sessionStorage.getItem("role")} />
      </div>
    );
  }

  if (error) {
    Swal.fire({
      title: t("dashboard.errors.title"),
      text: error,
      icon: "error",
      confirmButtonText: t("dashboard.errors.confirmButton"),
      customClass: {
        popup: "dark:bg-[#281459] dark:text-gray-300",
      },
    });
    return null; 
  }

  if (!dashboardData) {
    return (
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="flex flex-col lg:flex-row items-center justify-center text-center mt-16 min-h-[60vh] w-[95%] mb-20 mx-auto font-poppins gap-8 bg-white dark:bg-[#13082F]"
      >
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{ backgroundImage: `url(${backgroundStars})` }}
        ></div>
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{ backgroundImage: `url(${backgroundWaves})` }}
        ></div>
        <div
          className={`relative z-10 flex flex-col lg:flex-row items-center justify-center w-full gap-8 ${
            i18n.language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm w-full max-w-md bg-white/90 dark:bg-[#281459]/90 backdrop-blur-sm">
              <CardContent className="text-center p-8">
                <div className="text-4xl mb-4">📊</div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
                  {t("dashboard.errors.noData.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t("dashboard.errors.noData.message")}
                </p>
                <Button
                  variant="solid"
                  className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
                  onClick={() => navigate("/")}
                >
                  {t("dashboard.errors.noData.backButton")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Chart Data
  const academicStandingData = {
    labels: [t("dashboard.standingScore")],
    datasets: [
      {
        data: [dashboardData.dashboardMetrics.academicStanding.score],
        backgroundColor: ["#FD813D", "#CF72C0", "#BC6FFB"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const performanceTrendsData = {
    labels: Object.keys(dashboardData.dashboardMetrics.performanceTrends.monthlyPerformance),
    datasets: [
      {
        label: t("dashboard.averageScore"),
        data: Object.values(dashboardData.dashboardMetrics.performanceTrends.monthlyPerformance).map(
          (stats) => stats.average
        ),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const gradeStatisticsData = {
    labels: [
      t("dashboard.averageGrade"),
      t("dashboard.highestGrade"),
      t("dashboard.lowestGrade"),
    ],
    datasets: [
      {
        label: t("dashboard.grades"),
        data: [
          dashboardData.grades.statistics.averageGrade,
          dashboardData.grades.statistics.highestGrade.grade,
          dashboardData.grades.statistics.lowestGrade.grade,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: "top", 
        labels: { 
          color: "gray",
          dark: { color: "#A070B5" } 
        } 
      },
      title: { 
        display: true, 
        color: "gray",
        dark: { color: "#A070B5" }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { 
          color: "gray",
          dark: { color: "#A070B5" }
        },
        grid: {
          color: "#E0E0E0",
          dark: { color: "#4B3B7A" }, 
          borderWidth: 0.3, 
        },
      },
      x: { 
        ticks: { 
          color: "gray",
          dark: { color: "#A070B5" }
        },
        grid: {
          color: "#E0E0E0",
          dark: { color: "#4B3B7A" },
          borderWidth: 0.3, 
        },
      },
    },
  };

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white dark:bg-[#13082F] relative "
    >
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundStars})` }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] p-6 shadow-md">
          {/* User */}
          <div
            className={`flex items-center ${
              i18n.language === "ar"
                ? "space-x-6 space-x-reverse pr-10"
                : "space-x-6 pl-10"
            }`}
          >
            <img
              src={userImage}
              alt={t("dashboard.profileImageAlt")}
              className="h-40 w-40 rounded-full border-4 border-white bg-[#CA9C9C] shadow-lg"
            />
            <div className="space-y-2">
              <h2 className="font-poppins text-2xl font-bold text-[#62413A] dark:text-gray-300">
                {fullName}
              </h2>
              <div
                className={`flex items-center ${
                  i18n.language === "ar" ? "space-x-2 space-x-reverse" : "space-x-2"
                }`}
              >
                <img
                  src={trueIcon}
                  alt={t("dashboard.presentIconAlt")}
                  className="h-6 w-6"
                />
                <p className="font-poppins font-medium text-[#62413A] dark:text-gray-300">
                  {t("dashboard.presentToday")}
                </p>
              </div>
            </div>
          </div>
          {/* Cards */}
          <div
            className={`hidden flex-wrap ${
              i18n.language === "ar" ? "space-x-8 space-x-reverse pl-10" : "space-x-8 pr-10"
            } lg:flex`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-col space-y-4 rounded-lg bg-white dark:bg-[#281459] p-4 shadow-md border dark:border-[#E0AAEE]">
                <div
                  className={`flex items-center ${
                    i18n.language === "ar" ? "space-x-2 space-x-reverse" : "space-x-2"
                  }`}
                >
                  <FaCalendarAlt className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {new Date().toLocaleDateString()} |{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    i18n.language === "ar" ? "space-x-8 space-x-reverse" : "space-x-8"
                  }`}
                >
                  <p
                    className={`font-poppins text-lg font-semibold ${
                      semesterReward.badge === "Green"
                        ? "text-green-600"
                        : semesterReward.badge === "Diamond"
                        ? "text-gray-500"
                        : semesterReward.badge === "Gold"
                        ? "text-yellow-500"
                        : "text-green-700"
                    } dark:text-gray-300`}
                  >
                    {semesterReward.badge === "Green"
                      ? t("dashboard.greenLevel")
                      : semesterReward.badge === "Diamond"
                      ? t("dashboard.diamondLevel")
                      : semesterReward.badge === "Gold"
                      ? t("dashboard.goldLevel")
                      : t("dashboard.greenLevel")}
                  </p>
                  <img
                    src={awardIcon}
                    alt={t("dashboard.awardIconAlt")}
                    className="h-10 w-10"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white dark:bg-[#281459] p-4 shadow-md border dark:border-[#E0AAEE]">
                <p className="font-poppins text-xs font-medium text-gray-600 dark:text-gray-300">
                  {t("dashboard.learningStreak")}
                </p>
                <div
                  className={`mt-2 flex ${
                    i18n.language === "ar" ? "space-x-reverse" : ""
                  } space-x-1`}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div
                      key={index}
                      className={`h-6 w-6 rounded-full border text-center font-bold ${
                        index < 3
                          ? "bg-[#FD813D] text-white"
                          : "bg-gray-200 dark:bg-[#4B3B7A] text-gray-400 dark:text-gray-300"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <p className="mt-1 font-poppins text-sm font-medium text-gray-600 dark:text-gray-300">
                  3{t("dashboard.days")} 🔥
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-white dark:bg-[#281459] p-6 shadow-md border dark:border-[#E0AAEE]">
              <p className="font-poppins text-lg font-semibold text-gray-600 dark:text-gray-300">
                {t("dashboard.yourScore")}
              </p>
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="fill-none stroke-gray-200 dark:stroke-[#4B3B7A]"
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
                  className={`text-xl font-bold ${
                    semesterReward.badge === "Green"
                      ? "text-green-600"
                      : semesterReward.badge === "Diamond"
                      ? "text-gray-500"
                      : semesterReward.badge === "Gold"
                      ? "text-yellow-500"
                      : "text-green-700"
                  } dark:text-gray-300`}
                >
                  {semesterReward.totalSemesterPoints}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="mx-auto w-[95%] rounded-lg px-4 py-8 ">
          <div className="flex items-center py-4">
            <p
              className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${
                i18n.language === "ar" ? "ml-2" : "mr-2"
              }`}
            ></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:text-gray-300">
              {t("dashboard.quickMenu")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              {
                label: t("menu.motivation"),
                icon: AwardIcon,
                path: "/student/motivation",
              },
              {
                label: t("menu.courses"),
                icon: CourseIcon,
                path: "/student/allcourses",
              },
              {
                label: t("menu.absence"),
                icon: AbsenceIcon,
                path: "/student/attendance",
              },
              {
                label: t("menu.schedule"),
                icon: ScheduleIcon,
                path: "/student/schedule",
              },
              {
                label: t("menu.grades"),
                icon: GradeIcon,
                path: "/student/grades",
              },
              {
                label: t("menu.activities"),
                icon: ActivityIcon,
                path: "/student/activities",
              },
              {
                label: t("menu.library"),
                icon: LibraryIcon,
                path: "/student/library",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="flex h-36 w-full transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] dark:bg-[#281459] font-poppins font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#BC6FFB] dark:bg-[#C459D9] transition-all duration-300 ease-in-out">
                  <img src={item.icon} alt={item.label} className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Categories */}
        <div className="mx-auto mt-8 w-[95%] rounded-lg  p-4">
          <div className="flex items-center">
            <p
              className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${
                i18n.language === "ar" ? "ml-2" : "mr-2"
              }`}
            ></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:text-gray-300">
              {t("dashboard.mainCategories")}
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {mainCategories.map((category, index) => (
              <div
                key={index}
                className="hover:scale-102 flex transform flex-col items-center rounded-2xl border-4 bg-[#F5F5F5] dark:bg-[#281459] p-4 shadow-md transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-[#F1F1F1] dark:hover:bg-[#281459] hover:shadow-xl"
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
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        {dashboardData && (
          <div className="mx-auto mt-12 w-[95%] rounded-lg p-4  pb-12">
            <div className="flex items-center">
              <p
                className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${
                  i18n.language === "ar" ? "ml-2" : "mr-2"
                }`}
              ></p>
              <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:text-gray-300">
                {t("dashboard.chartsInsights")}
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Academic Standing Chart */}
              <Card className="border border-gray-200 dark:border-[#E0AAEE] dark:bg-[#1A0C3D] rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-poppins text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    {t("dashboard.academicStanding")}
                  </h3>
                  <Pie
                    data={academicStandingData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: `${t("dashboard.standingScore")}: ${dashboardData.dashboardMetrics.academicStanding.score}%`,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>

              {/* Performance Trends Chart */}
              <Card className="border border-gray-200 dark:border-[#E0AAEE] dark:bg-[#1A0C3D] rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-poppins text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    {t("dashboard.performanceTrends")}
                  </h3>
                  <Line
                    data={performanceTrendsData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: t("dashboard.monthlyPerformance"),
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>

              {/* Grade Statistics Chart */}
              <Card className="border border-gray-200 dark:border-[#E0AAEE] dark:bg-[#1A0C3D] rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-poppins text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    {t("dashboard.gradeStatistics")}
                  </h3>
                  <Bar
                    data={gradeStatisticsData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: { display: true, text: t("dashboard.grades") },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardStudent;