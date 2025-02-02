import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAcademicYears } from "../components/AdminRedux/academicYearSlice";
import AcademicYearList from "../components/AcademicYears/AcademicYearList";

const AllAcademicYears = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
      <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <AcademicYearList />
        </div>
      </div>
    </div>
  );
};

export default AllAcademicYears;
