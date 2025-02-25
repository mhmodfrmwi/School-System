import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, clearError } from "../../components/StudentRedux/questionBankSlice"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaEye, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CoursesQuestionBank = () => {
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageBookmarks, setCurrentPageBookmarks] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]); 
  const itemsPerPage = 3;
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const { questions, loading, error } = useSelector((state) => state.studentQuestionBank);
  const navigate = useNavigate();

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchQuestions(subjectId)); 
    }
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

 
  const handleBookmark = (questionId) => {
    if (bookmarkedQuestions.includes(questionId)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter((id) => id !== questionId));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, questionId]);
    }
  };

 
  const handleViewQuestion = (questionId) => {
    navigate(`/student/question-details/${subjectId}/${questionId}`);
  };


  const totalPagesAll = Math.ceil(questions.length / itemsPerPage);
  const totalPagesBookmarks = Math.ceil(bookmarkedQuestions.length / itemsPerPage);
  const totalPages = activeTab === "all" ? totalPagesAll : totalPagesBookmarks;

  const paginatedQuestions = activeTab === "all"
    ? questions.slice((currentPageAll - 1) * itemsPerPage, currentPageAll * itemsPerPage)
    : questions.filter((question) => bookmarkedQuestions.includes(question._id))
      .slice((currentPageBookmarks - 1) * itemsPerPage, currentPageBookmarks * itemsPerPage);

  const nextPage = () => {
    if (activeTab === "all" && currentPageAll < totalPagesAll) {
      setCurrentPageAll(currentPageAll + 1);
    } else if (activeTab === "bookmarks" && currentPageBookmarks < totalPagesBookmarks) {
      setCurrentPageBookmarks(currentPageBookmarks + 1);
    }
  };

  const prevPage = () => {
    if (activeTab === "all" && currentPageAll > 1) {
      setCurrentPageAll(currentPageAll - 1);
    } else if (activeTab === "bookmarks" && currentPageBookmarks > 1) {
      setCurrentPageBookmarks(currentPageBookmarks - 1);
    }
  };

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
    
      <div className="w-full md:w-1/4 bg-white md:border-r border-gray-300 p-6 mt-6 md:h-[530px]">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
          {questions.length > 0 ? questions[0].subjectId.subjectName : "Loading..."}
          <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h2>
        <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700  font-medium py-4 rounded-lg">
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
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">06</span> Exams
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-[#BFBFBF] text-white  font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/questionbank/${subjectId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">07</span> Question Bank
            </Button>
          </li>
        </ul>
      </div>

    
      <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Question Bank</h1>

        
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


        {loading && (
          <div className="flex items-center justify-center text-center text-gray-500 mt-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
            <p className="text-gray-700 text-lg font-semibold">Loading...</p>
          </div>
        )}

      
        {!loading && questions.length === 0 && (
          <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
            <CardContent className="text-center p-4 text-gray-600">
              No questions available for this subject.
            </CardContent>
          </Card>
        )}

       
        <div className="space-y-4">
          {paginatedQuestions.map((question, index) => (
            <Card key={question._id} className="border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-600 font-bold">
                    {index + 1 + (currentPageAll - 1) * itemsPerPage}
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
                    <FaBookmark className={`text-gray-800 ${bookmarkedQuestions.includes(question._id) ? "text-yellow-500" : ""}`} />
                  </div>
                  <div
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => handleViewQuestion(question._id)}
                  >
                    <FaEye className="text-gray-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {questions.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mb-4 mt-10">
            <button
              onClick={prevPage}
              disabled={currentPageAll === 1}
              className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span className="text-gray-800 font-medium">
              Page {activeTab === "all" ? currentPageAll : currentPageBookmarks} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={activeTab === "all" ? currentPageAll === totalPagesAll : currentPageBookmarks === totalPagesBookmarks}
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