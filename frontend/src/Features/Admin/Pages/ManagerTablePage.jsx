import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchManagers } from "../components/AdminRedux/managerSlice";
import ManagerTable from "../components/Managers/managerTable";

const AllManagers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] overflow-x-scroll p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <ManagerTable />
        </div>
      </div>
    </div>
  );
};

export default AllManagers;
