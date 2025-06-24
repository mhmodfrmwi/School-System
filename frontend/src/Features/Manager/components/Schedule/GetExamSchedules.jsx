import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../ui/Loader";
import { useNavigate } from "react-router-dom";
import ScheduleToggle from "./SelectPage";
import { useTranslation } from "react-i18next";
import { useExamSchedules } from "../hooks/schedule";

const GetExamSchedules = () => {
  const { isLoading, managerExamSchedules } = useExamSchedules();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  const hasSchedules = managerExamSchedules?.grades?.some((grade) =>
    grade.schedules.some((schedule) => !schedule.message),
  );

  if (!managerExamSchedules || !hasSchedules) {
    return (
      <>
        <ScheduleToggle />
        <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg dark:bg-DarkManager2">
          <button
            className="me-0 rounded-2xl bg-gradient-to-r from-[#117C90] to-[#117C90] px-3 py-1 font-poppins text-xs text-white dark:from-DarkManager dark:to-DarkManager sm:px-4 sm:py-2 sm:text-sm xl:me-4"
            onClick={() => navigate("/manager/create-exam-schedule")}
          >
            {t("schedulem.AddExamSchedule")}
          </button>
          <FontAwesomeIcon
            icon={faCalendar}
            className="mb-4 mt-10 text-6xl text-gray-400 dark:text-white"
          />
          <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-white">
            No schedules found for the academic year
          </p>
          <p className="mb-4 max-w-xl text-center text-gray-500 dark:text-white">
            It seems like there are no exam schedules available at the moment.
            Please check back later.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <ScheduleToggle />
      <div className="flex flex-col px-4">
        <div className="flex-1">
          <div className="mx-auto w-[360px] sm:w-[550px] md:w-[700px] xl:w-full">
            <div className="mx-auto w-full max-w-7xl px-4">
              {/* Header */}
              <div className="my-2 flex items-center justify-between">
                <div>
                  <div className="ms-4 cursor-text py-1 font-poppins text-sm font-bold text-[#117C90] dark:text-DarkManager sm:text-xl">
                    {t("schedulem.ExamSchedule")}{" "}
                    {managerExamSchedules.academic_year}
                  </div>
                  <p className="mb-4 ms-4 w-24 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>
                </div>
                <button
                  className="me-0 rounded-2xl bg-gradient-to-r from-[#117C90] to-[#117C90] px-3 py-1 font-poppins text-xs text-white dark:from-DarkManager dark:to-DarkManager sm:px-4 sm:py-2 sm:text-sm xl:me-4"
                  onClick={() => navigate("/manager/create-exam-schedule")}
                >
                  {t("schedulem.AddExamSchedule")}
                </button>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full min-w-[800px] border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] font-poppins shadow-md shadow-[#117C90] dark:shadow-DarkManager">
                  <thead className="bg-[#117C90] text-center text-white dark:bg-DarkManager">
                    <tr>
                      <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                        {t("schedulem.Grade")}
                      </th>
                      <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                        {t("schedulem.Semester")}
                      </th>
                      <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                        {t("schedulem.StartTime")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {managerExamSchedules.grades.map((grade) => {
                      return grade.schedules.map((schedule, index) => {
                        if (schedule.message) {
                          return (
                            <tr
                              key={`${grade.grade}-${index}`}
                              className="bg-white even:bg-[#F5FAFF] dark:text-black"
                            >
                              <td className="px-3 py-2 text-center text-xs sm:text-sm md:text-base">
                                {grade.grade}
                              </td>

                              <td className="px-3 py-2 text-center text-xs sm:text-sm md:text-base">
                                -
                              </td>

                              <td
                                colSpan="1"
                                className="px-3 py-2 text-center text-xs sm:text-sm md:text-base"
                              >
                                <p className="text-gray-600">
                                  {schedule.message}
                                </p>
                              </td>
                            </tr>
                          );
                        }

                        const earliestDate =
                          schedule.exams.length > 0
                            ? new Date(
                                Math.min(
                                  ...schedule.exams.map((exam) =>
                                    new Date(exam.date).getTime(),
                                  ),
                                ),
                              ).toLocaleDateString()
                            : "-";

                        return (
                          <tr
                            key={`${grade.grade}-${schedule.schedule_id}`}
                            className="cursor-pointer bg-white even:bg-[#F5FAFF] hover:bg-[#117C90]/10 dark:text-black dark:hover:bg-DarkManager/10"
                            onClick={() =>
                              navigate(
                                `/manager/get-exam-schedule/${schedule.schedule_id}`,
                              )
                            }
                          >
                            <td className="md:text-basee px-3 py-2 text-center text-xs sm:text-sm">
                              {grade.grade}
                            </td>

                            <td className="px-3 py-2 text-center text-xs sm:text-sm md:text-base">
                              {schedule.semester}
                            </td>

                            <td className="px-3 py-2 text-center text-xs sm:text-sm md:text-base">
                              {earliestDate}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetExamSchedules;
