import axios from "axios";

const API_URLToGet = "http://localhost:4000/api/v1/ML/modelData";
//fetch data
export const fetchModelData = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await axios.get(API_URLToGet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Session expired. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Exam schedules not found.");
    } else {
      throw new Error("An error occurred while fetching model data.");
    }
  }
};
