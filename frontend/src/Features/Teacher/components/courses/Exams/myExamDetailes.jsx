import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamsForTeacher } from "../../TeacherRedux/ExamSlice"; 
import { useTranslation } from 'react-i18next';

const ExamDetails = () => {
    const { examId } = useParams(); 
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(); // Added i18n
    const { exams } = useSelector((state) => state.exam);
    const exam = exams.find((exam) => exam._id === examId);

    // Determine direction based on current language
    const isRTL = i18n.language === 'ar';
    const direction = isRTL ? 'rtl' : 'ltr';
    const textAlign = isRTL ? 'text-right' : 'text-left';
    const marginDirection = isRTL ? 'mr' : 'ml';

    useEffect(() => {
        if (!exams.length) {
            dispatch(fetchExamsForTeacher()); 
        }
    }, [dispatch, exams]);

    if (!exam) {
        return <div>{t('loading')}</div>;
    }

    return (
        <div className="flex flex-col p-4" dir={direction}>
            <div className="flex-1">
                <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                    <div className="flex flex-col p-0">
                        <div className="flex-1">
                            <div className="mx-auto w-full p-0">
                                <div className={`flex ${isRTL ? 'mr-2' : 'ml-2'} flex-col`}>
                                    <h1 className={`text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl ${textAlign}`}>
                                        {exam.title}
                                    </h1>
                                    <div className={`mt-1 h-[3px] rounded-t-md bg-[#244856] ${isRTL ? 'ml-auto' : 'mr-auto'} w-[100px] lg:h-[4px] lg:w-[200px]`}></div>
                                </div>

                                <div className={`p-6 bg-slate-50 mt-9 rounded-xl shadow-md border border-[#117C90] hover:shadow-lg transition-shadow duration-300 ${textAlign}`}>
                                    <h2 className={`text-xl font-poppins font-semibold text-[#47bfee] mb-4`}>
                                        {t('examst.GeneralInformation')}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('tablesheader.Description')}:</strong> {exam.description}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('tablesheader.Type')}:</strong> {exam.type}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('examst.Start')}:</strong>{" "}
                                                {new Date(exam.start_time).toLocaleString()}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('examst.End')}:</strong>{" "}
                                                {new Date(exam.end_time).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('examst.Duration')}:</strong> {exam.duration} {t('minutes')}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('assignmentt.Marks')}:</strong> {exam.total_marks}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('examst.Subject')}:</strong> {exam.subject_id.subjectName}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('examst.Grade')}:</strong> {exam.grade_id.gradeName}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-6 mt-8 bg-slate-50 rounded-xl shadow-md border border-[#117C90] hover:shadow-lg transition-shadow duration-300 ${textAlign}`}>
                                    <h2 className={`text-xl font-poppins font-semibold text-[#244856] mb-4`}>
                                        {t('examst.ExamQuestions')}
                                    </h2>
                                    <hr className="mb-7"></hr>
                                    {exam.exam_questions.map((question, index) => (
                                        <div key={question._id} className="mb-6">
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('tablesheader.Question')} {index + 1}:</strong> {question.question_text}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('tablesheader.Type')}:</strong> {question.question_type}
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('examst.Options')}:</strong>
                                            </p>
                                            <ul className={`list-disc ${isRTL ? 'pr-5' : 'pl-5'}`}>
                                                {question.options.map((option, i) => (
                                                    <li key={i} className="text-sm font-poppins text-[#244856]">
                                                        {option}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('tablesheader.CorrectAnswer')}:</strong><span className="font-bold text-[#44b323]"> {question.correct_answer}</span> 
                                            </p>
                                            <p className="text-sm font-poppins text-[#244856]">
                                                <strong>{t('assignmentt.Marks')}:</strong> {question.marks}
                                            </p>
                                            <hr className="m-7"></hr>
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