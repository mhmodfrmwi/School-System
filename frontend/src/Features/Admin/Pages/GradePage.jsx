import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAcademicYears } from "../components/AdminRedux/academicYearSlice";
import GradeList from "../components/Grades/GradeList";

const AllGrades = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] overflow-x-scroll p-6 sm:w-[550px] md:w-[700px] xl:w-[900px]">
          <GradeList />
        </div>
      </div>
    </div>
  );
};

export default AllGrades;
