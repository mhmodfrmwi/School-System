import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchAllTermsGrades, fetchStudentGrades } from "../services/apiGrades";
//fetch grades for term
export const useStudentGradesForSemester = (studentId) => {
  const {
    data: studentGradesForSemester,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["childgradesforsemester", studentId],
    queryFn: () => fetchStudentGrades(studentId),
    enabled: !!studentId,
    onError: (err) => {
      toast.error(err.message || "Failed to load student grades");
    },
  });

  return {
    isLoading,
    studentGradesForSemester,
    error,
  };
};
//fetch grades for all terms
export const useAllTermsGrades = (studentId) => {
  const {
    data: allTermsGrades,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["childgradesforAllsemester", studentId],
    queryFn: () => fetchAllTermsGrades(studentId),
    enabled: !!studentId,
    onError: (err) => {
      toast.error(err.message || "Failed to load all terms grades");
    },
  });

  return {
    isLoading,
    allTermsGrades,
    error,
  };
};
