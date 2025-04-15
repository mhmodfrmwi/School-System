import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, clearError } from "../../components/StudentRedux/questionBankSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const QuestionDetails = () => {
  const { t } = useTranslation();
  const role = sessionStorage.getItem("role");
  const { subjectId, questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, loading, error } = useSelector((state) => state.studentQuestionBank);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions(subjectId));
  }, [dispatch, subjectId]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: t("questionDetails.error.title"),
        text: error,
        icon: "error",
        confirmButtonText: t("questionDetails.error.confirmButton"),
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch, t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );
  }

  const questionDetails = questions.find((question) => question._id === questionId);

  if (!questionDetails) {
    return (
      <div className="flex items-center justify-center min-h-[68vh] bg-white dark:bg-[#13082F] relative">
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
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {t("questionDetails.noDetails")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative">
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
      <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20 min-h-[68vh]">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            {t("questionDetails.title")}
            <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
          </h1>
          <Button
            variant="solid"
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(-1)}
          >
            {t("questionDetails.back")}
          </Button>
        </div>

        {/* Question Details */}
        <div className="w-full">
          <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm p-6 dark:bg-[#312A5E]">
            <CardContent className="p-6 border border-gray-200 dark:border-[#E0AAEE] rounded-lg dark:bg-[#281459]">
              <div className="mb-6">
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1">
                  {t("questionDetails.type")}: {questionDetails.questionType}
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-300">
                  {questionDetails.questionText}
                </h2>
              </div>

              {questionDetails.choices && questionDetails.choices.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                    {t("questionDetails.choices")}:
                  </h3>
                  <ul className="list-disc list-inside">
                    {questionDetails.choices.map((choice, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400 md:text-base">
                        {choice}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                variant="outline"
                className="mt-4 text-blue-600 dark:text-[#C459D9] border-blue-600 dark:border-[#C459D9] hover:bg-blue-50 dark:hover:bg-[#281459] hover:shadow-lg transition-shadow duration-300"
                onClick={() => setShowAnswer((prev) => !prev)}
              >
                {showAnswer ? t("questionDetails.hideAnswer") : t("questionDetails.showAnswer")}
              </Button>

              {showAnswer && (
                <div className="mt-6 p-6 bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 dark:from-[#CE4EA0]/10 dark:via-[#BF4ACB]/10 dark:to-[#AE45FB]/10 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    {t("questionDetails.answer")}:
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {questionDetails.answer}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;