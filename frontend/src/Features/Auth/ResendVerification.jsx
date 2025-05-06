import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResendVerification = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    model: "Student",
  });
  const resendVerificationEmail = async () => {
    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("Sending verification email...");

    try {
      const response = await axios.post(
        `${"http://localhost:4000"}/api/v1/general/resend-verification`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setStatus("success");
      setMessage(
        response.data.message || "Verification email sent successfully!",
      );
      toast.success("Verification email sent! Check your inbox.");

      setTimeout(() => navigate("/login"), 5000);
    } catch (error) {
      setStatus("error");
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to resend verification email";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Resend Verification Email
        </h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Parent">Parent</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <button
          onClick={resendVerificationEmail}
          disabled={status === "loading"}
          className={`w-full rounded-md px-4 py-2 font-medium text-white ${
            status === "loading"
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center">
              <svg
                className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Resend Verification Email"
          )}
        </button>

        {status === "success" && (
          <div className="mt-4 rounded-md bg-green-50 p-3 text-green-700">
            <p>{message}</p>
            <p className="mt-1 text-sm">Redirecting to login in 5 seconds...</p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-red-700">
            <p>{message}</p>
            <button
              onClick={resendVerificationEmail}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Didn't receive the email? Check your spam folder.</p>
          <button
            onClick={() => navigate("/contact-support")}
            className="mt-1 text-blue-600 hover:text-blue-800"
          >
            Need help? Contact support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
