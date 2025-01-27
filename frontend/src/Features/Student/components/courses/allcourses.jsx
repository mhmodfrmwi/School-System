import React, { useState } from "react";
import sub1 from "../../../../assets/sub1.png";
import sub2 from "../../../../assets/sub2.png";
import sub3 from "../../../../assets/sub3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const subjectsData = [
    {
        id: 1,
        name: "Arabic",
        description: "Grammar, Language, Poetry, Story, Syntax.",
        lastUpdate: "19 Oct, 3:00 PM",
        imgSrc: sub1,
    },
    {
        id: 2,
        name: "Science",
        description: "Biology, Chemistry, Physics, Experiments.",
        lastUpdate: "21 Oct, 3:00 PM",
        imgSrc: sub2,
    },
    {
        id: 3,
        name: "Math",
        description: "Algebra, Geometry, Calculus, Numbers.",
        lastUpdate: "5 Nov, 3:00 PM",
        imgSrc: sub1,
    },
    {
        id: 4,
        name: "English",
        description: "Grammar, Literature, Language, Vocabulary.",
        lastUpdate: "10 Dec, 3:00 PM",
        imgSrc: sub2,
    },
];

const AllCouses = () => {
    const [activeButton, setActiveButton] = useState("All Subjects");
    const navigate = useNavigate(); // Initialize the navigate function

    const buttons = [
        { label: "All Subjects", key: "all" },
        { label: "English", key: "english" },
        { label: "Science", key: "science" },
        { label: "Arabic", key: "arabic" },
        { label: "Math", key: "math" },
        { label: "French", key: "french" },
        { label: "Social Studies", key: "social" },
    ];

    return (
        <>
            {/** buttons */}
            <div className="my-10 ms-10 grid w-[70%] grid-cols-2 font-semibold sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7">
                {buttons.map((button) => (
                    <button
                        key={button.key}
                        className={`cursor-pointer font-poppins rounded-3xl py-2 font-medium transition duration-300 ${
                            activeButton === button.label
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
                                : "bg-transparent text-orange-500 hover:bg-gradient-to-r hover:from-[#FD813D] hover:via-[#CF72C0] hover:to-[#BC6FFB] hover:text-white"
                        }`}
                        onClick={() => setActiveButton(button.label)}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            {/** courses */}
            <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
                {subjectsData.map((subject) => (
                    <div
                        key={subject.id}
                        className="rounded-lg shadow-lg bg-white overflow-hidden"
                    >
                        <div
                            className="h-32 bg-cover bg-center flex p-3 text-white text-lg font-semibold"
                            style={{
                                backgroundImage: `url(${subject.imgSrc})`,
                            }}
                        >
                            {subject.name}
                        </div>

                        {/* Body Section */}
                        <div className="p-4 text-gray-700">
                            <p className="mb-4 font-poppins">{subject.description}</p>
                            <p className="ms-1 w-50 rounded-xl mb-4 border-t-2 border-[#868686]"></p>
                            <div className="flex items-center justify-between text-sm">
                                <p className="flex items-center gap-1">
                                    <div className="flex items-center font-poppins bg-blue-300 justify-center w-7 h-7 rounded-full mr-4">
                                        <FontAwesomeIcon
                                            className="text-blue-600"
                                            icon={faCalendar}
                                        />
                                    </div>
                                    <div className="">
                                        <p className="font-poppins">Last Update:</p>
                                        <p className="font-poppins">{subject.lastUpdate}</p>
                                    </div>
                                </p>
                                <button
                                    className="bg-blue-100 font-poppins text-blue-600 py-1 px-3 rounded-md"
                                    onClick={() => navigate("/student/allcourses/videos")} // Use navigate here
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllCouses;