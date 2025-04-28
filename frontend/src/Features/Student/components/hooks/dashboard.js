import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { fetchModelData } from "../services/apiDashboard";

export const useModelData = () => {
  const {
    data: studentModalData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["studentModalData"],
    queryFn: fetchModelData,
    onError: (err) => {
      toast.error(`Error fetching studentModalData: ${err.message}`);
    },
  });

  return { isLoading, studentModalData, error };
};
