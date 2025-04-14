import React from "react";
import { useNavigate, useLocation ,useParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const QuestionsToggle = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const { gradeSubjectSemesterId } = useParams();
    const navigate = useNavigate();
  
      if (!gradeSubjectSemesterId) {
        console.error("gradeSubjectSemesterId is undefined");
        return;
      }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full mx-auto mt-10 px-4">
      <div className="flex flex-wrap md:flex-nowrap mb-20 border border-gray-300 rounded-full overflow-hidden max-w-[90%] md:w-[60%] mx-auto bg-[#F5F5F5]">
        <button
        onClick={() => navigate(`/teacher/my-question-bank/${gradeSubjectSemesterId}/my-questions`)}
                  className={`flex-1 flex items-center font-poppins justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-full text-center transition-all ${
            isActive(`/teacher/my-question-bank/${gradeSubjectSemesterId}/my-questions`)
              ? "bg-[#008394] text-white font-bold"
              : "bg-[#f4f4f4] text-[#008394] font-normal"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
          {t('tablesheader.Myquestions')}
        </button>
        <button
        onClick={() => navigate(`/teacher/all-question-bank/${gradeSubjectSemesterId}/all-questions`)}
          className={`flex-1 flex items-center font-poppins justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-full text-center transition-all ${
            isActive(`/teacher/all-question-bank/${gradeSubjectSemesterId}/all-questions`)
              ? "bg-[#008394] text-white font-bold"
              : "bg-[#f4f4f4] text-[#008394] font-normal"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
          {t('tablesheader.AllQuestions')}
        </button>
      </div>
    </div>
  );
};

export default QuestionsToggle;
