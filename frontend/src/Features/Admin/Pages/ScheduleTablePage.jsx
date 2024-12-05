import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchScheduals} from "../components/AdminRedux/scheduleSlice"; 
import  ScheduleTable from "../components/Schedule/schedualTable"; 

const AllSchedules = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchScheduals());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] overflow-x-scroll p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <ScheduleTable />
        </div>
      </div>
    </div>
  );
};

export default AllSchedules;
