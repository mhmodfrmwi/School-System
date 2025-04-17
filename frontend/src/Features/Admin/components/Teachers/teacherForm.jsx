import React, { useState } from "react";
import PersonalData from "./PersonalData"; 
import AcademicData from "./AcademicData"; 
import { useTranslation } from 'react-i18next';
function TeacherManagementPage() {
  const [selectedTab, setSelectedTab] = useState("personal");
  const { t } = useTranslation();
  return (
    <div className="mx-auto mt-10 w-full">
      {/* شريط التبويبات */}
      <div className="mx-auto mb-20 flex w-[60%] overflow-hidden rounded-full border border-gray-300 bg-[#F5F5F5]">
        <button
          onClick={() => setSelectedTab("personal")}
          className={`flex flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium ${
            selectedTab === "personal"
              ? "bg-[#117C90] text-white dark:bg-[#043B44]"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-full`}
        >
          <span className="dark:text-[#043B44 flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-[#043B44] dark:text-[#043B44]">
            1
          </span>
          {t("datatype.PersonalData")}
        </button>
        <button
          onClick={() => setSelectedTab("academic")}
          className={`flex flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium ${
            selectedTab === "academic"
              ? "bg-[#117C90] text-white dark:bg-[#043B44]"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-full`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-[#043B44] dark:text-[#043B44]">
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
