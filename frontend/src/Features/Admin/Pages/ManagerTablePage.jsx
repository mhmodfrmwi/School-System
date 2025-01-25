import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBosses } from "../components/AdminRedux/managerSlice";
import ManagerTable from "../components/Managers/managerTable";

const AllManagers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBosses());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <ManagerTable />
        </div>
      </div>
    </div>
  );
};

export default AllManagers;
