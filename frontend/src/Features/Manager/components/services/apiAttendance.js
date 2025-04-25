import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/manager/classes";

// Fetch classes
export const fetchClasses = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const { data } = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Error fetching classes: ${error.message}`);
  }
};

// Format date
const formatDate = (date) => {
  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    return `${day} ${month} ${year}`;
  }
  const newDate = new Date(date);
  return `${newDate.getDate()} ${newDate.getMonth() + 1} ${newDate.getFullYear()}`;
};

// Create class data
export const CreateClassData = async ({ classId, date }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }
  const formattedDate = formatDate(date);

  try {
    const response = await axios.post(
      API_URL,
      { classId, date: formattedDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.attendances || [];
  } catch (error) {
    throw error;
  }
};
