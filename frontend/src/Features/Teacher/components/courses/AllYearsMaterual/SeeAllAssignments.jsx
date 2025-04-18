import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { fetchAssignments } from "../../TeacherRedux/AssignmentSlice";
import { useTranslation } from "react-i18next";

const SeeAllAssignments = () => {
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
  const { t } = useTranslation();

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

  const handleViewSubmissions = (assignmentId) => {
    navigate(`/teacher/all-assignment-submissions/${assignmentId}`);
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
              <div className="mt-4 flex justify-end space-x-3 dark:text-white">
                <button
                  aria-label="View Results"
                  className="text-[#117C90] transition-colors duration-300 hover:text-[#244856] dark:text-white"
                  onClick={() => handleViewSubmissions(item._id)}
                >
                  <FontAwesomeIcon icon={faChartBar} className="text-xl" />
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
            <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-white">
              {t("assignmentt.NoAssignments")}
            </p>
            <p className="max-w-xl text-center text-gray-500 dark:text-white">
              {t("assignmentt.desc")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllAssignments;
