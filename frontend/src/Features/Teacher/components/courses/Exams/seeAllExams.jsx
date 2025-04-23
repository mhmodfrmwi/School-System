import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamsForTeacher, deleteExam } from "../../TeacherRedux/ExamSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faEye,
  faCalendar,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const formatStartTime = (startTime) => {
  const date = new Date(startTime);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} (${formattedTime})`;
};

const ExamCard = ({ exam, onView, onEdit, onDelete, onViewResults }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";


  const typeColor = exam.type === "Online" ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`rounded-xl border border-[#117C90] bg-slate-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-DarkManager dark:bg-DarkManager2 ${textAlign}`}
      dir={direction}
    >
      <h2 className="mb-2 text-2xl font-bold text-[#244856] dark:text-white">
        {exam.title}
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-white">
        {exam.description}
      </p>
      <hr className="mb-7"></hr>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-semibold text-gray-700 dark:text-white">
            {t("examst.Duration")}:
          </span>
          <span className="text-sm text-gray-600 dark:text-white">
            {exam.duration} {t("minutes")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-white">
            {t("assignmentt.Marks")}:
          </span>
          <span className="text-sm text-gray-600 dark:text-white">
            {exam.total_marks}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-white">
            {t("examst.Start")}:
          </span>
          <span className="text-sm text-gray-600 dark:text-white">
            {formatStartTime(exam.start_time)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-white">
            {t("examst.End")}:
          </span>
          <span className="text-sm text-gray-600 dark:text-white">
            {formatStartTime(exam.end_time)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-white">
            {t("tablesheader.Type")}:
          </span>
          <span className={`text-sm font-semibold ${typeColor}`}>
            {exam.type}
          </span>
        </div>
      </div>

      <div
        className={`mt-4 flex ${isRTL ? "justify-start" : "justify-end"} ${isRTL ? "space-x-reverse" : ""} space-x-4`}
      >
        <button
          aria-label={t("actions.View")}
          className="text-[#117C90] transition-colors duration-300 hover:text-[#244856] dark:text-white"
          onClick={onView}
        >
          <FontAwesomeIcon icon={faEye} className="text-xl" />
        </button>
        <button
          aria-label={t("actions.Edit")}
          className="text-[#117C90] transition-colors duration-300 hover:text-[#244856] dark:text-white"
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faEdit} className="text-xl" />
        </button>
        <button
          aria-label={t("actions.Delete")}
          className="text-[#E74833] transition-colors duration-300 hover:text-[#244856]"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
        </button>
        <button
          aria-label={t("actions.ViewResults")}
          className="text-[#117C90] transition-colors duration-300 hover:text-[#244856] dark:text-white"
          onClick={onViewResults}
        >
          <FontAwesomeIcon icon={faChartBar} className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const SeeMyExams = () => {
  const dispatch = useDispatch();
  const { gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";

  const { exams, loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    if (gradeSubjectSemesterId) {
      dispatch(fetchExamsForTeacher(gradeSubjectSemesterId));
    }
  }, [dispatch, gradeSubjectSemesterId]);

  const handleDeleteExam = async (examId) => {
    if (window.confirm(t("confirmDeleteExam"))) {
      try {
        await dispatch(deleteExam(examId)).unwrap();
        dispatch(fetchExamsForTeacher(gradeSubjectSemesterId));
      } catch (error) {
        toast.error(error.message || t("deleteExamError"));
      }
    }
  };

  const handleEditExam = (examId) => {
    navigate(`/teacher/exams/${examId}`);
  };

  const handleViewExam = (examId) => {
    navigate(`/teacher/exam-details/${examId}`);
  };

  const handleViewResults = (examId) => {
    navigate(`/teacher/exam-results/${examId}`);
  };

  const sortedExams =
    exams && exams.length > 0
      ? [...exams].sort(
          (a, b) => new Date(b.start_time) - new Date(a.start_time),
        )
      : [];

  if (loading) {
    return (
      <p className={`text-center text-lg font-semibold ${textAlign}`}>
        {t("loading")}
      </p>
    );
  }

  if (error) {
    return (
      <p
        className={`text-center text-lg font-semibold text-red-500 ${textAlign}`}
      >
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-6 p-6" dir={direction}>
      <div className={`flex flex-col`}>
        <h1
          className={`font-poppins text-3xl font-bold text-[#244856] ${textAlign}`}
        >
          {t("examst.MyExams")}
        </h1>
        <div
          className={`mt-1 h-[3px] rounded-t-md bg-[#244856] w-[100px] lg:h-[4px] lg:w-[160px]`}
        ></div>
      </div>

      <div className="grid gap-6 font-poppins sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {sortedExams.length > 0 ? (
          sortedExams.map((exam) => (
            <ExamCard
              key={exam._id}
              exam={exam}
              onView={() => handleViewExam(exam._id)}
              onEdit={() => handleEditExam(exam._id)}
              onDelete={() => handleDeleteExam(exam._id)}
              onViewResults={() => handleViewResults(exam._id)}
            />
          ))
        ) : (
          <div
            className={`col-span-full flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg dark:bg-DarkManager2 ${textAlign}`}
            dir={direction}
          >
            <FontAwesomeIcon
              icon={faCalendar}
              className="mb-4 text-6xl text-gray-400"
            />
            <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-white">
              {t("noExamsFound")}
            </p>
            <p className="max-w-xl text-center text-gray-500 dark:text-white">
              {t("noExamsDescription")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeMyExams;
