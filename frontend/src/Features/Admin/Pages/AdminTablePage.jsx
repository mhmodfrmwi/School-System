import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAdmins } from "../components/AdminRedux/adminSlice";
import AdminTable from "../components/Admins/adminTable";

const AllAdmins = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

export default AllAdmins;
