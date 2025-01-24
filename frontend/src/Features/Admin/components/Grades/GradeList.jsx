import React, { useEffect, useState } from "react";
import { fetchGrades, removeGrade, } from "../AdminRedux/gradeSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./GradeHeader";
import Loader from "@/ui/Loader";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";


const GradeList = () => {
  const navigate = useNavigate();
  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => {
    return colors[index % colors.length]; 
  };
  const {
    grade = [], 
    message,
    loading,
  } = useSelector((state) => state.grades || {}); 


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGrades()); 
  }, [dispatch]);

  const paginatedGrades = grade.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this grade?"
    );
    if (confirmDelete) {
      try {
        await dispatch(removeGrade(id));
       
      } catch (error) {
        console.error("Failed to delete grade:", error);
        alert("Error occurred while deleting");
      }
    }
  };
  const handleEditClick = (id) => {
    navigate(`/admin/editGradeform/${id}`);
  };

  return (
    <div className="overflow-x-hidden">
      {loading && <Loader />}
      <Header />
      {message && (
        <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
          {message}
        </div>
      )}
      <div className="p-5 max-w-full">
        {paginatedGrades.map((grade,index) => (
          <div
            key={grade._id}
            className= "flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
          >
            <div className="flex items-center">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                style={{ backgroundColor: `${getColor(index)}33` }} // Light background
              >
                <FontAwesomeIcon icon={faCalendar} style={{ color: getColor(index) }} />
              </div>

              <div className="flex flex-col">
                <p className="m-0 text-sm text-gray-500">2022-2023</p>
                <p className="m-0 text-lg font-bold text-gray-600">
                  {grade.gradeName}
                </p>
              </div>
            </div>

            <div className="flex">
              <button
                className="border-none bg-none text-[#117C90] cursor-pointer mr-2"
                onClick={() => handleEditClick(grade._id)}
              >
                <FontAwesomeIcon icon={faEdit} className="text-lg" />
              </button>
              <button
                className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                onClick={() => handleDelete(grade._id)}
              >
              <i className="far fa-trash-alt" style={{ fontSize: "16px" }} />
              </button>
            </div>
          </div>
        ))}

        <Pagination
          totalItems={grade.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

    </div>
  );
};

export default GradeList;
