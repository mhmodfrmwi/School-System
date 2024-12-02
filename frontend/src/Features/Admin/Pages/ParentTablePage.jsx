import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchParents } from "../components/AdminRedux/parentSlice";
import ParentTable from "../components/Parents/parentTable";

const AllParents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParents());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] overflow-x-scroll p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <ParentTable />
        </div>
      </div>
    </div>
  );
};

export default AllParents;
