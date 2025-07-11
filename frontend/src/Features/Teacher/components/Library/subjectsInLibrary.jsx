import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bag from "../../../../assets/bag.png";
import Loader from "@/ui/Loader";
import { fetchSubjectsInLibrary } from "../TeacherRedux/teacherLibrarySlice";
import { useTranslation } from 'react-i18next';

const SubjectsInLibrary = ({ onSearchChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value);
  };

  const {
    teacherLibrary = [],
    loading,
    message,
  } = useSelector((state) => state.teacherLibrary || {});

  const uniqueSubjects = [
    ...new Map(teacherLibrary.map((item) => [item.id, item])).values(),
  ];

  useEffect(() => {
    dispatch(fetchSubjectsInLibrary());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (message) {
    return <div className="text-gray-600 dark:text-gray-300">{message}</div>;
  }

  return (
    <>
      <div className="mx-auto font-poppins mb-10 w-[90%] px-4 md:px-6 lg:px-0">
        <div className="m-auto mb-6 grid w-[90%] grid-cols-1 gap-2 rounded-3xl bg-gray-100  md:grid-cols-3">
          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#EFEFEF]  py-2 font-medium text-[#117C90] dark:text-DarkManager focus:outline-none"
            onClick={() => navigate("/teacher/teacher-library")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] dark:bg-DarkManager text-white">
              1
            </span>
            {t('libraryt.Library')}
          </button>

          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#117C90] dark:bg-DarkManager py-2 font-medium text-white focus:outline-none"
            onClick={() => navigate("/teacher/all-subjects-library")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90] dark:bg-white  dark:text-DarkManager">
              2
            </span>
            {t('libraryt.TeacherLibrary')}
          </button>
          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#EFEFEF]  py-2 font-medium text-[#117C90] dark:text-DarkManager focus:outline-none"
            onClick={() => navigate("/teacher/items-in-library")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] dark:bg-DarkManager text-white">
              3
            </span>
            {t('libraryt.GeneralLibrary')}
          </button>
        </div>
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
          <div className="flex flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] dark:text-DarkManager sm:text-xl lg:text-2xl">
              {t('coursest.AllCourses')}
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] dark:bg-DarkManager lg:h-[4px] lg:w-[140px]"></div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
            <div className="flex w-full flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="relative flex-grow">
                <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-xs text-gray-500 dark:text-gray-300 sm:text-sm"></i>
                <input
                  type="text"
                  placeholder={t('coursest.Search')}
                  className="w-full rounded-md border-2 border-gray-300 dark:border-gray-600 bg-[#FCFAFA] dark:bg-gray-600 px-3 py-2 pl-10 font-poppins text-xs text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:focus:ring-DarkManager sm:text-sm"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 justify-items-center font-poppins gap-6 p-6 sm:grid-cols-2 xl:grid-cols-3">
        {uniqueSubjects.map((classteacher, index) => (
          <div
            key={classteacher?.id || index}
            className="relative flex w-64 cursor-pointer flex-col items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-slate-100 dark:bg-DarkManager2 p-5 text-center shadow-lg dark:shadow-none transition-colors hover:bg-slate-200 dark:hover:bg-gray-600"
            onClick={() =>
              navigate(`/teacher/all-materials-library/${classteacher?.id}`)
            }
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-500">
              <img src={bag} alt="bag" className="h-7 w-7" />
            </div>
            <p className="font-poppins text-lg font-semibold text-gray-800 dark:text-white">
              {classteacher?.subject || "N/A"}
            </p>
            <div className="flex justify-start gap-4">
              <p className="font-poppins font-semibold text-[#197080] dark:text-white">
                {classteacher?.grade || "N/A"}
              </p>
              <p className="font-poppins font-semibold text-[#197080] dark:text-white">
                {classteacher?.semester || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubjectsInLibrary;