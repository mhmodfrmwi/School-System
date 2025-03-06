import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchExamResult } from "../../components/StudentRedux/examsSlice"; // Adjust the import path as needed
import { FaSpinner } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card"; // Assuming you're using a UI library like Shadcn
import { Button } from "@/components/ui/button"; // Adjust imports based on your UI library

const ExamResultPage = () => {
  const dispatch = useDispatch();
  const { examId } = useParams(); // Get the examId from the URL
  const { examResult, loadingResult, error } = useSelector((state) => state.exams);

  // Fetch the exam result when the component mounts
  useEffect(() => {
    dispatch(fetchExamResult(examId)); // Use examId to fetch the result
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
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p className="text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  // If no exam result is found
  if (!examResult) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <p className="text-lg font-semibold">No exam result found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-poppins gap-6 w-[95%] mx-auto mt-10 mb-20">
      {/* Page Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
          Exam Result
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
          onClick={() => window.history.back()} // Navigate back to the previous page
        >
          Back
        </Button>
      </div>

      {/* Exam Summary Card */}
      <Card className="border border-gray-200 rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Exam Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Total Marks</p>
              <p className="text-lg font-semibold text-gray-800">{examResult.result.total_marks}</p>
            </div>
            <div>
              <p className="text-gray-600">Percentage</p>
              <p className="text-lg font-semibold text-gray-800">{examResult.result.percentage}%</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p
                className={`text-lg font-semibold ${
                  examResult.result.status === "Pass" ? "text-green-600" : "text-red-600"
                }`}
              >
                {examResult.result.status}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Answers Section */}
      <div className="w-full space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Answers</h2>
        {examResult.savedAnswers.length > 0 ? (
          examResult.savedAnswers.map((answer, index) => (
            <Card key={answer._id} className="border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Question {index + 1}: {answer.question_id.question_text}
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600">Selected Answer</p>
                  <p className="text-gray-800 font-medium">{answer.selected_answer}</p>
                  <p className="text-gray-600">Correct Answer</p>
                  <p className="text-gray-800 font-medium">{answer.question_id.correct_answer}</p>
                  <p className="text-gray-600">Marks Awarded</p>
                  <p className="text-gray-800 font-medium">{answer.marks_awarded}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No answers were submitted.</p>
        )}
      </div>
    </div>
  );
};

export default ExamResultPage;