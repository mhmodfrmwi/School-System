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
import { useTranslation } from 'react-i18next';
const GradeList = () => {
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };
  const { grades = [], loading } = useSelector((state) => state.grades);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);
  
  const translateGradeName = (gradeName) => {
    return t(`grade.gradeNames.${gradeName}`, { defaultValue: gradeName });
  };

  const paginatedGrades = grades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (_id) => {
    const confirmDelete = window.confirm(
      t("grade.form.messages.deleteConfirm"),
    );
    if (confirmDelete) {
      dispatch(removeGrade(_id))
        .unwrap()
        .then(() => toast.success(t("grade.form.messages.successAdd")))
        .catch((err) => console.error(err));
    }
  };

  const handleEditClick = (id) => {
    navigate(`/admin/editGradeform/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="w-[90%] space-y-4">
          {paginatedGrades.length > 0 ? (
            paginatedGrades.map((grade, index) => (
              <div
                key={grade._id}
                className="mb-4 flex max-w-full items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-[#117C90]"
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

                  <div className="flex-co l flex">
                    <p className="m-0 text-lg font-bold text-gray-600 dark:text-white">
                      {/* {grade.gradeName} */}
                      {translateGradeName(grade.gradeName)}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <Link
                    to={`/admin/allgrades/${grade._id}`}
                    className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-[#3C8D99] hover:text-[#2C6E79] dark:text-white`}
                  >
                    <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
                  </Link>
                  <button
                    className={`${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-[#117C90] hover:text-[#0B5964] dark:text-white`}
                    onClick={() => handleEditClick(grade._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </button>
                  <button
                    className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                    onClick={() => handleDelete(grade._id)}
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
              {t("grade.form.messages.noGrades")}
              </p>
              <p className="mb-4 max-w-xl text-center text-gray-500">
              {t("grade.form.messages.noGradesMessage")}
              </p>
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
