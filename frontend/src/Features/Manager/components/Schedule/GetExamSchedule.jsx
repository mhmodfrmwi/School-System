import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../../ui/Loader";
import {
  useExamSchedule,
  useDeleteExamSchedule,
} from "../services/apiSchedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const GetExamSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, managerExamSchedule } = useExamSchedule(id);
  const { isDeleting, deleteExamScheduleMutation } = useDeleteExamSchedule();

  const handleDelete = () => {
    deleteExamScheduleMutation(id);
  };

  const handleUpdate = () => {
    navigate(`/manager/update-exam-schedule/${id}`);
  };

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  const sortedSubjects = managerExamSchedule?.subjects?.sort((a, b) => {
    return new Date(a.exam_date) - new Date(b.exam_date);
  });

  return (
    <div className="mt-10 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-2xl lg:max-w-4xl">
        <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-4 text-xl font-bold text-[#117C90] sm:mb-0 sm:text-2xl">
            Exam Schedule Details
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="flex items-center rounded-lg bg-[#117C90] px-3 py-1.5 text-sm text-white transition duration-300 hover:bg-[#117C90] sm:px-4 sm:py-2 sm:text-base"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Schedule
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center rounded-lg bg-[#117C90] px-3 py-1.5 text-sm text-white transition duration-300 sm:px-4 sm:py-2 sm:text-base"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete Schedule
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-4 shadow-lg sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-medium text-[#117C90] sm:text-lg md:text-xl">
                Academic Year
              </h3>
              <p className="text-base text-gray-700 sm:text-lg md:text-xl">
                {managerExamSchedule?.academic_year_id?.startYear} -{" "}
                {managerExamSchedule?.academic_year_id?.endYear}
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-[#117C90] sm:text-lg md:text-xl">
                Grade
              </h3>
              <p className="text-base text-gray-700 sm:text-lg md:text-xl">
                {managerExamSchedule?.grade_id?.gradeName}
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-[#117C90] sm:text-lg md:text-xl">
                Semester
              </h3>
              <p className="text-base text-gray-700 sm:text-lg md:text-xl">
                {managerExamSchedule?.semester_id?.semesterName}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] font-poppins shadow-md shadow-[#117C90]">
          <table className="w-full">
            <thead className="bg-[#117C90] text-left text-white">
              <tr>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  Subject
                </th>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  Exam Date
                </th>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  Start Time
                </th>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSubjects?.map((subject) => (
                <tr
                  key={subject._id}
                  className="bg-white hover:bg-[#117C90]/10"
                >
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {subject.subject_id?.subjectName}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {new Date(subject.exam_date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {subject.start_time}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {subject.end_time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetExamSchedule;
