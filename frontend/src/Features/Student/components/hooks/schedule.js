import { useQuery } from "@tanstack/react-query";
import { fetchExamSchedules } from "../services/apiSchedule";
import { toast } from "react-toastify";

export const useExamSchedules = () => {
  const {
    data: studentExamSchedule,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["studentExamSchedule"],
    queryFn: fetchExamSchedules,
    onError: (err) => {
      toast.error(`Error fetching exam schedules: ${err.message}`);
    },
  });

  return { isLoading, studentExamSchedule, error };
};
