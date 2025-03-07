import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { submitExam, fetchExamById, fetchSessions } from "../../components/StudentRedux/examsSlice";
import Swal from "sweetalert2";
import { FaSpinner, FaClock } from "react-icons/fa";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isSubmittedRef = useRef(false);
  const timerRef = useRef(null); // Ref to store the timer

  // Fetch exam and sessions on mount
  useEffect(() => {
    console.debug("Fetching exam and sessions...");
    dispatch(fetchExamById(examId));
    dispatch(fetchSessions());
  }, [dispatch, examId]);

  useEffect(() => {
    console.debug("Checking for active session...");
    const activeSession = sessions.find(
      (session) => session.exam_id._id === examId && session.isExpired === false
    );
  
    if (activeSession) {
      console.debug("Active session found:", activeSession);
      const now = moment();
      const endTime = moment(activeSession.end_time);
      let durationInSeconds = endTime.diff(now, "seconds");
  
      // Subtract 10 seconds from the total duration
      durationInSeconds = Math.max(durationInSeconds - 10, 0); // Ensure it doesn't go below 0
  
      if (durationInSeconds >= 0) {
        console.debug("Time left:", durationInSeconds, "seconds");
        setTimeLeft(durationInSeconds);
        setFormattedAvailableTime(
          `${Math.floor(durationInSeconds / 60)}:${durationInSeconds % 60 < 10 ? `0${durationInSeconds % 60}` : durationInSeconds % 60}`
        );
      } else {
        console.debug("Session has expired.");
        setTimeLeft(0);
        setFormattedAvailableTime("00:00");
      }
    } else {
      console.debug("No active session found.");
    }
  }, [sessions, examId]);

  // Handle answer changes
  const handleAnswerChange = (questionId, selectedAnswer) => {
    console.debug("Answer changed for question:", questionId, "Selected answer:", selectedAnswer);
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((answer) => answer.question_id !== questionId);
      return [...updatedAnswers, { question_id: questionId, selected_answer: selectedAnswer }];
    });
  };

  // Handle exam submission
  const handleSubmitExam = useCallback(
    (isAutomatic = false) => {
      console.debug("Submit exam triggered. isAutomatic:", isAutomatic);

      if (isSubmittedRef.current) {
        console.debug("Exam already submitted. Aborting.");
        return;
      }

      isSubmittedRef.current = true;
      setIsSubmitted(true);
      console.debug("isSubmittedRef set to true.");

      if (!isAutomatic) {
        console.debug("Checking for unanswered questions...");
        const allQuestions = currentExam.exam.exam_questions;
        const unansweredQuestions = allQuestions.filter((question) => {
          const existingAnswer = answers.find((answer) => answer.question_id === question._id);
          return !existingAnswer || existingAnswer.selected_answer === "";
        });

        if (unansweredQuestions.length > 0) {
          console.debug("Unanswered questions found:", unansweredQuestions.length);
          Swal.fire({
            title: "Incomplete Exam",
            text: "Please answer all questions before submitting.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          isSubmittedRef.current = false;
          setIsSubmitted(false);
          console.debug("isSubmittedRef reset to false due to incomplete exam.");
          return;
        }
      }

      console.debug("Looking for active session...");
      const activeSession = sessions.find(
        (session) =>
          session.exam_id?._id === examId &&
          (isAutomatic || session.isExpired === false) &&
          session?.status !== "Submitted"
      );

      if (!activeSession) {
        console.debug("No active session found or session already submitted.");
        Swal.fire({
          title: "No Active Session",
          text: "Either the exam is already submitted or the session has expired.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        isSubmittedRef.current = false;
        setIsSubmitted(false);
        console.debug("isSubmittedRef reset to false due to no active session.");
        return;
      }

      const sessionId = activeSession._id;
      console.debug("Active session ID:", sessionId);

      const allAnswers = currentExam.exam.exam_questions.map((question) => {
        const existingAnswer = answers.find((answer) => answer.question_id === question._id);
        return {
          question_id: question._id,
          selected_answer: existingAnswer ? existingAnswer.selected_answer : "",
        };
      });

      console.debug("Submitting exam with answers:", allAnswers);
      dispatch(submitExam({ sessionId, answers: allAnswers }))
        .then((action) => {
          if (action.payload) {
            console.debug("Exam submitted successfully. Score:", action.payload.score);
            Swal.fire({
              title: isAutomatic ? "Time's Up! Exam Auto-Submitted" : "Exam Submitted!",
              text: `Your score is ${action.payload.score || 0}`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              console.debug("Navigating to exam list page...");
              navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
            });
          }
        })
        .catch((error) => {
          console.error("Error submitting exam:", error);
          Swal.fire({
            title: "Error!",
            text: error.message || "Failed to submit exam",
            icon: "error",
            confirmButtonText: "OK",
          });
          isSubmittedRef.current = false;
          setIsSubmitted(false);
          console.debug("isSubmittedRef reset to false due to error.");
        });
    },
    [dispatch, sessions, examId, answers, gradeSubjectSemesterId, navigate, currentExam]
  );

  // Timer logic
  useEffect(() => {
    console.debug("Timer useEffect triggered. Time left:", timeLeft);

    if (timeLeft > 0 && !isSubmittedRef.current) {
      console.debug("Starting timer...");
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 10) {
            console.debug("Time's up! Auto-submitting exam...");
            clearInterval(timerRef.current);
            handleSubmitExam(true);
            return 0;
          }
          const newTime = prevTime - 1;
          console.debug("Time left:", newTime, "seconds");
          setFormattedAvailableTime(
            `${Math.floor(newTime / 60)}:${newTime % 60 < 10 ? `0${newTime % 60}` : newTime % 60}`
          );
          return newTime;
        });
      }, 1000);
    }

    return () => {
      console.debug("Clearing timer...");
      clearInterval(timerRef.current);
    };
  }, [timeLeft, handleSubmitExam]);

  const timeColor = timeLeft <= 60 ? "text-red-500" : "text-gray-800";

  if (loading) {
    console.debug("Loading exam data...");
    return (
      <div className="flex items-center justify-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error loading exam:", error);
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!currentExam || !currentExam.exam || !currentExam.exam.exam_questions) {
    console.debug("No exam questions found.");
    return <div className="text-center text-gray-500">No exam questions found.</div>;
  }

  console.debug("Rendering exam page...");
  return (
    <div className="font-poppins mt-20 mb-20 min-h-[75vh] w-[75%] mx-auto">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
          {currentExam.exam.title}
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

      {/* Timer and Questions */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
        <table className="min-w-full table-auto bg-white p-6 shadow-md">
          <thead>
            <tr className="border-b border-gray-200">
              <th colSpan="10">
                {/* Timer with Clock Icon and Progress Bar */}
                <div className="my-5 mr-5 ml-5 flex justify-between items-center">
                  <div className="flex items-center w-full">
                    {/* Time Left */}
                    <p className={`text-xl font-bold ${timeColor}`}>
                      Time Left: {formattedAvailableTime}
                    </p>

                    {/* Progress Bar */}
                    <div className="hidden md:block w-[50%] h-3 bg-gray-200 rounded-lg overflow-hidden mx-4 ml-10">
                      <div
                        className="h-full transition-all duration-300 ease-in-out rounded-lg"
                        style={{
                          width: `${(timeLeft / (currentExam.exam.duration * 60)) * 100}%`,
                          background: `linear-gradient(90deg, ${
                            timeLeft <= 60
                              ? "#EF4444" // Red
                              : timeLeft <= 120
                              ? "#F97316" // Orange
                              : "#10B981" // Green
                          }, ${
                            timeLeft <= 60
                              ? "#DC2626" // Darker Red
                              : timeLeft <= 120
                              ? "#EA580C" // Darker Orange
                              : "#059669" // Darker Green
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Clock Icon */}
                  <FaClock className={`text-xl ${timeColor}`} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#F9F9F9]">
            {/* Questions */}
            <div className="w-[90%] mx-auto space-y-6 my-5">
              {currentExam.exam.exam_questions.map((question, index) => (
                <Card key={question._id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Question {index + 1}: {question.question_text}
                      </h3>
                      <span className="text-lg font-semibold text-gray-600">
                        Marks: {question.marks}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {question.options.map((option, i) => {
                        const isSelected = answers.some(
                          (answer) => answer.question_id === question._id && answer.selected_answer === option
                        );
                        return (
                          <label
                            key={i}
                            className={`block p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                              isSelected ? "border-2 border-blue-500 bg-blue-50" : "border border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              value={option}
                              onChange={() => handleAnswerChange(question._id, option)}
                              className="mr-3"
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
            <div className="w-[90%] mx-auto space-y-6 my-5">
              <Button
                onClick={() => handleSubmitExam(false)}
                className="w-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white py-3 rounded-lg hover:from-[#CF72C0] hover:to-[#FD813D] transition-all duration-300"
                disabled={isSubmitted}
              >
                Submit Exam
              </Button>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExamPage;