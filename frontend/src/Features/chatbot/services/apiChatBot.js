import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const sendMessage = async ({ message, userId }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await axios.post(
      API_URL,
      { message, userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 50000,
      },
    );

    if (typeof response.data?.reply === "string") {
      return response.data.reply;
    }
    if (response.data?.reply) {
      return JSON.stringify(response.data.reply);
    }
    throw new Error("Invalid response format from server");
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Session expired. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Chat service not available.");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    throw new Error(
      error.message || "An error occurred while sending your message.",
    );
  }
};
