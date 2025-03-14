import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { getSubmissionDetails } from '../../TeacherRedux/AssignmentSlice';

const SubmissionDetails = () => {
    const { submissionId } = useParams();
    const dispatch = useDispatch();
    const { submissionDetails, status } = useSelector((state) => state.assignmentsTeacher);

    useEffect(() => {
        dispatch(getSubmissionDetails(submissionId));
    }, [dispatch, submissionId]);

    const formatStartTime = (submitted_at) => {
        const date = new Date(submitted_at);
        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} (${formattedTime})`;
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

   
    return (
        <div className="p-6 space-y-6 font-poppins">
            <h1 className="text-3xl font-bold font-poppins text-[#244856]">Submission Details</h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[300px]"></div>
            {submissionDetails && submissionDetails.submission ? (
                <div className="bg-slate-50 rounded-xl shadow-md border border-[#117C90] p-6">
                    <h2 className="text-lg font-semibold text-[#244856]">
                        Assignment: {submissionDetails.submission.assignment_id.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal break-words">
                        {submissionDetails.submission.assignment_id.description}
                    </p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-semibold">Submitted by:</span> {submissionDetails.submission.student_id.fullName}</p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-semibold">Submission Date:</span> {formatStartTime(submissionDetails.submission.submitted_at)}</p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-semibold">Status:</span> Submitted</p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-semibold">Grade:</span><span className="text-[#2dda2d] font-bold ml-3">{submissionDetails.submission.grade}</span> </p>
                    <div className="mt-4">
                        <h3 className="text-md font-semibold text-[#244856]">Submission Text:</h3>
                        <p className="text-sm text-gray-600 whitespace-normal break-words">
                            {submissionDetails.submission.submission_text}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg">
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-6xl text-gray-400 mb-4"
                    />
                    <p className="text-xl font-semibold text-gray-600 mb-2">
                        No Submission Details Found
                    </p>
                    <p className="text-gray-500 text-center max-w-xl">
                        It seems like there are no details available for this submission.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SubmissionDetails;