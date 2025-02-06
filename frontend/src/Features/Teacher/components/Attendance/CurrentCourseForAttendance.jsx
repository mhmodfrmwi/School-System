import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bag from "../../../../assets/bag.png";
import CourseToggle from "./SelectCoursePageForAttendance";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects } from "@/Features/Admin/components/AdminRedux/subjectSlice";

const submissions = [
  { id: 1, grade: "Grade 1" },
  { id: 2, grade: "Grade 2" },
  { id: 3, grade: "Grade 3" },
  { id: 4, grade: "Grade 4" },
];

const CurrentCourseForAttendance = ({ onSearchChange, grade }) => {
  const [searchText, setSearchText] = useState("");
  const { subjects } = useSelector((state) => state.subject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(subjects);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleSectionClick = (id) => {
    navigate("/teacher/takeattendance");
  };

  return (
    <>
      <div className="mx-auto w-[90%] px-4 md:px-6 lg:px-0">
        <CourseToggle />
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
          <div className="flex flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              Current Courses
            </h1>
            <div className="mt-1 h-[3px] w-[150px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
            <div className="flex w-full flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="relative flex-grow">
                <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-xs text-gray-500 sm:text-sm"></i>
                <input
                  type="text"
                  placeholder="Search ..."
                  className="w-full rounded-md border-2 border-gray-300 bg-[#FCFAFA] px-3 py-2 pl-10 font-poppins text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#117C90] sm:text-sm"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {submissions.map(({ id, grade }) => (
          <div
            key={id}
            onClick={() => handleSectionClick(id)}
            className="relative flex w-64 cursor-pointer flex-col items-center rounded-xl border border-gray-300 bg-slate-100 p-5 text-center shadow-lg transition-colors hover:bg-slate-200"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <img src={bag} alt="bag" className="h-7 w-7" />
            </div>
            <h3 className="font-poppins text-lg font-semibold">
              English Language
            </h3>
            <p className="font-poppins text-gray-700">{grade}</p>
            <p className="font-poppins text-[#197080]">2023-2024</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CurrentCourseForAttendance;
