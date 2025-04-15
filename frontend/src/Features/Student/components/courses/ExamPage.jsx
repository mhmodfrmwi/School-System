import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  submitExam,
  fetchExamById,
  fetchSessions,
} from "../../components/StudentRedux/examsSlice";
import Swal from "sweetalert2";
import { FaClock } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Loader from "../../../../ui/Loader";
import { useTranslation } from 'react-i18next';

const StudentExamPage = () => {
  const { t } = useTranslation();
  const role = sessionStorage.getItem("role");
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
  // Use a ref to track submission status across async calls
  const submissionInProgressRef = useRef(false);
  const timerRef = useRef(null);
  // Add a submission completed ref to track when a submission has been completed
  const submissionCompletedRef = useRef(false);

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

  // Start the timer
  const startTimer = useCallback(() => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Only start timer if time is left and submission is not completed
    if (timeLeft <= 0 || submissionCompletedRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          // Only auto-submit if no submission is in progress or completed
          if (
            !submissionInProgressRef.current &&
            !submissionCompletedRef.current
          ) {
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
  }, [timeLeft]);

  // Handle exam submission
  const handleSubmitExam = useCallback(
    async (isAutomatic = false) => {
      // Check if submission is already completed or in progress
      if (submissionCompletedRef.current) {
        console.log("Exam already submitted successfully");
        return;
      }

      // Prevent multiple submissions
      if (submissionInProgressRef.current) {
        console.log("Submission already in progress");
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
            title:  t('exam.alerts.incompleteExam.title'),
            text: t('exam.alerts.incompleteExam.message'),
            icon: "warning",
            confirmButtonText: t('exam.alerts.incompleteExam.confirmButton'),
          }).then(() => {
            // Reset submission flags
            submissionInProgressRef.current = false;
            setIsSubmitting(false);

            // Restart the timer after user acknowledges the warning
            if (!submissionCompletedRef.current) {
              startTimer();
            }
          });
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
          title: t('exam.alerts.noActiveSession.title'),
          text: t('exam.alerts.noActiveSession.message'),
          icon: "warning",
          confirmButtonText:t('exam.alerts.noActiveSession.confirmButton'),
        }).then(() => {
          // Mark as completed since there's no valid session
          submissionCompletedRef.current = true;
          submissionInProgressRef.current = false;
          setIsSubmitting(false);

          // Navigate back after acknowledgment
          navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
        });
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

        // Mark submission as completed before showing any alerts
        submissionCompletedRef.current = true;

        if (action.payload) {
          Swal.fire({
            title: isAutomatic
              ? t('exam.timer.timeUp')
              :  t('exam.alerts.submitted.title'),
            // text: `Your score is ${action.payload.score || 0}`,
            text: t('exam.alerts.submitted.message', { score: action.payload.score || 0 }),
            icon: "success",
            confirmButtonText:  t('exam.alerts.submitted.confirmButton'),
          }).then(() => {
            navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
          });
        }
      } catch (error) {
        // Only reset flags if this is a real error, not just a "already submitted" message
        if (error.message && !error.message.includes("submitted before")) {
          submissionInProgressRef.current = false;
          // Don't reset the completed flag here, as the server might have processed it

          Swal.fire({
            title: t('exam.alerts.error.title'),
            text: error.message || t('exam.alerts.error.message'),
            icon: "error",
            confirmButtonText: t('exam.alerts.error.confirmButton'),
          }).then(() => {
            setIsSubmitting(false);

            // Only restart timer if we're sure submission failed and exam isn't completed
            if (!submissionCompletedRef.current) {
              startTimer();
            }
          });
        } else {
          // It was already submitted, so mark as completed
          submissionCompletedRef.current = true;
          Swal.fire({
            title: t('exam.alerts.alreadySubmitted.title'),
            text: t('exam.alerts.alreadySubmitted.message'),
            icon: "info",
            confirmButtonText: t('exam.alerts.alreadySubmitted.confirmButton'),
          }).then(() => {
            navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
          });
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
      startTimer,
    ],
  );

  // Timer logic - start timer when component mounts or when timeLeft changes
  useEffect(() => {
    // Only start timer if time is left and no submission is in progress or completed
    if (
      timeLeft > 0 &&
      !submissionInProgressRef.current &&
      !submissionCompletedRef.current
    ) {
      startTimer();
    }

    // Cleanup timer on component unmount
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
      <div className=" mt-16 mb-20 min-h-screen w-[95%] mx-auto">
      <Loader role={role}/>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!currentExam || !currentExam.exam || !currentExam.exam.exam_questions) {
    return (
      <div className="text-center text-gray-500">{t('exam.errors.noQuestions')}</div>
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
          {t('exam.header.backButton')}
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
                    {t('exam.timer.timeLeft')}: {formattedAvailableTime}
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
                      {t('exam.questions.question')} {index + 1}: {question.question_text}
                      </h3>
                      <span className="text-lg font-semibold text-gray-600">
                      {t('exam.questions.marks')}: {question.marks}
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
                              disabled={
                                isSubmitting || submissionCompletedRef.current
                              }
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
                disabled={isSubmitting || submissionCompletedRef.current}
              >
                {isSubmitting ?  t('exam.questions.submitting') :  t('exam.questions.submitButton')}
              </Button>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExamPage;
