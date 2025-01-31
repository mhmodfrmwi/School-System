import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssignedGrades, deleteAssignedGrade } from "../AdminRedux/AssignGradeSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Loader from "@/ui/Loader";
import Header from "./GradeHeader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllAssignedGrades = () => {
  const dispatch = useDispatch();
  const { assignedGrades, loading: loadingGrades } = useSelector((state) => state.assignGrade);
  const { loading: loadingGradeData } = useSelector((state) => state.grades);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAssignedGrades());
    dispatch(fetchGrades());
  }, [dispatch]);

  const filteredGrades = assignedGrades.filter(
    (gradeData) => gradeData?.gradeId && gradeData?.gradeId._id === id
  );

  const gradesWithGradeName = filteredGrades.map((gradeData) => {
    return {
      ...gradeData,
      gradeName: gradeData.gradeId ? gradeData.gradeId.gradeName : "Unknown",
      startYear: gradeData.academicYear_id.startYear,
      endYear: gradeData.academicYear_id.endYear,
    };
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
    <div className="lg:px-0">
      <Header />
      <div className="mt-7 overflow-x-auto w-[90%] mx-auto">
        <table className="w-full table-auto border-collapse rounded-lg shadow-md bg-[#FBE9D1] overflow-hidden">
          <thead className="bg-[#117C90] text-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium sm:text-sm md:text-base">Grade</th>
              <th className="px-4 py-2 text-left text-xs font-medium sm:text-sm md:text-base">Academic Year</th>
              <th className="px-4 py-2 text-left text-xs font-medium sm:text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gradesWithGradeName.length > 0 ? (
              gradesWithGradeName.map((gradeData, index) => (
                <tr
                  key={gradeData._id || index}
                  className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 transition duration-300`}
                >
                  <td className="px-4 py-2 text-xs sm:text-sm md:text-base">{gradeData.gradeName}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm md:text-base">{gradeData.startYear} - {gradeData.endYear}</td>
                  <td className="px-4 py-2 flex justify-center gap-4 text-[#117C90]">
                   <Link
                                                to={`/admin/editAssignedGrade/${gradeData._id}`}
                                                className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                              >
                                                <i className="far fa-edit text-lg" />
                                              </Link>

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
                <td colSpan="3" className="py-4 text-center text-xs sm:text-sm md:text-base bg-[#FFEBEB]">
                  No grades found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAssignedGrades;
