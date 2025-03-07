import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamsForTeacher, deleteExam } from "../../TeacherRedux/ExamSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye, faCalendar, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const formatStartTime = (startTime) => {
  const date = new Date(startTime);
  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${formattedDate} (${formattedTime})`;
};

const ExamCard = ({ exam, onView, onEdit, onDelete, onViewResults }) => {
  const typeColor = exam.type === "Online" ? "text-green-600" : "text-red-600";

  return (
    <div className="p-6 bg-slate-50 rounded-xl shadow-md border border-[#117C90] hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-[#244856] mb-2">{exam.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{exam.description}</p>
      <hr className="mb-7"></hr>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-semibold text-gray-700">Duration:</span>
          <span className="text-sm text-gray-600">{exam.duration} mins</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700">Total Marks:</span>
          <span className="text-sm text-gray-600">{exam.total_marks}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700">Start:</span>
          <span className="text-sm text-gray-600">{formatStartTime(exam.start_time)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700">End:</span>
          <span className="text-sm text-gray-600">{formatStartTime(exam.end_time)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-700">Type:</span>
          <span className={`text-sm font-semibold ${typeColor}`}>{exam.type}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button
          aria-label="View Exam"
          className="text-[#117C90] hover:text-[#244856] transition-colors duration-300"
          onClick={onView}
        >
          <FontAwesomeIcon icon={faEye} className="text-xl" />
        </button>
        <button
          aria-label="Edit Exam"
          className="text-[#117C90] hover:text-[#244856] transition-colors duration-300"
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faEdit} className="text-xl" />
        </button>
        <button
          aria-label="Delete Exam"
          className="text-[#E74833] hover:text-[#244856] transition-colors duration-300"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
        </button>
        <button
          aria-label="View Results"
          className="text-[#117C90] hover:text-[#244856] transition-colors duration-300"
          onClick={onViewResults}
        >
          <FontAwesomeIcon icon={faChartBar} className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const SeeMyExams = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(fetchExamsForTeacher())
      .unwrap()
      .catch((error) => {
        toast.error(error.message || "Failed to fetch exams");
      });
  }, [dispatch]);

  const handleDeleteExam = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await dispatch(deleteExam(examId)).unwrap();
        // toast.success("Exam deleted successfully!");
        dispatch(fetchExamsForTeacher());
      } catch (error) {
        toast.error(error.message || "Failed to delete exam");
      }
    }
  };

  const handleEditExam = (examId) => {
    navigate(`/teacher/exams/${examId}`);
  };

  const handleViewExam = (examId) => {
    navigate(`/teacher/exam-details/${examId}`);
  };

  const handleViewResults = (examId) => {
    navigate(`/teacher/exam-results/${examId}`);
  };
  const sortedExams = exams
    ? [...exams].sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
    : [];

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg font-semibold text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold font-poppins text-[#244856]">My Exams</h1>
      <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[160px]"></div>
      <div className="grid font-poppins gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {sortedExams && exams.length > 0 ? (
          sortedExams.map((exam) => (
            <ExamCard
              key={exam._id}
              exam={exam}
              onView={() => handleViewExam(exam._id)}
              onEdit={() => handleEditExam(exam._id)}
              onDelete={() => handleDeleteExam(exam._id)}
              onViewResults={() => handleViewResults(exam._id)} 
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-6xl text-gray-400 mb-4"
            />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              No Exams Found
            </p>
            <p className="text-gray-500 text-center max-w-xl">
              It seems like there are no exams available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeMyExams;