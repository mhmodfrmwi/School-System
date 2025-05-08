// src/hooks/useAttendance.js

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchStudentAttendance } from "../services/apiAttendance";

export const useChildAttendance = (studentId) => {
  const {
    data: attendanceData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["childAttendance", studentId],
    queryFn: () => fetchStudentAttendance(studentId),
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });
  console.log(attendanceData);
  return { attendanceData, isLoading, error };
};
