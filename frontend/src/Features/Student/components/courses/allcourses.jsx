import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, fetchMaterials } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { useNavigate } from "react-router-dom";
import sub1 from "../../../../assets/sub1.png";
import sub2 from "../../../../assets/sub2.png";
import subject from "../../../../assets/subject.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../ui/Loader";
import ErrorComponent from "@/ui/ErrorComponent";

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
                <Loader/>
            );
        }
        return null;
    };

    const renderNoSubjects = () => {
        if ((!subjects || subjects.length === 0) && !loading && !error) {
            return (
                <div className="flex flex-row items-center justify-center text-center mt-16">
                    {/* Image */}
                    <img
                        src={subject}
                        alt="No Subjects"
                        className="w-1/3 mb-6"
                    />
    <div className="flex flex-col items-center text-center justify-center shadow-lg mt-20 mb-20 pt-10 bg-gray-100 rounded-xl">
                    {/* Message */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        No Subjects Available
                    </h2>
                    <p className="text-gray-600 mb-6 w-1/2">
                        It looks like there are no subjects assigned to you at the moment.
                    </p>
                </div>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className="mt-16 mb-20 min-h-[75vh] w-[95%] mx-auto">
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