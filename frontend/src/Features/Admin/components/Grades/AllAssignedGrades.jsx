import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssignedGrades, deleteAssignedGrade } from "../AdminRedux/AssignGradeSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Loader from "@/ui/Loader";
import Header from "./GradeHeader";
import { toast } from "react-toastify";

const AllAssignedGrades = () => {
  const dispatch = useDispatch();
  const { assignedGrades, loading: loadingGrades } = useSelector(
    (state) => state.assignGrade
  );
  const { grade, loading: loadingGradeData } = useSelector(
    (state) => state.grades
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAssignedGrades());
    dispatch(fetchGrades());
  }, [dispatch]);

  const filteredGrades = assignedGrades.filter(
    (gradeData) => gradeData.gradeId === id
  );

  const gradesWithGradeName = filteredGrades.map((gradeData) => {
    const gradeName =
      grade.find((g) => g._id === gradeData.grade)?.gradeName || "Unknown";
    return { ...gradeData, gradeName };
  });

  const handleDeleteGrade = (_id) => {
    if (_id) {
      dispatch(deleteAssignedGrade(_id));
    } else {
      toast.error("Invalid grade ID. Cannot delete grade.");
    }
  };

  if (loadingGrades || loadingGradeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0">
      <Header />
      <div className="mt-7">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
          <thead className="bg-[#117C90] text-white">
            <tr>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Grade</th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Academic Year</th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gradesWithGradeName.length > 0 ? (
              gradesWithGradeName.map((gradeData, index) => (
                <tr
                  key={gradeData._id || index}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">{gradeData.gradeName}</td>
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">{gradeData.startYear} - {gradeData.endYear}</td>
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button className="transition duration-300 hover:text-white">
                      <i className="fa fa-pencil-alt"></i>
                    </button>
                    <button
                      className="transition duration-300 hover:text-white"
                      onClick={() => handleDeleteGrade(gradeData._id)} 
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 border-b text-center">
                  No grades found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default AllAssignedGrades;
