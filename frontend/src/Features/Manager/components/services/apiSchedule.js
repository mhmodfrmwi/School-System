import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/exam-schedule";
const API_URLToGet = "http://localhost:3000/exam-schedule/schedules/current";
const API_URL_Schedule = "http://localhost:4000/api/v1/manager/schedule";
// Create exam schedule
const CreateExamScheduleData = async ({ formData }) => {
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

export const useCreateExamSchedule = () => {
  const queryClient = useQueryClient();

  const { mutate: createExamSchedule, isLoading: isCreating } = useMutation({
    mutationFn: CreateExamScheduleData,
    onSuccess: () => {
      toast.success("Exam schedule successfully created");
      queryClient.invalidateQueries({ queryKey: ["managerExamSchedules"] });
    },
    onError: (err) => {
      toast.error("Failed to create exam schedule", err.message);
    },
  });

  return { isCreating, createExamSchedule };
};

// Fetch schedules
const fetchExamSchedules = async () => {
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

export const useExamSchedules = () => {
  const { isLoading, data: managerExamSchedules } = useQuery({
    queryKey: ["managerExamSchedules"],
    queryFn: fetchExamSchedules,
    onError: (err) => {
      toast.error(`Error fetching exam schedules: ${err.message}`);
    },
  });

  return { isLoading, managerExamSchedules };
};

//fetch schedule
const fetchExamSchedule = async (id) => {
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

export const useExamSchedule = (id) => {
  const { isLoading, data: managerExamSchedule } = useQuery({
    queryKey: ["managerExamSchedule", id],
    queryFn: () => fetchExamSchedule(id),
    onError: (err) => {
      toast.error(`Error fetching exam schedule: ${err.message}`);
    },
  });

  return { isLoading, managerExamSchedule };
};

//delete schedule

async function deleteExamSchedule(id) {
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

export function useDeleteExamSchedule() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isDeleting, mutate: deleteExamScheduleMutation } =
    useMutation({
      mutationFn: deleteExamSchedule,
      onSuccess: () => {
        toast.success("Exam schedule successfully deleted");
        queryClient.invalidateQueries({
          queryKey: ["managerExamSchedules"],
        });
        navigate("/manager/get-exam-schedules");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDeleting, deleteExamScheduleMutation };
}

//update schedule
const updateExamSchedule = async ({ id, formData }) => {
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

export const useEditExamSchedule = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, formData }) => updateExamSchedule({ id, formData }),
    onSuccess: () => {
      toast.success("Exam schedule successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["managerExamSchedules"],
      });
      navigate("/manager/get-exam-schedules");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
//fetch manager schedule

const fetchSchedule = async (id) => {
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

export const useManagerSchedule = (id) => {
  return useQuery({
    queryKey: ["managerSchedule", id],
    queryFn: () => fetchSchedule(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(`Error fetching exam schedule: ${err.message}`);
    },
  });
};
