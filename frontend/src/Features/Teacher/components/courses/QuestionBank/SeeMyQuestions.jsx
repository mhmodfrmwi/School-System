import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyQuestions,
  deleteQuestion,
} from "../../TeacherRedux/QuestionBankSlice"; // استدعاء الـ slice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QuestionsToggle from "./SelectQuestions";
import { useTranslation } from "react-i18next";

const SeeMyQuestion = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { gradeSubjectSemesterId } = useParams();

  const myQuestions = useSelector((state) => state.questionbank.questionbank);

  useEffect(() => {
    if (gradeSubjectSemesterId) {
      dispatch(fetchMyQuestions(gradeSubjectSemesterId));
    }
  }, [dispatch, gradeSubjectSemesterId]);

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await dispatch(deleteQuestion(questionId)).unwrap();
        toast.success("Question deleted successfully!");
        dispatch(fetchMyQuestions(gradeSubjectSemesterId));
      } catch (error) {
        toast.error(error.message || "Failed to delete question");
      }
    }
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/teacher/edit-question/${questionId}`);
  };

  return (
    <div className="flex flex-col p-0">
      <div className="flex-1">
        <QuestionsToggle />
        <div className="mx-auto w-[400px] p-0 sm:w-[550px] md:w-full xl:w-full">
          <div className="ml-8 flex flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              {t("tablesheader.Myquestions")}
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[160px]"></div>
          </div>
          <div className="relative w-full px-4 font-poppins sm:px-6 lg:px-8">
            <div className="mt-7">
              <div className="overflow-x-auto">
                <table className="border-re min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-DarkManager">
                  <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
                    <tr>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        #
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Question")}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Type")}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Answer")}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myQuestions && myQuestions.length > 0 ? (
                      myQuestions.map((question, index) => (
                        <tr
                          key={question._id}
                          className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-DarkManager/70`}
                        >
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {question.questionText}
                          </td>
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {question.questionType}
                          </td>
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {question.answer}
                          </td>
                          <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                            <button
                              className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-DarkManager"
                              onClick={() => handleEditQuestion(question._id)}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-lg"
                              />
                            </button>
                            <button
                              className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                              onClick={() => handleDeleteQuestion(question._id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="text-lg"
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-9 text-center font-poppins"
                        >
                          No Questions Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMyQuestion;
