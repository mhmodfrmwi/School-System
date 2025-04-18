import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { getSubmissionDetails } from "../../TeacherRedux/AssignmentSlice";
import { useTranslation } from "react-i18next";

const SubmissionDetails = () => {
  const { submissionId } = useParams();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { submissionDetails, status } = useSelector(
    (state) => state.assignmentsTeacher,
  );

  useEffect(() => {
    dispatch(getSubmissionDetails(submissionId));
  }, [dispatch, submissionId]);

  const formatStartTime = (submitted_at) => {
    const date = new Date(submitted_at);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} (${formattedTime})`;
  };

  if (status === "loading") {
    return <div>{t("loading")}</div>;
  }

  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";

  return (
    <div className={`space-y-6 p-6 font-poppins`} dir={direction}>
      <h1
        className={`font-poppins text-3xl font-bold text-[#244856] ${textAlign}`}
      >
        {t("assignmentt.SubmissionDetails")}.
      </h1>
      <div
        className={`mt-1 h-[3px] rounded-t-md bg-[#244856] ${isRTL ? "ml-auto" : "mr-auto"} w-[100px] lg:h-[4px] lg:w-[300px]`}
      ></div>

      {submissionDetails && submissionDetails.submission ? (
        <div
          className={`rounded-xl border border-[#117C90] bg-slate-50 p-6 shadow-md dark:bg-DarkManager2 ${textAlign}`}
        >
          <h2
            className={`text-lg font-semibold text-[#244856] dark:text-white`}
          >
            {t("assignmentt.Assignment")}:{" "}
            {submissionDetails.submission.assignment_id.title}
          </h2>
          <p
            className={`mb-4 whitespace-normal break-words text-sm text-gray-600 dark:text-white`}
          >
            {submissionDetails.submission.assignment_id.description}
          </p>
          <p className={`mt-1 text-sm text-gray-700 dark:text-white`}>
            <span className="font-semibold">
              {t("assignmentt.Submittedby")}:
            </span>{" "}
            {submissionDetails.submission.student_id.fullName}
          </p>
          <p className={`mt-1 text-sm text-gray-700 dark:text-white`}>
            <span className="font-semibold">
              {t("assignmentt.SubmissionDate")}:
            </span>{" "}
            {formatStartTime(submissionDetails.submission.submitted_at)}
          </p>
          <p className={`mt-1 text-sm text-gray-700 dark:text-white`}>
            <span className="font-semibold">{t("assignmentt.Status")}:</span>{" "}
            {t("submitted")}
          </p>
          <p className={`mt-1 text-sm text-gray-700 dark:text-white`}>
            <span className="font-semibold">{t("assignmentt.Marks")}:</span>
            <span
              className={`font-bold text-[#2dda2d] ${isRTL ? "mr-3" : "ml-3"}`}
            >
              {submissionDetails.submission.grade}
            </span>
          </p>
          <div className="mt-4">
            <h3
              className={`text-md font-semibold text-[#244856] dark:text-white`}
            >
              {t("assignmentt.SubmissionText")}:
            </h3>
            <p
              className={`whitespace-normal break-words text-sm text-gray-600 dark:text-white`}
            >
              {submissionDetails.submission.submission_text}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`col-span-full flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg dark:bg-DarkManager2`}
          dir={direction}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className="mb-4 text-6xl text-gray-400"
          />
          <p
            className={`mb-2 text-xl font-semibold text-gray-600 dark:text-white ${textAlign}`}
          >
            {t("assignmentt.NoSubmissions")}
          </p>
          <p
            className={`max-w-xl text-center text-gray-500 dark:text-white ${textAlign}`}
          >
            {t("assignmentt.descs")}.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmissionDetails;
