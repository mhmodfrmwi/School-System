import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const SubjectsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-[90%]">
      <div className="mb-4 flex flex-row items-center justify-between space-y-2 sm:space-y-0 lg:mb-6">
        <div className="flex flex-col">
          <h1 className="font-poppins text-2xl font-semibold text-[#244856]">
          {t('subjectsHeader.title')}
          </h1>
          <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856]"></div>
        </div>

        <div className="flex items-center gap-1">
          <NavLink
            to="/admin/addsubject"
            className="flex items-center rounded-md bg-[#117C90] px-4 py-2 font-poppins text-sm text-white transition hover:bg-[#0E6B7A] dark:bg-[#043B44]"
          >
            <span className="block">{t('subjectsHeader.addButton')}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SubjectsHeader;
