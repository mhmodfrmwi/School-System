import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCalendar, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { fetchAssignments } from "../../TeacherRedux/AssignmentSlice";

const SeeAllAssignments = () => {
    const formatStartTime = (due_date) => {
        const date = new Date(due_date);
        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} (${formattedTime})`;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gradeSubjectSemesterId } = useParams();
    const { assignment, status, error } = useSelector((state) => state.assignmentsTeacher);

    useEffect(() => {
        if (gradeSubjectSemesterId) {
            dispatch(fetchAssignments(gradeSubjectSemesterId))
                .unwrap()
                .then((data) => {
                    console.log("Assignments Data:", data); 
                })
                .catch((error) => {
                    console.error("Error fetching assignments:", error);
                });
        }
    }, [dispatch, gradeSubjectSemesterId]);

    const handleViewSubmissions = (assignmentId) => {
        navigate(`/teacher/all-assignment-submissions/${assignmentId}`);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold font-poppins text-[#244856]">My Assignment</h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[240px]"></div>
        <div className="grid font-poppins gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {assignment.length > 0 ? (
                assignment.map((item) => (
                    <div key={item._id} className="p-6 bg-slate-50 rounded-xl shadow-md border border-[#117C90] hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-lg font-semibold text-[#244856]">{item.title}</h2>
                        <p className="text-sm text-gray-600 mb-4 whitespace-normal break-words">{item.description}</p>
                        <p className="text-sm text-gray-700 mt-1">Due: {formatStartTime(item.due_date)}</p>
                        <p className="text-sm text-gray-700 mt-1">Marks: {item.total_marks}</p>
                            <div className="flex justify-end mt-4 space-x-3">
                                <button
                                    aria-label="View Results"
                                    className="text-[#117C90] hover:text-[#244856] transition-colors duration-300"
                                    onClick={() => handleViewSubmissions(item._id)}
                                >
                                    <FontAwesomeIcon icon={faChartBar} className="text-xl" />
                                </button>
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-6xl text-gray-400 mb-4"
                        />
                        <p className="text-xl font-semibold text-gray-600 mb-2">
                            No Assignments Found
                        </p>
                        <p className="text-gray-500 text-center max-w-xl">
                            It seems like there are no Assignments available at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeeAllAssignments;