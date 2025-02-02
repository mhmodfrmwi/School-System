import React, { useEffect, useState } from "react";
import { fetchGrades, removeGrade } from "../AdminRedux/gradeSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import Header from "./GradeHeader";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GradeList = () => {
  const navigate = useNavigate();
  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };
  const { grades = [] } = useSelector((state) => state.grades);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  const paginatedGrades = grades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this grade?"
    );
    if (confirmDelete) {
      dispatch(removeGrade(_id))
        .unwrap()
        .then(() => toast.success("Grade deleted successfully!"))
        .catch((err) => console.error(err));
    }
  };

  const handleEditClick = (id) => {
    navigate(`/admin/editGradeform/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="space-y-4 w-[90%]">
          {paginatedGrades.length > 0 ? (
            paginatedGrades.map((grade, index) => (
              <div
                key={grade._id}
                className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
              >
                <div className="flex items-center">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                    style={{ backgroundColor: `${getColor(index)}33` }}
                  >
                    <FontAwesomeIcon icon={faCalendar} style={{ color: getColor(index) }} />
                  </div>

                  <div className="flex flex-col">
                    <p className="m-0 text-lg font-bold text-gray-600">
                      {grade.gradeName}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <Link
                    to={`/admin/allgrades/${grade._id}`}
                    className="border-none bg-none text-[#117C90] cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                  </Link>
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
                    <i className="far fa-trash-alt" style={{ fontSize: "18px" }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#FFEBEB] py-20 text-center rounded-lg">
              <p className="text-xl font-semibold text-gray-600">No Grades Found</p>
            </div>
          )}
          
          {paginatedGrades.length > 0 && (
            <Pagination
              totalItems={grades.length}
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

export default GradeList;
