import React from "react";
import img1 from "../../../../assets/schedule1.png";
import { useExamSchedules } from "../services/apiSchedule";
import Loader from "../../../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

function GetExamScheduleForStudent() {
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, studentExamSchedule } = useExamSchedules();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#13082F]">
        <Loader role="student" />
      </div>
    );
  }

  const sortedSchedule = studentExamSchedule
    ? [...studentExamSchedule].sort(
        (a, b) => new Date(a.exam_date) - new Date(b.exam_date)
      )
    : [];

  const schedule = [
    [
      t("examSchedule.headers.subject"),
      t("examSchedule.headers.examDate"),
      t("examSchedule.headers.startTime"),
      t("examSchedule.headers.endTime"),
    ],
    ...sortedSchedule.map((exam) => [
      exam.subject,
      new Date(exam.exam_date).toLocaleDateString(),
      exam.start_time,
      exam.end_time,
    ]),
  ];

  if (!studentExamSchedule || studentExamSchedule.length === 0) {
    return (
 <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
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
        <section className="mx-auto mt-10 min-h-screen w-full px-6 font-poppins flex flex-col">
          <div className="relative z-10 flex-grow">
            <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
              <div className="col-span-2 flex flex-col justify-between">
                <div className="ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 lg:ms-20">
                  <button className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
                    {t("examSchedule.title")}
                    <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            }`}></span>
                  </button>
                </div>
                <div className="mb-10 ms-8 mt-7 flex items-center gap-8 md:ms-14 lg:ms-20">
                  <button
                    className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text px-5 py-2 font-poppins text-lg font-medium text-transparent"
                    onClick={() => navigate("/student/schedule")}
                  >
                    {t("examSchedule.weeklySchedule")}
                  </button>
                  <button
                    className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-5 py-2 font-poppins text-lg font-medium text-white focus:outline-none"
                    onClick={() => navigate("/student/get-exam-schedule")}
                  >
                    {t("examSchedule.examSchedule")}
                  </button>
                </div>
              </div>
              <img
                src={img1}
                className="col-span-1 mx-auto mt-10 w-72"
                alt="Schedule"
              />
            </div>

            <div className="mx-auto mb-20 w-full rounded-xl border border-gray-200 dark:border-[#E0AAEE] bg-white dark:bg-[#281459] p-6 text-center font-poppins shadow-md">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("examSchedule.noSchedules")}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
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
      <section className="mx-auto mt-4 min-h-screen w-full px-6 font-poppins flex flex-col">
        <div className="relative z-10 flex-grow">
          <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
            <div className="col-span-2 flex flex-col justify-between">
              <div className="ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 lg:ms-20">
                <button className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
                  {t("examSchedule.title")}
                  <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"></span>
                </button>
              </div>
              <div className="mb-10 me-10 ms-8 mt-7 flex items-center gap-8 md:ms-14 lg:ms-20">
                <button
                  className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text px-5 py-2 font-poppins text-lg font-medium text-transparent"
                  onClick={() => navigate("/student/schedule")}
                >
                  {t("examSchedule.weeklySchedule")}
                </button>
                <button
                  className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-5 py-2 font-poppins text-lg font-medium text-white focus:outline-none"
                  onClick={() => navigate("/student/get-exam-schedule")}
                >
                  {t("examSchedule.examSchedule")}
                </button>
              </div>
            </div>
            <img
              src={img1}
              className="col-span-1 mx-auto mt-10 w-72"
              alt="Schedule"
            />
          </div>

          <div className="mx-auto mb-20 w-[88%] rounded-xl border border-gray-200 dark:border-[#E0AAEE] font-poppins shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-white dark:bg-[#312A5E] p-6 shadow-md">
                <thead>
                  <tr>
                    {schedule[0].map((header, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-gray-200 dark:border-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#C459D9] px-4 py-4 text-center text-gray-700 dark:text-gray-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(1).map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`border-b border-gray-200 dark:border-[#E0AAEE] ${
                        rowIndex % 2 === 0
                          ? "bg-white dark:bg-[#281459]"
                          : "bg-[#F9F9F9] dark:bg-[#281459]"
                      } transition duration-200 hover:bg-[#F3E5F5] dark:hover:bg-[#3A2A7A]`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-gray-300"
                        >
                          {cell || "--"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetExamScheduleForStudent;