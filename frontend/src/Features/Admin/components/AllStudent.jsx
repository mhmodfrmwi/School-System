import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents } from "./studentSlice";
import StudentTable from "./StudentTable";

const AllStudent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="p-6">
            <StudentTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStudent;
