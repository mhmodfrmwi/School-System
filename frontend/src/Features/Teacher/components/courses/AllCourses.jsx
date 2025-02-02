import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bag from "../../../../assets/bag.png";
import CourseToggle from "./SelectCoursePage";

const submissions = [
    { id: 1, grade: "Grade 1", year: "2023-2024" },
    { id: 2, grade: "Grade 2", year: "2024-2025" },
    { id: 3, grade: "Grade 3", year: "2025-2026" },
    { id: 4, grade: "Grade 4", year: "2026-2027" }
];

const AllCourses = ({ onSearchChange, grade, year }) => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearchChange(e.target.value);
    };

    const handleSectionClick = (id) => {
        // Navigate to the desired route
        navigate("/teacher/addmaterial");
    };

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

            {/* Grid of Courses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-6">
                {submissions.map(({ id, grade, year }) => (
                    <div
                        key={id}
                        onClick={() => handleSectionClick(id)} // Add onClick handler
                        className="relative bg-slate-100 rounded-xl shadow-lg p-5 w-64 text-center border border-gray-300 flex flex-col items-center cursor-pointer hover:bg-slate-200 transition-colors"
                    >
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                            <img
                                src={bag}
                                alt="bag"
                                className="h-7 w-7"
                            />
                        </div>
                        <h3 className="text-lg font-poppins font-semibold">English Language</h3>
                        <p className="text-gray-700 font-poppins">{grade}</p>
                        <p className="text-[#197080] font-poppins">{year}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllCourses;