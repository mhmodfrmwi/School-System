import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import { useNavigate } from "react-router-dom";
import bag from "../../../../assets/bag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import CourseToggle from "./SelectCoursePageForAttendance";
import Loader from "@/ui/Loader";

const CurrentCourse = ({ onSearchChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value);
  };

  const {
    classTeachers = [],
    message,
    loading,
  } = useSelector((state) => state.classTeachers || {});

  console.log(classTeachers);

  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  if (loading) {
    return <div>{<Loader />} </div>;
  }
  if (message) {
    return <div>{message}</div>;
  }
  if (classTeachers.length === 0) {
    return (
      <>
        <CourseToggle />
        <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
          <FontAwesomeIcon
            icon={faCalendar}
            className="mb-4 text-6xl text-gray-400"
          />
          <p className="mb-2 font-poppins text-xl font-semibold text-gray-600">
            No Teacher Classes Found
          </p>
          <p className="mb-4 max-w-xl text-center font-poppins text-gray-500">
            It seems like there are no teacher classes available at the moment.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mx-auto w-[90%] px-4 md:px-6 lg:px-0">
        <CourseToggle />
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
          <div className="flex flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              Current Courses
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[140px]"></div>
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
        {classTeachers.map((classteacher, index) => (
          <div
            key={classteacher?.id || index}
            onClick={() =>
              navigate(`/teacher/takeattendance/${classteacher.id}`, {
                state: { classId: classteacher.classId._id },
              })
            }
            className="relative flex w-64 cursor-pointer flex-col items-center rounded-xl border border-gray-300 bg-slate-100 p-5 text-center shadow-lg transition-colors hover:bg-slate-200"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <img src={bag} alt="bag" className="h-7 w-7" />
            </div>
            <p className="font-poppins text-lg font-semibold">
              {classteacher?.subjectName || "N/A"}
            </p>
            <div className="flex justify-start gap-4">
              <p className="font-poppins font-semibold text-[#197080]">
                {classteacher.gradeName || "N/A"}
              </p>
              <p className="font-poppins font-semibold text-[#197080]">
                Class: {classteacher.className || "N/A"}
              </p>
            </div>
            <p className="font-poppins text-[#197080]">
              {classteacher.semesterName || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CurrentCourse;
