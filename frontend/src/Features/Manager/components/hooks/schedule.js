import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateExamScheduleData,
  deleteExamSchedule,
  fetchExamSchedule,
  fetchExamSchedules,
  fetchSchedule,
  updateExamSchedule,
} from "../services/apiSchedule";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
