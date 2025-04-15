import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAssignments,
    fetchAllStudentSubmissions,
    clearError,
} from "../../components/StudentRedux/assignmentSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from 'react-i18next';
const AssignmentsSection = () => {
    const { t,i18n } = useTranslation();
    const role = sessionStorage.getItem("role");
    const dispatch = useDispatch();
    const { gradeSubjectSemesterId, classId } = useParams();
    const navigate = useNavigate();
    const {
        assignments = [],
        studentSubmissions = [],
        loading,
        error,
    } = useSelector((state) => state.assignments);
    const { subjects } = useSelector((state) => state.allSubjectsStudent);
    const [activeTab, setActiveTab] = useState("all");
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const [subjectName, setSubjectName] = useState("");
    const [currentPageAll, setCurrentPageAll] = useState(1);
    const [currentPageSubmitted, setCurrentPageSubmitted] = useState(1);
    const [currentPagePending, setCurrentPagePending] = useState(1);
    const [currentPageMissed, setCurrentPageMissed] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchSubjects()),
                    dispatch(fetchAssignments({ gradeSubjectSemesterId, classId })),
                    dispatch(fetchAllStudentSubmissions()),
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchData();
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
                title: t('assignments.alerts.error.title'),
                text: error,
                icon: "error",
                confirmButtonText:  t('assignments.alerts.error.confirmButton'),
            }).then(() => {
                dispatch(clearError());
            });
        }
    }, [error, dispatch,t]);

    // Categorize and sort assignments for the "All" tab
    const categorizeAndSortAssignments = useCallback(
        (assignments) => {
            const now = new Date();

            return [...assignments].sort((a, b) => {
                const aDueDate = new Date(a.due_date);
                const bDueDate = new Date(b.due_date);

                // Check if the assignment is submitted
                const isASubmitted = studentSubmissions.some(
                    (submission) => submission.assignment_id?._id === a._id
                );
                const isBSubmitted = studentSubmissions.some(
                    (submission) => submission.assignment_id?._id === b._id
                );

                // Priority 1: Pending assignments (not submitted and not overdue)
                if (!isASubmitted && aDueDate > now && (isBSubmitted || bDueDate <= now)) return -1;
                if (!isBSubmitted && bDueDate > now && (isASubmitted || aDueDate <= now)) return 1;

                // Priority 2: Overdue assignments (not submitted and overdue)
                if (!isASubmitted && aDueDate <= now && (isBSubmitted || bDueDate > now)) return -1;
                if (!isBSubmitted && bDueDate <= now && (isASubmitted || aDueDate > now)) return 1;

                // Priority 3: Submitted assignments
                return bDueDate - aDueDate; // Sort by due date (most recent first)
            });
        },
        [studentSubmissions]
    );

    // Update filteredAssignments when activeTab, assignments, or studentSubmissions change
    useEffect(() => {
        let assignmentsToDisplay = [];
        if (activeTab === "all") {
            assignmentsToDisplay = categorizeAndSortAssignments(assignments);
        } else if (activeTab === "submitted") {
            assignmentsToDisplay = assignments.filter((assignment) =>
                studentSubmissions.some((submission) => submission.assignment_id?._id === assignment._id)
            );
        } else if (activeTab === "pending") {
            assignmentsToDisplay = assignments.filter((assignment) => {
                const isSubmitted = studentSubmissions.some(
                    (submission) => submission.assignment_id?._id === assignment._id
                );
                const dueDate = new Date(assignment.due_date);
                const now = new Date();
                return !isSubmitted && dueDate >= now;
            });
        } else if (activeTab === "missed") {
            assignmentsToDisplay = assignments.filter((assignment) => {
                const isSubmitted = studentSubmissions.some(
                    (submission) => submission.assignment_id?._id === assignment._id
                );
                const dueDate = new Date(assignment.due_date);
                const now = new Date();
                return !isSubmitted && dueDate < now;
            });
        }
        setFilteredAssignments(assignmentsToDisplay);
    }, [activeTab, assignments, studentSubmissions, categorizeAndSortAssignments]);

    const handleViewAssignment = (assignmentId) => {
        const isSubmitted = studentSubmissions.some(
            (submission) => submission.assignment_id?._id === assignmentId
        );

        if (isSubmitted) {
            navigate(`/student/allcourses/assignments/${gradeSubjectSemesterId}/submission/${assignmentId}`);
        } else {
            navigate(`/student/allcourses/assignments/${gradeSubjectSemesterId}/${assignmentId}`);
        }
    };

    // Pagination logic
    const currentPage = activeTab === "all" ? currentPageAll : activeTab === "submitted" ? currentPageSubmitted : activeTab === "pending" ? currentPagePending : currentPageMissed;
    const totalPagesAll = Math.ceil(filteredAssignments.length / itemsPerPage);
    const totalPagesSubmitted = Math.ceil(
        assignments.filter((assignment) =>
            studentSubmissions.some((submission) => submission.assignment_id?._id === assignment._id)
        ).length / itemsPerPage
    );
    const totalPagesPending = Math.ceil(
        assignments.filter((assignment) => {
            const isSubmitted = studentSubmissions.some(
                (submission) => submission.assignment_id?._id === assignment._id
            );
            const dueDate = new Date(assignment.due_date);
            const now = new Date();
            return !isSubmitted && dueDate >= now;
        }).length / itemsPerPage
    );
    const totalPagesMissed = Math.ceil(
        assignments.filter((assignment) => {
            const isSubmitted = studentSubmissions.some(
                (submission) => submission.assignment_id?._id === assignment._id
            );
            const dueDate = new Date(assignment.due_date);
            const now = new Date();
            return !isSubmitted && dueDate < now;
        }).length / itemsPerPage
    );
    const totalPages = activeTab === "all" ? totalPagesAll : activeTab === "submitted" ? totalPagesSubmitted : activeTab === "pending" ? totalPagesPending : totalPagesMissed;

    const paginatedAssignments = activeTab === "all"
        ? filteredAssignments.slice((currentPageAll - 1) * itemsPerPage, currentPageAll * itemsPerPage)
        : activeTab === "submitted"
            ? assignments
                .filter((assignment) =>
                    studentSubmissions.some((submission) => submission.assignment_id?._id === assignment._id)
                )
                .slice((currentPageSubmitted - 1) * itemsPerPage, currentPageSubmitted * itemsPerPage)
            : activeTab === "pending"
                ? assignments
                    .filter((assignment) => {
                        const isSubmitted = studentSubmissions.some(
                            (submission) => submission.assignment_id?._id === assignment._id
                        );
                        const dueDate = new Date(assignment.due_date);
                        const now = new Date();
                        return !isSubmitted && dueDate >= now;
                    })
                    .slice((currentPagePending - 1) * itemsPerPage, currentPagePending * itemsPerPage)
                : assignments
                    .filter((assignment) => {
                        const isSubmitted = studentSubmissions.some(
                            (submission) => submission.assignment_id?._id === assignment._id
                        );
                        const dueDate = new Date(assignment.due_date);
                        const now = new Date();
                        return !isSubmitted && dueDate < now;
                    })
                    .slice((currentPageMissed - 1) * itemsPerPage, currentPageMissed * itemsPerPage);

    const nextPage = () => {
        if (activeTab === "all" && currentPageAll < totalPagesAll) {
            setCurrentPageAll(currentPageAll + 1);
        } else if (activeTab === "submitted" && currentPageSubmitted < totalPagesSubmitted) {
            setCurrentPageSubmitted(currentPageSubmitted + 1);
        } else if (activeTab === "pending" && currentPagePending < totalPagesPending) {
            setCurrentPagePending(currentPagePending + 1);
        } else if (activeTab === "missed" && currentPageMissed < totalPagesMissed) {
            setCurrentPageMissed(currentPageMissed + 1);
        }
    };

    const prevPage = () => {
        if (activeTab === "all" && currentPageAll > 1) {
            setCurrentPageAll(currentPageAll - 1);
        } else if (activeTab === "submitted" && currentPageSubmitted > 1) {
            setCurrentPageSubmitted(currentPageSubmitted - 1);
        } else if (activeTab === "pending" && currentPagePending > 1) {
            setCurrentPagePending(currentPagePending - 1);
        } else if (activeTab === "missed" && currentPageMissed > 1) {
            setCurrentPageMissed(currentPageMissed - 1);
        }
    };

    if (initialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#13082F] bg-white">
                <Loader role={role} />
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative"
            style={{
                backgroundImage: "var(--background-image)",
            }}
        >
            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{
                    backgroundImage: `url(${backgroundStars})`,
                }}
            ></div>

            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{
                    backgroundImage: `url(${backgroundWaves})`,
                }}
            ></div>

            <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-12 mb-20">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white dark:bg-[#13082F] md:border-r border-gray-300 dark:border-[#E0AAEE] p-6 mt-2 md:h-[550px]">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
                        {subjectName}
                        <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
                    </h2>
                    <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                                onClick={() => navigate(`/student/allcourses/videos/${gradeSubjectSemesterId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">01</span> {t('assignments.sidebar.videoLectures')}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                                onClick={() => navigate(`/student/allcourses/materials/${gradeSubjectSemesterId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">02</span>{t('assignments.sidebar.courseMaterial')}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                                onClick={() => navigate(`/student/allcourses/virtualrooms/${gradeSubjectSemesterId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">03</span> {t('assignments.sidebar.virtualRooms')}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">04</span>{t('assignments.sidebar.assignments')}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                                onClick={() => navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">05</span> {t('assignments.sidebar.exams')}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                                onClick={() => navigate(`/student/allcourses/questionbank/${gradeSubjectSemesterId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">06</span> {t('assignments.sidebar.questionBank')}
                            </Button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">{t('assignments.main.title')}</h1>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Button
                            variant={activeTab === "all" ? "outline" : "solid"}
                            className={`${
                                activeTab === "all"
                                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                    : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                            } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("all")}
                        >
                             {t('assignments.main.allTab')}  ({assignments.length})
                        </Button>
                        <Button
                            variant={activeTab === "submitted" ? "outline" : "solid"}
                            className={`${
                                activeTab === "submitted"
                                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                    : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                            } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("submitted")}
                        >
                          { t('assignments.main.submittedTab') } ({studentSubmissions.length})
                        </Button>
                        <Button
                            variant={activeTab === "pending" ? "outline" : "solid"}
                            className={`${
                                activeTab === "pending"
                                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                    : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                            } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("pending")}
                        >
                            {t('assignments.main.pendingTab')}({assignments.filter((assignment) => {
                                const isSubmitted = studentSubmissions.some(
                                    (submission) => submission.assignment_id?._id === assignment._id
                                );
                                const dueDate = new Date(assignment.due_date);
                                const now = new Date();
                                return !isSubmitted && dueDate >= now;
                            }).length})
                        </Button>
                        <Button
                            variant={activeTab === "missed" ? "outline" : "solid"}
                            className={`${
                                activeTab === "missed"
                                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                    : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                            } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("missed")}
                        >
                           {t('assignments.main.missedTab')} ({assignments.filter((assignment) => {
                                const isSubmitted = studentSubmissions.some(
                                    (submission) => submission.assignment_id?._id === assignment._id
                                );
                                const dueDate = new Date(assignment.due_date);
                                const now = new Date();
                                return !isSubmitted && dueDate < now;
                            }).length})
                        </Button>
                    </div>

                    {/* Loading Message */}
                    {loading && !initialLoading && (
                        <div className="flex items-center justify-center text-center text-gray-500 dark:text-gray-300 mt-10">
                            <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-[#C459D9] mb-4 mr-5" />
                            <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold"> {t('assignments.main.loading')}</p>
                        </div>
                    )}

                    {/* No Assignments Message */}
                    {!initialLoading && filteredAssignments.length === 0 && !loading && !error && (
                        <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                            <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                            {t('assignments.main.noAssignments')}
                            </CardContent>
                        </Card>
                    )}

                    {/* Assignment Cards */}
                    <div className="space-y-4">
                        {paginatedAssignments.map((assignment, index) => (
                            <Card key={assignment._id} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                                <CardContent className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#281459]">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                                            {index + 1 + (currentPage - 1) * itemsPerPage}
                                        </div>
                                        <div>
                                            <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">{assignment.title}</h2>
                                            <p className="text-md text-gray-700 dark:text-gray-400">{t('assignments.main.assignmentCard.description')}: {assignment.description}</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-400">{t('assignments.main.assignmentCard.createdBy')}: {assignment.created_by.fullName}</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                            {t('assignments.main.assignmentCard.dueDate')}: {new Date(assignment.due_date).toLocaleString(i18n.language)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* View Assignment */}
                                    <div className="ml-4">
                                        {(() => {
                                            const isSubmitted = studentSubmissions.some(
                                                (submission) => submission.assignment_id?._id === assignment._id
                                            );
                                            const dueDate = new Date(assignment.due_date);
                                            const now = new Date();
                                            const isMissed = !isSubmitted && dueDate < now;

                                            if (isMissed) {
                                                return (
                                                    <Button
                                                        variant="solid"
                                                        className="text-white bg-gray-400 dark:bg-gray-600 px AV px-4 py-2 rounded-lg cursor-not-allowed"
                                                        disabled
                                                    >
                                                          {t('assignments.main.assignmentCard.missed')}
                                                    </Button>
                                                );
                                            } else if (isSubmitted) {
                                                return (
                                                    <Button
                                                        variant="solid"
                                                        className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-3 py-2 rounded-lg"
                                                        onClick={() => handleViewAssignment(assignment._id)}
                                                    >
                                                        {t('assignments.main.assignmentCard.viewSubmission')}
                                                    </Button>
                                                );
                                            } else {
                                                return (
                                                    <Button
                                                        variant="solid"
                                                        className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-3 py-2 rounded-lg"
                                                        onClick={() => handleViewAssignment(assignment._id)}
                                                    >
                                                      {t('assignments.main.assignmentCard.submitAssignment')}
                                                    </Button>
                                                );
                                            }
                                        })()}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {filteredAssignments.length > itemsPerPage && (
                        <div className="flex justify-center items-center gap-4 mb-4 mt-10">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
                            >
                                <FaChevronLeft />
                            </button>
                            <span className="text-gray-800 dark:text-gray-300 font-medium">
                            {t('assignments.main.page')}  {currentPage} {t('assignments.main.of')}  {totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentsSection;