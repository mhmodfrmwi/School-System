import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, removeSubject } from "../AdminRedux/subjectSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import SubjectsHeader from "./SubjectsHeader";
import Pagination from "../Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const { subjects = [], loading } = useSelector((state) => state.subject);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const paginatedSubjects = subjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (confirmDelete) {
      dispatch(removeSubject(_id))
        .unwrap()
        .then(() => toast.success("Subject deleted successfully!"))
        .catch((err) => console.error(err));
    }
  };

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => colors[index % colors.length];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SubjectsHeader />
      <div className="flex justify-center">
        <div className="space-y-4 w-3/5">
          {loading ? (
            <p>Loading subjects...</p>
          ) : (
            paginatedSubjects.map((subject, index) => (
              <div
                key={subject._id}
                className="flex items-center font-poppins justify-between bg-white rounded-lg shadow-md mb-4 p-4"
              >
                <div className="flex items-center">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                    style={{ backgroundColor: `${getColor(index)}33` }}
                  >
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ color: getColor(index) }}
                    />
                  </div>
                  <div className="flex items-center">
                  <span className="text-gray-600 text-xl mx-2 h-7 border-l-2 border-gray-600"></span>
                    <h3 className="m-0 font-poppins text-sm sm:text-lg  font-semibold text-gray-600">
                      {subject.subjectName}
                    </h3>
                  </div>
                </div>
                <div className="flex">
                  <Link
                    to={`/admin/allsubjects/${subject._id}`}
                    className="text-[#3C8D99] hover:text-[#2C6E79] mr-2"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-sm sm:text-lg " />
                  </Link>
                  <Link
                    to={`/admin/edit-subject/${subject._id}`}
                    className="text-[#117C90] hover:text-[#0B5964] mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-sm sm:text-lg " />
                  </Link>
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                  >
                    <i className="far fa-trash-alt" style={{ fontSize: "text-sm sm:text-lg " }} />
                  </button>
                </div>
              </div>
            ))
          )}
          <Pagination
            totalItems={subjects.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
