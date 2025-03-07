import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAssignmentById, submitAssignment, clearError } from "../../components/StudentRedux/assignmentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const AssignmentView = () => {
  const dispatch = useDispatch();
  const { assignmentId,gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const { currentAssignment, loadingAssignmentById, error } = useSelector((state) => state.assignments);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    dispatch(fetchAssignmentById(assignmentId));
  }, [dispatch, assignmentId]);


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


  const handleSubmit = async () => {
    if (!submissionText.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your submission text.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const submissionData = {
      submission_text: submissionText,
    };

    const result = await dispatch(submitAssignment({ assignmentId, submissionData }));
    if (submitAssignment.fulfilled.match(result)) {
      Swal.fire({
        title: "Success!",
        text: "Assignment submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/student/allcourses/assignments/${gradeSubjectSemesterId}`); 
      });
      setIsSubmitted(true);
    }
  };

  if (loadingAssignmentById) {
    return (
      <div className="flex items-center justify-center text-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
        <p className="text-gray-700 text-lg font-semibold">Loading Assignment...</p>
      </div>
    );
  }

  if (!currentAssignment) {
    return <div className="text-center text-gray-700 mt-10">No assignment found.</div>;
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
      {/* تفاصيل الواجب */}
      <Card className="border border-gray-200 rounded-xl shadow-sm w-full p-6 bg-white">
        <CardContent>
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mb-4">
            {currentAssignment.title}
          </h2>
          <p className="text-gray-700 mb-4">{currentAssignment.description}</p>
          <p className="text-sm text-gray-600">
            Due Date: {new Date(currentAssignment.due_date).toLocaleString()}
          </p>

          <div className="mt-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              placeholder="Enter your answer here..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              disabled={isSubmitted}
            />
          </div>


          <div className="mt-6">
            <Button
              variant="solid"
              className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-6 py-3 rounded-lg"
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              {isSubmitted ? "View Submission" : "Submit Assignment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentView;