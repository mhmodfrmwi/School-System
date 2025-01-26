import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSubjects } from "../components/AdminRedux/subjectSlice";
import SubjectTable from "../components/Subjects/AllSubjects";

const AllSubjects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <SubjectTable />
        </div>
      </div>
    </div>
  );
};

export default AllSubjects;
