import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/parent";

export const fetchStudentGrades = async (studentId) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  if (!studentId) {
    throw new Error("Student ID is required");
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/semester-subject-degree/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const fetchAllTermsGrades = async (studentId) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  if (!studentId) {
    throw new Error("Student ID is required");
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/all-subjects-degrees/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};
