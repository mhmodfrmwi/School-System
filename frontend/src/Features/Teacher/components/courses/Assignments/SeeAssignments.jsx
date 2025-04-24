import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faCalendar,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchAssignments,
  deleteAssignment,
} from "../../TeacherRedux/AssignmentSlice";
import { useTranslation } from "react-i18next";

const SeeAssignments = () => {
  const formatStartTime = (due_date) => {
    const date = new Date(due_date);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} (${formattedTime})`;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  const { gradeSubjectSemesterId } = useParams();
  const { assignment, status, error } = useSelector(
    (state) => state.assignmentsTeacher,
  );

  useEffect(() => {
    if (gradeSubjectSemesterId) {
      dispatch(fetchAssignments(gradeSubjectSemesterId))
        .unwrap()
        .then((data) => {
          console.log("Assignments Data:", data);
        })
        .catch((error) => {
          console.error("Error fetching assignments:", error);
        });
    }
  }, [dispatch, gradeSubjectSemesterId]);

  const handleEditAssignment = (assignmentId) => {
    navigate(`/teacher/edit-assignment/${assignmentId}`);
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const handleViewSubmissions = (assignmentId) => {
    navigate(`/teacher/assignment-submissions/${assignmentId}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-poppins text-3xl font-bold text-[#244856]">
        {t("assignmentt.MyAssignment")}
      </h1>
      <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[240px]"></div>
      <div className="grid gap-6 font-poppins sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {assignment.length > 0 ? (
          assignment.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-[#117C90] bg-slate-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-DarkManager2"
            >
              <h2 className="text-lg font-semibold text-[#244856] dark:text-white">
                {item.title}
              </h2>
              <p className="mb-4 whitespace-normal break-words text-sm text-gray-600 dark:text-white">
                {item.description}
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-white">
                {t("assignmentt.Due")}: {formatStartTime(item.due_date)}
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-white">
                {t("assignmentt.Marks")}: {item.total_marks}
              </p>
              <div className={`mt-4 flex justify-end ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                <button
                  aria-label="View Results"
                  className="text-[#117C90] transition-colors duration-300 hover:text-[#244856] dark:text-white"
                  onClick={() => handleViewSubmissions(item._id)}
                >
                  <FontAwesomeIcon icon={faChartBar} className="text-xl" />
                </button>
                <button
                  className="text-[#117C90] hover:text-[#244856] dark:text-white"
                  onClick={() => handleEditAssignment(item._id)}
                >
                  <FontAwesomeIcon icon={faEdit} className="text-lg" />
                </button>
                <button
                  className="text-[#E74833] hover:text-[#244856]"
                  onClick={() => handleDeleteAssignment(item._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg dark:bg-DarkManager2">
            <FontAwesomeIcon
              icon={faCalendar}
              className="mb-4 text-6xl text-gray-400"
            />
            <p className="mb-2 text-xl dark:text-white font-semibold text-gray-600">
              {t("assignmentt.NoAssignments")}
            </p>
            <p className="max-w-xl text-center dark:text-white text-gray-500">
              {t("assignmentt.desc")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAssignments;
