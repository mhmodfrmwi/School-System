import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents } from "../components/AdminRedux/studentSlice";
import StudentTable from "../components/Students/StudentTable";

const AllStudent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex-1">
          <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
            <StudentTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStudent;
