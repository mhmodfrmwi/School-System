import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllStudentSubmissions, clearError } from "../../components/StudentRedux/assignmentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const SubmissionView = () => {
  const dispatch = useDispatch();
  const { assignmentId } = useParams();
  const { studentSubmissions, loadingSubmissions, error } = useSelector((state) => state.assignments);

  useEffect(() => {
    dispatch(fetchAllStudentSubmissions());
  }, [dispatch]);

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

  const submission = studentSubmissions.find(
    (submission) => submission.assignment_id?._id === assignmentId
  );

  if (loadingSubmissions) {
    return (
      <div className="flex items-center justify-center text-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
        <p className="text-gray-700 text-lg font-semibold">Loading Submission...</p>
      </div>
    );
  }

  if (!submission) {
    return <div className="text-center text-gray-700 mt-10">No submission found.</div>;
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">

      <Card className="border border-gray-200 rounded-xl shadow-sm w-full p-6 bg-white">
        <CardContent>
        
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mb-4">
            {submission.assignment_id.title}
          </h2>

        
          <p className="text-gray-700 mb-4">{submission.assignment_id.description}</p>

        
          <p className="text-sm text-gray-600 mb-6">
            Due Date: {new Date(submission.assignment_id.due_date).toLocaleString()}
          </p>

 
          <div className="mt-6 p-6 bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Submission:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{submission.submission_text}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionView;