import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExamResult } from "../../components/StudentRedux/examsSlice";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const ExamResultPage = () => {
  const { t,i18n } = useTranslation();
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const { examId } = useParams();
  const navigate = useNavigate();
  const { examResult, loadingResult, error } = useSelector((state) => state.exams);

  // Fetch the exam result when the component mounts
  useEffect(() => {
    dispatch(fetchExamResult(examId));
  }, [dispatch, examId]);

  // Loading state
  if (loadingResult) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#13082F] relative text-red-500 dark:text-[#FF6B6B]">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{
            backgroundImage: `url(${backgroundStars})`,
          }}
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        ></div>
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{
            backgroundImage: `url(${backgroundWaves})`,
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-4">{t("examResults.errors.title")}</h2>
          <p className="text-lg">{error.message || t("examResults.errors.message")}</p>
          <Button
            className="mt-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:from-[#CF72C0] dark:hover:from-[#BF4ACB] hover:to-[#FD813D] dark:hover:to-[#CE4EA0] transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            {t("examResults.errors.backButton")}
          </Button>
        </div>
      </div>
    );
  }

  if (!examResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#13082F] relative text-gray-500 dark:text-gray-400">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{
            backgroundImage: `url(${backgroundStars})`,
          }}
        ></div>
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
          style={{
            backgroundImage: `url(${backgroundWaves})`,
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-4">{t("examResults.errors.noResult")}</h2>
          <p className="text-lg">{t("examResults.errors.noResultMessage")}</p>
          <Button
            className="mt-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:from-[#CF72C0] dark:hover:from-[#BF4ACB] hover:to-[#FD813D] dark:hover:to-[#CE4EA0] transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            {t("examResults.errors.backButton")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative font-poppins">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>
      <div className="relative z-10 mt-20 mb-20 min-h-[75vh] w-[75%] mx-auto">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
            {t("examResults.header.title")}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                  }`}></span>
          </h1>
          <Button
            variant="solid"
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:from-[#CF72C0] dark:hover:from-[#BF4ACB] hover:to-[#FD813D] dark:hover:to-[#CE4EA0] transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            {t("examResults.header.backButton")}
          </Button>
        </div>

        {/* Saved Answers Section */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#E0AAEE] shadow-md mt-8">
          <table className="min-w-full table-auto bg-white dark:bg-[#281459] p-6 shadow-md">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#E0AAEE]">
                <th colSpan="10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">
                        {t("examResults.summary.totalMarks")}:
                      </span>
                      <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                        {examResult.result.total_marks}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">
                        {t("examResults.summary.percentage")}:
                      </span>
                      <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                        {parseFloat(examResult.result.percentage).toFixed(2)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">
                        {t("examResults.summary.status")}:
                      </span>
                      <span
                        className={`text-lg font-semibold ${
                          examResult.result.status === "Pass"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-[#FF6B6B]"
                        }`}
                      >
                        {examResult.result.status === "Pass"
                          ? t("examResults.summary.pass")
                          : t("examResults.summary.fail")}
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#F9F9F9] dark:bg-[#312A5E]">
              <div className="w-[90%] mx-auto space-y-6 my-5">
                {examResult.savedAnswers.length > 0 ? (
                  examResult.savedAnswers.map((answer, index) => (
                    <Card
                      key={answer._id}
                      className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 mb-8 bg-white dark:bg-[#281459]"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                            {t("examResults.questions.question")} {index + 1}:{" "}
                            {answer.question_id.question_text}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600 dark:text-gray-400 text-lg">
                              {t("examResults.questions.points")}:
                            </span>
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                              {answer.marks_awarded}
                            </span>
                            {answer.selected_answer === answer.question_id.correct_answer ? (
                              <FaCheck className="text-green-500 dark:text-green-400 text-2xl" />
                            ) : answer.selected_answer === "" ? (
                              <FaTimes className="text-gray-500 dark:text-gray-400 text-2xl" />
                            ) : (
                              <FaTimes className="text-red-500 dark:text-[#FF6B6B] text-2xl" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {answer.question_id.options.map((option, i) => {
                            const isSelected = answer.selected_answer === option;
                            const isCorrect = option === answer.question_id.correct_answer;
                            const isUnanswered = answer.selected_answer === "";

                            return (
                              <label
                                key={i}
                                className={`block p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? isCorrect
                                      ? "border-2 border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20"
                                      : "border-2 border-red-500 dark:border-[#FF6B6B] bg-red-50 dark:bg-red-900/20"
                                    : isCorrect && (isUnanswered || !isSelected)
                                    ? "border-2 border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20"
                                    : "border border-gray-200 dark:border-[#E0AAEE] hover:border-blue-300 dark:hover:border-[#C459D9]"
                                }`}
                              >
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`question-${answer.question_id._id}`}
                                    value={option}
                                    checked={isSelected}
                                    readOnly
                                    className="mr-3 text-blue-600 dark:text-[#C459D9]"
                                  />
                                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                                  {isCorrect && (isUnanswered || !isSelected) && (
                                    <FaCheck className="text-green-500 dark:text-green-400 ml-4" />
                                  )}
                                  {isSelected && !isCorrect && (
                                    <p className="text-red-600 dark:text-[#FF6B6B] ml-4">
                                      {t("examResults.questions.correctAnswer")}:{" "}
                                      {answer.question_id.correct_answer}
                                    </p>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 h-[50vh] text-center flex items-center justify-center">
                    {t("examResults.questions.noAnswers")}
                  </p>
                )}
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamResultPage;