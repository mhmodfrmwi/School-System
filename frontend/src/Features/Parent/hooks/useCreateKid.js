import { useMutation } from "@tanstack/react-query";
import { postSelectedKid } from "../services/apiKids";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateKid = () => {
  const navigate = useNavigate();
  const {
    mutate: postKidData,
    isLoading: isPosting,
    data,
  } = useMutation({
    mutationFn: postSelectedKid,
    onSuccess: () => {
      navigate("/student");
    },
    onError: (error) => {
      toast.error(`Failed to select kid: ${error.message}`);
    },
  });

  return { postKidData, isPosting, data };
};
