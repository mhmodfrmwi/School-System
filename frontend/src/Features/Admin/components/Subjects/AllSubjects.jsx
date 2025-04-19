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
import { useTranslation } from 'react-i18next';

const SubjectsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { subjects = [] } = useSelector((state) => state.subject);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = React.useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSubjects());
      setLoading(false); // Set loading to false after subjects are fetched
    };
    fetchData();
  }, [dispatch]);

  const paginatedSubjects = subjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (_id) => {
    const confirmDelete = window.confirm(
      t('subjectsList.deleteConfirmation'),
    );
    if (confirmDelete) {
      dispatch(removeSubject(_id))
        .unwrap()
        .then(() => toast.success(t('subjectsList.deleteSuccess')))
        .catch((err) => console.error(err));
    }
  };

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => colors[index % colors.length];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }

  return (
    <div>
      <SubjectsHeader />
      <div className="flex justify-center">
        <div className="w-[90%] space-y-4">
          {paginatedSubjects.length > 0 ? (
            paginatedSubjects.map((subject, index) => (
              <div
                key={subject._id}
                className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 font-poppins shadow-md dark:bg-[#117C90]"
              >
                <div className="flex items-center">
                  <div
                    className="mr-4 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${getColor(index)}33` }}
                  >
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ color: getColor(index) }}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="mx-2 h-7 border-l-2 border-gray-600 text-xl text-gray-600 dark:border-white dark:text-white"></span>
                    {/* <h3 className="m-0 font-poppins text-lg font-semibold text-gray-600 dark:text-white">
                      {subject.subjectName}
                    </h3> */}
                    <h3 className="m-0 font-poppins text-lg font-semibold text-gray-600 dark:text-white">
                      {t(`subjectsList.subjectNames.${subject.subjectName}`, subject.subjectName)}
                    </h3>
                  </div>
                </div>
                <div className="flex">
                  <Link
                    to={`/admin/allsubjects/${subject._id}`}
                    className="mr-2 text-[#3C8D99] hover:text-[#2C6E79] dark:text-white"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-lg" />
                  </Link>
                  <Link
                    to={`/admin/edit-subject/${subject._id}`}
                    className="mr-2 text-[#117C90] hover:text-[#0B5964] dark:text-white"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </Link>
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                  >
                    <i
                      className="far fa-trash-alt"
                      style={{ fontSize: "text-lg " }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
              <FontAwesomeIcon
                icon={faBook}
                className="mb-4 text-6xl text-gray-400"
              />
              <p className="mb-2 text-xl font-semibold text-gray-600">
                {t('subjectsList.emptyState.title')}
              </p>
              <p className="mb-4 max-w-xl text-center text-gray-500">
                {t('subjectsList.emptyState.description')}
              </p>
            </div>
          )}

          {paginatedSubjects.length > 0 && (
            <Pagination
              totalItems={subjects.length}
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

export default SubjectsList;
