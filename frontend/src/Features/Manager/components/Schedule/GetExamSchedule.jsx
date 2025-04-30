import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../../ui/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDeleteExamSchedule, useExamSchedule } from "../hooks/schedule";

const GetExamSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, managerExamSchedule } = useExamSchedule(id);
  const { isDeleting, deleteExamScheduleMutation } = useDeleteExamSchedule();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this exam schedule?")) {
      deleteExamScheduleMutation(id);
    }
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
      <div className="mx-auto w-full max-w-2xl lg:max-w-5xl">
        <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-4 text-xl font-bold text-[#117C90] dark:text-DarkManager sm:mb-0 sm:text-2xl">
            {t("schedulem.ExamScheduleDetails")}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="flex items-center rounded-lg bg-[#117C90] px-3 py-1.5 text-sm text-white transition duration-300 hover:bg-[#117C90] dark:bg-DarkManager dark:hover:bg-DarkManager sm:px-4 sm:py-2 sm:text-base"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              {t("schedulem.Edit")}
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center rounded-lg bg-[#117C90] px-3 py-1.5 text-sm text-white transition duration-300 dark:bg-DarkManager sm:px-4 sm:py-2 sm:text-base"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              {t("schedulem.DeleteSchedule")}
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-4 shadow-lg dark:bg-DarkManager sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-medium text-[#117C90] dark:text-white sm:text-lg md:text-xl">
                {t("schedulem.AcademicYear")}
              </h3>
              <p className="text-base text-gray-700 dark:text-white sm:text-lg md:text-xl">
                {managerExamSchedule?.academic_year_id?.startYear} -{" "}
                {managerExamSchedule?.academic_year_id?.endYear}
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-[#117C90] dark:text-white sm:text-lg md:text-xl">
                {t("schedulem.Grade")}
              </h3>
              <p className="text-base text-gray-700 dark:text-white sm:text-lg md:text-xl">
                {managerExamSchedule?.grade_id?.gradeName}
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-[#117C90] dark:text-white sm:text-lg md:text-xl">
                {t("schedulem.Semester")}
              </h3>
              <p className="text-base text-gray-700 dark:text-white sm:text-lg md:text-xl">
                {managerExamSchedule?.semester_id?.semesterName}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] font-poppins shadow-md shadow-[#117C90] dark:shadow-DarkManager">
          <table className="w-full">
            <thead className="bg-[#117C90] text-left text-white dark:bg-DarkManager">
              <tr>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t("schedulem.Subject")}
                </th>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t("schedulem.ExamDate")}
                </th>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t("schedulem.StartTime")}
                </th>
                <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t("schedulem.EndTime")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSubjects?.map((subject) => (
                <tr
                  key={subject._id}
                  className="bg-white hover:bg-[#117C90]/10 dark:text-black dark:hover:bg-DarkManager/10"
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
