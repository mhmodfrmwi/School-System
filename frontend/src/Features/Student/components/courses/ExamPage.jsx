import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  submitExam,
  fetchExamById,
  fetchSessions,
} from "../../components/StudentRedux/examsSlice";
import Swal from "sweetalert2";
import { FaSpinner, FaClock } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moment from "moment";

const StudentExamPage = () => {
  const dispatch = useDispatch();
  const { examId, gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const { currentExam, sessions, loading, error } = useSelector(
    (state) => state.exams,
  );
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [formattedAvailableTime, setFormattedAvailableTime] =
    useState("Calculating...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgressRef = useRef(false);
  const timerRef = useRef(null);

  // Fetch exam and sessions on mount
  useEffect(() => {
    dispatch(fetchExamById(examId));
    dispatch(fetchSessions());
  }, [dispatch, examId]);

  useEffect(() => {
    const activeSession = sessions.find(
      (session) =>
        session.exam_id._id === examId && session.isExpired === false,
    );

    if (activeSession) {
      const now = moment();
      const endTime = moment(activeSession.end_time);
      let durationInSeconds = endTime.diff(now, "seconds");

      // Subtract 10 seconds from the total duration
      durationInSeconds = Math.max(durationInSeconds - 10, 0);

      if (durationInSeconds >= 0) {
        setTimeLeft(durationInSeconds);
        setFormattedAvailableTime(
          `${Math.floor(durationInSeconds / 60)}:${durationInSeconds % 60 < 10 ? `0${durationInSeconds % 60}` : durationInSeconds % 60}`,
        );
      } else {
        setTimeLeft(0);
        setFormattedAvailableTime("00:00");
      }
    }
  }, [sessions, examId]);

  // Handle answer changes
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.question_id !== questionId,
      );
      return [
        ...updatedAnswers,
        { question_id: questionId, selected_answer: selectedAnswer },
      ];
    });
  };

  // Handle exam submission
  const handleSubmitExam = useCallback(
    async (isAutomatic = false) => {
      // Prevent multiple submissions
      if (submissionInProgressRef.current) {
        return;
      }

      // Set submission flag immediately to prevent multiple calls
      submissionInProgressRef.current = true;
      setIsSubmitting(true);

      // Clear any existing timers
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (!isAutomatic) {
        const allQuestions = currentExam.exam.exam_questions;
        const unansweredQuestions = allQuestions.filter((question) => {
          const existingAnswer = answers.find(
            (answer) => answer.question_id === question._id,
          );
          return !existingAnswer || existingAnswer.selected_answer === "";
        });

        if (unansweredQuestions.length > 0) {
          Swal.fire({
            title: "Incomplete Exam",
            text: "Please answer all questions before submitting.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          submissionInProgressRef.current = false;
          setIsSubmitting(false);

          // Restart timer if it was an automatic submission attempt
          if (isAutomatic && timeLeft > 0) {
            startTimer();
          }
          return;
        }
      }

      const activeSession = sessions.find(
        (session) =>
          session.exam_id?._id === examId &&
          (isAutomatic || session.isExpired === false) &&
          session?.status !== "Submitted",
      );

      if (!activeSession) {
        Swal.fire({
          title: "No Active Session",
          text: "Either the exam is already submitted or the session has expired.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        submissionInProgressRef.current = false;
        setIsSubmitting(false);
        return;
      }

      const sessionId = activeSession._id;

      const allAnswers = currentExam.exam.exam_questions.map((question) => {
        const existingAnswer = answers.find(
          (answer) => answer.question_id === question._id,
        );
        return {
          question_id: question._id,
          selected_answer: existingAnswer ? existingAnswer.selected_answer : "",
        };
      });

      try {
        const action = await dispatch(
          submitExam({ sessionId, answers: allAnswers }),
        );

        if (action.payload) {
          Swal.fire({
            title: isAutomatic
              ? "Time's Up! Exam Auto-Submitted"
              : "Exam Submitted!",
            text: `Your score is ${action.payload.score || 0}`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to submit exam",
          icon: "error",
          confirmButtonText: "OK",
        });
        submissionInProgressRef.current = false;
        setIsSubmitting(false);

        // Restart timer if there was an error during automatic submission
        if (isAutomatic && timeLeft > 0) {
          startTimer();
        }
      }
    },
    [
      dispatch,
      sessions,
      examId,
      answers,
      gradeSubjectSemesterId,
      navigate,
      currentExam,
      timeLeft,
    ],
  );

  // Start the timer
  const startTimer = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          // Only auto-submit if no submission is in progress
          if (!submissionInProgressRef.current) {
            handleSubmitExam(true);
          }
          return 0;
        }

        const newTime = prevTime - 1;
        setFormattedAvailableTime(
          `${Math.floor(newTime / 60)}:${newTime % 60 < 10 ? `0${newTime % 60}` : newTime % 60}`,
        );
        return newTime;
      });
    }, 1000);
  }, [handleSubmitExam]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !submissionInProgressRef.current) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft, startTimer]);

  const timeColor = timeLeft <= 60 ? "text-red-500" : "text-gray-800";

  if (loading) {
    return (
      <div className="mt-10 flex items-center justify-center text-gray-500">
        <FaSpinner className="mb-4 animate-spin text-4xl text-blue-500" />
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!currentExam || !currentExam.exam || !currentExam.exam.exam_questions) {
    return (
      <div className="text-center text-gray-500">No exam questions found.</div>
    );
  }

  return (
    <div className="mx-auto mb-20 mt-20 min-h-[75vh] w-[75%] font-poppins">
      {/* Header */}
      <div className="mb-8 flex w-full items-center justify-between">
        <h1 className="relative bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
          {currentExam.exam.title}
          <span className="absolute bottom-[-9px] left-0 h-[4px] w-[50%] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white transition-all duration-300 hover:from-[#CF72C0] hover:to-[#FD813D]"
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
                <div className="my-5 ml-5 mr-5 flex items-center justify-between">
                  <div className="flex w-full items-center">
                    {/* Time Left */}
                    <p className={`text-xl font-bold ${timeColor}`}>
                      Time Left: {formattedAvailableTime}
                    </p>

                    {/* Progress Bar */}
                    <div className="mx-4 ml-10 hidden h-3 w-[50%] overflow-hidden rounded-lg bg-gray-200 md:block">
                      <div
                        className="h-full rounded-lg transition-all duration-300 ease-in-out"
                        style={{
                          width: `${(timeLeft / (currentExam?.exam?.duration * 60 || 1)) * 100}%`,
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
            <div className="mx-auto my-5 w-[90%] space-y-6">
              {currentExam.exam.exam_questions.map((question, index) => (
                <Card
                  key={question._id}
                  className="rounded-xl border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
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
                          (answer) =>
                            answer.question_id === question._id &&
                            answer.selected_answer === option,
                        );
                        return (
                          <label
                            key={i}
                            className={`block cursor-pointer rounded-lg p-4 transition-all duration-200 ${
                              isSelected
                                ? "border-2 border-blue-500 bg-blue-50"
                                : "border border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              value={option}
                              onChange={() =>
                                handleAnswerChange(question._id, option)
                              }
                              className="mr-3"
                              disabled={isSubmitting}
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
            <div className="mx-auto my-5 w-[90%] space-y-6">
              <Button
                onClick={() => handleSubmitExam(false)}
                className="w-full rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-3 text-white transition-all duration-300 hover:from-[#CF72C0] hover:to-[#FD813D]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Exam"}
              </Button>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExamPage;
