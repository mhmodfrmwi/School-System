import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./AcademicYearHeader";
import { useNavigate } from "react-router-dom";
import { fetchAcademicYears, removeAcademicYear } from "../AdminRedux/academicYearSlice";
import Pagination from "../Pagination";

const AcademicYearList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const academicYears = useSelector((state) => state.academicYears.academicYears); 
  const [loading, setLoading] = useState(true);
  const [ setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAcademicYears());
    setLoading(false);
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this academic year?");
    if (confirmDelete) {
      try {
        dispatch(removeAcademicYear(id)); 
      } catch (err) {
        setError(err.message); 
        alert("Error occurred while deleting");
      }
    }
  };

  const handleEditClick = (id) => {
    navigate(`/admin/editacademicyearform/${id}`);
  };

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];

  const getColor = (index) => {
    return colors[index % colors.length]; 
  };

 

  

  const totalItems = academicYears.length;
  const paginatedAcademicYears = academicYears.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) {
    return <div className="w-full h-full"></div>; // Empty div during loading
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="space-y-4 w-[90%]">
          {paginatedAcademicYears.length > 0 ? (
            paginatedAcademicYears.map((year, index) => (
              <div
                key={year._id} 
                className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
              >
                <div className="flex items-center">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                    style={{ backgroundColor: `${getColor(index)}33` }} 
                  >
                    <FontAwesomeIcon icon={faCalendar} style={{ color: getColor(index) }} />
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 text-xl mx-2 h-7 border-l-2 border-gray-600"></span>
                    <p className="m-0 text-xs sm:text-lg font-bold text-gray-700">{year.startYear} - {year.endYear}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex">
                  <button
                    className="border-none bg-none text-[#117C90] cursor-pointer mr-2"
                    onClick={() => handleEditClick(year._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </button>
                  <button
                    className="border-none bg-none text-[#E74833] cursor-pointer"
                    onClick={() => handleDeleteClick(year._id)}
                  >
                    <i className="far fa-trash-alt" style={{ fontSize: "16px" }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg mt-10">
                         <FontAwesomeIcon
                           icon={faCalendar}
                           className="text-6xl text-gray-400 mb-4"
                         />
                         <p className="text-xl font-semibold text-gray-600 mb-2">No Acadmic Years Found</p>
                         <p className="text-gray-500 mb-4 text-center max-w-xl">
                           It seems like there are no academic years available at the moment. Please check back later or add new academic years.
                         </p>
                       </div>
          )}
          
          {/* Pagination */}
          {totalItems > 0 && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicYearList;
