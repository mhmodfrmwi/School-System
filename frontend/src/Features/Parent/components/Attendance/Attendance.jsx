import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Loader from "@/ui/Loader";
import { Button } from "@/components/ui/button";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import { useChildAttendance } from "../hooks/attendace";

const Attendance = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar";

  const [selectedKid] = useState(() => {
    const kid =
      location.state?.selectedKid ||
      JSON.parse(localStorage.getItem("selectedKid"));
    if (!kid) {
      navigate(-1);
      return null;
    }
    return kid;
  });

  console.log(selectedKid);

  const { attendanceData, isLoading, error } = useChildAttendance(
    selectedKid?._id,
  );

  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfWeek = currentDate.startOf("week");
  const days = Array.from({ length: 21 }, (_, i) =>
    startOfWeek.add(i, "day").format("YYYY-MM-DD"),
  );

  const handlePreviousWeek = () =>
    setCurrentDate(currentDate.subtract(7, "day"));
  const handleNextWeek = () => setCurrentDate(currentDate.add(7, "day"));

  const groupedAttendance = attendanceData?.reduce((acc, record) => {
    const key = record.academic_number || selectedKid._id;
    if (!acc[key]) acc[key] = { academic_number: key, attendance: {} };
    acc[key].attendance[dayjs(record.date).format("YYYY-MM-DD")] =
      record.status;
    return acc;
  }, {});

  const getTranslatedDay = (date) => {
    const day = dayjs(date).format("dddd").toLowerCase();
    return t(`attendance.days.${day}`);
  };

  useEffect(() => {}, [attendanceData]);

  if (!selectedKid) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto mb-20 mt-16 min-h-screen w-[95%] bg-white dark:bg-[#13082F]">
        <Loader role="parent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mb-20 mt-16 min-h-screen w-[95%] bg-white p-8 dark:bg-[#13082F]">
        <div className="text-red-500">{t("attendance.error")}</div>
      </div>
    );
  }

  const groupedByDate = attendanceData.reduce((acc, record) => {
    const date = dayjs(record.date).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = { totalSessions: 0, presentCount: 0, absentCount: 0 };
    }
    acc[date].totalSessions += 1;
    if (record.status === "P") {
      acc[date].presentCount += 1;
    } else {
      acc[date].absentCount += 1;
    }
    return acc;
  }, {});

  const attendanceStats = Object.keys(groupedByDate).map((date) => {
    const { totalSessions, presentCount, absentCount } = groupedByDate[date];
    return {
      date,
      totalSessions,
      presentCount,
      absentCount,
      presentPercentage: (presentCount / totalSessions) * 100,
      absentPercentage: (absentCount / totalSessions) * 100,
    };
  });

  const totalPresent = attendanceStats.reduce(
    (sum, day) => sum + day.presentCount,
    0,
  );
  const totalAbsent = attendanceStats.reduce(
    (sum, day) => sum + day.absentCount,
    0,
  );
  const totalSessions = totalPresent + totalAbsent;
  const overallAttendancePercentage =
    totalSessions > 0 ? (totalPresent / totalSessions) * 100 : 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-[#f9f0ff] p-4 font-poppins dark:from-[#13082F] dark:to-[#1e0a4a] sm:p-8">
      {/* Background elements */}
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${backgroundStars})` }}
      ></div>
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>

      <section className="relative z-10 mx-auto mb-20 mt-16 min-h-screen max-w-6xl pt-4 font-poppins">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE] md:text-3xl">
              {t("childAttendance.title")} -{" "}
              <span className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {selectedKid.fullName}
              </span>
            </h1>
            <div className="mt-2 h-1 w-44 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] md:w-72"></div>
          </div>

          <div
            dir={isRTL ? "rtl" : "ltr"}
            className={`relative z-10 mb-16 flex w-full items-center ${isRTL ? "flex-row-reverse" : "flex-row-reverse"}`}
          >
            <Button
              variant="solid"
              className={`bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white transition-shadow duration-300 hover:shadow-lg dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${isRTL ? "ml-4" : "mr-4"}`}
              onClick={() => navigate(-1)}
            >
              {t("gradesAllSemesters.back")}
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="transform rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:border-[#AE45FB] dark:bg-[#281459]">
            <div className="flex items-center justify-center">
              <div className="mx-3 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {t("childAttendance.totalPresent")}
                </h3>
                <p className="text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {totalPresent}
                </p>
              </div>
            </div>
          </div>

          <div className="transform rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:border-[#AE45FB] dark:bg-[#281459]">
            <div className="flex items-center justify-center">
              <div className="mx-3 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {t("childAttendance.totalAbsent")}
                </h3>
                <p className="text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {totalAbsent}
                </p>
              </div>
            </div>
          </div>

          <div className="transform rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:border-[#AE45FB] dark:bg-[#281459]">
            <div className="flex items-center justify-center">
              <div className="mx-3 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {t("childAttendance.overallAttendance")}
                </h3>
                <p className="text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {overallAttendancePercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Attendance Table */}
        <div className="mb-8 overflow-hidden rounded-xl border border-[#E0AAEE] shadow-lg dark:border-[#AE45FB]">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white p-6 shadow-md dark:bg-[#312A5E]">
              <thead>
                <tr className="border-b border-[#E0AAEE]">
                  <th className="border-b border-[#E0AAEE] px-2 py-4 text-center text-gray-700 dark:text-gray-300">
                    {t("attendance.academicNumber")}:{" "}
                    {selectedKid.academic_number ||
                      t("attendance.notAvailable")}
                  </th>
                  <th colSpan="6">
                    <div className="mb-6 mr-6 mt-6 flex flex-nowrap items-center justify-end">
                      <button
                        onClick={handlePreviousWeek}
                        className="rounded-xl border-2 border-[#FFB7B7] bg-white px-2 py-2 font-medium text-[#FFB7B7] hover:text-gray-800 dark:border-[#C459D9] dark:bg-[#281459] dark:text-[#C459D9] dark:hover:text-gray-300"
                        aria-label={t("attendance.weekNavigation.previous")}
                      >
                        &lt;
                      </button>
                      <h2 className="mx-4 rounded-xl border border-[#E0AAEE] bg-[#FFB7B7] px-4 py-2 text-center text-lg font-medium text-white dark:bg-[#C459D9]">
                        {startOfWeek.format("MMM DD")} -{" "}
                        {startOfWeek.add(6, "day").format("MMM DD, YYYY")}
                      </h2>
                      <button
                        onClick={handleNextWeek}
                        className="rounded-xl border-2 border-[#FFB7B7] bg-white px-2 py-2 font-medium text-[#FFB7B7] hover:text-gray-800 dark:border-[#C459D9] dark:bg-[#281459] dark:text-[#C459D9] dark:hover:text-gray-300"
                        aria-label={t("attendance.weekNavigation.next")}
                      >
                        &gt;
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-[#F9F9F9] dark:bg-[#281459]">
                {[...Array(7)].map((_, dayIndex) => (
                  <tr key={dayIndex} className="border-b border-[#E0AAEE]">
                    {[...Array(3)].map((_, colIndex) => {
                      const day = days[colIndex * 7 + dayIndex];
                      const status =
                        Object.values(groupedAttendance)[0]?.attendance[day] ||
                        "";
                      const isToday = dayjs(day).isSame(dayjs(), "day");
                      return (
                        <React.Fragment key={colIndex}>
                          <td
                            style={{ minWidth: "70px", width: "70px" }}
                            className={`border-l border-[#E0AAEE] px-2 py-5 text-center text-gray-800 dark:text-gray-300 ${
                              isToday
                                ? "bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 dark:from-[#CE4EA0]/10 dark:via-[#BF4ACB]/10 dark:to-[#AE45FB]/10"
                                : ""
                            }`}
                          >
                            {getTranslatedDay(day)} {dayjs(day).format("DD")}
                          </td>
                          <td
                            style={{ minWidth: "70px", width: "70px" }}
                            className={`border-l border-[#E0AAEE] px-5 py-5 text-center ${
                              status === "P"
                                ? "bg-green-600 text-white dark:bg-green-400"
                                : status === "A"
                                  ? "bg-red-600 text-white dark:bg-[#FF6B6B]"
                                  : "text-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {status}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simplified Detailed Attendance Table */}
        <div className="overflow-y-auto rounded-xl border border-[#E0AAEE] shadow-lg dark:border-[#AE45FB]">
          <div className="max-h-[500px]">
            <table className="min-w-full divide-y divide-[#E0AAEE] dark:divide-[#AE45FB]">
              <thead className="bg-[#D6A3E1] dark:bg-[#3B1E77]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-[#E0AAEE]">
                    {t("childAttendance.date")}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-[#E0AAEE]">
                    {t("childAttendance.attendance")}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-[#E0AAEE]">
                    {t("childAttendance.absence")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0AAEE] bg-white dark:divide-[#AE45FB] dark:bg-[#281459]">
                {attendanceStats.map((attendance, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-[#f3e5f5] dark:hover:bg-[#3B1E77]"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-[#E0AAEE]">
                      {dayjs(attendance.date).format("DD MMM YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-[#E0AAEE]">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                        {attendance.presentCount} (
                        {attendance.presentPercentage.toFixed(0)}%)
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-[#E0AAEE]">
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                        {attendance.absentCount} (
                        {attendance.absentPercentage.toFixed(0)}%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state */}
        {attendanceStats.length === 0 && (
          <div className="mt-8 rounded-lg bg-[#f3e5f5] p-8 text-center dark:bg-[#3B1E77]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-[#AE45FB]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-[#5e5b63] dark:text-[#E0AAEE]">
              {t("childAttendance.noDataTitle")}
            </h3>
            <p className="mt-2 text-[#5e5b63] dark:text-[#E0AAEE]">
              {t("childAttendance.noDataDescription")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Attendance;
