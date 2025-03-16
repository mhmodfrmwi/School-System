import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_URLToGet = "http://localhost:3000/exam-schedule/schedules/upcoming";
//fetch data
const fetchExamSchedules = async () => {
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
      throw new Error("An error occurred while fetching exam schedules.");
    }
  }
};

export const useExamSchedules = () => {
  const { data: studentExamSchedule, error } = useQuery({
    queryKey: ["studentExamSchedule"],
    queryFn: fetchExamSchedules,
    onError: (err) => {
      toast.error(`Error fetching exam schedules: ${err.message}`);
    },
  });

  return { studentExamSchedule, error };
};
