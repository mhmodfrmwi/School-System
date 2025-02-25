import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, clearError } from "../../components/StudentRedux/questionBankSlice"; 
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const QuestionDetails = () => {
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
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  const questionDetails = questions.find((question) => question._id === questionId);

  if (!questionDetails) {
    return <p className="text-gray-500 text-center">No question details available.</p>;
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">

      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
          Question Details
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

    
      <div className="w-full">
        <Card className="border border-gray-200 rounded-xl shadow-sm mb-4">
          <CardContent className="p-4">
            <p className="text-sm md:text-base text-gray-600 mb-1">Type: {questionDetails.questionType}</p>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{questionDetails.questionText}</h2>

     
            {questionDetails.choices && questionDetails.choices.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold text-gray-700">Choices:</h3>
                <ul className="list-disc list-inside">
                  {questionDetails.choices.map((choice, index) => (
                    <li key={index} className="text-gray-600 md:text-base">{choice}</li>
                  ))}
                </ul>
              </div>
            )}

           
            <Button
              variant="outline"
              className="mt-4 text-blue-600"
              onClick={() => setShowAnswer((prev) => !prev)}
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </Button>

          
            {showAnswer && (
              <p className="mt-2 text-md md:text-lg font-semibold text-gray-500">Answer: {questionDetails.answer}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionDetails;