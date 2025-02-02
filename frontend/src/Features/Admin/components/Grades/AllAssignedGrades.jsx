import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssignedGrades, deleteAssignedGrade } from "../AdminRedux/AssignGradeSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Header from "./GradeHeader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const AllAssignedGrades = () => {
  const dispatch = useDispatch();
  const { assignedGrades, loading } = useSelector((state) => state.assignGrade);
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      const confirmDelete = window.confirm("Are you sure you want to delete this grade?");
      if (confirmDelete) {
        dispatch(deleteAssignedGrade(_id));
      }
    } else {
      toast.error("Invalid grade ID. Cannot delete grade.");
    }
  };
  

  const paginatedGrades = gradesWithGradeName.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  if (loading) {
    return <div className="w-full h-full"></div>; // Empty div during loading
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
            {paginatedGrades.length > 0 ? (
              paginatedGrades.map((gradeData, index) => (
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
              <td colSpan="3" className="rounded-lg bg-[#F7FAFC] py-28 text-center shadow-md border-2 border-[#E3E8F1]">
                <p className="text-lg font-semibold text-gray-600">No Grades Found</p>
                <p className="text-sm text-gray-500 mt-2">It seems like there are no grades in the database at the moment.</p>
                
              </td>
            </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        {filteredGrades.length > 0 && (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredGrades.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAssignedGrades;
