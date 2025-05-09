import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1/notifications";

const formatRole = (role) => {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};

const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const sendNotificationApi = async ({ endpoint, data }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${endpoint}`,
      data,
      getAuthHeader(),
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          `Request failed with status ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

export const fetchNotifications = async (userId, role) => {
  try {
    const formattedRole = formatRole(role);
    const response = await axios.get(
      `${API_BASE_URL}/${userId}/${formattedRole}`,
      getAuthHeader(),
    );
    return response.data.data.notifications;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch notifications",
    );
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.patch(
      `${API_BASE_URL}/${notificationId}/read`,
      {},
      getAuthHeader(),
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to mark as read");
  }
};

export const markAllNotificationsAsRead = async (userId, role) => {
  try {
    const formattedRole = formatRole(role);
    await axios.patch(
      `${API_BASE_URL}/${userId}/${formattedRole}/read-all`,
      {},
      getAuthHeader(),
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to mark all as read",
    );
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${notificationId}`, getAuthHeader());
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete notification",
    );
  }
};
