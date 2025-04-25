import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateClassData, fetchClasses } from "../services/apiAttendance";
import { toast } from "react-toastify";

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

export const useCreateClassData = () => {
  const {
    data,
    mutate: createClassData,
    isLoading: isCreating,
  } = useMutation({
    mutationFn: CreateClassData,
    onSuccess: () => {
      toast.success("Class data posted successfully!");
    },
    onError: (err) => {
      toast.error(`Error creating class data: ${err.message}`);
    },
  });

  return { createClassData, isCreating, data };
};
