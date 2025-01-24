import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./AcademicYearHeader";
import { useNavigate } from "react-router-dom";
import { fetchAcademicYears, removeAcademicYear } from "../AdminRedux/academicYearSlice";
import Pagination from "../Pagination";
import Loader from "@/ui/Loader";


const AcademicYearList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const academicYears = useSelector((state) => state.academicYears.academicYears); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(academicYears) || academicYears.length === 0) {
    return <div>No academic years available.</div>;
  }

  const totalItems = academicYears.length;
  const paginatedAcademicYears = academicYears.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="overflow-x-hidden">
      {loading && <Loader />}
      <Header />
      <div className="p-5 max-w-full">
        {paginatedAcademicYears.map((year, index) => (
          <div
            key={year._id} 
            className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
          >
            {/* Icon and Info */}
            <div className="flex items-center">
              {/* Circle Icon */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                style={{ backgroundColor: `${getColor(index)}33` }} 
              >
                <FontAwesomeIcon icon={faCalendar} style={{ color: getColor(index) }} />
              </div>

              {/* Year Info */}
              <p className="m-0 text-lg font-bold text-gray-700">{year.startYear} - {year.endYear}</p>
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
        ))}
          <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AcademicYearList;
