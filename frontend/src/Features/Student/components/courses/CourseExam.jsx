import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams, startExamSession, endExamSession, clearError } from "../../components/StudentRedux/examsSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const ExamsSection = () => {
    const dispatch = useDispatch();
    const { gradeSubjectSemesterId, classId } = useParams();
    const navigate = useNavigate();
    const { exams = [], loading, error } = useSelector((state) => state.exams);
    const { subjects } = useSelector((state) => state.allSubjectsStudent);

    const [activeTab, setActiveTab] = useState("all");
    const [filteredExams, setFilteredExams] = useState([]);
    const [subjectName, setSubjectName] = useState("");

    useEffect(() => {
        dispatch(fetchExams({ gradeSubjectSemesterId, classId }));
    }, [dispatch, gradeSubjectSemesterId, classId]);

    useEffect(() => {
        dispatch(fetchSubjects());
    }, [dispatch]);

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
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                dispatch(clearError());
            });
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (Array.isArray(exams)) {
            if (activeTab === "completed") {
                setFilteredExams(exams.filter(exam => exam.status === "completed"));
            } else if (activeTab === "missed") {
                setFilteredExams(exams.filter(exam => exam.status === "missed"));
            } else {
                setFilteredExams(exams);
            }
        }
    }, [activeTab, exams]);

    const handleStartExam = (examId) => {
        dispatch(startExamSession(examId));
        navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}/${examId}`);
    };

    const handleEndExam = (sessionId) => {
        dispatch(endExamSession(sessionId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Array.isArray(exams)) {
        return <div>No exams available.</div>;
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
                        <Button variant="solid" className="md:w-11/12  bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"

                            onClick={() => navigate(`/student/allcourses/videos/${gradeSubjectSemesterId}`)}>
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
                        <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700  font-medium py-4 rounded-lg"
                            onClick={() => navigate(`/student/allcourses/virtualrooms/${gradeSubjectSemesterId}`)} >
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
                        <Button variant="solid" className="md:w-11/12 bg-[#BFBFBF] text-white font-medium py-4 rounded-lg">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">06</span> Exams
                        </Button>
                    </li>
                    <li>
                        <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
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
                        variant={activeTab === "completed" ? "outline" : "solid"}
                        className={`${activeTab === "completed"
                            ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
                            : "border border-gray-500 text-gray-800"
                            } px-4 md:px-6 py-2 rounded-full`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed ({exams.filter(exam => exam.status === "completed").length})
                    </Button>

                    <Button
                        variant={activeTab === "missed" ? "outline" : "solid"}
                        className={`${activeTab === "missed"
                            ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
                            : "border border-gray-500 text-gray-800"
                            } px-4 md:px-6 py-2 rounded-full`}
                        onClick={() => setActiveTab("missed")}
                    >
                        Missed ({exams.filter(exam => exam.status === "missed").length})
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
                {exams.length === 0 && !loading && !error && (
                    <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
                        <CardContent className="text-center p-4 text-gray-600">
                            No exams available for this subject.
                        </CardContent>
                    </Card>
                )}

                {/* Exam Cards */}
                <div className="space-y-4">
                    {filteredExams.map((exam, index) => (
                        <Card key={exam._id} className="border border-gray-200 rounded-xl shadow-sm">
                            <CardContent className="flex items-center justify-center p-4 bg-gray-100">

                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-600 font-bold">
                                        {index + 1}
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

                                {/* زر Start Exam */}
                                <div className="ml-4">
                                    <Button
                                        variant="solid"
                                        className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-3 py-2 rounded-lg"
                                        onClick={() => handleStartExam(exam._id)}
                                    >
                                        Start Exam
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExamsSection;