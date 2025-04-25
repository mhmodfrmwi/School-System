import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import bag from "../../../../assets/bag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/ui/Loader";
import ScheduleToggle from "./SelectPage";
import { useTranslation } from "react-i18next";
import { useClasses } from "../hooks/attendance";

const GetAllScheduleClasses = () => {
  const { managerclasses, isLoading } = useClasses();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (!managerclasses || managerclasses.length === 0) {
    return (
      <>
        <ScheduleToggle />
        <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg dark:bg-DarkManager2">
          <FontAwesomeIcon
            icon={faCalendar}
            className="mb-4 text-6xl text-gray-400 dark:text-white"
          />
          <p className="mb-2 font-poppins text-xl font-semibold text-gray-600 dark:text-white">
            No Manager Classes Found
          </p>
          <p className="mb-4 max-w-xl text-center font-poppins text-gray-500 dark:text-white">
            It seems like there are no available manager classes at the moment.
          </p>
        </div>
      </>
    );
  }

  const filteredManagerClasses = managerclasses.filter(
    (cls) =>
      cls.className.toLowerCase().includes(searchText.toLowerCase()) ||
      cls.gradeId.gradeName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <ScheduleToggle />
      <div className="lg:px-0] mx-auto w-[90%] px-4 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-poppins text-lg font-semibold text-[#117C90] dark:text-DarkManager sm:text-xl lg:text-2xl">
              {t("attendanse.Classes")}
            </h1>
            <div className="mt-1 h-[3px] w-[70px] rounded-t-md bg-[#117C90] dark:bg-DarkManager lg:h-[4px] xl:w-[100px]"></div>
          </div>
          <input
            type="text"
            placeholder={t("attendanse.Search")}
            className="w-44 rounded-md border-2 border-gray-300 bg-[#FCFAFA] px-3 py-2 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:text-black dark:focus:ring-DarkManager sm:w-64"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mx-auto grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredManagerClasses.map((cls) => (
            <div
              key={cls._id}
              onClick={() =>
                navigate(`/manager/get-weekly-schedule/${cls._id}`)
              }
              className="relative flex w-64 cursor-pointer flex-col items-center rounded-xl border border-gray-300 bg-slate-100 p-5 text-center shadow-lg transition-colors hover:bg-slate-200 dark:bg-DarkManager2"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <img src={bag} alt="bag" className="h-7 w-7" />
              </div>

              <div className="font-poppins text-[#117C90] dark:text-white">
                {cls.gradeId?.gradeName}
              </div>
              <div className="font-poppins text-lg font-semibold">
                {cls.className}
              </div>

              <p className="font-poppins text-[#117C90] dark:text-white">
                Students: {cls.student_count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetAllScheduleClasses;
