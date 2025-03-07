import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExamResult } from "../../components/StudentRedux/examsSlice";
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ExamResultPage = () => {
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
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Loading exam result...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <h2 className="text-2xl font-semibold mb-4">Error!</h2>
        <p className="text-lg">{error.message || "An error occurred while loading the exam result."}</p>
        <Button
          className="mt-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:from-[#CF72C0] hover:to-[#FD813D] transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }
  
  if (!examResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <h2 className="text-2xl font-semibold mb-4">No Exam Result</h2>
        <p className="text-lg">No exam result was found.</p>
        <Button
          className="mt-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:from-[#CF72C0] hover:to-[#FD813D] transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="font-poppins mt-20 mb-20 min-h-[75vh] w-[75%] mx-auto">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
          Exam Result
          <span className="absolute left-0 bottom-[-9px] w-[50%] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:from-[#CF72C0] hover:to-[#FD813D] transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      {/* Saved Answers Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md mt-8">
        <table className="min-w-full table-auto bg-white p-6 shadow-md">
          <thead>
            <tr className="border-b border-gray-200">
              <th colSpan="10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
                  <div>
                    <span className="text-gray-600 text-lg">Total Marks : </span>
                    <span className="text-lg font-semibold text-gray-800">{examResult.result.total_marks}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-lg">Percentage : </span>
                    <span className="text-lg font-semibold text-gray-800">{parseFloat(examResult.result.percentage).toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-lg">Status : </span>
                    <span
                      className={`text-lg font-semibold ${
                        examResult.result.status === "Pass" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {examResult.result.status}
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#F9F9F9]">
            <div className="w-[90%] mx-auto space-y-6 my-5">
              {examResult.savedAnswers.length > 0 ? (
                examResult.savedAnswers.map((answer, index) => (
                  <Card
                    key={answer._id}
                    className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 mb-8"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Question {index + 1}: {answer.question_id.question_text}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600 text-lg">Points : </span>
                          <span className="text-lg font-semibold text-gray-800">{answer.marks_awarded}</span>
                          {answer.selected_answer === answer.question_id.correct_answer ? (
                            <FaCheck className="text-green-500 text-2xl" />
                          ) : answer.selected_answer === "" ? (
                            <FaTimes className="text-gray-500 text-2xl" />
                          ) : (
                            <FaTimes className="text-red-500 text-2xl" />
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
                                    ? "border-2 border-green-500 bg-green-50"
                                    : "border-2 border-red-500 bg-red-50"
                                  : isCorrect && (isUnanswered || !isSelected)
                                  ? "border-2 border-green-500 bg-green-50"
                                  : "border border-gray-200 hover:border-blue-300"
                              }`}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name={`question-${answer.question_id._id}`}
                                  value={option}
                                  checked={isSelected}
                                  readOnly
                                  className="mr-3"
                                />
                                {option}
                                {isCorrect && (isUnanswered || !isSelected) && (
                                  <FaCheck className="text-green-500 ml-4" />
                                )}
                                {isSelected && !isCorrect && (
                                  <p className="text-red-600 ml-4">Correct Answer: {answer.question_id.correct_answer}</p>
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
                <p className="text-gray-600 h-[50vh] text-center flex items-center justify-center">No answers were submitted.</p>
              )}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamResultPage;