import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyQuestions } from "../../../TeacherRedux/QuestionBankSlice"; 
import { useParams } from "react-router-dom";
import AllQuestionsToggle from "./SelectAllQuestions";
import { useTranslation } from 'react-i18next';

const SeeMyAllQuestionAllYears = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { gradeSubjectSemesterId } = useParams();

    const myQuestions = useSelector((state) => state.questionbank.questionbank);

    useEffect(() => {
        if (gradeSubjectSemesterId) {
            dispatch(fetchMyQuestions(gradeSubjectSemesterId));
        }
    }, [dispatch, gradeSubjectSemesterId]);

    return (
        <div className="flex flex-col p-0">
            <div className="flex-1">
                <AllQuestionsToggle />
                <div className="mx-auto w-[400px] p-0 sm:w-[550px] md:w-full xl:w-full">
                    <div className="flex ml-8 flex-col">
                        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                        {t('tablesheader.Myquestions')}
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
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">{t('tablesheader.Question')}</th>
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">{t('tablesheader.Type')} </th>
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">{t('tablesheader.Answer')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myQuestions && myQuestions.length > 0 ? (
                                            myQuestions.map((question, index) => (
                                                <tr
                                                    key={question._id}
                                                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                                                >
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{question.questionText}</td>
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{question.questionType}</td>
                                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{question.answer}</td>
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

export default SeeMyAllQuestionAllYears;