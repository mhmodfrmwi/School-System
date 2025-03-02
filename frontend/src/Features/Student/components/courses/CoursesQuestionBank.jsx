import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  addToBookmark,
  fetchBookmarks,
  markQuestionAsViewed,
  clearError,
} from "../../components/StudentRedux/questionBankSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaEye, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CoursesQuestionBank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const itemsPerPage = 3;
  const dispatch = useDispatch();
  const { subjectId ,classId} = useParams();
  const { questions, bookmarks, loading, error } = useSelector(
    (state) => state.studentQuestionBank
  );
  const { subjects } = useSelector((state) => state.allSubjectsStudent);
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchQuestions(subjectId));
      dispatch(fetchBookmarks());
    }
  }, [dispatch, subjectId]);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const subject = subjects.find((subject) => subject.id === subjectId);
      if (subject) {
        setSubjectName(subject.subjectName);
      }
    }
  }, [subjectId, subjects]);

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

  const handleBookmark = (questionId) => {
    dispatch(addToBookmark(questionId));
  };

  const handleViewQuestion = (questionId) => {
    const question = questions.find((q) => q._id === questionId);
    if (question && !question.isViewed) {
      dispatch(markQuestionAsViewed(questionId));
    }
    navigate(`/student/question-details/${subjectId}/${questionId}`);
  };

  const bookmarkedQuestions = questions.filter((question) =>
    bookmarks?.some((bookmark) => bookmark?.question_id?._id === question._id)
  );

  const displayedQuestions = activeTab === "all" ? questions : bookmarkedQuestions;
  const totalPages = Math.ceil(displayedQuestions.length / itemsPerPage);

  const paginatedQuestions = displayedQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white md:border-r border-gray-300 p-6 mt-6 md:h-[530px]">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
          {subjectName}
          <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h2>
        <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/videos/${subjectId}`)}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">01</span> Video Lectures
            </Button>
          </li>
          <li>
            <Button
              variant="solid"
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/materials/${subjectId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">02</span> Course Material
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/virtualrooms/${subjectId}`)} >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">03</span> Virtual Rooms
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">04</span> Discussion Rooms
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">05</span> Assignments
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/exams/${subjectId}/${classId}`)}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">06</span> Exams
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-[#BFBFBF] text-white font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/questionbank/${subjectId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">07</span> Question Bank
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Question Bank</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={activeTab === "all" ? "outline" : "solid"}
            className={`${activeTab === "all" ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white" : "border border-gray-500 text-gray-800"
              } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("all")}
          >
            All ({questions.length})
          </Button>
          <Button
            variant={activeTab === "bookmarks" ? "outline" : "solid"}
            className={`${activeTab === "bookmarks" ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white" : "border border-gray-500 text-gray-800"
              } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks ({bookmarkedQuestions.length})
          </Button>
        </div>

        {/* Loading Message */}
        {loading && (
          <div className="flex items-center justify-center text-center text-gray-500 mt-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
            <p className="text-gray-700 text-lg font-semibold">Loading...</p>
          </div>
        )}

        {/* No Questions Message */}
        {!loading && questions.length === 0 && (
          <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
            <CardContent className="text-center p-4 text-gray-600">
              No questions available for this subject.
            </CardContent>
          </Card>
        )}

        {/* Question Cards */}
        <div className="space-y-4">
          {paginatedQuestions.map((question, index) => (
            <Card key={question._id} className="border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-600 font-bold">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-gray-800">{question.questionText}</h2>
                    <p className="text-sm text-gray-600">{question.questionType}</p>
                    <p className="text-sm text-gray-400">Teacher: {question.teacherId.fullName}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-gray-500">
                  <div
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => handleBookmark(question._id)}
                  >
                    <FaBookmark className={`text-gray-800 ${bookmarks.some((bookmark) => bookmark?.question_id?._id === question._id) ? "text-yellow-500" : ""}`} />
                  </div>
                  <div
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => handleViewQuestion(question._id)}
                  >
                    <FaEye className={`${question.isViewed ? "text-blue-500" : "text-gray-800 "}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {displayedQuestions.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mb-4 mt-10">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span className="text-gray-800 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesQuestionBank;