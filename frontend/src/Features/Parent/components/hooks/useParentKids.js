import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { fetchParentKids } from "../services/apiKids";

export const useParentKids = () => {
  const token = sessionStorage.getItem("token");
  const {
    data: parentKids,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["parentkids", token],
    queryFn: fetchParentKids,
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { isLoading, parentKids, error };
};
