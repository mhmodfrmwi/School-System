import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamsForTeacher } from "../../TeacherRedux/ExamSlice"; 


const ExamDetails = () => {
    const { examId } = useParams(); 
    const dispatch = useDispatch();

 
    const { exams } = useSelector((state) => state.exam);

  
    const exam = exams.find((exam) => exam._id === examId);

    useEffect(() => {
        if (!exams.length) {
            dispatch(fetchExamsForTeacher()); 
        }
    }, [dispatch, exams]);

    if (!exam) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col p-4">
            <div className="flex-1">
                <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                    <div className="flex flex-col p-0">
                        <div className="flex-1">
                            <div className="mx-auto w-full p-0">
                                <div className="flex ml-2 flex-col">
                                    <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                                     {exam.title}
                                    </h1>
                                    <div className="mt-1 h-[3px] w-[160px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
                                </div>

                                <div className="mt-7 p-4 bg-[#F5FAFF] rounded-lg shadow-md">
                                    <h2 className="text-xl font-poppins font-semibold text-[#244856] mb-4">
                                        General Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Description:</strong> {exam.description}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Type:</strong> {exam.type}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Start Time:</strong>{" "}
                                                {new Date(exam.start_time).toLocaleString()}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>End Time:</strong>{" "}
                                                {new Date(exam.end_time).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Duration:</strong> {exam.duration} minutes
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Total Marks:</strong> {exam.total_marks}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Subject:</strong> {exam.subject_id.subjectName}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Grade:</strong> {exam.grade_id.gradeName}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 p-4 bg-[#F5FAFF] rounded-lg shadow-md">
                                    <h2 className="text-xl font-poppins font-semibold text-[#244856] mb-4">
                                        Exam Questions
                                    </h2>
                                    {exam.exam_questions.map((question, index) => (
                                        <div key={question._id} className="mb-6">
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Question {index + 1}:</strong> {question.question_text}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Type:</strong> {question.question_type}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Options:</strong>
                                            </p>
                                            <ul className="list-disc list-inside">
                                                {question.options.map((option, i) => (
                                                    <li key={i} className="text-sm font-poppins text-[#244856]">
                                                        {option}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Correct Answer:</strong> {question.correct_answer}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>Marks:</strong> {question.marks}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamDetails;