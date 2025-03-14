import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllStudentSubmissions, clearError } from "../../components/StudentRedux/assignmentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";

const SubmissionView = () => {
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader role={role} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20 min-h-[68vh]">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
          {submission ? submission.assignment_id?.title : "Submission Details"} 
          <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      {/* Submission Details */}
      {submission ? (
        <div className="w-full">
          <Card className="border border-gray-200 rounded-xl shadow-sm p-6">
            <CardContent className="p-6 border border-gray-200 rounded-lg">
              <div className="mb-6">
                <p className="text-lg font-semibold text-transparent bg-clip-text bg-[#fc9e6e]">
                  Your Grade: {submission.grade !== undefined ? submission.grade : "Not graded yet"}
                </p>
              </div>

              <p className="text-gray-700 mb-6">{submission.assignment_id?.description}</p>

              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Due Date: {new Date(submission.assignment_id?.due_date).toLocaleString()}
                </p>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Submission:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{submission.submission_text}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full">
          <Card className="border border-gray-200 rounded-xl shadow-sm p-6">
            <CardContent className="p-6 border border-gray-200 rounded-lg font-poppins flex flex-col items-center justify-center min-h-[38vh]">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mb-4">
                No Submission Found
              </h2>
              <p className="text-gray-600">You have not submitted anything for this assignment yet.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubmissionView;