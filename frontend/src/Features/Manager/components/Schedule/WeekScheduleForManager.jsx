import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useManagerSchedule } from "../services/apiSchedule";
import Loader from "@/ui/Loader";

const WeeklyScheduleForManager = () => {
  const { id } = useParams();

  const { data: managerSchedule, isLoading: loading } = useManagerSchedule(id);

  console.log("API Response:", managerSchedule);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const timeslots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
  ];

  const schedules = managerSchedule?.schedules || [];

  const semesterName = schedules?.[0]?.semester_id?.semesterName;
  const startYear = schedules?.[0]?.academic_year_id?.startYear;
  const endYear = schedules?.[0]?.academic_year_id?.endYear;

  const calculateDuration = (start_time, end_time) => {
    const startTime = new Date(`1970-01-01T${start_time}:00Z`);
    const endTime = new Date(`1970-01-01T${end_time}:00Z`);
    const durationInMinutes = (endTime - startTime) / 60000;

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  };

  if (loading)
    return (
      <p>
        <Loader />
      </p>
    );

  if (schedules.length === 0) {
    return (
      <>
        <div className="dark:bg-DarkManager2 mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg dark:text-white">
          <FontAwesomeIcon
            icon={faCalendar}
            className="mb-4 text-6xl text-gray-400 dark:text-white"
          />
          <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-white">
            No schedules Found
          </p>
          <p className="mb-4 max-w-xl text-center text-gray-500 dark:text-white">
            It seems like there are no schedules available at the moment. Please
            check back later.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex-1">
          <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
            <div className="mx-auto w-full max-w-7xl px-4">
              <div className="my-2 flex items-center justify-between">
                <div>
                  <div className="dark:text-DarkManager ms-4 cursor-text py-1 font-poppins text-lg font-bold text-dashboard-bg sm:text-2xl">
                    Weekly Schedule - {semesterName} ({startYear}-{endYear})
                  </div>
                  <p className="dark:border-DarkManager mb-4 ms-4 w-24 rounded-xl border-t-4 border-[#117C90]"></p>
                </div>
                <button className="dark:to-DarkManager rounded-2xl bg-gradient-to-r from-[#105E6A] to-[#117C90] px-3 py-1 font-poppins text-xs text-white sm:px-4 sm:py-2 sm:text-sm">
                  Export as PDF
                </button>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full min-w-[800px] border-collapse border border-gray-300 text-sm sm:text-base">
                  <thead>
                    <tr className="dark:bg-DarkManager bg-dashboard-bg text-white">
                      <th className="border border-gray-300 p-2 font-poppins">
                        Time
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="border border-gray-300 p-2 font-poppins"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeslots.map((time) => (
                      <tr key={time} className="bg-gray-100 even:bg-white">
                        <td className="border border-gray-300 p-2 text-center font-poppins font-bold dark:text-black">
                          {time}
                        </td>
                        {days.map((day) => {
                          const scheduleItem = schedules.find(
                            (item) =>
                              item.day_of_week === day &&
                              item.start_time === time,
                          );

                          return (
                            <td
                              key={`${day}-${time}`}
                              className="border border-gray-300 p-2 text-center"
                            >
                              <div className="rounded-lg bg-white p-2 font-poppins shadow-md dark:text-black">
                                {scheduleItem ? (
                                  <>
                                    <p className="font-semibold">
                                      {scheduleItem.subject_id.subjectName}
                                    </p>
                                    <p className="text-xs">
                                      {scheduleItem.teacher_id.fullName}
                                    </p>
                                    <p className="text-xs">
                                      {scheduleItem.grade_id.gradeName} |{" "}
                                      {scheduleItem.class_id.className}
                                    </p>
                                    <p className="text-xs">
                                      {calculateDuration(
                                        scheduleItem.start_time,
                                        scheduleItem.end_time,
                                      )}
                                    </p>
                                  </>
                                ) : (
                                  <p className="font-poppins text-xs text-gray-500">
                                    No class
                                  </p>
                                )}
                              </div>
                            </td>
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
      </div>
    </>
  );
};

export default WeeklyScheduleForManager;
