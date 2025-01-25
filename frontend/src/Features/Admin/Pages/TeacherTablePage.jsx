import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTeachers } from "../components/AdminRedux/teacherSlice";
import TeacherTable from "../components/Teachers/teacherTable";

const AllTeachers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <TeacherTable />
        </div>
      </div>
    </div>
  );
};

export default AllTeachers;
