import React, { useState } from "react";
import AddSubjectName from "./AddSubjectName";
import AssignSubject from "./AssignSubject";
import { useTranslation } from 'react-i18next';
function SubjectManagementPage() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("add");

  return (
    <div className="mx-auto mt-10 w-full px-4">
      {/* Tab navigation */}
      <div className="mx-auto mb-10 flex max-w-[90%] overflow-hidden rounded-full border border-gray-300 bg-[#F5F5F5] md:w-[60%]">
        <button
          onClick={() => setSelectedTab("add")}
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-medium md:text-sm ${
            selectedTab === "add"
              ? "bg-[#117C90] text-white dark:bg-[#043B44]"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-full`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-[#043B44] dark:text-[#043B44]">
          {t('subjectManagement.tabs.add.number')}
          </span>
          {t('subjectManagement.tabs.add.title')}
        </button>
        <button
          onClick={() => setSelectedTab("assign")}
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-medium md:text-sm ${
            selectedTab === "assign"
              ? "bg-[#117C90] text-white dark:bg-[#043B44]"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-full`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-[#043B44] dark:text-[#043B44]">
          {t('subjectManagement.tabs.assign.number')}
          </span>
          {t('subjectManagement.tabs.assign.title')}
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {selectedTab === "add" && <AddSubjectName />}
        {selectedTab === "assign" && <AssignSubject />}
      </div>
    </div>
  );
}

export default SubjectManagementPage;
