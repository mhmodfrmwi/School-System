import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import { useNavigate } from "react-router-dom";
import bag from "../../../../assets/bag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import CourseToggle from "./SelectCoursePage";

const CurrentCourse = ({ onSearchChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearchChange(e.target.value);
    };

    const { classTeachers = [], message, loading } = useSelector((state) => state.classTeachers || {});
    const filteredTeachers = classTeachers.filter((classteacher) =>
        classteacher.subjectName.toLowerCase().includes(searchText.toLowerCase()) ||
        classteacher.gradeName.toLowerCase().includes(searchText.toLowerCase()) ||
        classteacher.className.toLowerCase().includes(searchText.toLowerCase()) ||
        classteacher.semesterName.toLowerCase().includes(searchText.toLowerCase())
    );
    

    useEffect(() => {
        dispatch(fetchClassTeacher());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (message) {
        return <div>{message}</div>;
    }
    if (classTeachers.length === 0) {
        return (
            <>
                <CourseToggle />
                <div className="flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg mt-10">
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-6xl text-gray-400 mb-4"
                    />
                    <p className="text-xl font-semibold font-poppins text-gray-600 mb-2">
                        No Teacher Classes Found
                    </p>
                    <p className="text-gray-500 mb-4 font-poppins text-center max-w-xl">
                        It seems like there are no teacher classes available at the moment.
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mx-auto px-4 w-[90%] md:px-6 lg:px-0">
                <CourseToggle />
                <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                            All Courses
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
                                    className="w-full rounded-md bg-[#FCFAFA] px-3 py-2 pl-10 font-poppins border-2 border-gray-300 text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#117C90] sm:text-sm"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-6">
                {filteredTeachers.map((classteacher, index) => (
                    <div
                        key={classteacher?.id || index}
                        onClick={() => {
                            const classId = classteacher.classId._id;
                            const gradeSubjectSemesterId = classteacher.id;
                            navigate(`/teacher/addmaterial/${classId}/${gradeSubjectSemesterId}`);
                        }}

                        className="relative bg-slate-100 rounded-xl shadow-lg p-5 w-64 text-center border border-gray-300 flex flex-col items-center cursor-pointer hover:bg-slate-200 transition-colors"
                    >
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                            <img src={bag} alt="bag" className="h-7 w-7" />
                        </div>
                        <p className="text-lg font-poppins font-semibold">
                            {classteacher?.subjectName || "N/A"}
                        </p>
                        <div className="flex justify-start gap-4">
                            <p className="text-[#197080] font-poppins font-semibold">
                                {classteacher.gradeName || "N/A"}
                            </p>
                            <p className="text-[#197080] font-poppins font-semibold">
                                Class: {classteacher?.className || "N/A"}
                            </p>
                        </div>
                        <p className="text-[#197080] font-poppins">
                            {classteacher.semesterName || "N/A"}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CurrentCourse;