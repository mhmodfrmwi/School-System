import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, fetchMaterials } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { useNavigate } from "react-router-dom";
import sub1 from "../../../../assets/sub1.png";
import sub2 from "../../../../assets/sub2.png";
import subject from "../../../../assets/child.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../ui/Loader";
import ErrorComponent from "@/ui/ErrorComponent";
import { motion } from "framer-motion";
const images = [sub1, sub2];

const AllCourses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjects, loading, error } = useSelector((state) => state.allSubjectsStudent);
    const [activeButton, setActiveButton] = useState("All Subjects");
    useEffect(() => {
        dispatch(fetchSubjects());
    }, [dispatch]);

    const buttons = [
        { label: "All Subjects", key: "all" },
        ...subjects.map((subject) => ({
            label: subject.subjectName,
            key: subject.subjectName.toLowerCase(),
        })),
    ];

    const filteredSubjects = activeButton === "All Subjects"
        ? subjects
        : subjects.filter(subject => subject.subjectName === activeButton);

    const handleStartClick = (subjectId) => {
        dispatch(fetchMaterials(subjectId));
        navigate(`/student/allcourses/videos/${subjectId}`);
    };



    const renderLoading = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                <Loader />
                </div>
            );
        }
        return null;
    };

    const renderNoSubjects = () => {
        if ((!subjects || subjects.length === 0) && !loading && !error) {
            return (
                <div className="flex flex-col lg:flex-row items-center justify-center text-center mt-16 min-h-[60vh] w-[95%] mx-auto font-poppins gap-8">
                    {/* Illustration with Animation */}
                    <motion.img
                        src={subject}
                        alt="No Subjects"
                        className="w-full lg:w-1/2 mb-8 rounded-3xl h-[50vh] lg:h-[75vh] object-cover shadow-lg"
                        initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly off-screen)
                        animate={{ opacity: 1, x: 0 }} // Animate to visible and centered
                        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
                    />
                    {/* Message with Animation */}
                    <motion.div
                        className="flex flex-col items-center text-center justify-center p-8 bg-white rounded-xl shadow-lg w-3/4 lg:w-1/2 lg:ml-12  border border-[#FD813D]"
                        initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
                        animate={{ opacity: 1, y: 0 }} // Animate to visible and centered
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} // Smooth transition with delay
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            No Subjects Available
                        </h2>
                        <p className="text-gray-600 mb-6 w-3/4 text-lg">
                            It looks like there are no subjects assigned to you at the moment. Please check back later.
                        </p>
                        {/* Decorative Elements with Animation */}
                        <motion.div
                            className="flex space-x-4 mt-4"
                            initial={{ opacity: 0 }} // Initial state (hidden)
                            animate={{ opacity: 1 }} // Animate to visible
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} // Smooth transition with delay
                        >
                            <div className="w-4 h-4 bg-[#FD813D] rounded-full"></div>
                            <div className="w-4 h-4 bg-[#CF72C0] rounded-full"></div>
                            <div className="w-4 h-4 bg-[#BC6FFB] rounded-full"></div>
                        </motion.div>
                    </motion.div>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className=" mt-16 mb-20 min-h-[68vh] w-[95%] mx-auto">
            {error && (
                  <ErrorComponent
                      error={error}
                      onRetry={() => dispatch(fetchSubjects())}
                  />
              )}

                {/** Buttons */}
                {!loading && !error && !renderNoSubjects() && (
                    <div className="my-10 ms-10 grid w-[70%] grid-cols-2 font-semibold sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-4">
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
                )}

                {/** No Subjects */}
                {renderNoSubjects()}

                {/** Loading */}
                {renderLoading()}

                {/** Courses */}
                <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
                    {!loading && !error && filteredSubjects.map((subject, index) => (
                        <div key={subject.id} className="rounded-lg shadow-lg bg-white overflow-hidden">
                            <div
                                className="h-32 bg-cover bg-center flex p-3 text-white text-lg font-semibold"
                                style={{
                                    backgroundImage: `url(${images[index % images.length]})`,
                                }}
                            >
                                {subject.subjectName}
                            </div>

                            <div className="p-4 text-gray-700">
                                <div className="mb-4 font-poppins">
                                    {subject.gradeName}, {subject.academicYear}, {subject.semesterName}
                                </div>
                                <div className="ms-1 w-50 rounded-xl mb-4 border-t-2 border-[#868686]"></div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center font-poppins bg-blue-300 justify-center w-7 h-7 rounded-full mr-4">
                                            <FontAwesomeIcon className="text-blue-600" icon={faCalendar} />
                                        </div>
                                        <div className="">
                                            <span className="font-poppins">Last Update:</span>
                                            <span className="font-poppins">{new Date(subject.updatedAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-blue-100 font-poppins text-blue-600 py-1 px-3 rounded-md"
                                        onClick={() => handleStartClick(subject.id)}
                                    >
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllCourses;