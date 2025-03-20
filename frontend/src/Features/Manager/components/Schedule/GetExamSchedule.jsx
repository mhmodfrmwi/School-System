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
    deleteExamScheduleMutation(id, {
      onSuccess: () => {
        navigate("/manager/get-exam-schedules");
      },
    });
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
    <div className="mt-10 bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-4 text-2xl font-bold text-[#105E6A] sm:mb-0 sm:text-3xl">
            Exam Schedule Details
          </h1>
          <div className="flex space-x-4">
            {/* Edit Button */}
            <button
              onClick={handleUpdate}
              className="flex items-center rounded-lg bg-[#117C90] px-3 py-1.5 text-sm text-white transition duration-300 hover:bg-[#105E6A] sm:px-4 sm:py-2 sm:text-base"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Schedule
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="flex items-center rounded-lg bg-[#105E6A] px-3 py-1.5 text-sm text-white transition duration-300 sm:px-4 sm:py-2 sm:text-base"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete Schedule
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Academic Year */}
            <div>
              <h2 className="mb-1 text-lg font-semibold text-[#105E6A] sm:text-xl">
                Academic Year
              </h2>
              <p className="text-sm text-gray-700 sm:text-base">
                {managerExamSchedule?.academic_year_id?.startYear} -{" "}
                {managerExamSchedule?.academic_year_id?.endYear}
              </p>
            </div>

            {/* Grade */}
            <div>
              <h2 className="mb-1 text-lg font-semibold text-[#105E6A] sm:text-xl">
                Grade
              </h2>
              <p className="text-sm text-gray-700 sm:text-base">
                {managerExamSchedule?.grade_id?.gradeName}
              </p>
            </div>

            {/* Semester */}
            <div>
              <h2 className="mb-1 text-lg font-semibold text-[#105E6A] sm:text-xl">
                Semester
              </h2>
              <p className="text-sm text-gray-700 sm:text-base">
                {managerExamSchedule?.semester_id?.semesterName}
              </p>
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-[#105E6A] sm:text-xl">
              Subjects
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sortedSubjects?.map((subject) => (
                <div
                  key={subject._id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                >
                  <h3 className="text-base font-medium text-[#117C90] sm:text-lg">
                    {subject.subject_id?.subjectName}
                  </h3>
                  <div className="mt-1 text-xs text-gray-600 sm:text-sm">
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(subject.exam_date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {subject.start_time} - {subject.end_time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetExamSchedule;
