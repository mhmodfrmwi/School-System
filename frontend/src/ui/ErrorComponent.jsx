import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faWifi } from "@fortawesome/free-solid-svg-icons";
import NotFound from "../assets/notfound2.png"; // 404 Image

const ErrorComponent = ({ error, onRetry }) => {
  const navigate = useNavigate();

  // Define error types and their properties
  const errorTypes = {
    noToken: {
      title: "Session Expired",
      message: "Your session has expired. Please log in again to continue.",
      buttonText: "Go to Login",
      action: () => navigate("/role"),
      icon: faExclamationTriangle,
      iconColor: "text-red-500",
    },
    network: {
      title: "No Internet Connection",
      message: "It seems you're offline. Please check your network and try again.",
      buttonText: "Retry",
      action: onRetry,
      icon: faWifi,
      iconColor: "text-blue-500",
    },
    notFound: {
      title: "Page Not Found",
      image: NotFound,
      message: "The page you're looking for doesn't exist.",
      buttonText: "Go Home",
      action: () => navigate("/"),
    },
    server: {
      title: "Server Error",
      message: "Something went wrong on our end. Please try again later.",
      buttonText: "Retry",
      action: onRetry,
      icon: faExclamationTriangle,
      iconColor: "text-yellow-500",
    },
    general: {
      title: "Oops, Something Went Wrong",
      message: error || "An unexpected error occurred. Please try again.",
      buttonText: "Retry",
      action: onRetry,
      icon: faExclamationTriangle,
      iconColor: "text-gray-500",
    },
  };

  const errorInfo =
    error === "No token found" || "Invalid token!"
      ? errorTypes.noToken
      : error?.includes("NetworkError")
      ? errorTypes.network
      : error?.includes("404")
      ? errorTypes.notFound
      : error?.includes("500")
      ? errorTypes.server
      : errorTypes.general;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {errorInfo.image ? (
          <img src={errorInfo.image} alt="Not Found" className="w-[300px] mx-auto" />
        ) : (
          <FontAwesomeIcon icon={errorInfo.icon} className={`text-6xl ${errorInfo.iconColor} mb-4`} />
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{errorInfo.title}</h2>
        <p className="text-gray-600 mb-6">{errorInfo.message}</p>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={errorInfo.action}
        >
          {errorInfo.buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
