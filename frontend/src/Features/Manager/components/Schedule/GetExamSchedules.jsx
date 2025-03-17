// import React from "react";
// import { useExamSchedules } from "../services/apiSchedule";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import Loader from "../../../../ui/Loader";
// import { useNavigate } from "react-router-dom";

// const GetExamSchedules = () => {
//   const { isLoading, managerExamSchedules } = useExamSchedules();
//   const navigate = useNavigate();
//   console.log(managerExamSchedules);

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!managerExamSchedules) {
//     return (
//       <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
//         <FontAwesomeIcon
//           icon={faCalendar}
//           className="mb-4 text-6xl text-gray-400"
//         />
//         <p className="mb-2 text-xl font-semibold text-gray-600">
//           No schedules Found
//         </p>
//         <p className="mb-4 max-w-xl text-center text-gray-500">
//           It seems like there are no exam schedules available at the moment.
//           Please check back later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col p-4">
//       <div className="flex-1">
//         <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
//           <div className="mx-auto w-full max-w-7xl px-4">
//             {/* Header */}
//             <div className="my-2 flex items-center justify-between">
//               <div>
//                 <div className="ms-4 cursor-text py-1 font-poppins text-sm font-bold text-[#105E6A] sm:text-xl">
//                   Exam Schedules - {managerExamSchedules.academic_year}
//                 </div>
//                 <p className="mb-4 ms-4 w-24 rounded-xl border-t-4 border-[#117C90]"></p>
//               </div>
//               <button
//                 className="rounded-2xl bg-gradient-to-r from-[#105E6A] to-[#117C90] px-3 py-1 font-poppins text-xs text-white sm:px-4 sm:py-2 sm:text-sm"
//                 onClick={() => navigate("/manager/create-exam-schedule")}
//               >
//                 Create Schedule
//               </button>
//             </div>

//             {/* Exam Schedules Table */}
//             <div className="overflow-x-auto p-4">
//               <table className="w-full min-w-[800px] border-collapse border border-gray-300 text-sm sm:text-base">
//                 <thead>
//                   <tr className="bg-[#105E6A] text-white">
//                     <th className="border border-gray-300 p-2 font-poppins">
//                       Grade
//                     </th>
//                     <th className="border border-gray-300 p-2 font-poppins">
//                       Semester
//                     </th>
//                     <th className="border border-gray-300 p-2 font-poppins">
//                       Subject
//                     </th>
//                     <th className="border border-gray-300 p-2 font-poppins">
//                       Date
//                     </th>
//                     <th className="border border-gray-300 p-2 font-poppins">
//                       Time
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {managerExamSchedules.grades.map((grade) => {
//                     return (
//                       <React.Fragment key={grade.grade}>
//                         {grade.schedules.map((schedule, index) => (
//                           <React.Fragment key={`${grade.grade}-${index}`}>
//                             {schedule.message ? (
//                               <tr className="bg-white even:bg-gray-100">
//                                 {/* Grade Name */}
//                                 {index === 0 && (
//                                   <td
//                                     rowSpan={grade.schedules.length}
//                                     className="border border-gray-300 p-2 text-center font-semibold"
//                                   >
//                                     {grade.grade}
//                                   </td>
//                                 )}

//                                 {/* Semester */}
//                                 <td className="border border-gray-300 p-2 text-center">
//                                   -
//                                 </td>

//                                 {/* Message */}
//                                 <td
//                                   colSpan="3"
//                                   className="border border-gray-300 p-2 text-center"
//                                 >
//                                   <p className="text-gray-600">
//                                     {schedule.message}
//                                   </p>
//                                 </td>
//                               </tr>
//                             ) : (
//                               schedule.exams.map((exam, examIndex) => (
//                                 <tr
//                                   key={exam.exam_id}
//                                   className="bg-white even:bg-gray-100"
//                                 >
//                                   {/* Grade Name (only in the first row) */}
//                                   {examIndex === 0 && index === 0 && (
//                                     <td
//                                       rowSpan={grade.schedules.reduce(
//                                         (total, s) =>
//                                           total +
//                                           (s.exams ? s.exams.length : 0),
//                                         0,
//                                       )}
//                                       className="border border-gray-300 p-2 text-center font-semibold"
//                                     >
//                                       {grade.grade}
//                                     </td>
//                                   )}

//                                   {/* Semester (only in the first row for each schedule) */}
//                                   {examIndex === 0 && (
//                                     <td
//                                       onClick={() =>
//                                         navigate(
//                                           `/manager/get-exam-schedule/${schedule.schedule_id}`,
//                                         )
//                                       }
//                                       rowSpan={schedule.exams.length}
//                                       className="border border-gray-300 p-2 text-center"
//                                     >
//                                       {schedule.semester}
//                                     </td>
//                                   )}
//                                   {/* Subject, Date, and Time */}
//                                   <td className="border border-gray-300 p-2 text-center">
//                                     {exam.subject}
//                                   </td>
//                                   <td className="border border-gray-300 p-2 text-center">
//                                     {new Date(exam.date).toLocaleDateString()}
//                                   </td>
//                                   <td className="border border-gray-300 p-2 text-center">
//                                     {exam.time}
//                                   </td>
//                                 </tr>
//                               ))
//                             )}
//                           </React.Fragment>
//                         ))}
//                       </React.Fragment>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetExamSchedules;

import React from "react";
import { useExamSchedules } from "../services/apiSchedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../ui/Loader";
import { useNavigate } from "react-router-dom";

const GetExamSchedules = () => {
  const { isLoading, managerExamSchedules } = useExamSchedules();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const hasSchedules = managerExamSchedules?.grades?.some((grade) =>
    grade.schedules.some((schedule) => !schedule.message),
  );

  if (!managerExamSchedules || !hasSchedules) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
        <FontAwesomeIcon
          icon={faCalendar}
          className="mb-4 text-6xl text-gray-400"
        />
        <p className="mb-2 text-xl font-semibold text-gray-600">
          No schedules found for the academic year
        </p>
        <p className="mb-4 max-w-xl text-center text-gray-500">
          It seems like there are no exam schedules available at the moment.
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <div className="mx-auto w-full max-w-7xl px-4">
            {/* Header */}
            <div className="my-2 flex items-center justify-between">
              <div>
                <div className="ms-4 cursor-text py-1 font-poppins text-sm font-bold text-[#105E6A] sm:text-xl">
                  Exam Schedules - {managerExamSchedules.academic_year}
                </div>
                <p className="mb-4 ms-4 w-24 rounded-xl border-t-4 border-[#117C90]"></p>
              </div>
              <button
                className="rounded-2xl bg-gradient-to-r from-[#105E6A] to-[#117C90] px-3 py-1 font-poppins text-xs text-white sm:px-4 sm:py-2 sm:text-sm"
                onClick={() => navigate("/manager/create-exam-schedule")}
              >
                Create Schedule
              </button>
            </div>

            <div className="overflow-x-auto p-4">
              <table className="w-full min-w-[800px] border-collapse border border-gray-300 text-sm sm:text-base">
                <thead>
                  <tr className="bg-[#105E6A] text-white">
                    <th className="border border-gray-300 p-2 font-poppins">
                      Grade
                    </th>
                    <th className="border border-gray-300 p-2 font-poppins">
                      Semester
                    </th>
                    <th className="border border-gray-300 p-2 font-poppins">
                      Start Date
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
                            className="bg-white even:bg-gray-100"
                          >
                            <td className="border border-gray-300 p-2 text-center font-semibold">
                              {grade.grade}
                            </td>

                            <td className="border border-gray-300 p-2 text-center">
                              -
                            </td>

                            <td
                              colSpan="1"
                              className="border border-gray-300 p-2 text-center"
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
                          className="cursor-pointer bg-white even:bg-gray-100 hover:bg-gray-200"
                          onClick={() =>
                            navigate(
                              `/manager/get-exam-schedule/${schedule.schedule_id}`,
                            )
                          }
                        >
                          <td className="border border-gray-300 p-2 text-center font-semibold">
                            {grade.grade}
                          </td>

                          <td className="border border-gray-300 p-2 text-center">
                            {schedule.semester}
                          </td>

                          <td className="border border-gray-300 p-2 text-center">
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
  );
};

export default GetExamSchedules;
