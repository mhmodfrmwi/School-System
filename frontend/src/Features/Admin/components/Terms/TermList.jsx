import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTerm, fetchTerms } from "../AdminRedux/termSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCalendar } from "@fortawesome/free-solid-svg-icons";
import TermHeader from "./termHeader";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const TermList = () => {
  const { t,i18n } = useTranslation();
  const { terms = [] } = useSelector((state) => state.terms || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTerms());
      setLoading(false); // Set loading to false after terms are fetched
    };
    fetchData();
  }, [dispatch]);

  const paginatedTerms = terms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('termList.deleteConfirmation'))) {
      await dispatch(removeTerm(id));
    }
  };

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  const handleEdit = (term) => {
    navigate(`/admin/edit-term/${term._id}`, { state: { term } });
  };
  const translateSemesterName = (name) => {
    const translations = {
      "Semester 1": t('termList.semesterNames.Semester 1'),
      "Semester 2": t('termList.semesterNames.Semester 2')

    };
    return translations[name] || name;
  };

  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }

  return (
    <div>
      <TermHeader />
      <div className="flex justify-center">
        <div className="w-[90%] space-y-4">
          {paginatedTerms.length > 0 ? (
            paginatedTerms.map((term, index) => (
              <div
                key={term._id}
                className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 font-poppins shadow-md dark:bg-[#117C90]"
              >
                <div className="flex items-center">
                  <div
                    className="mr-4 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${getColor(index)}33` }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ color: getColor(index) }}
                    />
                  </div>
                  <span className="mx-2 h-8 border-l-2 border-gray-600 text-xl text-gray-600 dark:border-white dark:text-white"></span>

                  <div className="ml-3 flex flex-col">
                    <p className="m-0 font-poppins text-sm text-gray-500 dark:text-white">
                      {term.academicYear_id
                        ? `${term.academicYear_id.startYear} - ${term.academicYear_id.endYear}`
                        : t('termList.noAcademicYear')}
                    </p>

                    {/* <h3 className="m-0 font-poppins text-lg font-semibold text-gray-600 dark:text-white">
                      {term.semesterName &&
                      typeof term.semesterName === "string" &&
                      term.semesterName.trim() !== ""
                        ? term.semesterName
                        :  t('termList.noSemester')}
                    </h3> */}
                    <h3 className="m-0 font-poppins text-lg font-semibold text-gray-600 dark:text-white">
                      {term.semesterName ?
                        translateSemesterName(term.semesterName) :
                        t('termList.noSemester')}
                    </h3>

                  </div>
                </div>

                <div className="flex">
                  <button
                    className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} cursor-pointer border-none bg-none text-[#117C90] dark:text-white`}
                    onClick={() => handleEdit(term)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </button>
                  <button
                    className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                    onClick={() => handleDelete(term._id)}
                  >
                    <i
                      className="far fa-trash-alt"
                      style={{ fontSize: "18px" }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
              <FontAwesomeIcon
                icon={faCalendar}
                className="mb-4 text-6xl text-gray-400"
              />
              <p className="mb-2 text-xl font-semibold text-gray-600">
                {t('termList.emptyState.title')}
              </p>
              <p className="mb-4 max-w-xl text-center text-gray-500">
                {t('termList.emptyState.description')}
              </p>
            </div>
          )}
          {paginatedTerms.length > 0 ? (
            <Pagination
              totalItems={terms.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TermList;
