import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchClassTeacher } from "../components/AdminRedux/classTeacherSlice";
import ClassTeacherTable from "../components/ClassTeacher.jsx/classTeacherTable";

const AllClassTeacher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] overflow-x-scroll p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <ClassTeacherTable />
        </div>
      </div>
    </div>
  );
};

export default AllClassTeacher;
