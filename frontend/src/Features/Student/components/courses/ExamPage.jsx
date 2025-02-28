import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startExamSession, endExamSession, fetchSessions, fetchExams } from "../../components/StudentRedux/examsSlice";
import Swal from "sweetalert2";

const ExamPage = () => {
    const { examId, subjectId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { exams, sessions, loadingExams, loadingSessions, error } = useSelector((state) => state.exams);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [examStarted, setExamStarted] = useState(false);

    const exam = exams.find((exam) => exam._id === examId);

    const calculateTotalMarks = (questions) => {
        return questions.reduce((total, question) => total + question.marks, 0);
    };

    const totalMarks = exam ? calculateTotalMarks(exam.questions) : 0;

    const handleSubmit = useCallback(async () => {
        if (!examStarted) return;

        const result = await dispatch(endExamSession({ examId, answers }));
        if (result.payload) {
            Swal.fire({
                title: "Exam Submitted",
                text: `Your score is ${result.payload.score}/${totalMarks}`,
                icon: "success",
            });
            navigate("/student/allcourses/exams");
        }
    }, [examStarted, answers, dispatch, examId, navigate, totalMarks]);

    useEffect(() => {
        dispatch(fetchExams(subjectId));
    }, [dispatch, subjectId]);

    useEffect(() => {
        if (!exam) {
            navigate(`/student/allcourses/exams/${subjectId}`);
            return;
        }

        dispatch(fetchSessions());

        const now = new Date();
        const startTime = new Date(exam.start_time);
        const endTime = new Date(exam.end_time);

        if (now < startTime) {
            Swal.fire({
                title: "Exam Not Started",
                text: "The exam has not started yet.",
                icon: "warning",
            });
            navigate(`/student/allcourses/exams/${subjectId}`);
            return;
        }

        if (now > endTime) {
            Swal.fire({
                title: "Exam Ended",
                text: "The exam has already ended.",
                icon: "error",
            });
            navigate(`/student/allcourses/exams/${subjectId}`);
            return;
        }

        const session = sessions.find((session) => session.exam_id === examId);
        if (session && session.status === "completed") {
            Swal.fire({
                title: "Exam Already Taken",
                text: "You have already taken this exam.",
                icon: "info",
            });
            navigate("/student/allcourses/exams/");
            return;
        }

        dispatch(startExamSession(examId)).then(() => {
            setExamStarted(true);
            setTimeLeft(exam.duration * 60);
        });

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examId, exam, dispatch, navigate, sessions, subjectId, handleSubmit]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    if (loadingExams || loadingSessions) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!exam || !examStarted) {
        return <div>No exam data found.</div>;
    }

    const currentQuestion = exam.questions[currentQuestionIndex];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
                {exam.title}
            </h1>
            <div className="mb-4">
                <p className="text-gray-700">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
            </div>
            <div className="mb-4 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestionIndex + 1}</h2>
                <p className="text-gray-700">{currentQuestion.question_text}</p>
                {currentQuestion.question_type === "MCQ" ? (
                    currentQuestion.options.map((option, index) => (
                        <div key={index} className="mt-2">
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion._id}`}
                                    value={option}
                                    onChange={() => handleAnswerChange(currentQuestion._id, option)}
                                    checked={answers[currentQuestion._id] === option}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        </div>
                    ))
                ) : (
                    <textarea
                        className="w-full p-2 border rounded text-gray-700"
                        value={answers[currentQuestion._id] || ""}
                        onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                    />
                )}
            </div>
            <div className="flex justify-between">
                <button
                    className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-4 py-2 rounded"
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                <button
                    className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-4 py-2 rounded"
                    onClick={() =>
                        setCurrentQuestionIndex((prev) => Math.min(prev + 1, exam.questions.length - 1))
                    }
                    disabled={currentQuestionIndex === exam.questions.length - 1}
                >
                    Next
                </button>
            </div>
            <div className="mt-6">
                <button
                    className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    Submit Exam
                </button>
            </div>
        </div>
    );
};

export default ExamPage;