import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTerm, fetchTerms } from "../AdminRedux/termSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faCalendar } from "@fortawesome/free-solid-svg-icons";
import TermHeader from "./termHeader";
import Pagination from "../Pagination";

const TermList = () => {
  const { terms = [], loading } = useSelector((state) => state.terms || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [ setTermData] = useState({
    semester: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  const paginatedTerms = terms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this term?"
    );
    if (confirmDelete) {
      try {
        await dispatch(removeTerm(id));
        alert("The term has been deleted.");
      } catch (error) {
        alert("An error occurred while deleting the term.");
      }
    }
  };

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <div className="mx-auto px-4 lg:px-0">
      <TermHeader />
      <div className="p-5 max-w-full">
        {loading ? (
          <p>Loading terms...</p>
        ) : (
          paginatedTerms.map((term, index) => (
            <div
              key={term._id}
              className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4"
            >
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                  style={{ backgroundColor: `${getColor(index)}33` }}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ color: getColor(index) }}
                  />
                </div>

                <div className="flex flex-col">
                  <p className="m-0 text-sm text-gray-500">
                    {term.academicYear_id.startYear} - {term.academicYear_id.endYear}
                  </p>
                  <h3 className="m-0 text-lg font-bold text-gray-600">
                    {term.semesterName &&
                    typeof term.semesterName === "string" &&
                    term.semesterName.trim() !== ""
                      ? term.semesterName
                      : "No Semester Available"}
                  </h3>
                </div>
              </div>

              <div className="flex">
                <button
                  className="border-none bg-none text-[#117C90] cursor-pointer mr-2"
                  onClick={() => {
                    setTermData({
                      semester: term.semester,
                      startYear: term.academicYear_id.startYear,
                      endYear: term.academicYear_id.endYear,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="text-lg" />
                </button>
                <button
                  className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                  onClick={() => handleDelete(term._id)}
                >
                 <i className="far fa-trash-alt" style={{ fontSize: "16px" }} />
                </button>
              </div>
            </div>
          ))
        )}
        <Pagination
          totalItems={terms.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TermList;
