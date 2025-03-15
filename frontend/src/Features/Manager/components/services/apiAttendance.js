import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:4000/api/v1/manager/classes";
//fetch Data
const fetchClasses = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }
  const { data } = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useClasses = () => {
  const { isLoading, data: managerclasses } = useQuery({
    queryKey: ["managerclasses"],
    queryFn: fetchClasses,
    onError: (err) => {
      toast.error(`Error fetching classes: ${err.message}`);
    },
  });

  return { isLoading, managerclasses };
};
//post Data
const formatDate = (date) => {
  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    return `${day} ${month} ${year}`;
  }
  const newDate = new Date(date);
  return `${newDate.getDate()} ${newDate.getMonth() + 1} ${newDate.getFullYear()}`;
};

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

    if (response.data.attendances.length > 0) {
      toast.success("Class data posted successfully!");
    } else {
      toast.success("Not found students");
    }

    return response.data.attendances || [];
  } catch (error) {
    toast.error(`Error posting class data: ${error.message}`);
    throw error;
  }
};
