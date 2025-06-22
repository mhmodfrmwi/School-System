import React from "react";
import ClassTeacherTable from "../components/ClassTeacher/classTeacherTable";

const AllClassTeacher = () => {

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <ClassTeacherTable />
        </div>
      </div>
    </div>
  );
};

export default AllClassTeacher;
