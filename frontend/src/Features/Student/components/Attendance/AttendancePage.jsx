import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentAttendance } from "../StudentRedux/studentAttendanceSlice";
import Loader from "@/ui/Loader";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const AttendancePage = () => {
  const { t,i18n } = useTranslation();
  const { studentAttendance, loading } = useSelector(
    (state) => state.studentAttendance
  );
  const [currentDate, setCurrentDate] = useState(dayjs());
  const dispatch = useDispatch();
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    dispatch(fetchStudentAttendance());
  }, [dispatch]);

  const uniqueAttendance = studentAttendance.reduce((acc, record) => {
    const key = `${record.date.split("T")[0]}-${record.studentId}`;
    acc.set(key, record);
    return acc;
  }, new Map());

  const attendanceArray = Array.from(uniqueAttendance.values());

  const groupedByDate = attendanceArray.reduce((acc, record) => {
    const date = record.date.split("T")[0];
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
      presentPercentage:
        totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0,
      absentPercentage:
        totalSessions > 0 ? (absentCount / totalSessions) * 100 : 0,
    };
  });

  const startOfWeek = currentDate.startOf("week");
  const days = Array.from({ length: 21 }, (_, i) =>
    startOfWeek.add(i, "day").format("YYYY-MM-DD")
  );

  const handlePreviousWeek = () =>
    setCurrentDate(currentDate.subtract(7, "day"));
  const handleNextWeek = () => setCurrentDate(currentDate.add(7, "day"));

  const groupedAttendance = attendanceArray.reduce((acc, record) => {
    const key = record.academic_number;
    if (!acc[key]) acc[key] = { academic_number: key, attendance: {} };
    acc[key].attendance[dayjs(record.date).format("YYYY-MM-DD")] =
      record.status;
    return acc;
  }, {});

  const getTranslatedDay = (date) => {
    const day = dayjs(date).format("dddd").toLowerCase();
    return t(`attendance.days.${day}`);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>
      <div className="relative z-10 mt-10 flex items-start justify-center">
        <div className="w-[90%]">
          <div className="mb-8">
            <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-3xl font-semibold text-transparent">
              {t("attendance.title")}
              <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                  }`}></span>
            </h1>

            <div className={`flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 ${i18n.language === 'ar' ? 'sm:mr-8 sm:space-x-reverse sm:space-x-8' : 'sm:ml-8 sm:space-x-8'}`}>
              <span className={`flex items-center p-4 text-lg font-medium text-green-600 dark:text-green-400 ${i18n.language === 'ar' ? 'space-x-reverse' : ''}`}>
                <span className={`h-4 w-4 rounded-full bg-green-600 dark:bg-green-400 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></span>
                {t("attendance.present")}:{" "}
                {attendanceStats.reduce((sum, day) => sum + day.presentCount, 0)}
              </span>
              <span className={`flex items-center p-4 text-lg font-medium text-red-600 dark:text-[#FF6B6B] ${i18n.language === 'ar' ? 'space-x-reverse' : ''}`}>
                <span className={`h-4 w-4 rounded-full bg-red-600 dark:bg-[#FF6B6B] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></span>
                {t("attendance.absent")}:{" "}
                {attendanceStats.reduce((sum, day) => sum + day.absentCount, 0)}
              </span>
            </div>

            <div className={`relative mt-5 w-full max-w-[500px] ${i18n.language === 'ar' ? 'sm:mr-8 sm:pr-8' : 'sm:ml-8 sm:pl-8'}`}>
              <div className="h-5 rounded-full bg-gray-200 dark:bg-[#281459]">
                <div
                  className="relative h-5 rounded-full bg-gradient-to-r from-green-500 to-green-300 dark:from-green-400 dark:to-green-600"
                  style={{
                    width: `${
                      attendanceStats.length > 0
                        ? (attendanceStats.reduce(
                            (sum, day) => sum + day.presentCount,
                            0
                          ) /
                            attendanceStats.reduce(
                              (sum, day) => sum + day.totalSessions,
                              0
                            )) *
                          100
                        : 0
                    }%`,
                  }}
                >
                  <span className="shadow-black-600/50 absolute right-0 top-[-6px] h-8 w-[5px] translate-x-1/2 transform rounded-full bg-green-500 dark:bg-green-400 shadow-xl blur-[1px] filter"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#E0AAEE] shadow-md mt-12 mb-12">
            <table className="min-w-full table-auto bg-white dark:bg-[#312A5E] p-6 shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#E0AAEE]">
                  <th className="border-b border-gray-200 dark:border-[#E0AAEE] px-2 py-4 text-center text-gray-700 dark:text-gray-300">
                    {t("attendance.academicNumber")}:{" "}
                    {Object.values(groupedAttendance)[0]?.academic_number ||
                      t("attendance.notAvailable")}
                  </th>
                  <th colSpan="6">
                    <div className="mb-6 mr-6 mt-6 flex flex-nowrap items-center justify-end">
                      <button
                        onClick={handlePreviousWeek}
                        className="rounded-xl border-2 border-[#FFB7B7] dark:border-[#C459D9] bg-white dark:bg-[#281459] px-2 py-2 font-medium text-[#FFB7B7] dark:text-[#C459D9] hover:text-gray-800 dark:hover:text-gray-300"
                        aria-label={t("attendance.weekNavigation.previous")}
                      >
                        &lt;
                      </button>
                      <h2 className="mx-4 rounded-xl border border-gray-200 dark:border-[#E0AAEE] bg-[#FFB7B7] dark:bg-[#C459D9] px-4 py-2 text-center text-lg font-medium text-white">
                        {startOfWeek.format("MMM DD")} -{" "}
                        {startOfWeek.add(6, "day").format("MMM DD, YYYY")}
                      </h2>
                      <button
                        onClick={handleNextWeek}
                        className="rounded-xl border-2 border-[#FFB7B7] dark:border-[#C459D9] bg-white dark:bg-[#281459] px-2 py-2 font-medium text-[#FFB7B7] dark:text-[#C459D9] hover:text-gray-800 dark:hover:text-gray-300"
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
                  <tr
                    key={dayIndex}
                    className="border-b border-gray-200 dark:border-[#E0AAEE]"
                  >
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
                            className={`border-l border-gray-200 dark:border-[#E0AAEE] px-2 py-5 text-center text-gray-800 dark:text-gray-300 ${
                              isToday
                                ? "bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 dark:from-[#CE4EA0]/10 dark:via-[#BF4ACB]/10 dark:to-[#AE45FB]/10"
                                : ""
                            }`}
                          >
                            {getTranslatedDay(day)} {dayjs(day).format("DD")}
                          </td>
                          <td
                            style={{ minWidth: "70px", width: "70px" }}
                            className={`border-l border-gray-200 dark:border-[#E0AAEE] px-5 py-5 text-center ${
                              status === "P"
                                ? "bg-green-600 dark:bg-green-400 text-white"
                                : status === "A"
                                ? "bg-red-600 dark:bg-[#FF6B6B] text-white"
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
      </div>
    </div>
  );
};

export default AttendancePage;