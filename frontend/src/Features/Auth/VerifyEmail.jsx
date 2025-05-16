import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, clearError } from "./AuthRedux/verifyEmailSlice";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, message, loading, error } = useSelector((state) => state.verifyEmail);

  React.useEffect(() => {
    if (userId && token) {
      dispatch(verifyEmail({ userId, token }));
    }
  }, [dispatch, userId, token]);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    if (status === "success") {
      setTimeout(() => navigate("/login"), 3000);
    } else if (status === "expired") {
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [status, navigate]);

  const getStatusStyles = () => {
    switch (status) {
      case "verifying":
        return "text-blue-600";
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Email Verification</h1>

        <div className="flex flex-col items-center">
          {loading && (
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          )}

          <p className={`text-center text-lg ${getStatusStyles()}`}>{message}</p>

          {status === "error" && (
            <button
              onClick={() => {
                dispatch(clearError());
                navigate("/resend-verification");
              }}
              className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Resend Verification Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;