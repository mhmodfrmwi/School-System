import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExams,
  startExamSession,
  fetchSessions,
  clearError,
  fetchUpcomingExams,
  fetchCompletedExams,
  fetchMissedExams,
} from "../../components/StudentRedux/examsSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ExamsSection = () => {
  const dispatch = useDispatch();
  const { gradeSubjectSemesterId, classId } = useParams();
  const navigate = useNavigate();
  const {
    exams = [],
    upcomingExams = [],
    completedExams = [],
    missedExams = [],
    sessions,
    loading,
    error,
  } = useSelector((state) => state.exams);
  const { subjects } = useSelector((state) => state.allSubjectsStudent);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredExams, setFilteredExams] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageMissed, setCurrentPageMissed] = useState(1);
  const itemsPerPage = 3;

  // Fetch all required data on component mount
  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchSessions());
    dispatch(fetchExams({ gradeSubjectSemesterId, classId }));
    dispatch(fetchUpcomingExams({ gradeSubjectSemesterId, classId }));
    dispatch(fetchCompletedExams({ gradeSubjectSemesterId, classId }));
    dispatch(fetchMissedExams({ gradeSubjectSemesterId, classId }));
  }, [dispatch, gradeSubjectSemesterId, classId]);

  useEffect(() => {
    if (subjects.length > 0 && gradeSubjectSemesterId) {
      const subject = subjects.find((subject) => subject.id === gradeSubjectSemesterId);
      if (subject) {
        setSubjectName(subject.subjectName);
      }
    }
  }, [gradeSubjectSemesterId, subjects]);

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

  // Categorize and sort exams for the "All" tab
  const categorizeAndSortExams = useCallback(
    (exams) => {
      const now = new Date();

      return [...exams].sort((a, b) => {
        const aStart = new Date(a.start_time);
        const aEnd = new Date(a.end_time);
        const bStart = new Date(b.start_time);
        const bEnd = new Date(b.end_time);

        // Check if the exam is active (started but not ended)
        const isAActive = aStart <= now && aEnd > now;
        const isBActive = bStart <= now && bEnd > now;

        // Check if the exam is submitted or expired
        const aSession = sessions.find((session) => session.exam_id._id === a._id);
        const bSession = sessions.find((session) => session.exam_id._id === b._id);
        const isASubmittedOrExpired = aSession?.status === "Submitted" || aSession?.isExpired === true;
        const isBSubmittedOrExpired = bSession?.status === "Submitted" || bSession?.isExpired === true;

        // Priority 1: Active exams that are not submitted or expired
        if (isAActive && !isASubmittedOrExpired && !(isBActive && !isBSubmittedOrExpired)) return -1;
        if (isBActive && !isBSubmittedOrExpired && !(isAActive && !isASubmittedOrExpired)) return 1;

        // Priority 2: Not started exams
        if (aStart > now && bStart <= now) return -1;
        if (bStart > now && aStart <= now) return 1;

        // Priority 3: Active exams that are submitted or expired
        if (isAActive && isASubmittedOrExpired && !(isBActive && isBSubmittedOrExpired)) return -1;
        if (isBActive && isBSubmittedOrExpired && !(isAActive && isASubmittedOrExpired)) return 1;

        // Priority 4: Completed or missed exams
        return bEnd - aEnd; // Sort by end time (most recent first)
      });
    },
    [sessions] // sessions is a dependency because it's used inside the function
  );

  // Update filteredExams when activeTab, exams, or sessions change
  useEffect(() => {
    let examsToDisplay = [];
    if (activeTab === "all") {
      examsToDisplay = categorizeAndSortExams(exams);
    } else if (activeTab === "upcoming") {
      examsToDisplay = upcomingExams;
    } else if (activeTab === "completed") {
      examsToDisplay = completedExams;
    } else if (activeTab === "missed") {
      examsToDisplay = missedExams;
    }
    setFilteredExams(examsToDisplay);
  }, [activeTab, exams, upcomingExams, completedExams, missedExams, categorizeAndSortExams]);


  const handleStartExam = (exam) => {
    const now = new Date();
    const startTime = new Date(exam.start_time);
    const endTime = new Date(exam.end_time);

    if (now < startTime) {
      Swal.fire({
        title: "Not Started!",
        text: "The exam has not started yet.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (now > endTime) {
      Swal.fire({
        title: "Exam Ended!",
        text: "The exam has already ended.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const session = sessions.find((session) => session.exam_id._id === exam._id);

    if (session && session.status === "Expired") {
      Swal.fire({
        title: "Session Expired!",
        text: "You cannot enter this exam as the session has expired.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    dispatch(startExamSession(exam._id)).then((action) => {
      if (startExamSession.fulfilled.match(action)) {
        // If the session starts successfully, navigate to the exam page
        navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}/${exam._id}`);
      } else {
        // Check if the error message indicates an active session
        if (action.payload === "You already have an active session for this exam") {
          Swal.fire({
            title: "Warning!",
            text: "You already have an active session. Resuming your previous exam.",
            icon: "warning",
            confirmButtonText: "Proceed",
          });
          // Navigate to the exam page even if this error occurs
          navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}/${exam._id}`);
        } else {
          // Handle other errors normally
          Swal.fire({
            title: "Error!",
            text: action.payload || "Failed to start the exam.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });



  };

  // Pagination logic
  const currentPage = activeTab === "all" ? currentPageAll : activeTab === "upcoming" ? currentPageUpcoming : activeTab === "completed" ? currentPageCompleted : currentPageMissed;
  const totalPagesAll = Math.ceil(filteredExams.length / itemsPerPage);
  const totalPagesUpcoming = Math.ceil(upcomingExams.length / itemsPerPage);
  const totalPagesCompleted = Math.ceil(completedExams.length / itemsPerPage);
  const totalPagesMissed = Math.ceil(missedExams.length / itemsPerPage);
  const totalPages = activeTab === "all" ? totalPagesAll : activeTab === "upcoming" ? totalPagesUpcoming : activeTab === "completed" ? totalPagesCompleted : totalPagesMissed;

  const paginatedExams = activeTab === "all"
    ? filteredExams.slice((currentPageAll - 1) * itemsPerPage, currentPageAll * itemsPerPage)
    : activeTab === "upcoming"
      ? upcomingExams.slice((currentPageUpcoming - 1) * itemsPerPage, currentPageUpcoming * itemsPerPage)
      : activeTab === "completed"
        ? completedExams.slice((currentPageCompleted - 1) * itemsPerPage, currentPageCompleted * itemsPerPage)
        : missedExams.slice((currentPageMissed - 1) * itemsPerPage, currentPageMissed * itemsPerPage);

  const nextPage = () => {
    if (activeTab === "all" && currentPageAll < totalPagesAll) {
      setCurrentPageAll(currentPageAll + 1);
    } else if (activeTab === "upcoming" && currentPageUpcoming < totalPagesUpcoming) {
      setCurrentPageUpcoming(currentPageUpcoming + 1);
    } else if (activeTab === "completed" && currentPageCompleted < totalPagesCompleted) {
      setCurrentPageCompleted(currentPageCompleted + 1);
    } else if (activeTab === "missed" && currentPageMissed < totalPagesMissed) {
      setCurrentPageMissed(currentPageMissed + 1);
    }
  };

  const prevPage = () => {
    if (activeTab === "all" && currentPageAll > 1) {
      setCurrentPageAll(currentPageAll - 1);
    } else if (activeTab === "upcoming" && currentPageUpcoming > 1) {
      setCurrentPageUpcoming(currentPageUpcoming - 1);
    } else if (activeTab === "completed" && currentPageCompleted > 1) {
      setCurrentPageCompleted(currentPageCompleted - 1);
    } else if (activeTab === "missed" && currentPageMissed > 1) {
      setCurrentPageMissed(currentPageMissed - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <Button
              variant="solid"
              className="md:w-11/12  bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/videos/${gradeSubjectSemesterId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">01</span> Video Lectures
            </Button>
          </li>
          <li>
            <Button
              variant="solid"
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/materials/${gradeSubjectSemesterId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">02</span> Course Material
            </Button>
          </li>
          <li>
            <Button
              variant="solid"
              className="md:w-11/12 bg-gray-100 text-gray-700  font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/virtualrooms/${gradeSubjectSemesterId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">03</span> Virtual Rooms
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">04</span> Discussion Rooms
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/assignments/${gradeSubjectSemesterId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">05</span> Assignments
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-[#BFBFBF] text-white font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">06</span> Exams
            </Button>
          </li>
          <li>
            <Button
              variant="solid"
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/questionbank/${gradeSubjectSemesterId}`)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">07</span> Question Bank
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Exams</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={activeTab === "all" ? "outline" : "solid"}
            className={`${activeTab === "all"
              ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
              : "border border-gray-500 text-gray-800"
              } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("all")}
          >
            All ({exams.length})
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "outline" : "solid"}
            className={`${activeTab === "upcoming"
              ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
              : "border border-gray-500 text-gray-800"
              } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming ({upcomingExams.length})
          </Button>
          <Button
            variant={activeTab === "completed" ? "outline" : "solid"}
            className={`${activeTab === "completed"
              ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
              : "border border-gray-500 text-gray-800"
              } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("completed")}
          >
            Completed ({completedExams.length})
          </Button>
          <Button
            variant={activeTab === "missed" ? "outline" : "solid"}
            className={`${activeTab === "missed"
              ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
              : "border border-gray-500 text-gray-800"
              } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("missed")}
          >
            Missed ({missedExams.length})
          </Button>
        </div>

        {/* Loading Message */}
        {loading && (
          <div className="flex items-center justify-center text-center text-gray-500 mt-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
            <p className="text-gray-700 text-lg font-semibold">Loading...</p>
          </div>
        )}

        {/* No Exams Message */}
        {filteredExams.length === 0 && !loading && !error && (
          <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
            <CardContent className="text-center p-4 text-gray-600">
              No exams available.
            </CardContent>
          </Card>
        )}

        {/* Exam Cards */}
        <div className="space-y-4">
          {paginatedExams.map((exam, index) => (
            <Card key={exam._id} className="border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="flex items-center justify-center p-4 bg-gray-100">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-600 font-bold">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-gray-800">{exam.title}</h2>
                    <p className="text-md text-gray-700">Description: {exam.description}</p>
                    <p className="text-sm text-gray-700">Created By: {exam.created_by.fullName}</p>
                    <p className="text-sm text-gray-700">Duration: {exam.duration} minutes</p>
                    <p className="text-sm text-gray-700">
                      Start Time: {new Date(exam.start_time).toLocaleString()}
                      <span className="text-pink-600"> | </span>
                      End Time: {new Date(exam.end_time).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Start Exam */}
                <div
                  className="ml-4"
                  title={
                    new Date() < new Date(exam.start_time)
                      ? "The exam has not started yet."
                      : new Date() > new Date(exam.end_time)
                        ? "The exam has already ended."
                        : ""
                  }
                >
                  <Button
                    variant="solid"
                    className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-3 py-2 rounded-lg"
                    onClick={() => {
                      const session = sessions.find((session) => session.exam_id._id === exam._id);
                      if (
                        session?.status === "Submitted" ||
                        session?.isExpired === true
                      ) {
                        // Navigate to the results page
                        navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}/result/${exam._id}`);
                      } else {
                        // Handle starting the exam
                        handleStartExam(exam);
                      }
                    }}
                    disabled={
                      (new Date() > new Date(exam.end_time) && !sessions.find((session) => session.exam_id._id === exam._id)) ||
                      new Date() < new Date(exam.start_time) ||
                      exam.type === "Offline"
                    }
                  >
                    {(() => {
                      if (exam.type === "Offline") return "Offline";
                      const session = sessions.find((session) => session.exam_id._id === exam._id);
                      if (session?.status === "Submitted") return "View";
                      if (session?.isExpired === true) return "View";
                      if (new Date() < new Date(exam.start_time)) return "Not Started";
                      if (new Date() > new Date(exam.end_time)) return "Exam Ended";
                      return "Start Exam";
                    })()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {filteredExams.length > itemsPerPage && (
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

export default ExamsSection;