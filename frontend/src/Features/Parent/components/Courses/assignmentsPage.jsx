import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAssignments,
    fetchAllStudentSubmissions,
    fetchCompletedAssignments,
    fetchMissedAssignments,
    clearError,
} from "../../components/ParentRedux/AssignmentSlice";
import { fetchSubjects } from "../../components/ParentRedux/CoursesSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import { setSelectedKid } from "../../components/ParentRedux/AssignmentSlice";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from 'react-i18next';

const AssignmentsParent = () => {
    const { t, i18n } = useTranslation();
    const role = sessionStorage.getItem("role");
    const dispatch = useDispatch();
    const { subjectId } = useParams();
    const selectedKid = useSelector((state) => state.motivationparent.selectedKid);
    const navigate = useNavigate();

    const {
        assignments = [],
        completedAssignments = [],
        missedAssignments = [],
        studentSubmissions = [],
        loadingAssignments,
        loadingSubmissions,
        loadingCompleted,
        loadingMissed,
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
    const [hasClassIdError, setHasClassIdError] = useState(false);
    const itemsPerPage = 3;

useEffect(() => {
    const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid') || sessionStorage.getItem('selectedKid'));
    if (kidFromStorage) {
        dispatch(setSelectedKid({
            ...kidFromStorage,
            _id: kidFromStorage._id,
            classId: kidFromStorage.classId || kidFromStorage.class_id || kidFromStorage.class?._id,
            semesterId: kidFromStorage.semesterId || kidFromStorage.semester_id || kidFromStorage.semester?._id,
            academicYearId: kidFromStorage.academicYearId || kidFromStorage.academic_year_id || kidFromStorage.academicYear?._id,
            gradeId: kidFromStorage.gradeId || kidFromStorage.grade_id || kidFromStorage.grade?._id
        }));
    }
}, [dispatch]);

// Update the useEffect for data fetching
useEffect(() => {
  const fetchData = async () => {
    try {
      setInitialLoading(true);
      
      // Check if all required data is available
      if (!selectedKid || !selectedKid._id || !selectedKid.classId || 
          !selectedKid.semesterId || !selectedKid.academicYearId || 
          !selectedKid.gradeId || !subjectId) {
        throw new Error("Missing required student data");
      }

      // Fetch data in parallel
      await Promise.all([
        dispatch(fetchAssignments(subjectId)),
        dispatch(fetchSubjects()),
        dispatch(fetchAllStudentSubmissions()),
        dispatch(fetchCompletedAssignments()),
        dispatch(fetchMissedAssignments())
      ]);

      // Set subject name
      const currentSubject = subjects.find(subj => subj._id === subjectId);
      if (currentSubject) setSubjectName(currentSubject.name);

    } catch (error) {
      console.error("Data loading error:", error);
      if (!error.message.includes('not found')) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error'
        });
      }
    } finally {
      setInitialLoading(false);
    }
  };

  fetchData();
}, [dispatch, subjectId, selectedKid]);


    // Error handling
    useEffect(() => {
        if (error) {
            Swal.fire({
                title: t('assignments.alerts.error.title'),
                text: error,
                icon: "error",
                confirmButtonText: t('assignments.alerts.error.confirmButton'),
            }).then(() => {
                dispatch(clearError());
            });
        }
    }, [error, dispatch, t]);

    // Categorize and sort assignments
    const categorizeAndSortAssignments = useCallback(
        (assignments) => {
            const now = new Date();
            return [...assignments].sort((a, b) => {
                const aDueDate = new Date(a.due_date);
                const bDueDate = new Date(b.due_date);
                const isASubmitted = studentSubmissions.some(
                    (submission) => submission.assignment_id?._id === a._id
                );
                const isBSubmitted = studentSubmissions.some(
                    (submission) => submission.assignment_id?._id === b._id
                );

                // Priority 1: Pending assignments
                if (!isASubmitted && aDueDate > now && (isBSubmitted || bDueDate <= now)) return -1;
                if (!isBSubmitted && bDueDate > now && (isASubmitted || aDueDate <= now)) return 1;

                // Priority 2: Overdue assignments
                if (!isASubmitted && aDueDate <= now && (isBSubmitted || bDueDate > now)) return -1;
                if (!isBSubmitted && bDueDate <= now && (isASubmitted || aDueDate > now)) return 1;

                // Priority 3: Submitted assignments
                return bDueDate - aDueDate;
            });
        },
        [studentSubmissions]
    );

    // Update filtered assignments when data or tab changes
    useEffect(() => {
        let assignmentsToDisplay = [];

        switch (activeTab) {
            case "all":
                assignmentsToDisplay = categorizeAndSortAssignments(assignments);
                break;
            case "submitted":
                assignmentsToDisplay = completedAssignments;
                break;
            case "pending":
                assignmentsToDisplay = assignments.filter((assignment) => {
                    const isSubmitted = studentSubmissions.some(
                        (submission) => submission.assignment_id?._id === assignment._id
                    );
                    const dueDate = new Date(assignment.due_date);
                    const now = new Date();
                    return !isSubmitted && dueDate >= now;
                });
                break;
            case "missed":
                assignmentsToDisplay = missedAssignments;
                break;
            default:
                assignmentsToDisplay = [];
        }

        setFilteredAssignments(assignmentsToDisplay);
    }, [activeTab, assignments, completedAssignments, missedAssignments, studentSubmissions, categorizeAndSortAssignments]);

    const handleViewAssignment = (assignmentId) => {
        const isSubmitted = studentSubmissions.some(
            (submission) => submission.assignment_id?._id === assignmentId
        );
        navigate(`/parent/assignment/${assignmentId}`, {
            state: { isSubmitted }
        });
    };

    // Pagination logic
    const currentPage = activeTab === "all" ? currentPageAll :
        activeTab === "submitted" ? currentPageSubmitted :
            activeTab === "pending" ? currentPagePending : currentPageMissed;

    const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
    const paginatedAssignments = filteredAssignments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            if (activeTab === "all") setCurrentPageAll(prev => prev + 1);
            else if (activeTab === "submitted") setCurrentPageSubmitted(prev => prev + 1);
            else if (activeTab === "pending") setCurrentPagePending(prev => prev + 1);
            else setCurrentPageMissed(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            if (activeTab === "all") setCurrentPageAll(prev => prev - 1);
            else if (activeTab === "submitted") setCurrentPageSubmitted(prev => prev - 1);
            else if (activeTab === "pending") setCurrentPagePending(prev => prev - 1);
            else setCurrentPageMissed(prev => prev - 1);
        }
    };

    // Loading state
    const loading = loadingAssignments || loadingSubmissions || loadingCompleted || loadingMissed;

    if (initialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#13082F] bg-white">
                <Loader role={role} />
            </div>
        );
    }

    if (hasClassIdError) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#13082F] bg-white">
                <div className="text-center p-8 bg-white dark:bg-[#281459] rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-red-500 mb-4">
                        {t('assignments.errors.missingClassId')}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {t('assignments.errors.selectKidInstruction')}
                    </p>
                    <Button
                        onClick={() => navigate('/parent/kids')}
                        className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                    >
                        {t('assignments.errors.selectKidButton')}
                    </Button>
                </div>
            </div>
        );
    }


    return (
        <div
            className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative"
            style={{
                backgroundImage: "var(--background-image)",
            }}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundStars})` }}></div>
            <div className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundWaves})` }}></div>

            <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-12 mb-20">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white dark:bg-[#13082F] md:border-r border-gray-300 dark:border-[#E0AAEE] p-6 mt-2 md:h-[550px]">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
                        {subjectName || t("exams.main.Subjects")}
                        <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}></span>
                    </h2>
                    <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#FD813D20] hover:via-[#CF72C020] hover:to-[#BC6FFB20] dark:hover:from-[#CE4EA020] dark:hover:via-[#BF4ACB20] dark:hover:to-[#AE45FB20]"
                                onClick={() => navigate(`/parent/all-subjects/virtualrooms/${subjectId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">01</span>
                                {t("exams.sidebar.virtualRooms")}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                            >
                                <span className="text-white mr-2">02</span>
                                {t("exams.sidebar.assignments")}
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#FD813D20] hover:via-[#CF72C020] hover:to-[#BC6FFB20] dark:hover:from-[#CE4EA020] dark:hover:via-[#BF4ACB20] dark:hover:to-[#AE45FB20]"
                                onClick={() => navigate(`/parent/all-subjects/exams/${subjectId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">03</span>
                                {t("exams.sidebar.exams")}
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
                            className={`${activeTab === "all"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("all")}
                        >
                            {t('assignments.main.allTab')} ({assignments.length})
                        </Button>
                        <Button
                            variant={activeTab === "submitted" ? "outline" : "solid"}
                            className={`${activeTab === "submitted"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("submitted")}
                        >
                            {t('assignments.main.submittedTab')} ({studentSubmissions.length})
                        </Button>
                        <Button
                            variant={activeTab === "pending" ? "outline" : "solid"}
                            className={`${activeTab === "pending"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("pending")}
                        >
                            {t('assignments.main.pendingTab')} ({assignments.filter(a => {
                                const isSubmitted = studentSubmissions.some(s => s.assignment_id?._id === a._id);
                                const dueDate = new Date(a.due_date);
                                return !isSubmitted && dueDate >= new Date();
                            }).length})
                        </Button>
                        <Button
                            variant={activeTab === "missed" ? "outline" : "solid"}
                            className={`${activeTab === "missed"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => setActiveTab("missed")}
                        >
                            {t('assignments.main.missedTab')} ({assignments.filter(a => {
                                const isSubmitted = studentSubmissions.some(s => s.assignment_id?._id === a._id);
                                const dueDate = new Date(a.due_date);
                                return !isSubmitted && dueDate < new Date();
                            }).length})
                        </Button>
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center mt-10">
                            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                            <p className="text-gray-700 dark:text-gray-300">
                            </p>
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
                                                s => s.assignment_id?._id === assignment._id
                                            );
                                            const dueDate = new Date(assignment.due_date);
                                            const now = new Date();
                                            const isMissed = !isSubmitted && dueDate < now;

                                            if (isMissed) {
                                                return (
                                                    <Button
                                                        variant="solid"
                                                        className="text-white bg-gray-400 dark:bg-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
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
                                {t('assignments.main.page')} {currentPage} {t('assignments.main.of')} {totalPages}
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

export default AssignmentsParent;