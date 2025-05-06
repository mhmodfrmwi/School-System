import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  const verifyEmail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/general/${userId}/verify/${token}`,
      );

      setStatus("success");
      setMessage(response.data.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setStatus("error");
      const errorMessage =
        error.response?.data?.message ||
        "Failed to verify email. Please try again or contact support.";
      setMessage(errorMessage);
      toast.error(errorMessage);

      if (error.response?.status === 410) {
        setTimeout(() => navigate("/login"), 3000);
      }
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [userId, token]);

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
        <h1 className="mb-6 text-center text-2xl font-bold">
          Email Verification
        </h1>

        <div className="flex flex-col items-center">
          {status === "verifying" && (
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          )}

          <p className={`text-center text-lg ${getStatusStyles()}`}>
            {message}
          </p>

          {status === "error" && (
            <button
              onClick={() => navigate("/resend-verification")}
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
