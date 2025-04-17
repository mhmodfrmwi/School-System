import React, { useState } from "react";
import PersonalData from "./PersonalData"; // مكون لإدخال البيانات الشخصية
import AcademicData from "./AcademicData"; // مكون لإدخال البيانات الأكاديمية
import { useTranslation } from 'react-i18next';
function TeacherManagementPage() {
  const [selectedTab, setSelectedTab] = useState("personal");
  const { t } = useTranslation();
  return (
    <div className="w-full mx-auto mt-10 font-poppins">
      {/* شريط التبويبات */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap mb-20 border border-gray-300 rounded-xl overflow-hidden w-[90%] sm:w-[60%] mx-auto bg-[#F5F5F5]">
        <button
          onClick={() => setSelectedTab("personal")}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium ${
            selectedTab === "personal"
              ? "bg-[#117C90] text-white"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-t-xl sm:rounded-none sm:rounded-l-xl`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
          {t("datatype.PersonalData")}
        </button>
        <button
          onClick={() => setSelectedTab("academic")}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium ${
            selectedTab === "academic"
              ? "bg-[#117C90] text-white"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-b-xl sm:rounded-none sm:rounded-r-xl`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
          {t("datatype.AcademicData")}
        </button>
      </div>

      {/* محتوى التبويبات */}
      {selectedTab === "personal" && <PersonalData />}
      {selectedTab === "academic" && <AcademicData />}
    </div>
  );
}

export default TeacherManagementPage;
