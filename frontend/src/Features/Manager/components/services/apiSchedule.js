import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/exam-schedule";
const API_URLToGet = "http://localhost:3000/exam-schedule/schedules/current";
const API_URL_Schedule = "http://localhost:4000/api/v1/manager/schedule";
// Create exam schedule
export const CreateExamScheduleData = async ({ formData }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      toast.warning("No data returned from the server.");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch schedules
export const fetchExamSchedules = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  const { data } = await axios.get(API_URLToGet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

//fetch schedule
export const fetchExamSchedule = async (id) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

//delete schedule

export async function deleteExamSchedule(id) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Exam schedule could not be deleted");
  }
}

//update schedule
export const updateExamSchedule = async ({ id, formData }) => {
  console.log(id, formData);
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }
  const { data } = await axios.patch(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//fetch manager schedule

export const fetchSchedule = async (id) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }
  try {
    const { data } = await axios.get(`${API_URL_Schedule}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch exam schedule",
    );
  }
};
