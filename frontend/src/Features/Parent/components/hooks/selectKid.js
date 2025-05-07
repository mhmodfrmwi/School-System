import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchParentKids } from "../services/apiKids";
import { useSelector } from "react-redux";

export const useParentKids = () => {
  const { _id: userId } = useSelector((state) => state.login);
  const {
    data: parentKids,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["parentkids", userId],
    queryFn: fetchParentKids,
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { isLoading, parentKids, error };
};
