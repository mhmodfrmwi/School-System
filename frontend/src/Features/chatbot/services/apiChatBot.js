import axios from "axios";

// Change the API URL to use the new port
const API_URL = "http://localhost:5001/api/chat";

export const sendMessage = async ({ message, userId }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    // Test endpoint first to check CORS
    console.log("Attempting to call test endpoint");
    try {
      await axios.get("http://localhost:5001/api/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Test endpoint successful");
    } catch (e) {
      console.warn(
        "Test endpoint failed, but continuing with chat request:",
        e,
      );
    }

    console.log("Sending chat message:", message);
    const response = await axios.post(
      API_URL,
      { message, userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 50000,
        // Explicitly set withCredentials for CORS with credentials
        withCredentials: true,
      },
    );

    console.log("Received response:", response.data);

    if (typeof response.data?.reply === "string") {
      return response.data.reply;
    }
    if (response.data?.reply) {
      return JSON.stringify(response.data.reply);
    }
    throw new Error("Invalid response format from server");
  } catch (error) {
    console.error("Full error details:", error);

    if (error.response?.status === 401) {
      throw new Error("Session expired. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error(
        "Chat service not available. Check server URL and paths.",
      );
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    } else if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Network error. Is the server running at http://localhost:5001?",
      );
    }
    throw new Error(
      error.message || "An error occurred while sending your message.",
    );
  }
};
