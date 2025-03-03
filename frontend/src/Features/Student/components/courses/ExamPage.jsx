import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { submitExam, fetchExamById, fetchSessions } from "../../components/StudentRedux/examsSlice";
import Swal from 'sweetalert2';
import { FaSpinner } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moment from 'moment'; 

const StudentExamPage = () => {
  const dispatch = useDispatch();
  const { examId, gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const { currentExam, sessions, loading, error } = useSelector((state) => state.exams);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [formattedAvailableTime, setFormattedAvailableTime] = useState("Calculating...");

  useEffect(() => {
    dispatch(fetchExamById(examId)).then((action) => {
      if (action.payload) {
        console.log("Current Exam:", action.payload); 
      }
    });
    dispatch(fetchSessions()); 
  }, [dispatch, examId]);

  useEffect(() => {
    const activeSession = sessions.find(session => 
      session.exam_id._id === examId && session.status === "In Progress"
    );

    if (activeSession) {
      const now = moment(); 
      const endTime = moment(activeSession.end_time); 
      const durationInSeconds = endTime.diff(now, 'seconds');

      if (durationInSeconds >= 0) {
        setTimeLeft(durationInSeconds);
        setFormattedAvailableTime(`${Math.floor(durationInSeconds / 60)}:${durationInSeconds % 60 < 10 ? `0${durationInSeconds % 60}` : durationInSeconds % 60}`);
      } else {
        setTimeLeft(0);
        setFormattedAvailableTime("00:00");
      }
    }
  }, [sessions, examId]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(answer => answer.question_id !== questionId); 
      return [...updatedAnswers, { question_id: questionId, selected_answer: selectedAnswer }]; 
    });
  };

  const handleSubmitExam = useCallback(() => {
    const activeSession = sessions.find(session => 
      session.exam_id._id === examId && session.status === "In Progress"
    );

    if (!activeSession) {
      console.error("No active session found!");
      Swal.fire({
        title: 'Error!',
        text: 'No active session found. Please start the exam first.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const sessionId = activeSession._id; 

    const formattedAnswers = {
      answers: answers.map(answer => ({
        question_id: answer.question_id,
        selected_answer: answer.selected_answer
      }))
    };

    dispatch(submitExam({ sessionId, answers: formattedAnswers })).then((action) => {
      if (action.payload) {
        Swal.fire({
          title: 'Exam Submitted!',
          text: `Your score is ${action.payload.score}`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`);
        });
      }
    });
  }, [dispatch, sessions, examId, answers, gradeSubjectSemesterId, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        const newTime = prevTime - 1;
        setFormattedAvailableTime(`${Math.floor(newTime / 60)}:${newTime % 60 < 10 ? `0${newTime % 60}` : newTime % 60}`);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleSubmitExam]);

  
  const timeColor = timeLeft <= 60 ? 'text-red-500' : 'text-gray-800';

  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!currentExam || !currentExam.exam || !currentExam.exam.exam_questions) {
    return <div className="text-center text-gray-500">No exam questions found.</div>;
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
     
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

    
      <div className="w-full mb-6">
        <Card className="border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="p-4">
            <p className={`text-lg font-semibold ${timeColor}`}>
              Time Left: {formattedAvailableTime}
            </p>
          </CardContent>
        </Card>
      </div>

     
      <div className="w-full space-y-4">
        {currentExam.exam.exam_questions.map((question, index) => (
          <Card key={question._id} className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Question {index + 1}: {question.question_text}
              </h3>
              <div className="mt-2">
                {question.options.map((option, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

     
      <div className="w-full mt-6">
        <Button
          onClick={handleSubmitExam}
          className="w-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white py-2 rounded-lg"
        >
          Submit Exam
        </Button>
      </div>
    </div>
  );
};

export default StudentExamPage;