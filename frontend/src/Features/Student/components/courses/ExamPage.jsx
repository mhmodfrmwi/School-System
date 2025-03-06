import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { submitExam, fetchExamById, fetchSessions } from "../../components/StudentRedux/examsSlice";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moment from "moment";

const StudentExamPage = () => {
  const dispatch = useDispatch();
  const { examId, gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const { currentExam, sessions, loading, error } = useSelector((state) => state.exams);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [formattedAvailableTime, setFormattedAvailableTime] = useState("Calculating...");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const isSubmittedRef = useRef(false); // Ref to track submission status

  // Fetch exam and sessions
  useEffect(() => {
    dispatch(fetchExamById(examId)).then((action) => {
      if (action.payload) {
        console.log("Current Exam:", action.payload);
      }
    });
    dispatch(fetchSessions());
  }, [dispatch, examId]);

  // Timer logic
  useEffect(() => {
    const activeSession = sessions.find(
      (session) => session.exam_id._id === examId && session.isExpired === false
    );

    if (activeSession) {
      const now = moment();
      const endTime = moment(activeSession.end_time);
      const durationInSeconds = endTime.diff(now, "seconds");

      if (durationInSeconds >= 0) {
        setTimeLeft(durationInSeconds);
        setFormattedAvailableTime(
          `${Math.floor(durationInSeconds / 60)}:${durationInSeconds % 60 < 10 ? `0${durationInSeconds % 60}` : durationInSeconds % 60}`
        );
      } else {
        setTimeLeft(0);
        setFormattedAvailableTime("00:00");
      }
    }
  }, [sessions, examId]);

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((answer) => answer.question_id !== questionId);
      return [...updatedAnswers, { question_id: questionId, selected_answer: selectedAnswer }];
    });
  };

  // Handle exam submission (with automatic flag)
  const handleSubmitExam = useCallback(
    (isAutomatic = false) => {
      if (isSubmittedRef.current) {
        console.log("Exam already submitted. Aborting.");
        return;
      }
  
      // Check if all questions are answered (only for manual submission)
      if (!isAutomatic) {
        const allQuestions = currentExam.exam.exam_questions;
        const unansweredQuestions = allQuestions.filter((question) => {
          const existingAnswer = answers.find((answer) => answer.question_id === question._id);
          return !existingAnswer || existingAnswer.selected_answer === "";
        });
  
        if (unansweredQuestions.length > 0) {
          Swal.fire({
            title: "Incomplete Exam",
            text: "Please answer all questions before submitting.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          return;
        }
      }
  
      isSubmittedRef.current = true; // Mark as submitted using ref
      setIsSubmitted(true); // Update state for UI
  
      const activeSession = sessions.find(
        (session) =>
          session.exam_id._id === examId &&
          (isAutomatic || session.isExpired === false) &&
          session?.status !== "Submitted"
      );
  
      if (!activeSession) {
        Swal.fire({
          title: "No Active Session",
          text: "Either the exam is already submitted or the session has expired.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
  
      const sessionId = activeSession._id;
  
      // Ensure all questions are included (even unanswered ones)
      const allAnswers = currentExam.exam.exam_questions.map((question) => {
        const existingAnswer = answers.find((answer) => answer.question_id === question._id);
        return {
          question_id: question._id,
          selected_answer: existingAnswer ? existingAnswer.selected_answer : "",
        };
      });
  
      console.log("Submitting answers for session:", sessionId);
      console.log("Answers:", allAnswers);
  
      // Submit the exam
      dispatch(submitExam({ sessionId, answers: allAnswers }))
        .then((action) => {
          if (action.payload) {
            Swal.fire({
              title: isAutomatic ? "Time's Up! Exam Auto-Submitted" : "Exam Submitted!",
              text: `Your score is ${action.payload.score || 0}`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.message || "Failed to submit exam",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    [dispatch, sessions, examId, answers, gradeSubjectSemesterId, navigate, currentExam]
  );

  // Timer countdown (Auto-submit when time is up)
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isSubmittedRef.current) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 10) {
            clearInterval(timer);
            handleSubmitExam(true); // Auto-submit when time ends
            return 0;
          }
          const newTime = prevTime - 1;
          setFormattedAvailableTime(
            `${Math.floor(newTime / 60)}:${newTime % 60 < 10 ? `0${newTime % 60}` : newTime % 60}`
          );
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft, handleSubmitExam]);

  // Styling for time left
  const timeColor = timeLeft <= 60 ? "text-red-500" : "text-gray-800";

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // No exam questions found
  if (!currentExam || !currentExam.exam || !currentExam.exam.exam_questions) {
    return <div className="text-center text-gray-500">No exam questions found.</div>;
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
          {currentExam.exam.title}
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      {/* Timer */}
      <div className="w-full mb-6">
        <Card className="border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="p-4">
            <p className={`text-lg font-semibold ${timeColor}`}>
              Time Left: {formattedAvailableTime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Questions */}
      <div className="w-full space-y-4">
        {currentExam.exam.exam_questions.map((question, index) => (
          <Card key={question._id} className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Question {index + 1}: {question.question_text}
              </h3>
              <div className="mt-2">
                {question.options.map((option, i) => {
                  const isSelected = answers.some(
                    (answer) => answer.question_id === question._id && answer.selected_answer === option
                  );
                  return (
                    <label
                      key={i}
                      className={`block p-3 rounded-lg cursor-pointer ${
                        isSelected ? "border-2 border-blue-500 bg-blue-50" : "border border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option}
                        onChange={() => handleAnswerChange(question._id, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      <div className="w-full mt-6">
        <Button
          onClick={() => handleSubmitExam(false)} // Manual submission
          className="w-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white py-2 rounded-lg"
          disabled={isSubmitted} // Disable button after submission
        >
          Submit Exam
        </Button>
      </div>
    </div>
  );
};

export default StudentExamPage;