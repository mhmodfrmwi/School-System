import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/parent/get-attendance";

export const fetchStudentAttendance = async (studentId) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await axios.get(`${API_URL}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.studentAttendance;
  } catch (error) {
    throw new Error(error.message);
  }
};
