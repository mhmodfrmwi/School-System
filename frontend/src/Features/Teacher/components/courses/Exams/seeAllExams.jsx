import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamsForTeacher, deleteExam } from "../../TeacherRedux/ExamSlice"; // Import the appropriate slice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SeeMyExams = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { exams } = useSelector((state) => state.exam);

    useEffect(() => {
        dispatch(fetchExamsForTeacher());
    }, [dispatch]);

    const handleDeleteExam = async (examId) => {
        if (window.confirm("Are you sure you want to delete this exam?")) {
            try {
                await dispatch(deleteExam(examId)).unwrap();
                toast.success("Exam deleted successfully!");
                dispatch(fetchExamsForTeacher());
            } catch (error) {
                toast.error(error.message || "Failed to delete exam");
            }
        }
    };

    const handleEditExam = (examId) => {
        navigate(`/teacher/edit-exam/${examId}`);
    };

    const handleViewExam = (examId) => {
        navigate(`/teacher/exam-details/${examId}`);
    };

    
    return (
        <div className="flex flex-col p-4">
            <div className="flex-1">
                <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                    <div className="flex flex-col p-0">
                        <div className="flex-1">
                            <div className="mx-auto w-full p-0">
                                <div className="flex ml-8 flex-col">
                                    <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                                        My Exams
                                    </h1>
                                    <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[160px]"></div>
                                </div>

                                <div className="relative w-full px-4 sm:px-6 lg:px-8 font-poppins">
                                    <div className="mt-7">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full table-auto border-collapse border-2 border-[#117C90] border-re rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
                                                <thead className="bg-[#117C90] text-white">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">#</th>
                                                        <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Title</th>
                                                        <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Description</th>
                                                        <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Duration</th>
                                                        <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Total Marks</th>
                                                        <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {exams && exams.length > 0 ? (
                                                        exams.map((exam, index) => (
                                                            <tr
                                                                key={exam._id}
                                                                className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                                                            >
                                                                <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                                                                <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{exam.title}</td>
                                                                <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{exam.description}</td>
                                                                <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{exam.duration}</td>
                                                                <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{exam.total_marks}</td>
                                                                <td className="flex space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                                                                    <button
                                                                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                                        onClick={() => handleViewExam(exam._id)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faEye} className="text-md" />
                                                                    </button>
                                                                    <button
                                                                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                                        onClick={() => handleEditExam(exam._id)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faEdit} className="text-md" />
                                                                    </button>
                                                                    <button
                                                                        className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                                                        onClick={() => handleDeleteExam(exam._id)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrashAlt} className="text-md" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center font-poppins py-9">
                                                                No Exams Found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeeMyExams;