import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faCalendar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAssignmentSubmissions,
  deleteSubmission,
} from "../../TeacherRedux/AssignmentSlice";
import EditGradeModal from "./EditGradeModal";
import { useTranslation } from "react-i18next";

const AssignmentSubmissions = () => {
  const formatStartTime = (submitted_at) => {
    const date = new Date(submitted_at);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} (${formattedTime})`;
  };
  const { assignmentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { submissions, status } = useSelector(
    (state) => state.assignmentsTeacher,
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    dispatch(getAssignmentSubmissions(assignmentId));
  }, [dispatch, assignmentId]);

  const handleViewSubmissionDetails = (submissionId) => {
    navigate(`/teacher/submission-details/${submissionId}`);
  };

  const handleEditGrade = (submission) => {
    setSelectedSubmission(submission);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedSubmission(null);
  };
  const handleDeleteSubmission = (submissionId) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      dispatch(deleteSubmission(submissionId)).then(() => {
        dispatch(getAssignmentSubmissions(assignmentId));
      });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-poppins text-3xl font-bold text-[#244856]">
        {" "}
        {t("assignmentt.Submissions")}
      </h1>
      <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] font-poppins shadow-md shadow-[#117C90] dark:shadow-DarkManager">
          <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
            <tr>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                #
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                {t("assignmentt.StudentName")}
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                {t("assignmentt.SubmissionDate")}
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                {t("assignmentt.Status")}
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                {t("assignmentt.Marks")}
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                {t("tablesheader.Actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <tr
                  key={submission._id}
                  className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-DarkManager/70`}
                >
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {submission.student_id.fullName}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {formatStartTime(submission.submitted_at)}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {submission.status}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {submission.grade}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="View Submission Details"
                      className="text-[#117C90] transition-colors duration-300 hover:text-[#244856] dark:text-DarkManager"
                      onClick={() =>
                        handleViewSubmissionDetails(submission._id)
                      }
                    >
                      <FontAwesomeIcon icon={faEye} className="text-lg" />
                    </button>
                    <button
                      className="text-[#117C90] hover:text-[#244856] dark:text-DarkManager"
                      onClick={() => handleEditGrade(submission)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-lg" />
                    </button>
                    <button
                      className="text-[#E74833] hover:text-[#244856]"
                      onClick={() => handleDeleteSubmission(submission._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="w-full rounded-lg bg-[#F9FAFB] py-16 text-center shadow-lg dark:bg-DarkManager2"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="mb-4 text-6xl text-gray-400"
                  />
                  <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-white">
                    {t("assignmentt.NoSubmissions")}
                  </p>
                  <p className="mx-auto max-w-xl text-gray-500 dark:text-white">
                    {t("assignmentt.descs")}.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && selectedSubmission && (
        <EditGradeModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          submissionId={selectedSubmission._id}
          currentGrade={selectedSubmission.grade}
        />
      )}
    </div>
  );
};

export default AssignmentSubmissions;
