import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faCalendar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssignmentSubmissions, deleteSubmission } from '../../TeacherRedux/AssignmentSlice';
import EditGradeModal from './EditGradeModal';

const AssignmentSubmissions = () => {
    const formatStartTime = (submitted_at) => {
        const date = new Date(submitted_at);
        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} (${formattedTime})`;
    };
    const { assignmentId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { submissions, status } = useSelector((state) => state.assignmentsTeacher);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        dispatch(getAssignmentSubmissions(assignmentId));
    }, [dispatch, assignmentId]);

    const handleViewSubmissionDetails = (submissionId) => {
        navigate(`/teacher/submission-details/${submissionId}`);
    };

    const handleEditGrade = (submission) => {
        setSelectedSubmission(submission);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedSubmission(null);
    };
    const handleDeleteSubmission = (submissionId) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            dispatch(deleteSubmission(submissionId)).then(() => {
                dispatch(getAssignmentSubmissions(assignmentId));
            });
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

   

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold font-poppins text-[#244856]"> Submissions</h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
            <div className="overflow-x-auto">
                <table className="min-w-full font-poppins table-auto border-collapse border-2 border-[#117C90] rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
                    <thead className="bg-[#117C90] text-white">
                        <tr>
                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">#</th>
                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Student Name</th>
                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Submission Date</th>
                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Status</th>
                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Grades</th>
                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length > 0 ? (
                            submissions.map((submission, index) => (
                                <tr key={submission._id} className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{submission.student_id.fullName}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{formatStartTime(submission.submitted_at)}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{submission.status}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{submission.grade}</td>
                                    <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                                        <button
                                            aria-label="View Submission Details"
                                            className="text-[#117C90] hover:text-[#244856] transition-colors duration-300"
                                            onClick={() => handleViewSubmissionDetails(submission._id)}
                                        >
                                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                                        </button>
                                        <button
                                            className="text-[#117C90] hover:text-[#244856]"
                                            onClick={() => handleEditGrade(submission)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                        </button>
                                        <button
                                            className="text-[#E74833] hover:text-[#244856]"
                                            onClick={() => handleDeleteSubmission(submission._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="w-full text-center py-16 bg-[#F9FAFB] rounded-lg shadow-lg">
                                    <FontAwesomeIcon icon={faCalendar} className="text-6xl text-gray-400 mb-4" />
                                    <p className="text-xl font-semibold text-gray-600 mb-2">No Submissions Found</p>
                                    <p className="text-gray-500 max-w-xl mx-auto">
                                        It seems like there are no Submissions available at the moment.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isEditModalOpen && selectedSubmission && (
                <EditGradeModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModal}
                    submissionId={selectedSubmission._id}
                    currentGrade={selectedSubmission.grade}
                />
            )}
        </div>
    );
};

export default AssignmentSubmissions;