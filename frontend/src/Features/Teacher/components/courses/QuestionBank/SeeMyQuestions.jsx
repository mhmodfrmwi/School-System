import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyQuestions } from "../../TeacherRedux/QuestionBankSlice"; // استدعاء الـ slice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QuestionsToggle from "./SelectQuestions";

const SeeMyQuestion = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gradeSubjectSemesterId } = useParams();
  
if (!gradeSubjectSemesterId) {
  console.error("Error: grade_subject_semester_id is undefined or null!");
}

const myQuestions = useSelector((state) => {
    console.log("Redux Full State:", state); // Debug the full state
    return state.questionbank.questionbank; // Access the nested questions array
  });
      console.log("Redux myQuestions:", myQuestions);
      
    useEffect(() => {
        if (gradeSubjectSemesterId) {
            dispatch(fetchMyQuestions(gradeSubjectSemesterId));
        }
    }, [dispatch, gradeSubjectSemesterId]);
    
    console.log("Redux State (myQuestions):", myQuestions);
    


    return (
        <div className="flex flex-col p-4">
            <div className="flex-1">
                <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
                    <div className="flex ml-8 flex-col">
                    <QuestionsToggle/>
                        <h1 className="text-lg  font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                            My questions
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
                                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Question</th>
                                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Type</th>
                                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Answer</th>
                                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Actions</th>
                                </tr>
                            </thead>
                            
                                    <tbody>
                                        {myQuestions && myQuestions.length > 0 ? (
                                            myQuestions.map((question, index) => (
                                                <tr
                                                    key={question._id}
                                                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                                                >
                                                    {/* رقم السؤال */}
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{index + 1}</td>

                                                    {/* نص السؤال */}
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{question.questionText}</td>

                                                    {/* نوع السؤال */}
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{question.questionType}</td>

                                                    {/* الإجابة */}
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{question.answer}</td>

                                                    {/* زر التعديل والحذف */}
                                                    <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                                                        <button
                                                            className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                        </button>

                                                        <button
                                                            className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center font-poppins py-9">
                                                    No Questions Found
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
    );
};

export default SeeMyQuestion;
